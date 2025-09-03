import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

async function isValidApiKey(key: string) {
    /* 
    Here some implementation of logic with validation can be implemented. 
    TODO: I can create a separate database, routes and a service to manage api keys,
    As well, practice CORS with it or some other kind of stuff to manage and generate api keys securely 
    */
    return true;
}

@Injectable()
export class ApiKeyGuard implements CanActivate {
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const key = request.headers["key"];

        // if (!key) { // For now ill leave it like that, no mater has it a key or no
        //     throw new UnauthorizedException('API key is missing');
        // }

        return await isValidApiKey(key);
    }
}
