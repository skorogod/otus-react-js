import { IProductService } from "./IProductService";
import { ProductService } from "./product.service";
import { ProductServiceMock } from "./product.service.mock";

// Флаг для переключения между реальным и моковым сервисом
const USE_MOCK_PRODUCTS = false;

export const getProductService = (): IProductService =>
  USE_MOCK_PRODUCTS
    ? ProductServiceMock.getInstance()
    : ProductService.getInstance();

// Экспортируем экземпляр сервиса для удобства использования
export const productsService = getProductService();
