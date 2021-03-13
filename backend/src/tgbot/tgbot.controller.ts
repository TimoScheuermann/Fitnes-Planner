import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import FHUser from 'src/auth/user.decorator';
import { IUser } from 'src/user/interfaces/IUser';
import { TgbotService } from './tgbot.service';

@Controller('tgbot')
export class TgbotController {
  constructor(private readonly tgbotService: TgbotService) {}

  /**
   * validates the 2FA code sent by telegram
   * @param user request sender
   * @param body {code: string} code received in telegram
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('code')
  async validateConnection(
    @FHUser() user: IUser,
    @Body() body: { code: string },
  ): Promise<void> {
    this.tgbotService.validateConnection(user, body.code);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getCode(@FHUser() user: IUser): Promise<number> {
    return this.tgbotService.getCode(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async removeCode(@FHUser() user: IUser): Promise<void> {
    this.tgbotService.removeCode(user);
  }
}
