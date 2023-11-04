import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseGuards,
  Req,
  UsePipes,
  ValidationPipe,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { AccessTokenGuard } from '@/auth/guards/accessToken.guard';
import { CorrectBalanceDto } from './dto/correct-balance.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Period } from './types';
@UseGuards(AccessTokenGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('create')
  @UsePipes(new ValidationPipe())
  create(@Req() req, @Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.createTransaction(+req.user.sub, createTransactionDto);
  }

  @Patch('correct/balance')
  @UsePipes(new ValidationPipe())
  updateBalance(@Req() req, @Body() correctBalanceDto: CorrectBalanceDto) {
    return this.transactionsService.updateBalance(+req.user.sub, correctBalanceDto);
  }

  @Patch('update/transaction/:transactionId')
  updateTransaction(
    @Param('transactionId') transactionId: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.updateTransaction(+transactionId, updateTransactionDto);
  }

  @Get('get-transactions/:userId')
  getTransactions(@Param('userId') userId: string) {
    return this.transactionsService.getTransactions(+userId);
  }

  @Delete('delete-transaction/:transactionId')
  deleteTransaction(@Param('transactionId') transactionId: string) {
    return this.transactionsService.deleteTransaction(+transactionId);
  }

  @Get('get-transaction/by-period')
  getTransactionByPeriod(@Query('period') period: Period) {
    return this.transactionsService.getTransactionByPeriod(period);
  }

  @Get('monthly-summary')
  async getMonthlySummary(@Req() req) {
    return this.transactionsService.getMonthlySummary(+req.user.sub);
  }
}
