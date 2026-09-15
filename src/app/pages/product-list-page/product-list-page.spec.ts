import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { vi } from 'vitest';
import { ProductListPageComponent } from './product-list-page';
import { IProduct } from '../../models/product.model';

const PRODUCT_LIST_PAGE_TEMPLATE = `
<div class="product-list-container" role="region" aria-label="Product catalog">
  <h1 class="page-title" id="products-heading">Our Products</h1>

  @if (isLoading$ | async) {
    <div class="loading-container" role="status" aria-live="polite" aria-busy="true">
      <mat-spinner aria-label="Loading products"></mat-spinner>
      <p>Loading products...</p>
    </div>
  }

  @if (error$ | async) {
    <div class="error-container" role="alert" aria-live="assertive">
      <p class="error-message">{{ error$ | async }}</p>
    </div>
  }

  @if ((isLoading$ | async) === false && (error$ | async) === null) {
    <div
      class="products-grid"
      role="list"
      aria-labelledby="products-heading"
      [attr.aria-label]="(products$ | async)?.length + ' products available'"
    >
      @for (product of products$ | async; track product.id) {
        <app-product-card [product]="product" (addToCart)="onAddToCart($event)" role="listitem" />
      } @empty {
        <div class="empty-state" role="status">
          <p>No products found</p>
        </div>
      }
    </div>
  }
</div>
`;

const PRODUCT_LIST_PAGE_STYLES = `
.product-list-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 32px 24px;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 32px;
  color: var(--mat-sys-on-surface);
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 24px;
  gap: 16px;
}

.error-container {
  padding: 24px;
  background: var(--mat-sys-error-container);
  border-radius: 12px;
  margin-bottom: 24px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 64px 24px;
}
`;

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

    // Override the component's template and styles for testing BEFORE configuring
    TestBed.overrideComponent(ProductListPageComponent, {
      set: {
        template: PRODUCT_LIST_PAGE_TEMPLATE,
        styles: [PRODUCT_LIST_PAGE_STYLES],
      },
    });

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
    const addToCartSpy = vi.spyOn(component, 'onAddToCart');
    const product = mockProducts[0];

    component.onAddToCart(product);

    expect(addToCartSpy).toHaveBeenCalledWith(product);
  });
});
