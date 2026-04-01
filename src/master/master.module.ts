import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {MasterController} from "./master.controller";
import {MasterService} from "./master.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Category} from "../entities/categories.entity";



@Module({
    imports: [
        TypeOrmModule.forFeature([Category])
    ],
    controllers: [MasterController],
    providers: [MasterService],
})


export class MasterModule {}