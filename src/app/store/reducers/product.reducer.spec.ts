import { productReducer } from './product.reducer';
import { ProductActions } from '../product.actions';
import { initialProductState, IProductState } from '../product.state';
import { IProduct, ICreateProductDto, IUpdateProductDto } from '../../models/product.model';

describe('ProductReducer', () => {
  const mockProduct: IProduct = {
    id: '1',
    name: 'Test Product',
    description: 'Test Description',
    price: 10.99,
    image: '/assets/coffee.jpg',
    category: 'Coffee',
    stock: 5,
    rating: 4.5,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  const mockProduct2: IProduct = {
    id: '2',
    name: 'Test Product 2',
    description: 'Test Description 2',
    price: 20.99,
    image: '/assets/coffee2.jpg',
    category: 'Coffee',
    stock: 10,
    rating: 4,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  describe('Load Products actions', () => {
    it('should set loading to loading on loadProducts', () => {
      const action = ProductActions.loadProducts();
      const result = productReducer(initialProductState, action);
      expect(result.loading).toBe('loading');
      expect(result.error).toBeNull();
    });

    it('should set products and loading to success on loadProductsSuccess', () => {
      const products = [mockProduct];
      const action = ProductActions.loadProductsSuccess({ products });
      const result = productReducer(initialProductState, action);
      expect(result.products).toEqual(products);
      expect(result.loading).toBe('success');
    });

    it('should set error and loading to error on loadProductsError', () => {
      const error = 'Test error';
      const action = ProductActions.loadProductsError({ error });
      const result = productReducer(initialProductState, action);
      expect(result.error).toBe(error);
      expect(result.loading).toBe('error');
    });
  });

  describe('Load Product By Id actions', () => {
    it('should set loading to loading on loadProductById', () => {
      const action = ProductActions.loadProductById({ id: '1' });
      const result = productReducer(initialProductState, action);
      expect(result.loading).toBe('loading');
      expect(result.error).toBeNull();
    });

    it('should set selectedProduct on loadProductByIdSuccess', () => {
      const action = ProductActions.loadProductByIdSuccess({ product: mockProduct });
      const result = productReducer(initialProductState, action);
      expect(result.selectedProduct).toEqual(mockProduct);
      expect(result.loading).toBe('success');
    });

    it('should set error on loadProductByIdError', () => {
      const error = 'Test error';
      const action = ProductActions.loadProductByIdError({ error });
      const result = productReducer(initialProductState, action);
      expect(result.error).toBe(error);
      expect(result.loading).toBe('error');
    });
  });

  describe('Create Product actions', () => {
    it('should set loading on createProduct', () => {
      const product: ICreateProductDto = {
        name: 'New Product',
        description: 'New Description',
        price: 15.99,
        image: '/assets/coffee.jpg',
        category: 'Coffee',
        stock: 20,
      };
      const action = ProductActions.createProduct({ product });
      const result = productReducer(initialProductState, action);
      expect(result.loading).toBe('loading');
    });

    it('should add product to list on createProductSuccess', () => {
      const action = ProductActions.createProductSuccess({ product: mockProduct });
      const result = productReducer(initialProductState, action);
      expect(result.products).toEqual([mockProduct]);
      expect(result.loading).toBe('success');
    });

    it('should set error on createProductError', () => {
      const error = 'Test error';
      const action = ProductActions.createProductError({ error });
      const result = productReducer(initialProductState, action);
      expect(result.error).toBe(error);
    });
  });

  describe('Update Product actions', () => {
    it('should update product in list on updateProductSuccess', () => {
      const state: IProductState = {
        ...initialProductState,
        products: [mockProduct],
      };
      const updatedProduct: IProduct = {
        ...mockProduct,
        name: 'Updated Product',
      };
      const action = ProductActions.updateProductSuccess({ product: updatedProduct });
      const result = productReducer(state, action);
      expect(result.products[0].name).toBe('Updated Product');
    });

    it('should update selectedProduct if it matches', () => {
      const state: IProductState = {
        ...initialProductState,
        products: [mockProduct],
        selectedProduct: mockProduct,
      };
      const updatedProduct: IProduct = {
        ...mockProduct,
        name: 'Updated Product',
      };
      const action = ProductActions.updateProductSuccess({ product: updatedProduct });
      const result = productReducer(state, action);
      expect(result.selectedProduct?.name).toBe('Updated Product');
    });
  });

  describe('Delete Product actions', () => {
    it('should remove product from list on deleteProductSuccess', () => {
      const state: IProductState = {
        ...initialProductState,
        products: [mockProduct, mockProduct2],
      };
      const action = ProductActions.deleteProductSuccess({ id: '1' });
      const result = productReducer(state, action);
      expect(result.products).toEqual([mockProduct2]);
    });

    it('should clear selectedProduct if it matches deleted id', () => {
      const state: IProductState = {
        ...initialProductState,
        products: [mockProduct],
        selectedProduct: mockProduct,
      };
      const action = ProductActions.deleteProductSuccess({ id: '1' });
      const result = productReducer(state, action);
      expect(result.selectedProduct).toBeNull();
    });
  });

  describe('Filter actions', () => {
    it('should set filters on setProductFilters', () => {
      const filters = { category: 'Coffee', minPrice: 10 };
      const action = ProductActions.setProductFilters({ filters });
      const result = productReducer(initialProductState, action);
      expect(result.filters.category).toBe('Coffee');
      expect(result.filters.minPrice).toBe(10);
    });

    it('should reset filters on cleanProductFilters', () => {
      const state: IProductState = {
        ...initialProductState,
        filters: { category: 'Coffee' },
      };
      const action = ProductActions.cleanProductFilters();
      const result = productReducer(state, action);
      expect(result.filters).toEqual({});
    });
  });
});
