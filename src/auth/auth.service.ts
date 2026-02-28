import {BadRequestException, Injectable, UnauthorizedException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../entities/user.entity";
import {Repository} from "typeorm";
import * as bcrypt from "bcrypt";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(@InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService) {}


    async login(email: string, password: string){
        const user = await this.userRepository.findOne({
            where: { email: email }
        });
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);


        if (!isMatch) {
            throw new UnauthorizedException('Invalid password');
        }

        const payload = { id: user.id, email: user.email };

        return {
            access_token: this.jwtService.sign(payload),
            user,
        };

    }


    async register(data:any){

        if(data.password !== data.confirmPassword){
            throw new BadRequestException('Password and Confirm Password not match');
        }
            const hashedPassword = await bcrypt.hash(data.password, 10);
        const saveData ={
                first_name: data.first_name,
                last_name: data.last_name,
                email:data.email,
                 password: hashedPassword,
                confirmPassword:hashedPassword
            }

        await this.userRepository.save(saveData);


        return data;
    }
}