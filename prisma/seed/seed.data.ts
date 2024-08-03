import { $Enums, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.$transaction(async (tx) => {
        await tx.product.createMany({
            data: [
                // Kategori minuman
                { name: 'Jeruk', category: $Enums.ProductCategory.MINUMAN, variant: 'DINGIN', price: 12000, printer_station: ['C'] },
                { name: 'Jeruk', category: $Enums.ProductCategory.MINUMAN, variant: 'PANAS', price: 10000, printer_station: ['C'] },
                { name: 'Teh', category: $Enums.ProductCategory.MINUMAN, variant: 'MANIS', price: 8000, printer_station: ['C'] },
                { name: 'Teh', category: $Enums.ProductCategory.MINUMAN, variant: 'TAWAR', price: 5000, printer_station: ['C'] },
                { name: 'Kopi', category: $Enums.ProductCategory.MINUMAN, variant: 'DINGIN', price: 8000, printer_station: ['C'] },
                { name: 'Kopi', category: $Enums.ProductCategory.MINUMAN, variant: 'PANAS', price: 6000, printer_station: ['C'] },
                { name: 'EXTRA ES BATU', category: $Enums.ProductCategory.MINUMAN, price: 2000, printer_station: ['C'] },
    
                // Kategori makanan
                { name: 'Mie', category: $Enums.ProductCategory.MAKANAN, variant: 'GORENG', price: 15000, printer_station: ['B'] },
                { name: 'Mie', category: $Enums.ProductCategory.MAKANAN, variant: 'KUAH', price: 15000, printer_station: ['B'] },
                { name: 'Nasi Goreng', category: $Enums.ProductCategory.MAKANAN, price: 15000, printer_station: ['B'] },
    
                // Kategori promo
                { name: 'Promo Nasi Goreng + Jeruk Dingin', category: $Enums.ProductCategory.PROMO, price: 23000, printer_station: ['B', 'C'] },
            ],
        });
    })
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });