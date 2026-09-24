import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ProductFacade } from './product.facade';
import { ProductActions } from '../product.actions';
import { initialProductState } from '../product.state';
import { vi } from 'vitest';

describe('ProductFacade', () => {
  let facade: ProductFacade;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductFacade, provideMockStore({ initialState: { product: initialProductState } })],
    });

    facade = TestBed.inject(ProductFacade);
    store = TestBed.inject(MockStore);
  });

  describe('Observable Selectors', () => {
    it('should have products$ observable', () => {
      return new Promise<void>((done) => {
        facade.products$.subscribe((products) => {
          expect(Array.isArray(products)).toBe(true);
          done();
        });
      });
    });

    it('should have filteredProducts$ observable', () => {
      return new Promise<void>((done) => {
        facade.filteredProducts$.subscribe((products) => {
          expect(Array.isArray(products)).toBe(true);
          done();
        });
      });
    });

    it('should have isLoading$ observable', () => {
      return new Promise<void>((done) => {
        facade.isLoading$.subscribe((loading) => {
          expect(typeof loading).toBe('boolean');
          done();
        });
      });
    });

    it('should have error$ observable', () => {
      return new Promise<void>((done) => {
        facade.error$.subscribe((error) => {
          expect(error === null || typeof error === 'string').toBe(true);
          done();
        });
      });
    });

    it('should have selectedProduct$ observable', () => {
      return new Promise<void>((done) => {
        facade.selectedProduct$.subscribe((product) => {
          expect(product === null || typeof product === 'object').toBe(true);
          done();
        });
      });
    });

    it('should have totalProducts$ observable', () => {
      return new Promise<void>((done) => {
        facade.totalProducts$.subscribe((count) => {
          expect(typeof count).toBe('number');
          done();
        });
      });
    });

    it('should have totalValue$ observable', () => {
      return new Promise<void>((done) => {
        facade.totalValue$.subscribe((value) => {
          expect(typeof value).toBe('number');
          done();
        });
      });
    });

    it('should have lowStockProducts$ observable', () => {
      return new Promise<void>((done) => {
        facade.lowStockProducts$.subscribe((count) => {
          expect(typeof count).toBe('number');
          done();
        });
      });
    });

    it('should have productWithLoading$ observable', () => {
      return new Promise<void>((done) => {
        facade.productWithLoading$.subscribe((data) => {
          expect(data).toBeDefined();
          expect(data.product === null || typeof data.product === 'object').toBe(true);
          expect(typeof data.isLoading).toBe('boolean');
          done();
        });
      });
    });
  });

  describe('loadProducts', () => {
    it('should dispatch loadProducts action', () => {
      const dispatchSpy = vi.spyOn(store, 'dispatch');

      facade.loadProducts();

      expect(dispatchSpy).toHaveBeenCalled();
      const action = dispatchSpy.mock.calls[0][0];
      expect(action.type).toBe(ProductActions.loadProducts.type);
    });
  });

  describe('loadProductById', () => {
    it('should dispatch loadProductById action with id', () => {
      const dispatchSpy = vi.spyOn(store, 'dispatch');

      facade.loadProductById('123');

      expect(dispatchSpy).toHaveBeenCalled();
      const action = dispatchSpy.mock.calls[0][0];
      expect(action.type).toBe(ProductActions.loadProductById.type);
      expect(action.id).toBe('123');
    });
  });

  describe('createProduct', () => {
    it('should dispatch createProduct action with product data', () => {
      const dispatchSpy = vi.spyOn(store, 'dispatch');
      const newProduct = {
        name: 'New Product',
        description: 'Test product',
        price: 29.99,
        image: '/image.jpg',
        category: 'Coffee',
        stock: 50,
      };

      facade.createProduct(newProduct);

      expect(dispatchSpy).toHaveBeenCalled();
      const action = dispatchSpy.mock.calls[0][0];
      expect(action.type).toBe(ProductActions.createProduct.type);
      expect(action.product).toEqual(newProduct);
    });
  });

  describe('updateProduct', () => {
    it('should dispatch updateProduct action with id and product data', () => {
      const dispatchSpy = vi.spyOn(store, 'dispatch');
      const updateData = {
        name: 'Updated Product',
        price: 39.99,
      };

      facade.updateProduct('123', updateData);

      expect(dispatchSpy).toHaveBeenCalled();
      const action = dispatchSpy.mock.calls[0][0];
      expect(action.type).toBe(ProductActions.updateProduct.type);
      expect(action.id).toBe('123');
      expect(action.product).toEqual(updateData);
    });
  });

  describe('deleteProduct', () => {
    it('should dispatch deleteProduct action with id', () => {
      const dispatchSpy = vi.spyOn(store, 'dispatch');

      facade.deleteProduct('123');

      expect(dispatchSpy).toHaveBeenCalled();
      const action = dispatchSpy.mock.calls[0][0];
      expect(action.type).toBe(ProductActions.deleteProduct.type);
      expect(action.id).toBe('123');
    });
  });

  describe('setFilters', () => {
    it('should dispatch setProductFilters action with filters', () => {
      const dispatchSpy = vi.spyOn(store, 'dispatch');
      const filters = { category: 'Coffee', minPrice: 20 };

      facade.setFilters(filters);

      expect(dispatchSpy).toHaveBeenCalled();
      const action = dispatchSpy.mock.calls[0][0];
      expect(action.type).toBe(ProductActions.setProductFilters.type);
      expect(action.filters).toEqual(filters);
    });

    it('should handle empty filters', () => {
      const dispatchSpy = vi.spyOn(store, 'dispatch');
      const filters = {};

      facade.setFilters(filters);

      expect(dispatchSpy).toHaveBeenCalled();
      const action = dispatchSpy.mock.calls[0][0];
      expect(action.filters).toEqual({});
    });
  });

  describe('Facade Integration', () => {
    it('should have all required methods', () => {
      expect(typeof facade.loadProducts).toBe('function');
      expect(typeof facade.loadProductById).toBe('function');
      expect(typeof facade.createProduct).toBe('function');
      expect(typeof facade.updateProduct).toBe('function');
      expect(typeof facade.deleteProduct).toBe('function');
      expect(typeof facade.setFilters).toBe('function');
    });

    it('should emit observable streams', () => {
      expect(facade.products$).toBeDefined();
      expect(facade.filteredProducts$).toBeDefined();
      expect(facade.isLoading$).toBeDefined();
      expect(facade.error$).toBeDefined();
      expect(facade.selectedProduct$).toBeDefined();
    });
  });
});
