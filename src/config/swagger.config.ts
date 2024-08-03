import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function setupSwagger(app: INestApplication): void {
    const swaggerOptions = new DocumentBuilder()
        .setTitle('Order API Collections')
        .setDescription('Order API Documentations')
        .setVersion('1.0.0')
        .addTag("order", "Order Management")
        .addTag("product", "Product Management")
        .addTag("order-request", "Order Request Management")
        .build();
    
    const document = SwaggerModule.createDocument(app, swaggerOptions);

    SwaggerModule.setup('order-api', app, document);
}