import { Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { AlreadyExistsException } from "src/common/exceptions";
import { trimDtoAttributes } from "src/common/functions";
import { PrismaService } from "src/common/prisma/prisma.service";
import { PlayerDto } from "src/dto/player.dto";

@Injectable()
export class PlayersService {
    private readonly logger = new Logger(PlayersService.name);

    constructor (
        private readonly prisma: PrismaService 
    ) {}

    async getAllPlayers(): Promise<PlayerDto[]> {
        try {
            return await this.prisma.player.findMany();
        } catch (err) {
            this.logger.error(err.message);
            throw new InternalServerErrorException();
        }
    }

    async getPlayerById(id: number): Promise<PlayerDto> {
         const player = await this.prisma.player.findUnique({
            where: { id: id }
        });

        if (!player) {
            throw new NotFoundException(`Player with id ${id} was not found`);
        }

        return player;
    }

    async searchPlayersByName(name: string): Promise<PlayerDto[]> {
        this.logger.log(`Searching for player with name ${name}`);

        const players = await this.prisma.player.findMany({
            where: { 
                name: { 
                    contains: name.trim()
                }
            }
        });

        if (!players) {
            throw new NotFoundException(`Player with name "${name}" was not found`);
        }

        return players;
    }

    async createPlayer(player: PlayerDto): Promise<PlayerDto> {
        trimDtoAttributes(player);
        player.id = undefined; 

        try {
            // We should not allow literraly same entries. Same names is OK, but if everything is same, dont allow
            const existing_player = await this.prisma.player.findFirst({
                where: {
                    AND: [
                        {name: player.name},
                        {draft_number: player.draft_year},
                        {draft_number: player.draft_number},
                        {draft_round: player.draft_round},
                    ]
                },
            });
            
            if (existing_player) {
                throw new AlreadyExistsException("Player already exist");
            }

            const new_player = await this.prisma.player.create({
                data: { ...player }
            });

            return new_player;
        } catch (err) {
            if (err instanceof AlreadyExistsException) {
                throw err;
            }

            this.logger.error(err.message);
            throw new InternalServerErrorException();
        }
    }

    async deletePlayer(id: number): Promise<void> {
        this.logger.log(`Deleting player with id "${id}"`);
        try {
            await this.prisma.player.delete({
                where: { id: id }
            });
        } catch {
            this.logger.log(`Player not found`);
            throw new NotFoundException(`Player with id ${id} was not found`);
        }
    }
}