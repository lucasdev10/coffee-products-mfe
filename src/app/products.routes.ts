import { Routes } from '@angular/router';
import { ProductListPageComponent } from './pages';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ProductListPageComponent,
      },
      // ProductDetailPage and ProductCreatePage will be added in future tasks
      // {
      //   path: ':id',
      //   component: ProductDetailPageComponent,
      // },
      // {
      //   path: 'new',
      //   component: ProductCreatePageComponent,
      // },
    ],
  },
];
