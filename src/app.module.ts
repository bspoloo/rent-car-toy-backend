import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarModule } from './resources/car/car.module';
import { UserModule } from './resources/user/user.module';
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConnectionConfig } from './config/typeorm.config';
import { StoreModule } from './resources/store/store.module';
import { RentsModule } from './resources/rents/rents.module';
import { AuthModule } from './resources/auth/auth.module';


const envModule = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '../.env'
});

@Module({
  imports: [
    envModule,
    TypeOrmModule.forRoot(typeormConnectionConfig),
    UserModule,
    CarModule,
    StoreModule,
    RentsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
