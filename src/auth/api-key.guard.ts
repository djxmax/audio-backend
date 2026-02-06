import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key']; // On cherche la clé dans les headers
    const expectedApiKey = this.configService.get<string>('API_KEY');

    if (apiKey !== expectedApiKey) {
      throw new UnauthorizedException('Clé d’API invalide ou absente');
    }

    return true;
  }
}