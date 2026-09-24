import {
  selectError,
  selectFilteredProductCount,
  selectFilteredProducts,
  selectFilters,
  selectHasError,
  selectIsLoading,
  selectLoading,
  selectLowStockProducts,
  selectProducts,
  selectProductState,
  selectSelectedProduct,
  selectTotalProducts,
  selectTotalValue,
} from './product.selectors';
import { IProductState, initialProductState } from '../product.state';
import { IProduct } from '../../models/product.model';

describe('Product Selectors', () => {
  const mockProducts: IProduct[] = [
    {
      id: '1',
      name: 'Premium Coffee',
      description: 'High quality arabica coffee',
      price: 29.99,
      image: '/coffee.jpg',
      category: 'Coffee',
      stock: 50,
      rating: 4.5,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: '2',
      name: 'Espresso Machine',
      description: 'Professional espresso machine',
      price: 499.99,
      image: '/machine.jpg',
      category: 'Electronics',
      stock: 5,
      rating: 4.8,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: '3',
      name: 'Coffee Filter',
      description: 'Paper coffee filter',
      price: 5.99,
      image: '/filter.jpg',
      category: 'Accessories',
      stock: 0,
      rating: 3.5,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  ];

  describe('selectProducts', () => {
    it('should select all products from state', () => {
      const state: IProductState = {
        ...initialProductState,
        products: mockProducts,
      };

      const result = selectProducts.projector(state);

      expect(result).toEqual(mockProducts);
      expect(result.length).toBe(3);
    });

    it('should return empty array when no products', () => {
      const state: IProductState = initialProductState;

      const result = selectProducts.projector(state);

      expect(result).toEqual([]);
    });
  });

  describe('selectTotalProducts', () => {
    it('should count total products', () => {
      const result = selectTotalProducts.projector(mockProducts);

      expect(result).toBe(3);
    });

    it('should return 0 for empty products', () => {
      const result = selectTotalProducts.projector([]);

      expect(result).toBe(0);
    });
  });

  describe('selectTotalValue', () => {
    it('should calculate total value of all products', () => {
      const result = selectTotalValue.projector(mockProducts);

      // 29.99 + 499.99 + 5.99 = 535.97
      expect(result).toBeCloseTo(535.97, 2);
    });

    it('should return 0 for empty products', () => {
      const result = selectTotalValue.projector([]);

      expect(result).toBe(0);
    });
  });

  describe('selectLowStockProducts', () => {
    it('should count products with stock < 10', () => {
      const result = selectLowStockProducts.projector(mockProducts);

      // Products with stock < 10: id 2 (stock: 5), id 3 (stock: 0)
      expect(result).toBe(2);
    });

    it('should return 0 when no low stock products', () => {
      const result = selectLowStockProducts.projector([mockProducts[0]]);

      expect(result).toBe(0);
    });
  });

  describe('selectSelectedProduct', () => {
    it('should select the selected product', () => {
      const state: IProductState = {
        ...initialProductState,
        selectedProduct: mockProducts[0],
      };

      const result = selectSelectedProduct.projector(state);

      expect(result).toEqual(mockProducts[0]);
    });

    it('should return null when no product selected', () => {
      const state: IProductState = initialProductState;

      const result = selectSelectedProduct.projector(state);

      expect(result).toBeNull();
    });
  });

  describe('selectFilters', () => {
    it('should select filters from state', () => {
      const state: IProductState = {
        ...initialProductState,
        filters: { category: 'Coffee', minPrice: 20 },
      };

      const result = selectFilters.projector(state);

      expect(result).toEqual({ category: 'Coffee', minPrice: 20 });
    });

    it('should return empty object when no filters', () => {
      const state: IProductState = initialProductState;

      const result = selectFilters.projector(state);

      expect(result).toEqual({});
    });
  });

  describe('selectFilteredProducts', () => {
    it('should return all products when no filters', () => {
      const result = selectFilteredProducts.projector(mockProducts, {});

      expect(result).toEqual(mockProducts);
    });

    it('should filter by category', () => {
      const filters = { category: 'Coffee' };

      const result = selectFilteredProducts.projector(mockProducts, filters);

      expect(result.length).toBe(1);
      expect(result[0].id).toBe('1');
    });

    it('should filter by minPrice', () => {
      const filters = { minPrice: 100 };

      const result = selectFilteredProducts.projector(mockProducts, filters);

      expect(result.length).toBe(1);
      expect(result[0].id).toBe('2');
    });

    it('should filter by maxPrice', () => {
      const filters = { maxPrice: 50 };

      const result = selectFilteredProducts.projector(mockProducts, filters);

      expect(result.length).toBe(2);
      expect(result.map((p) => p.id)).toEqual(['1', '3']);
    });

    it('should filter by search term in name', () => {
      const filters = { search: 'Coffee' };

      const result = selectFilteredProducts.projector(mockProducts, filters);

      expect(result.length).toBe(2);
      expect(result.map((p) => p.id)).toEqual(['1', '3']);
    });

    it('should filter by search term in description', () => {
      const filters = { search: 'espresso' };

      const result = selectFilteredProducts.projector(mockProducts, filters);

      expect(result.length).toBe(1);
      expect(result[0].id).toBe('2');
    });

    it('should filter by inStock', () => {
      const filters = { inStock: true };

      const result = selectFilteredProducts.projector(mockProducts, filters);

      expect(result.length).toBe(2);
      expect(result.map((p) => p.id)).toEqual(['1', '2']);
    });

    it('should combine multiple filters', () => {
      const filters = { category: 'Coffee', minPrice: 10 };

      const result = selectFilteredProducts.projector(mockProducts, filters);

      expect(result.length).toBe(1);
      expect(result[0].id).toBe('1');
    });

    it('should return empty array when filters exclude all products', () => {
      const filters = { minPrice: 1000 };

      const result = selectFilteredProducts.projector(mockProducts, filters);

      expect(result).toEqual([]);
    });

    it('should handle undefined filters', () => {
      const result = selectFilteredProducts.projector(mockProducts, undefined);

      expect(result).toEqual(mockProducts);
    });
  });

  describe('selectFilteredProductCount', () => {
    it('should count filtered products', () => {
      const result = selectFilteredProductCount.projector([mockProducts[0], mockProducts[1]]);

      expect(result).toBe(2);
    });

    it('should return 0 for empty filtered products', () => {
      const result = selectFilteredProductCount.projector([]);

      expect(result).toBe(0);
    });
  });

  describe('selectLoading', () => {
    it('should select loading state', () => {
      const state: IProductState = {
        ...initialProductState,
        loading: 'loading',
      };

      const result = selectLoading.projector(state);

      expect(result).toBe('loading');
    });

    it('should return success when loaded', () => {
      const state: IProductState = {
        ...initialProductState,
        loading: 'success',
      };

      const result = selectLoading.projector(state);

      expect(result).toBe('success');
    });
  });

  describe('selectIsLoading', () => {
    it('should return true when loading', () => {
      const result = selectIsLoading.projector('loading');

      expect(result).toBe(true);
    });

    it('should return false when not loading', () => {
      const result = selectIsLoading.projector('success');

      expect(result).toBe(false);
    });

    it('should return false when error', () => {
      const result = selectIsLoading.projector('error');

      expect(result).toBe(false);
    });
  });

  describe('selectError', () => {
    it('should select error state', () => {
      const state: IProductState = {
        ...initialProductState,
        error: 'Failed to load',
      };

      const result = selectError.projector(state);

      expect(result).toBe('Failed to load');
    });

    it('should return null when no error', () => {
      const state: IProductState = initialProductState;

      const result = selectError.projector(state);

      expect(result).toBeNull();
    });
  });

  describe('selectHasError', () => {
    it('should return true when there is an error', () => {
      const result = selectHasError.projector('Error message');

      expect(result).toBe(true);
    });

    it('should return false when no error', () => {
      const result = selectHasError.projector(null);

      expect(result).toBe(false);
    });
  });

  describe('selectProductState', () => {
    it('should select the entire product state', () => {
      const state: IProductState = {
        ...initialProductState,
        products: mockProducts,
      };

      const result = selectProductState.projector(state);

      expect(result).toEqual(state);
    });
  });
});
