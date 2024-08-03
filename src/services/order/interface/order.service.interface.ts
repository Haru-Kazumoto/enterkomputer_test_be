import { $Enums, Order, OrderItem, Prisma, Product } from "@prisma/client";
import { StationPrint } from "../enums/station-printer.enum";
import { OrderDto } from "../dto/order.dto";

export interface IOrderService {
    /**
     * Create a new order with the specified data.
     * 
     * @param {OrderDto} orderData 
     * @returns {Promise<{order: Order, printers: string[]}>} 
     */
    createOrder(orderData: OrderDto): Promise<{ order: Order, printers: string[] }>;

    /**
     * Retrieve the bill for a specific order by its ID.
     * 
     * @param {number} orderId 
     * @returns {Promise<Order & { order_items: (OrderItem & { Product: Product })[] }>} 
     */
    getBill(orderId: number): Promise<Order & { order_items: (OrderItem & { Product: Product })[] }>;

    /**
     * Retrieve all orders associated with a specific station printer.
     * 
     * @param {StationPrint} station 
     * @returns {Promise<Order[]>} 
     */
    printOrderByStationPrinter(station: StationPrint): Promise<Order[]>;

    /**
     * Retrieve all orders
     * 
     * @returns {Promise<Order[]>} 
     */
    getAllOrder(): Promise<Order[]>;
}
