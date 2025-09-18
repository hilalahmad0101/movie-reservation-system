import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    private authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'Hilalahmadafullstackdeveloper',
      ignoreExpiration: false,
    })
  }

  validate(payload: any) {
    try {
      const user = this.authService.getUserById(payload.sub);
      return user;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
