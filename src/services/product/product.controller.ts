import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { $Enums, Prisma } from '@prisma/client';
import { ProductDto, ProductUpdateDto } from './dto/product.dto';

@ApiTags('product')
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post('create-one-product')
    @ApiOperation({ summary: 'Create product' })
    @ApiBody({ type: ProductDto, required: true })
    @ApiResponse({
        status: 201, description: 'Product created successfully', schema: {
            example: {
                "status": true,
                "payload": {
                    "id": 12,
                    "name": "string",
                    "category": "ENUM",
                    "variant": "ENUM",
                    "price": 5000,
                    "printer_station": ["C"]
                },
                "error": null
            }
        }
    })
    @ApiResponse({
        status: 400, description: 'Bad Request', schema: {
            example: {
                "status": false,
                "payload": null,
                "error": {
                    "statusCode": 400,
                    "path": "/products/create-one-product",
                    "errorMessage": "error"
                }
            }
        }
    })
    async createProduct(@Body() data: Prisma.ProductCreateInput) {
        return this.productService.createProduct(data);
    }

    @Get('get-product-by-category/:category')
    @ApiOperation({ summary: 'Get all products by category' })
    @ApiResponse({
        status: 200, description: 'Success get product', schema: {
            example: {
                "status": true,
                "payload": [
                    {
                        "id": 1,
                        "name": "Jeruk",
                        "category": "MINUMAN",
                        "variant": "DINGIN",
                        "price": 12000,
                        "printer_station": [
                            "C"
                        ]
                    },
                    {
                        "id": 2,
                        "name": "Jeruk",
                        "category": "MINUMAN",
                        "variant": "PANAS",
                        "price": 10000,
                        "printer_station": [
                            "C"
                        ]
                    },
                ],
                "error": null
            }
        }
    })
    @ApiResponse({
        status: 400, description: 'Bad Request', schema: {
            example: {
                "status": false,
                "payload": null,
                "error": {
                    "statusCode": 400,
                    "path": "/products/create-one-product",
                    "errorMessage": "error"
                }
            }
        }
    })
    @ApiQuery({ name: "category", enum: $Enums.ProductCategory })
    async getAllProductByCategory(@Query('category') category: $Enums.ProductCategory) {
        return this.productService.getAllProductByCategory(category);
    }

    @Get('get-product-by-id/:id')
    @ApiOperation({ summary: 'Get product by ID' })
    @ApiResponse({
        status: 200, description: 'Product retrieved successfully', schema: {
            example: {
                "status": true,
                "payload": {
                    "id": 2,
                    "name": "Jeruk",
                    "category": "MINUMAN",
                    "variant": "PANAS",
                    "price": 10000,
                    "printer_station": [
                        "C"
                    ]
                },
                "error": null
            }
        }
    })
    @ApiResponse({
        status: 400, description: 'Product not found', schema: {
            example: {
                "status": false,
                "payload": null,
                "error": {
                    "statusCode": 400,
                    "path": "/products/get-product-by-id/%7Bid%7D?id=23",
                    "errorMessage": "Id product is not found"
                }
            }
        }
    })
    @ApiQuery({ name: "id", type: Number })
    async getProductById(@Query('id') id: number) {
        return this.productService.getProductById(id);
    }

    @Put('update-one-product/:id')
    @ApiOperation({ summary: 'Update product' })
    @ApiBody({ type: ProductUpdateDto, required: true })
    @ApiResponse({
        status: 200, description: 'Product updated successfully', schema: {
            example: {
                "status": true,
                "payload": {
                    "id": 12,
                    "name": "updated",
                    "category": "MINUMAN",
                    "variant": "DINGIN",
                    "price": 1000,
                    "printer_station": [
                        "C"
                    ]
                },
                "error": null
            }
        }
    })
    @ApiResponse({
        status: 400, description: 'Bad Request', schema: {
            example: {
                "status": false,
                "payload": null,
                "error": {
                    "statusCode": 400,
                    "path": "/products/update-one-product/120",
                    "errorMessage": "Id product is not found"
                }
            }
        }
    })
    async updateProduct(@Param('id') id: number, @Body() data: Prisma.ProductUpdateInput) {
        return this.productService.updateProduct(data, id);
    }

    @Delete('delete-one-product/:id')
    @ApiOperation({ summary: 'Delete product' })
    @ApiResponse({
        status: 200, description: 'Product deleted successfully', schema: {
            example: {
                "status": true,
                "error": null
            }
        }
    })
    @ApiResponse({
        status: 400, description: 'Product not found', schema: {
            example: {
                "status": false,
                "payload": null,
                "error": {
                    "statusCode": 400,
                    "path": "/products/delete-one-product/123",
                    "errorMessage": "Id product is not found"
                }
            }
        }
    })
    async deleteProduct(@Param('id') id: number): Promise<void> {
        return this.productService.deleteProduct(id);
    }
}