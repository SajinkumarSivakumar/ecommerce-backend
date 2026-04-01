import {Body, Controller, Get, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors} from "@nestjs/common";
import {MasterService} from "./master.service";
import { FileInterceptor } from "@nestjs/platform-express";
import {diskStorage} from "multer";
import { extname } from 'path';

@Controller('master')

export class MasterController {

    constructor(private ms:MasterService) {
    }





    @Post('fileUpload')
    @UseInterceptors(FileInterceptor('fileUpload', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueName = Date.now() + extname(file.originalname);
                cb(null, uniqueName);
            }
        })
    }))
    async getUploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Body() body: any,
        @Req() req,
        @Res() res
    ) {

        if (!file) {
            return res.status(400).send({ status: false, msg: 'File missing' });
        }

        const uploadFile = await this.ms.getUploadFiles(file, body);

        return res.status(201).send({
            status: true,
            msg: 'Upload successfully',
            file: file.filename
        });
    }


  @Get('getCategories')
    async getCategoriesList(@Res() res,@Req() req,) {
        const categoriesList = await this.ms.getAllCategoriesList()
            if(categoriesList){
                return res.status(200).send({msg:'DataRetrived',data:categoriesList})
            }

  }
}