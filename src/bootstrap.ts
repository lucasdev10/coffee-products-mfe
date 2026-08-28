import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { AppComponent } from './app/app.component';

export const bootstrap = () =>
  bootstrapApplication(AppComponent, {
    providers: [
      provideAnimations(),
      provideRouter([]),
      provideStore({}),
    ],
  }).catch((err) => console.error(err));
