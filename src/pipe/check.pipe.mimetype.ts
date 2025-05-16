import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common"

@Injectable()
export class CheckFileMimetypes implements PipeTransform {
    #_file: string
    constructor(file: string) {
        this.#_file = file
    }

    transform(value: Express.Multer.File[], metadata: ArgumentMetadata) {

        for(let file of value){
            console.log(file)
            if(!file.mimetype.startsWith(this.#_file)){
                throw new BadRequestException(`Fayl ${this.#_file} farmatta kiritilishi kerak`)
            }
        }

        
    }
}