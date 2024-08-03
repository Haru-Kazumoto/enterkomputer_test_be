import { BadRequestException, Injectable } from '@nestjs/common';
import { IProductService } from './interfaces/product.service.interface';
import { PrismaService } from 'prisma/module/prisma.service';
import { Prisma, Product, $Enums } from '@prisma/client';

@Injectable()
export class ProductService implements IProductService {
    constructor(
        private readonly db: PrismaService
    ){}

    async createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
        return await this.db.$transaction(async (tx) => {
            this.checkDuplicateProductName(data.name);

            return await tx.product.create({
                data: {
                    ...data
                }
            })
        });
    }

    async getAllProductByCategory(category: $Enums.ProductCategory): Promise<Product[]> {
        return await this.db.product.findMany({
            where: { category },
        });
    }

    async getProductById(productId: number): Promise<Product> {
        const data = await this.db.product.findUnique({
            where: {id: productId}
        });

        if(!data) {
            throw new BadRequestException("Id product is not found");
        }

        return data;
    }
    
    async updateProduct(data: Prisma.ProductUpdateInput, productId: number): Promise<Product> {
        const dataToUpdate = await this.getProductById(productId);
        this.checkDuplicateProductName(data.name);
        
        return await this.db.$transaction(async (tx) => {
            return await tx.product.update({
                where: {id: dataToUpdate.id},
                data: {...data}
            });
        });
    }

    async deleteProduct(productId: number): Promise<void> {
        const dataToDelete = await this.getProductById(productId);

        await this.db.$transaction(async (tx) => {
            tx.product.delete({where: {id: dataToDelete.id}});
        });
    }

    async checkDuplicateProductName(productName: string | any) {
        const findProductName = await this.db.product.findFirst({
            where: {name: productName}
        });

        if(findProductName) {
            throw new BadRequestException("Product has already exist");
        }
    }
}
