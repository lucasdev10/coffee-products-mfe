import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { IProduct } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  imports: [MatCardModule, CurrencyPipe, MatIconModule, MatButtonModule],
  template: `<mat-card
  class="product-card"
  appearance="outlined"
  role="article"
  [attr.aria-label]="'Product: ' + product().name"
>
  <div class="card-image" role="img" [attr.aria-label]="product().name + ' product image'">
    <img
      [src]="product().image"
      onerror="src = 'assets/images/coffee.jpg'"
      [alt]="product().name + ' - ' + product().description"
    />
    @if (product().stock > 5) {
      <span class="badge stock-status" role="status" aria-label="In stock"
        >In Stock ({{ product().stock }})</span
      >
    }
    @if (product().stock <= 5 && product().stock > 0) {
      <span class="badge low-stock" role="status" aria-label="Low stock warning">Low Stock</span>
    }
    @if (product().stock === 0) {
      <span class="badge out-of-stock" role="status" aria-label="Out of stock">Out of Stock</span>
    }
  </div>

  <mat-card-content>
    <div class="card-content-header">
      <div class="product-category" aria-label="Category">{{ product().category }}</div>
      <span
        class="product-rating"
        [attr.aria-label]="'Rating: ' + product().rating + ' out of 5 stars'"
      >
        <mat-icon aria-hidden="true">star</mat-icon>
        <span>{{ product().rating }}</span>
      </span>
    </div>
    <h3 class="product-name" id="product-name-{{ product().id }}">{{ product().name }}</h3>
    <p class="product-description" id="product-desc-{{ product().id }}">
      {{ product().description }}
    </p>
    <span></span>

    <div class="product-footer">
      <div
        class="product-price"
        role="text"
        [attr.aria-label]="'Price: ' + (product().price | currency)"
      >
        <span class="price-value" aria-hidden="true">{{ product().price | currency }}</span>
      </div>

      <button
        id="add-to-cart-button-{{ product().id }}"
        mat-raised-button
        color="primary"
        (click)="onAddToCart()"
        [disabled]="product().stock === 0"
        [attr.aria-label]="'Add ' + product().name + ' to cart'"
        [attr.aria-describedby]="'product-name-' + product().id + ' product-desc-' + product().id"
        tabindex="0"
      >
        <mat-icon aria-hidden="true">add_shopping_cart</mat-icon>
        <span>Add to Cart</span>
      </button>
    </div>
  </mat-card-content>
</mat-card>
`,
  styles: [`
    .product-card {
      height: 100%;
      display: flex;
      flex-direction: column;
      transition: all 0.3s ease;
      cursor: pointer;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      }

      mat-card-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 16px;
      }
    }

    .card-image {
      position: relative;
      width: 100%;
      height: 200px;
      overflow: hidden;
      background: var(--mat-sys-surface-container-highest);

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }

      &:hover img {
        transform: scale(1.05);
      }

      .badge {
        position: absolute;
        top: 12px;
        right: 12px;
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;

        &.stock-status {
          background: var(--mat-sys-primary);
          color: var(--mat-sys-surface-container-highest);
        }

        &.low-stock {
          background: var(--mat-sys-error-container);
          color: var(--mat-sys-on-error-container);
        }

        &.out-of-stock {
          background: var(--mat-sys-surface-variant);
          color: var(--mat-sys-on-surface-variant);
        }
      }
    }

    .card-content-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 8px;
    }

    .product-category {
      font-size: 12px;
      font-weight: 500;
      color: var(--mat-sys-primary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .product-rating {
      display: flex;
      align-items: center;
      font-size: 12px;
      font-weight: bold;

      mat-icon {
        font-size: 16px;
        color: #dede13;
        display: flex;
        align-items: center;
        width: 20px;
        height: 20px;
      }
    }

    .product-name {
      font-size: 18px;
      font-weight: 600;
      margin: 0 0 8px 0;
      color: var(--mat-sys-on-surface);
      line-height: 1.3;
    }

    .product-description {
      font-size: 14px;
      color: var(--mat-sys-on-surface-variant);
      margin: 0 0 16px 0;
      flex: 1;
      line-height: 1.5;
      display: -webkit-box;
      line-clamp: 2;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .product-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      margin-top: auto;
      padding-top: 16px;
      border-top: 1px solid var(--mat-sys-outline-variant);
    }

    .product-price {
      display: flex;
      flex-direction: column;
    }

    .price-value {
      font-size: 24px;
      font-weight: 700;
      color: var(--mat-sys-primary);
    }

    button {
      mat-icon {
        margin-right: 4px;
      }
    }
  `],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  // Inputs usando signal-based API
  product = input.required<IProduct>();

  // Outputs usando signal-based API
  addToCart = output<IProduct>();

  onAddToCart(): void {
    this.addToCart.emit(this.product());
  }
}
