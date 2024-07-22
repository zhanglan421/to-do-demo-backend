import { Controller, Get } from "@nestjs/common";

import { UploadService } from "../service/upload.service";

@Controller('upload')
export class uploadController {
    constructor(private uploadService: UploadService) {}
    
    @Get('getKey')
    async getKey() {
        const Credential =  await this.uploadService.getUploadKey();

        return {
            data: JSON.parse(Credential)
        }
    }
}