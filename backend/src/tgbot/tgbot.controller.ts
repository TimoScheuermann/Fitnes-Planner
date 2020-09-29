import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import FHUser from 'src/auth/user.decorator';
import { IUser } from 'src/user/interfaces/IUser';
import { TgbotService } from './tgbot.service';

@Controller('tgbot')
export class TgbotController {
  constructor(private readonly tgbotService: TgbotService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('code')
  public validateConnection(
    @FHUser() user: IUser,
    @Body() body: { code: string },
  ): void {
    console.log('Code', body.code);
    this.tgbotService.validateConnection(user, body.code);
  }
}
