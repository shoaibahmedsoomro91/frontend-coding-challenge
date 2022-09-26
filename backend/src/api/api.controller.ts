import {
  Controller,
  Get,
  Put,
  Res,
  Req,
  Param,
  Post,
  HttpStatus
} from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('absence')
export class ApiController {
  constructor(
    private readonly apiService: ApiService
  ) {}

  @Get('getAll')
  public async getAllAbsences( @Res() res ): Promise<any> {
    const absences = await this.apiService.getAll()    
    return res.status(HttpStatus.OK).json(absences);
  }
  
  @Put(':id')
  public async updateAbsences(
    @Req() req, @Res() res,
    @Param('id') id: string
  ): Promise<any> {
    try {
      const payload = await this.apiService.updateById(id, req.body)
      return res.status(HttpStatus.OK).json(payload);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        errMsg: err.message,
        message: "Error: Record not updated!",
        status: 400,
      });
    }
  }

  @Post('filter')
  public async filterAbsences(
    @Req() req, @Res() res
  ): Promise<any> {
    try {      
      const payload = await this.apiService.filter( req.body );
      return res.status(HttpStatus.OK).json({
        payload: payload,
        message: "Absences filters successfully!",
        status: 200,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        errMsg: err.message,
        message: "Error: Absences cannot be filtered !",
        status: 400,
      });
    }
  }

}
