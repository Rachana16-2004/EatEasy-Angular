import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  cartCount = 0;
  popularItems = [
    { id: 1, name: 'Cheese Burger', price: 389.00, image: 'assets/cheese.webp', prod_qty: 1, quantity: 1 },
    { id: 2, name: 'Pannir Roll', price: 259.00, image: 'assets/kabab.webp', prod_qty: 4, quantity: 1 },
    { id: 3, name: 'Pizza', price: 599.00, image: 'assets/pizza.webp', prod_qty: 1, quantity: 1 },
    { id: 4, name: 'Ice Cream', price: 299.00, image: 'assets/icecream.webp', prod_qty: 4, quantity: 1 },
  ];

  searchTerm: string = '';
  originalPopularItems: any[] = [];
  drawerOpen = false;
  message: string = '';
  showToast: boolean = false;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.originalPopularItems = [...this.popularItems];
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
    this.loadCart();
  }

  addToCart(item: any, qty: number) {
    if (qty <= item.prod_qty) {
      this.cartService.addToCart(item);
      this.loadCart();
      this.displayMessage('Product added to cart');
    } else {
      this.displayMessage('Quantity limit reached');
    }
  }

  displayMessage(msg: string) {
    this.message = msg;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  loadCart() {
  const cartItems = this.cartService.getCartItems();

  // Always start from the original items
  this.popularItems = this.originalPopularItems.map(product => {
    const cartItem = cartItems.find((item: any) => item.id === product.id);
    return {
      ...product,
      quantity: cartItem ? cartItem.quantity : 1
    };
  });
}


  goToDetails(product: any) {
    this.router.navigate(['/product-details'], { state: [product] });
  }

  onSearchChange() {
    const term = this.searchTerm.trim().toLowerCase();

    if (term.length >= 3) {
      this.popularItems = this.originalPopularItems.filter(item =>
        item.name.toLowerCase().includes(term) || item.id.toString().includes(term)
      );
    } else {
      this.popularItems = [...this.originalPopularItems];
    }
  }

  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }

  navigateTo(route: string) {
    this.drawerOpen = false;
    this.router.navigate(['/' + route]);
  }
}
