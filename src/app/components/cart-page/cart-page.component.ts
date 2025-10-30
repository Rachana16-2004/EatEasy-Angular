import { CommonModule,Location  } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [FormsModule,RouterModule,CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent {
  cartItems:any = [];
  subtotal = 0;
  discount = 0;
  total = 0;
  cartCount = 0;

  constructor(private cartService: CartService,private location: Location) {}
  
  ngOnInit() {
    this.loadCart();
    // this.updateCartCount();
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }
  
  loadCart() {
    this.cartItems = this.cartService.getCartItems() || [];
    this.subtotal = this.cartItems.reduce((acc:any, item:any) => acc + item.price * item.quantity, 0);
    this.discount = 0; // fixed
    this.total = this.subtotal - this.discount;
  }
  
// updateCartCount() {
//   this.cartCount = this.cartService.getCartItems().length;
// }
  // update(item: any, qty: number) {
  //   if (qty < 1) return;
  //   if(qty <=item.prod_qty ){
  //     this.cartService.updateQuantity(item.id, qty);
  //     this.loadCart();
  //   }
  // }
  increaseQty(item: any, qty: number) {
    if (qty <= item.prod_qty) {
      this.cartService.incrementQuantity(item.id);
      this.loadCart();
    }
  }
  
  decreaseQty(item: any,qty:number) {
    // if(qty == 0){
    //   this.remove(item.id);
    // }
    this.cartService.decrementQuantity(item.id);
    this.loadCart();
  }
  remove(id: any) {
    this.cartService.removeFromCart(id);
    this.loadCart();
  }
  
  buyNow() {
    let temp = this.cartService.getCartItems();

    const items = {
      ...temp,
      subtotal: this.subtotal,
      discount : this.discount,
      total : this.total
    };
    console.log(items);
    let a = JSON.stringify(items);
    console.log(a);
    let b = JSON.parse(a);
    console.log(b);
  }
  goBack() {
    this.location.back();
  }
  
  goForward() {
    this.location.forward();
  }
  
}
