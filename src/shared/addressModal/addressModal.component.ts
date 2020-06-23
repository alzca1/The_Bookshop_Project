import { Component, OnInit, ViewChild, Output,EventEmitter } from '@angular/core';
import { UserDetailsService } from 'src/app/services/userDetails.service';
import { NgForm } from '@angular/forms';
import { CartComponent } from 'src/app/cart/cart.component';


@Component({
  selector: 'app-address',
  templateUrl: './addressModal.component.html',
  styleUrls: ['./addressModal.component.css'],
})
export class AddressModalComponent implements OnInit {
loadedDetails = [];
checked = false;
radio; 
@ViewChild('form', {static:true}) form: NgForm;
@Output() close = new EventEmitter<void>();
  constructor(private userDetailsService: UserDetailsService, private cartcomponent: CartComponent) {}
  ngOnInit() {
     
      this.userDetailsService.getUserDetails().subscribe( response => {
          console.log(response)
      });
    this.userDetailsService.loadedDetailsChanged.subscribe((response) => {
      this.loadedDetails = response;
      console.log(this.loadedDetails)
    });
  }

 onClose(){
     this.close.emit();
 }

 onSet(){
   this.cartcomponent.setAddress(this.radio);
   this.close.emit();
 }
}



