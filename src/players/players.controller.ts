import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { PlayersService } from "./players.service";
import { ApiKeyGuard } from "src/api_key.guard";
import { PlayerDto } from "src/dto/player.dto";

@Controller("players")
export class PlayersController {
    constructor (
        private readonly service: PlayersService
    ) {}

    @Get()
    async getAllPlayers() {
        return await this.service.getAllPlayers();
    }

    @Get(":id")
    async getPlayerById(
        @Param("id") id: string
    ) {
        return await this.service.getPlayerById(Number(id));
    }

    @Get("search-by-name/:name")
    async searchPlayersByName(
        @Param("name") name: string
    ) {
        return await this.service.searchPlayersByName(name);
    }

    @Post("new")
    @UseGuards(ApiKeyGuard)
    async createPlayer(
        @Body() player: PlayerDto
    ) {
        return await this.service.createPlayer(player);
    }

    @Delete("delete/:id")
    @UseGuards(ApiKeyGuard)
    async deletePlayer(
        @Param("id") id: string
    ) {
        return await this.service.deletePlayer(Number(id));
    }
}