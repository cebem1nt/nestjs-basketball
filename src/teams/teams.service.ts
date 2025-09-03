import { Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { TeamDto } from "src/dto/team.dto";
import { PrismaService } from "src/common/prisma/prisma.service";
import { trimDtoAttributes } from "src/common/functions";
import { AlreadyExistsException } from "src/common/exceptions";

@Injectable()
export class TeamsService {
    private readonly logger = new Logger(TeamsService.name);

    constructor( 
        private readonly prisma: PrismaService
    ) {}

    async getAllTeams(): Promise<TeamDto[]> {
        try {
            return await this.prisma.team.findMany();
        } catch (err) {
            this.logger.error(err.message);
            throw new InternalServerErrorException();
        }
    }

    async getTeamByID(id: number): Promise<TeamDto> {
        const team = await this.prisma.team.findUnique({
            where: { id: id }
        });

        if (!team) {
            throw new NotFoundException(`Team with id ${id} was not found`);
        }

        return team;
    }
    
    async getTeamByName(name: string): Promise<TeamDto> {
        const team = await this.prisma.team.findUnique({
            where: { name: name.trim() }
        });

        if (!team) {
            throw new NotFoundException(`Team with name "${name}" was not found`);
        }

        return team;
    }

    async createTeam(team: TeamDto): Promise<TeamDto> {
        // Serialize first
        trimDtoAttributes(team);
        team.id = undefined; // I think i shouldn't allow custom ids

        const existing_team = await this.prisma.team.findUnique({
            where: { name: team.name }
        });

        if (existing_team) {
            throw new AlreadyExistsException(`Team with name "${team.name}" already exists.`);
        }

        try {
            const new_team = await this.prisma.team.create({
                data: { ...team }
            });
    
            return new_team;

        } catch (err) {
            this.logger.error(err.message);
            throw new InternalServerErrorException();
        }
    }

    async deleteTeam(id: number): Promise<void> {
        this.logger.log(`Deleting team with id "${id}"`);
        try {
            await this.prisma.team.delete({
                where: { id: id }
            });

        } catch {
            this.logger.log(`Team not found`);
            throw new NotFoundException(`Team with id ${id} was not found`);
        }
    }
}
