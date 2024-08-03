import { $Enums, OrderItem, Prisma, Product } from "@prisma/client";

export interface IProductService {
    /**
     * Create a new product with the specified data.
     * 
     * @param {Prisma.ProductCreateInput} data
     * @returns {Product}
     */
    createProduct(data: Prisma.ProductCreateInput): Promise<Product>;

    /**
     * Retrieve all products from the specified category.
     * 
     * @param {$Enums.ProductCategory} category
     * @returns {Product[]}
     */
    getAllProductByCategory(category: $Enums.ProductCategory): Promise<Product[]>;

    /**
     * Retrieve the details of a product by its ID.
     * 
     * @param {number} productId
     * @returns {Product}
     */
    getProductById(productId: number): Promise<Product>;

    /**
     * Update an existing product by its ID.
     * 
     * @param {Prisma.ProductUpdateInput} data 
     * @param {number} productId 
     */
    updateProduct(data: Prisma.ProductUpdateInput, productId: number): Promise<Product>;
    
    /**
     * Delete an existing product by its ID.
     * 
     * @param {number} productId 
     * @returns {void}
     */
    deleteProduct(productId: number): Promise<void>;

    /**
     * Check if a product with the given name already exists.
     * 
     * @param {string} productName
     * @returns {void} 
     */
    checkDuplicateProductName(productName: string): Promise<void>;
}