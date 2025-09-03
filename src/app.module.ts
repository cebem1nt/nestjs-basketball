import { Module } from '@nestjs/common';
import { TeamsController } from './teams/teams.controller';
import { TeamsService } from './teams/teams.service';
import { PrismaModule } from './common/prisma/prisma.module';
import { PlayersController } from './players/players.controller';
import { PlayersService } from './players/players.service';

@Module({
    imports: [PrismaModule],
    controllers: [TeamsController, PlayersController],
    providers: [TeamsService, PlayersService],
})

export class AppModule {}