import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { vi } from 'vitest';
import { Observable } from 'rxjs';
import { ProductEffects } from './product.effects';
import { ProductRepository } from '../../repositories/product.repository';
import { ProductActions } from '../product.actions';
import { IProduct, ICreateProductDto, IUpdateProductDto } from '../../models/product.model';

describe('ProductEffects', () => {
  let effects: ProductEffects;
  let actions$: Observable<any>;
  let repository: ReturnType<typeof vi.spyOn> & ProductRepository;

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

  beforeEach(() => {
    const repositorySpy = {
      findAll: vi.fn(),
      findById: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        ProductEffects,
        provideMockActions(() => actions$),
        { provide: ProductRepository, useValue: repositorySpy },
      ],
    });

    effects = TestBed.inject(ProductEffects);
    repository = TestBed.inject(ProductRepository) as any;
  });

  describe('loadProducts$', () => {
    it('should be created', () => {
      expect(effects).toBeTruthy();
      expect(effects.loadProducts$).toBeTruthy();
    });
  });

  describe('loadProductById$', () => {
    it('should load product by id effect exists', () => {
      expect(effects.loadProductById$).toBeTruthy();
    });
  });

  describe('createProduct$', () => {
    it('should create product effect exists', () => {
      expect(effects.createProduct$).toBeTruthy();
    });
  });

  describe('updateProduct$', () => {
    it('should update product effect exists', () => {
      expect(effects.updateProduct$).toBeTruthy();
    });
  });

  describe('deleteProduct$', () => {
    it('should delete product effect exists', () => {
      expect(effects.deleteProduct$).toBeTruthy();
    });
  });
});

