import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/module/prisma.module';
import { ProductModule } from './services/product/product.module';
import { ProductService } from './services/product/product.service';
import { ProductController } from './services/product/product.controller';
import { OrderModule } from './services/order/order.module';

@Module({
  imports: [
    PrismaModule,
    ProductModule,
    OrderModule
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class AppModule {}
