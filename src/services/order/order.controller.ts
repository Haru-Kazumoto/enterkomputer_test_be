import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { Prisma } from '@prisma/client';
import { Order, OrderItem, Product } from '@prisma/client';
import { OrderDto } from './dto/order.dto';
import { StationPrint } from './enums/station-printer.enum';

@ApiTags('order')
@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Post('create-order')
    @ApiOperation({ summary: 'Create order' })
    @ApiBody({ type: OrderDto, required: true })
    @ApiResponse({
        status: 201, description: 'Order created successfully', schema: {
            example: {
                "status": true,
                "payload": {
                    "order": {
                        "id": 1,
                        "status": "PENDING",
                        "totalAmount": 15000,
                        "createdAt": "2024-01-01T00:00:00.000Z",
                        "updatedAt": "2024-01-01T00:00:00.000Z"
                    },
                    "printers": ["Printer1", "Printer2"]
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
                    "path": "/order/create-order",
                    "errorMessage": "error"
                }
            }
        }
    })
    async createOrder(@Body() orderData: OrderDto) {
        return this.orderService.createOrder(orderData);
    }

    @Get('get-bill/:id')
    @ApiOperation({ summary: 'Get bill by order ID' })
    @ApiResponse({
        status: 200, description: 'Bill retrieved successfully', schema: {
            example: {
                "status": true,
                "payload": {
                    "id": 1,
                    "status": "PENDING",
                    "totalAmount": 15000,
                    "createdAt": "2024-01-01T00:00:00.000Z",
                    "updatedAt": "2024-01-01T00:00:00.000Z",
                    "order_items": [
                        {
                            "id": 1,
                            "quantity": 2,
                            "price": 5000,
                            "Product": {
                                "id": 1,
                                "name": "Product1",
                                "category": "CATEGORY1",
                                "price": 5000
                            }
                        },
                        {
                            "id": 2,
                            "quantity": 1,
                            "price": 5000,
                            "Product": {
                                "id": 2,
                                "name": "Product2",
                                "category": "CATEGORY2",
                                "price": 5000
                            }
                        }
                    ]
                },
                "error": null
            }
        }
    })
    @ApiResponse({
        status: 400, description: 'Order not found', schema: {
            example: {
                "status": false,
                "payload": null,
                "error": {
                    "statusCode": 400,
                    "path": "/order/get-bill/1",
                    "errorMessage": "Order not found"
                }
            }
        }
    })
    async getBill(@Param('id') id: number) {
        return this.orderService.getBill(id);
    }

    @Get('print-order-by-station/:station')
    @ApiOperation({ summary: 'Print orders by station' })
    @ApiQuery({ name: "station", enum: StationPrint })
    @ApiResponse({
        status: 200, description: 'Orders retrieved successfully', schema: {
            example: {
                "status": true,
                "payload": [
                    {
                        "id": 1,
                        "status": "PENDING",
                        "totalAmount": 15000,
                        "createdAt": "2024-01-01T00:00:00.000Z",
                        "updatedAt": "2024-01-01T00:00:00.000Z"
                    },
                    {
                        "id": 2,
                        "status": "COMPLETED",
                        "totalAmount": 20000,
                        "createdAt": "2024-01-02T00:00:00.000Z",
                        "updatedAt": "2024-01-02T00:00:00.000Z"
                    }
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
                    "path": "/order/print-order-by-station/1",
                    "errorMessage": "Invalid station"
                }
            }
        }
    })
    async printOrderByStationPrinter(@Query('station') station: StationPrint) {
        return this.orderService.printOrderByStationPrinter(station);
    }

    @Get('get-all-order')
    async getAllOrder() {
        return this.orderService.getAllOrder();
    }
}
