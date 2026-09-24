import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ICreateProductDto } from '../../models/product.model';
import { ProductFacade } from '../../store';

@Component({
  selector: 'app-product-create-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
  ],
  template: `<div class="product-create-container" role="main" aria-label="Create new product">
  <div class="page-header">
    <h1 class="page-title">Create New Product</h1>
    <p class="page-description">Add a new product to the catalog</p>
  </div>

  @if (isLoading$ | async) {
    <div class="loading-container" role="status" aria-live="polite" aria-busy="true">
      <mat-spinner aria-label="Creating product"></mat-spinner>
      <p>Creating product...</p>
    </div>
  } @else {
    <form [formGroup]="productForm" (ngSubmit)="onSubmit()" class="product-form" novalidate>
      <div class="form-grid">
        <div class="form-field">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Product Name</mat-label>
            <input matInput formControlName="name" type="text" required aria-label="Product name" />
            @if (productForm.get('name')?.hasError('required') && productForm.get('name')?.touched) {
              <mat-error>Product name is required</mat-error>
            }
          </mat-form-field>
        </div>

        <div class="form-field">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>SKU</mat-label>
            <input matInput formControlName="sku" type="text" required aria-label="Stock keeping unit" />
            @if (productForm.get('sku')?.hasError('required') && productForm.get('sku')?.touched) {
              <mat-error>SKU is required</mat-error>
            }
          </mat-form-field>
        </div>

        <div class="form-field full-width">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Description</mat-label>
            <textarea matInput formControlName="description" rows="4" required aria-label="Product description"></textarea>
            @if (productForm.get('description')?.hasError('required') && productForm.get('description')?.touched) {
              <mat-error>Description is required</mat-error>
            }
          </mat-form-field>
        </div>

        <div class="form-field">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Price</mat-label>
            <input matInput formControlName="price" type="number" min="0" step="0.01" required aria-label="Product price" />
            @if (productForm.get('price')?.hasError('required') && productForm.get('price')?.touched) {
              <mat-error>Price is required</mat-error>
            }
            @if (productForm.get('price')?.hasError('min') && productForm.get('price')?.touched) {
              <mat-error>Price must be greater than 0</mat-error>
            }
          </mat-form-field>
        </div>

        <div class="form-field">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Stock Quantity</mat-label>
            <input matInput formControlName="stockQuantity" type="number" min="0" required aria-label="Stock quantity" />
            @if (productForm.get('stockQuantity')?.hasError('required') && productForm.get('stockQuantity')?.touched) {
              <mat-error>Stock quantity is required</mat-error>
            }
            @if (productForm.get('stockQuantity')?.hasError('min') && productForm.get('stockQuantity')?.touched) {
              <mat-error>Stock quantity cannot be negative</mat-error>
            }
          </mat-form-field>
        </div>

        <div class="form-field">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Category</mat-label>
            <mat-select formControlName="category" required aria-label="Product category">
              <mat-option value="">Select a category</mat-option>
              <mat-option value="arabica">Arabica</mat-option>
              <mat-option value="robusta">Robusta</mat-option>
              <mat-option value="blend">Blend</mat-option>
            </mat-select>
            @if (productForm.get('category')?.hasError('required') && productForm.get('category')?.touched) {
              <mat-error>Category is required</mat-error>
            }
          </mat-form-field>
        </div>

        <div class="form-field">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Roast Level</mat-label>
            <mat-select formControlName="roastLevel" required aria-label="Roast level">
              <mat-option value="">Select roast level</mat-option>
              <mat-option value="light">Light</mat-option>
              <mat-option value="medium">Medium</mat-option>
              <mat-option value="dark">Dark</mat-option>
            </mat-select>
            @if (productForm.get('roastLevel')?.hasError('required') && productForm.get('roastLevel')?.touched) {
              <mat-error>Roast level is required</mat-error>
            }
          </mat-form-field>
        </div>

        <div class="form-field">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Origin</mat-label>
            <input matInput formControlName="origin" type="text" aria-label="Product origin" />
          </mat-form-field>
        </div>

        <div class="form-field full-width">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Flavor Notes</mat-label>
            <input matInput formControlName="flavorNotes" type="text" aria-label="Flavor notes" />
          </mat-form-field>
        </div>
      </div>

      <div class="form-actions">
        <button mat-raised-button color="primary" type="submit" [disabled]="isLoading$ | async" aria-label="Create product">
          Create Product
        </button>
        <button mat-stroked-button type="button" (click)="onCancel()" aria-label="Cancel">
          Cancel
        </button>
      </div>

      @if ((error$ | async) as error) {
        <div class="error-container" role="alert" aria-live="assertive">
          <p class="error-message">{{ error }}</p>
        </div>
      }
    </form>
  }
</div>
`,
  styles: [`
    .product-create-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 32px 24px;
    }

    .page-header {
      margin-bottom: 32px;

      .page-title {
        margin: 0 0 8px 0;
        font-size: 28px;
        font-weight: 700;
        color: var(--mat-sys-on-surface);
      }

      .page-description {
        margin: 0;
        color: var(--mat-sys-on-surface-variant);
        font-size: 16px;
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

    .product-form {
      background: var(--mat-sys-surface);
      border-radius: 12px;
      padding: 32px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
      margin-bottom: 32px;
    }

    .form-field {
      &.full-width {
        grid-column: 1 / -1;
      }
    }

    .full-width {
      width: 100%;
    }

    .form-actions {
      display: flex;
      gap: 12px;
      justify-content: flex-start;

      @media (max-width: 480px) {
        flex-direction: column;

        button {
          width: 100%;
        }
      }
    }

    .error-container {
      margin-top: 24px;
      padding: 16px;
      background: var(--mat-sys-error-container);
      border-radius: 8px;

      .error-message {
        margin: 0;
        color: var(--mat-sys-on-error-container);
      }
    }
  `],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCreatePageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly productFacade = inject(ProductFacade);

  readonly isLoading$ = this.productFacade.isLoading$;
  readonly error$ = this.productFacade.error$;

  productForm!: FormGroup;

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      sku: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      stockQuantity: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      roastLevel: ['', Validators.required],
      origin: [''],
      flavorNotes: [''],
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const product: ICreateProductDto = this.productForm.value;
      this.productFacade.createProduct(product);
      // TODO: Handle success response and navigate back
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.productForm.controls).forEach(key => {
        this.productForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/products']);
  }
}
