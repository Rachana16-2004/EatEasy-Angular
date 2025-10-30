import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-first-nav',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './first-nav.component.html',
  styleUrl: './first-nav.component.scss'
})
export class FirstNavComponent {
  cartCount = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
    }
    
  // updateCartCount() {
  //   this.cartCount = this.cartService.getCartItems().length;
  // }
}
