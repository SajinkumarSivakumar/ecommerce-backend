import {Body, Controller, Post, Req, Res, UseGuards} from "@nestjs/common";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }


    @Post('login')
    async createLogin(@Body() body:any) {
        const result = await this.authService.login(body.email, body.password);
        return {
            status: true,
            message: "Login success",
            ...result
        };
    }


    @Post('register')
    async register(@Body()body:any ,@Res() res, @Req() req:any) {
        await this.authService.register(body)
        return res.send({ status: true, msg:'User registered successfully' });
   }
}