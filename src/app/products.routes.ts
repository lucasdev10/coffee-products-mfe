import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductListPageComponent, ProductDetailPageComponent, ProductCreatePageComponent } from './pages';

/**
 * PRODUCT_ROUTES defines the routes for the Products MFE.
 * These routes are exposed via Module Federation as './Routes'.
 *
 * The routes are configured as follows:
 * - '' (empty path): ProductListPage - displays all products
 * - ':id': ProductDetailPage - displays details for a specific product
 * - 'new': ProductCreatePage - form to create a new product
 *
 * The global Store is injected to provide access to authentication and cart state
 * from the Shell App for components that need it.
 *
 * Validates: Requirements 2.6, 2.12
 * - Requirement 2.6: Exposes product routes via Module Federation
 * - Requirement 2.12: Consumes the shared Store for auth and cart state
 */
export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ProductListPageComponent,
        data: {
          title: 'Products',
          description: 'Browse our coffee product catalog',
        },
      },
      {
        path: 'new',
        component: ProductCreatePageComponent,
        data: {
          title: 'Create Product',
          description: 'Add a new product to the catalog',
        },
      },
      {
        path: ':id',
        component: ProductDetailPageComponent,
        data: {
          title: 'Product Details',
          description: 'View product details and add to cart',
        },
      },
    ],
    providers: [
      // Inject the global Store so child components can access auth and cart state
      {
        provide: Store,
        useFactory: () => inject(Store),
      },
    ],
  },
];
