# Coffee Products MFE

Products Micro Frontend for the CoffeeWorkshop application using Angular 21 and Webpack 5 Module Federation.

## Overview

This is a standalone Angular application that serves as the Products Micro Frontend (MFE) in the CoffeeWorkshop MFE architecture. It handles all product-related functionality including product listing, product details, and product creation (admin).

## Architecture

- **Framework**: Angular 21
- **Module Federation**: Webpack 5 Module Federation (remote)
- **Port**: 4201 (development)
- **State Management**: NgRx with global store synchronization
- **Shared Library**: coffee-shared-lib

## Prerequisites

- Node.js 18+ and npm 9+
- Angular CLI 21
- Access to coffee-shared-lib (installed as dependency)

## Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd coffee-products-mfe
npm install
```

## Development

### Start Development Server

```bash
npm start
```

The application will be available at `http://localhost:4201`

### Build

```bash
npm run build
```

Builds the project for production. Output is in the `dist/coffee-products-mfe` directory.

### Testing

Run unit tests:

```bash
npm test
```

Run tests with coverage:

```bash
npm run test:coverage
```

### Linting

```bash
npm run lint
```

## Module Federation Configuration

This MFE is configured as a **remote** in the Module Federation architecture:

- **Name**: `products`
- **Entry Point**: `/remoteEntry.js`
- **Exposed Module**: `./Routes` → `src/app/products.routes.ts`

### Shared Dependencies

The following dependencies are shared as singletons with the Shell App:

- @angular/core
- @angular/common
- @angular/router
- @angular/forms
- @angular/material
- @ngrx/store
- @ngrx/effects
- rxjs
- coffee-shared-lib

## Project Structure

```
src/
├── app/
│   ├── app.component.ts
│   ├── products.routes.ts
│   ├── components/          (ProductCard, ProductForm)
│   ├── pages/              (ProductListPage, ProductDetailPage, ProductCreatePage)
│   ├── repositories/       (ProductRepository)
│   └── store/              (ProductState, ProductActions, ProductSelectors, ProductEffects)
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
├── assets/
├── main.ts
├── bootstrap.ts
├── styles.scss
└── index.html
```

## Features

- Product listing with filtering
- Product detail view
- Product creation (admin only)
- Product store with NgRx
- Global state synchronization with Shell App
- Coffee-shared-lib integration

## Dependencies

### Production

- Angular 21.1.0
- Angular Material 21.1.5
- NgRx 21.0.1
- @angular-architects/module-federation 18.0.0
- coffee-shared-lib 1.0.0
- rxjs 7.8.0

### Development

- Angular DevKit 21.1.0
- Angular CLI 21.1.0
- TypeScript 5.5.0
- Karma 6.4.0
- Jasmine 5.1.0

## Integration with Shell App

This MFE is loaded by the Shell App through Module Federation. The Shell App handles:

- Routing to `/products`
- Loading this MFE remotely
- Providing shared dependencies
- Managing global auth and cart state
- Error handling and fallback UI

### Communication with Shell App

- **State**: Access global NgRx store for auth and cart state
- **Events**: Emit custom events via EventBusService
- **Services**: Access shared services from core

## Environment Configuration

### Development

- API URL: `http://localhost:3000/api`
- Shell URL: `http://localhost:4200`

### Production

- API URL: `https://api.coffeeworkshop.com/api`
- Shell URL: `https://coffeeworkshop.com`

Update `src/environments/environment.prod.ts` with production URLs.

## Troubleshooting

### MFE not loading in Shell App

1. Ensure the Products MFE is running on port 4201
2. Check browser console for network errors
3. Verify webpack.config.js is correctly configured
4. Check that coffee-shared-lib is installed

### Build issues

1. Clear node_modules: `rm -rf node_modules && npm install`
2. Clear Angular cache: `npm run ng serve -- --poll 2000`
3. Check TypeScript version compatibility

## Resources

- [Angular Documentation](https://angular.io/docs)
- [Module Federation Documentation](https://webpack.js.org/concepts/module-federation/)
- [NgRx Documentation](https://ngrx.io/docs)
- [CoffeeWorkshop MFE Architecture](../../docs/MFE_ARCHITECTURE.md)

## License

This project is part of CoffeeWorkshop and follows the same license.
