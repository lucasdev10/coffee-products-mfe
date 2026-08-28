import { Routes } from '@angular/router';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    children: [
      // Placeholder routes - will be populated in task 4.5
      {
        path: '',
        component: null as any, // Will be ProductListPage
      },
      {
        path: ':id',
        component: null as any, // Will be ProductDetailPage
      },
      {
        path: 'new',
        component: null as any, // Will be ProductCreatePage
      },
    ],
  },
];
