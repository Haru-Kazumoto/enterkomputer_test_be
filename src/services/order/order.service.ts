import { Injectable } from '@nestjs/common';
import { IOrderService } from './interface/order.service.interface';
import { PrismaService } from 'prisma/module/prisma.service';
import { Prisma, Order, OrderItem, Product } from '@prisma/client';
import { StationPrint } from './enums/station-printer.enum';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrderService implements IOrderService {
    constructor(
        private readonly db: PrismaService
    ) { }

    async createOrder(orderData: OrderDto): Promise<{ order: Order; printers: string[] }> {
        return await this.db.$transaction(async (tx) => {
            // Fetch all products and their prices for the given order items
            const orderItemsWithProduct = await tx.product.findMany({
                where: {
                    id: {
                        in: orderData.order_items.map(item => item.productId)
                    }
                }
            });
    
            // Create order items mapping with product details
            const mappingOrderItems = orderData.order_items.map((item) => {
                const product = orderItemsWithProduct.find(p => p.id === item.productId);
                return {
                    quantity: item.quantity,
                    Product: {
                        connect: {
                            id: item.productId
                        }
                    }
                };
            });
    
            // Calculate total price
            const totalPrice = orderData.order_items.reduce((sum, item) => {
                const product = orderItemsWithProduct.find(p => p.id === item.productId);
                if (product) {
                    return sum + (item.quantity * product.price);
                }
                return sum;
            }, 0);
    
            // Create the order
            const order = await tx.order.create({
                data: {
                    table_number: orderData.table_number,
                    total_price: totalPrice,
                    order_items: {
                        create: mappingOrderItems,
                    },
                },
                include: {
                    order_items: {
                        include: {
                            Product: true
                        }
                    }
                }
            });
    
            // Determine printers needed
            const printers = new Set<string>();
            printers.add('A'); // Default printer for cashier
    
            order.order_items.forEach((item) => {
                const productPrinters: string[] = item.Product.printer_station as any;
                productPrinters.forEach((printer) => {
                    printers.add(printer);
                });
            });
    
            return {
                order,
                printers: Array.from(printers)
            };
        });
    }

    async getAllOrder(): Promise<Order[]> {
        return await this.db.order.findMany({
            include: {
                order_items: {
                    include: {
                        Product: true
                    }
                }
            }
        });
    }

    async getBill(orderId: number): Promise<Order & { order_items: (OrderItem & { Product: Product; })[]; }> {
        return await this.db.order.findUnique({
            where: { id: orderId },
            include: {
                order_items: {
                    include: {
                        Product: true,
                    },
                },
            },
        });
    }

    async printOrderByStationPrinter(station: StationPrint): Promise<Order[]> {
        return await this.db.order.findMany({
            where: {
                order_items: {
                    some: {
                        Product: {
                            printer_station: {
                                array_contains: [station]
                            }
                        }
                    }
                }
            },
            include: {
                order_items: {
                    include: {
                        Product: true
                    }
                }
            }
        });
    }
}