
import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
class LoginDto { email: string; password: string; }
@Controller('auth')
export class AuthController {
  constructor(private jwt: JwtService, private users: UsersService) {}
  @Post('login')
  async login(@Body() body: LoginDto) {
    const user = await this.users.findByEmail(body.email);
    if (!user) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    const ok = await this.users.comparePassword(body.password, user.password);
    if (!ok) throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    const token = this.jwt.sign({ sub: user.id, email: user.email });
    return { access_token: token, user: { id: user.id, email: user.email } };
  }
}
