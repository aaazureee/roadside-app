import { Module, Global } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { RoleGuard } from './auth.guard';

@Global()
@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, RoleGuard],
  exports: [AuthService, RoleGuard],
})
export class AuthModule {}
