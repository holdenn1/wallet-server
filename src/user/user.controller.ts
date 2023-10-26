import {
  Controller,
  UploadedFile,
  Req,
  Post,
  UseInterceptors,
  UseGuards,
  Get,Body, UsePipes, ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AccessTokenGuard } from 'src/auth/guards/accessToken.guard';
import { CreateCreditCardDto } from './dto/create-credit-card.dto';
@UseGuards(AccessTokenGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Post('upload-cover')
  @UseInterceptors(FileInterceptor('cover'))
  uploadAvatar(@Req() req, @UploadedFile() file: Express.Multer.File) {
    return this.userService.uploadAvatar(file, req.user.sub);
  }

  @Get('get-user')
  getUser(@Req() req) {
    return this.userService.findOneUserByEmail(req.user.email);
  }

  @UsePipes(new ValidationPipe())
  @Post('add/credit-card')
  addCreditCard(@Req() req, @Body() createCreditCardDto: CreateCreditCardDto){
    
    return this.userService.addCreditCard(req.user.sub, createCreditCardDto)
  }
}
