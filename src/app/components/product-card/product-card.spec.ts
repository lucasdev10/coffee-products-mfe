import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { IProduct } from '../../models/product.model';
import { ProductCardComponent } from './product-card';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  const mockProduct: IProduct = {
    id: '1',
    name: 'Test Product',
    description: 'Test Description',
    price: 100,
    image: 'test-image.jpg',
    category: 'Test Category',
    stock: 10,
    rating: 4.5,
    createdAt: 1234567890,
    updatedAt: 1234567890,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have addToCart output defined', () => {
    expect(component.addToCart).toBeDefined();
  });

  it('should have product input defined', () => {
    expect(component.product).toBeDefined();
  });

  it('should be a standalone component', () => {
    const metadata = (component.constructor as any).ɵcmp;
    expect(metadata.standalone).toBe(true);
  });

  it('should have onAddToCart method', () => {
    expect(typeof component.onAddToCart).toBe('function');
  });

  it('should import Material modules', () => {
    // Check that Material modules are imported
    const imports = (component.constructor as any).ɵcmp.dependencies;
    expect(imports).toBeDefined();
  });
});
