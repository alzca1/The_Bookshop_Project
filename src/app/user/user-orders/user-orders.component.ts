import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css'],
})
export class UserOrdersComponent implements OnInit {
  constructor(private ordersService: OrdersService) {}
  loadedOrders = []; 
  ngOnInit(): void {
    this.onGetOrders();
  }

  onGetOrders() {
    this.ordersService.loadedOrders
    this.ordersService
      .getOrders()
      .subscribe((response) => console.log(response));
    this.ordersService.loaderOrdersChanged.subscribe((orders) => {
      this.loadedOrders = orders.sort((a, b)=> {
        const date1 = new Date(b.orderDate).getTime(); 
        const date2 = new Date(a.orderDate).getTime()
        return date1 - date2;  
      })
  
      console.log(this.loadedOrders);
    });
  }

  getTotal(order){
    const reducer = order.reduce((accumulator, currentValue )=> accumulator + currentValue);
    return reducer; 
  }

  getStatus(){
    
  }
}
