import {BadRequestException, Injectable, UnauthorizedException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Connection} from "mysql2";
import {User} from "../entities/user.entity";
import {Repository} from "typeorm";
import {Category} from "../entities/categories.entity";


@Injectable()
export class MasterService {
    constructor(
        @InjectRepository(Category)
       private readonly categoryRepository: Repository<Category>,
    ) {
    }


    async getUploadFiles(file: any, data: any) {

        try{
            const saveUpload ={
                fileName: file.filename,
                fileSize:file.size,
                category:data.type,
                description:data.text,
                fileType:file.mimetype
            }


            await this.categoryRepository.save(saveUpload);

            return true;
        }catch (e) {
            console.log('ddddd',e)
        }

    }


    async getAllCategoriesList(){
        try{
            const list = await this.categoryRepository.find();
            const filtertheCategories = list.filter(cat=>cat.category =='category')
            return filtertheCategories;
        }catch (e) {
            console.log('getAllCategoriesList',e)
        }

    }
}