import { ApiProperty } from "@nestjs/swagger";
import { $Enums, Prisma } from "@prisma/client";

export class ProductDto implements Prisma.ProductCreateInput {
    @ApiProperty()
    name: string;

    @ApiProperty({enum: $Enums.ProductCategory})
    category: $Enums.ProductCategory;

    @ApiProperty({enum: $Enums.Variant})
    variant?: $Enums.Variant;

    @ApiProperty()
    price: number;

    @ApiProperty({isArray: true})
    printer_station?: Prisma.InputJsonValue | Prisma.NullTypes.JsonNull;
}

export class ProductUpdateDto {
    @ApiProperty()
    name: string;

    @ApiProperty({enum: $Enums.ProductCategory})
    category: $Enums.ProductCategory;

    @ApiProperty({enum: $Enums.Variant})    
    variant?: $Enums.Variant;

    @ApiProperty()
    price: number;

    @ApiProperty({isArray: true})
    printer_station?: Prisma.InputJsonValue | Prisma.NullTypes.JsonNull;
}