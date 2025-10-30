import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private storageKey = 'cartItems';
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();


  constructor() {
    this.updateCartCount();

   }
   private updateCartCount() {
    const totalCount = this.getCartItems().reduce((sum, item: any) => sum + item.quantity, 0);
    this.cartCountSubject.next(totalCount);
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof sessionStorage !== 'undefined';
    // return typeof sessionStorage !== 'undefined';
  }

  getCartItems(): any[] {
    if (this.isBrowser()) {
      const items = sessionStorage.getItem(this.storageKey);
      return items ? JSON.parse(items) : [];
    }
    return [];
  }

  addToCart(product: any) {
    if (!this.isBrowser()) return;

    const items = this.getCartItems();
    const existing = items.find((item: any) => item.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      items.push({ ...product, quantity: 1 });
    }
    sessionStorage.setItem(this.storageKey, JSON.stringify(items));
    this.updateCartCount();

  }

  // updateQuantity(id: string, quantity: number) {
  //   const items = this.getCartItems().map((item: any) => {
  //     if (item.id === id) item.quantity = quantity;
  //     return item;
  //   });
  //   sessionStorage.setItem(this.storageKey, JSON.stringify(items));
  // }
  incrementQuantity(id: string) {
    const items = this.getCartItems().map((item: any) => {
      if (item.id === id) item.quantity++;
      return item;
    });
    sessionStorage.setItem(this.storageKey, JSON.stringify(items));
    this.updateCartCount();

  }

  decrementQuantity(id: string) {
    const items = this.getCartItems().map((item: any) => {
      if (item.id === id && item.quantity > 1) {
        item.quantity--;
      }
      return item;
    });
    sessionStorage.setItem(this.storageKey, JSON.stringify(items));
    this.updateCartCount();

  }

  removeFromCart(id: string) {
    const items = this.getCartItems().filter((item: any) => item.id !== id);
    sessionStorage.setItem(this.storageKey, JSON.stringify(items));
    this.updateCartCount();

  }

  clearCart() {
    if (this.isBrowser()) {
      sessionStorage.removeItem(this.storageKey);
      this.updateCartCount();

    }
  }

  
}
