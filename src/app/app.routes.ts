import { Routes } from '@angular/router';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'product-details', component: ProductDetailsComponent },
    { path: 'cart', component: CartPageComponent }
  
];
