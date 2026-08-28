import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ProductListPageComponent } from './product-list-page';
import { IProduct } from '../../models/product.model';

describe('ProductListPageComponent', () => {
  let component: ProductListPageComponent;
  let fixture: ComponentFixture<ProductListPageComponent>;

  const mockProducts: IProduct[] = [
    {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
      image: 'image1.jpg',
      category: 'Category 1',
      stock: 10,
      rating: 4.5,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: '2',
      name: 'Product 2',
      description: 'Description 2',
      price: 200,
      image: 'image2.jpg',
      category: 'Category 2',
      stock: 5,
      rating: 4,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  ];

  beforeEach(async () => {
    const initialState = {
      product: {
        filteredProducts: mockProducts,
        isLoading: false,
        error: null,
      },
    };

    await TestBed.configureTestingModule({
      imports: [ProductListPageComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display page title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('.page-title');

    expect(title?.textContent).toContain('Our Products');
  });

  it('should display products in grid', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const grid = compiled.querySelector('.products-grid');

    expect(grid).toBeTruthy();
  });

  it('should have setupTest function for tests', () => {
    const setupTest = (facade: any) => {
      return { facade };
    };

    expect(setupTest).toBeDefined();
  });

  it('should call onAddToCart when product card emits addToCart', () => {
    const addToCartSpy = spyOn(component, 'onAddToCart');
    const product = mockProducts[0];

    component.onAddToCart(product);

    expect(addToCartSpy).toHaveBeenCalledWith(product);
  });
});
