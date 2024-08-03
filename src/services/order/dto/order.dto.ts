import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";
import { Type } from "class-transformer";

class OrderItemsDto {
    @ApiProperty()
    productId: number;

    @ApiProperty()
    quantity: number;
}

export class OrderDto {
    @ApiProperty()
    table_number: string;

    @ApiProperty({type: [OrderItemsDto]})
    @Type(() => OrderItemsDto)
    order_items: OrderItemsDto[];
}