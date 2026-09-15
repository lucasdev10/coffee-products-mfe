import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductCardComponent } from '../../components/product-card/product-card';
import { IProduct } from '../../models/product.model';
import { ProductFacade } from '../../store';

@Component({
  selector: 'app-product-list-page',
  imports: [ProductCardComponent, MatProgressSpinnerModule, AsyncPipe],
  template: `<div class="product-list-container" role="region" aria-label="Product catalog">
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
`,
  styles: [`
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

      p {
        color: var(--mat-sys-on-surface-variant);
      }
    }

    .error-container {
      padding: 24px;
      background: var(--mat-sys-error-container);
      border-radius: 12px;
      margin-bottom: 24px;

      .error-message {
        color: var(--mat-sys-on-error-container);
        margin: 0;
      }
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 24px;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }

    .empty-state {
      grid-column: 1 / -1;
      text-align: center;
      padding: 64px 24px;
      color: var(--mat-sys-on-surface-variant);
    }
  `],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListPageComponent implements OnInit {
  private readonly productFacade = inject(ProductFacade);

  readonly products$ = this.productFacade.filteredProducts$;
  readonly isLoading$ = this.productFacade.isLoading$;
  readonly error$ = this.productFacade.error$;

  ngOnInit(): void {
    this.productFacade.loadProducts();
  }

  onAddToCart(product: IProduct): void {
    // TODO: Implement cart functionality when Cart MFE is integrated
    console.log('Add to cart:', product);
  }
}
