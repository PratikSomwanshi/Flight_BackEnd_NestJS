// src/guards/jwt-auth.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CustomException } from 'src/common/exception/CustomException';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];

    if (!token) {
      throw new CustomException('Token not found');
    }

    try {
      const decoded = await this.authService.verifyToken(token);
      request.user = decoded;
      return true;
    } catch (error) {
      console.log(error);
      throw new CustomException('Invalid token');
    }
  }
}
