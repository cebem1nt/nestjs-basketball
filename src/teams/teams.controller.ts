import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamDto } from 'src/dto/team.dto';
import { ApiKeyGuard } from 'src/api_key.guard';

@Controller("teams")
export class TeamsController {
    constructor (
        private readonly service: TeamsService
    ) {}

    @Get()
    async getAllTeams() {
        return await this.service.getAllTeams();
    }

    @Get(":id")
    async getTeam(
        @Param("id") id: string
    ) {
        return await this.service.getTeamByID(Number(id));
    }

    @Get("by-name/:name")
    async getTeamByName(
        @Param("name") name: string
    ) {
        return await this.service.getTeamByName(name);
    }

    @Post("new")
    @UseGuards(ApiKeyGuard)
    async createTeam(
        @Body() team: TeamDto
    ) {
        return await this.service.createTeam(team);
    }

    @Delete("delete/:id")
    @UseGuards(ApiKeyGuard)
    async deleteTeam(
        @Param("id") id: string
    ) {
        return await this.service.deleteTeam(Number(id));
    }
}
