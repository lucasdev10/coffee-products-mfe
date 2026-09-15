import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AppComponent } from './app/app.component';
import { productReducer, ProductEffects } from './app/store';

export const bootstrap = () =>
  bootstrapApplication(AppComponent, {
    providers: [
      provideAnimations(),
      provideHttpClient(),
      provideRouter([]),
      provideStore({
        product: productReducer,
      }),
      provideEffects(ProductEffects),
    ],
  }).catch((err) => console.error(err));
