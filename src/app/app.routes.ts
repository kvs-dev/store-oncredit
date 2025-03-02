import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/products', 
    pathMatch: 'full' 
  },
  { 
    path: 'login', 
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) 
  },
  { 
    path: 'products', 
    loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: '**', 
    redirectTo: '/products' 
  }
];
