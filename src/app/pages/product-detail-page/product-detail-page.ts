import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IProduct } from '../../models/product.model';
import { ProductFacade } from '../../store';

@Component({
  selector: 'app-product-detail-page',
  imports: [AsyncPipe, CommonModule, MatButtonModule, MatProgressSpinnerModule],
  template: `<div class="product-detail-container" role="main" aria-label="Product details">
  <div class="product-detail-header">
    <a href="/products" class="back-link" aria-label="Back to products list">← Back to Products</a>
  </div>

  @if (isLoading$ | async) {
    <div class="loading-container" role="status" aria-live="polite" aria-busy="true">
      <mat-spinner aria-label="Loading product details"></mat-spinner>
      <p>Loading product details...</p>
    </div>
  } @else if (error$ | async) {
    <div class="error-container" role="alert" aria-live="assertive">
      <p class="error-message">{{ error$ | async }}</p>
    </div>
  } @else {
    <ng-container *ngIf="productWithLoading$ | async as product">
      @if (product.product) {
        <article class="product-detail" [attr.aria-labelledby]="'product-name-' + product.product.id">
          <header class="product-header">
            <h1 [id]="'product-name-' + product.product.id" class="product-name">
              {{ product.product.name }}
            </h1>
            <p class="product-sku">SKU: {{ product.product.sku }}</p>
          </header>

          <div class="product-info-grid">
            <div class="info-section">
              <h2 class="section-title">Description</h2>
              <p class="product-description">{{ product.product.description }}</p>
            </div>

            <div class="info-section">
              <h2 class="section-title">Price & Availability</h2>
              <div class="price-info">
                <span class="price" [attr.aria-label]="'Price: ' + (product.product.price | currency)">
                  {{ product.product.price | currency }}
                </span>
                <span
                  class="stock"
                  [class.in-stock]="product.product.stockQuantity > 0"
                  [class.out-of-stock]="product.product.stockQuantity === 0"
                  [attr.aria-label]="product.product.stockQuantity > 0 ? 'In stock' : 'Out of stock'"
                >
                  {{ product.product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock' }}
                </span>
              </div>
            </div>

            <div class="info-section">
              <h2 class="section-title">Product Details</h2>
              <dl class="details-list">
                <dt>Category:</dt>
                <dd>{{ product.product.category }}</dd>
                <dt>Roast Level:</dt>
                <dd>{{ product.product.roastLevel }}</dd>
                @if (product.product.origin) {
                  <dt>Origin:</dt>
                  <dd>{{ product.product.origin }}</dd>
                }
                @if (product.product.flavorNotes) {
                  <dt>Flavor Notes:</dt>
                  <dd>{{ product.product.flavorNotes }}</dd>
                }
              </dl>
            </div>
          </div>

          <div class="product-actions">
            <button
              mat-raised-button
              color="primary"
              (click)="onAddToCart(product.product)"
              [disabled]="product.product.stockQuantity === 0"
              aria-label="Add to cart"
            >
              Add to Cart
            </button>
          </div>
        </article>
      } @else {
        <div class="not-found-container" role="status">
          <p>Product not found</p>
        </div>
      }
    </ng-container>
  }
</div>
`,
  styles: [`
    .product-detail-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 32px 24px;
    }

    .product-detail-header {
      margin-bottom: 24px;

      .back-link {
        display: inline-block;
        padding: 8px 0;
        color: var(--mat-sys-primary);
        text-decoration: none;
        font-size: 14px;

        &:hover {
          text-decoration: underline;
        }
      }
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

    .product-detail {
      background: var(--mat-sys-surface);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .product-header {
      padding: 32px 24px;
      border-bottom: 1px solid var(--mat-sys-outline-variant);

      .product-name {
        margin: 0 0 8px 0;
        font-size: 28px;
        font-weight: 700;
        color: var(--mat-sys-on-surface);
      }

      .product-sku {
        margin: 0;
        color: var(--mat-sys-on-surface-variant);
        font-size: 12px;
      }
    }

    .product-info-grid {
      padding: 32px 24px;
      display: grid;
      gap: 32px;

      @media (max-width: 768px) {
        gap: 24px;
      }
    }

    .info-section {
      .section-title {
        margin: 0 0 16px 0;
        font-size: 16px;
        font-weight: 600;
        color: var(--mat-sys-on-surface);
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    .product-description {
      margin: 0;
      color: var(--mat-sys-on-surface-variant);
      line-height: 1.6;
    }

    .price-info {
      display: flex;
      align-items: center;
      gap: 16px;

      .price {
        font-size: 24px;
        font-weight: 700;
        color: var(--mat-sys-primary);
      }

      .stock {
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 600;

        &.in-stock {
          background: rgba(76, 175, 80, 0.2);
          color: rgb(76, 175, 80);
        }

        &.out-of-stock {
          background: rgba(244, 67, 54, 0.2);
          color: rgb(244, 67, 54);
        }
      }
    }

    .details-list {
      margin: 0;
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 12px 24px;

      dt {
        font-weight: 600;
        color: var(--mat-sys-on-surface);
      }

      dd {
        margin: 0;
        color: var(--mat-sys-on-surface-variant);
      }
    }

    .product-actions {
      padding: 24px;
      border-top: 1px solid var(--mat-sys-outline-variant);
      display: flex;
      gap: 12px;
    }

    .not-found-container {
      text-align: center;
      padding: 64px 24px;
      color: var(--mat-sys-on-surface-variant);
    }
  `],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailPageComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productFacade = inject(ProductFacade);

  readonly productWithLoading$ = this.productFacade.productWithLoading$;
  readonly isLoading$ = this.productFacade.isLoading$;
  readonly error$ = this.productFacade.error$;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.productFacade.loadProductById(params['id']);
      }
    });
  }

  onAddToCart(product: IProduct): void {
    // TODO: Implement cart functionality when Cart MFE is integrated
    console.log('Add to cart:', product);
  }
}
