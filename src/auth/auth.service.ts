import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomException } from 'src/common/exception/CustomException';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload);
  }

  async verifyToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new CustomException('Invalid token');
    }
  }
}
