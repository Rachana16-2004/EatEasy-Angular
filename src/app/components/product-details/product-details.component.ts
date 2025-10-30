import { CommonModule,Location  } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [FormsModule,RouterModule,CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  product: any = [];
  showMore = false;
  fullText = `Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id eslaborum. sunt in culpa qui officia deserunt mollit anim id est `;
  cartCount = 0;
  related_product = [
    { id: 1, name: 'Rosted Pizza ', price: 499, image: 'assets/pizza.webp',prod_qty: 2 ,quantity:1},
    { id: 2, name: 'Spicy Kabab', price: 450, image: 'assets/kabab.webp' ,prod_qty:4,quantity:1},
    { id: 3, name: 'Mutton Biryani', price: 600, image: 'assets/biryani.webp' ,quantity:1}
  ];
  constructor(private router: Router, private cartService: CartService,private location: Location) {}

  ngOnInit(): void {
    let state: any;

    // Safe way to get state from navigation or history
  if (this.router.getCurrentNavigation()?.extras?.state) {
    state = this.router.getCurrentNavigation()?.extras?.state;
  } else if (typeof window !== 'undefined') {
    state = history.state;
  }
    if (state && state[0]) {
      this.product = [state[0]];
    } else {
      this.router.navigate(['/']); // fallback if accessed directly
    }
    // this.updateCartCount();
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
    this.loadCart();
  }
  loadCart() {
    const cartItems = this.cartService.getCartItems();
  
    // Merge cart quantity into popularItems
    this.product = this.product.map((product:any) => {
      const cartItem = cartItems.find((item: any) => item.id === product.id);
      return {
        ...product,
        quantity: cartItem ? cartItem.quantity : 0
      };
    });
  }

  increaseQty(item: any, qty: number) {
    if(qty ==1 ){
      const items = {
        ...item,
        quantity: 1
      };
      this.cartService.addToCart(items);
      this.loadCart();
    }else if (qty <= item.prod_qty) {
      this.cartService.incrementQuantity(item.id);
      this.loadCart();
    }
  }
  
  decreaseQty(item: any,qty:number) {
    if(qty == 0){
      this.cartService.removeFromCart(item.id);
      this.loadCart();
    }
    this.cartService.decrementQuantity(item.id);
    this.loadCart();
  }
  addToCart() {
    const item = {
      ...this.product,
      quantity: 1
    };
    this.cartService.addToCart(item);
    this.loadCart();
    // this.updateCartCount();
    
  }
  // addToCart(item: any,qty:number) {
  //   if(qty <=item.prod_qty ){
  //   this.cartService.addToCart(item);
  //   this.loadCart();
  //   }
  //   // this.updateCartCount();
  
  // }
  
  // updateCartCount() {
  //   this.cartCount = this.cartService.getCartItems().length;
  // }

  
  get shortText() {
    return this.fullText.slice(0, 80);
  }

  get remainingText() {
    return this.fullText.slice(100);
  }

  toggleReadMore() {
    this.showMore = !this.showMore;
  }

  goBack() {
    this.location.back();
  }
  
  goForward() {
    this.location.forward();
  }
  
}
