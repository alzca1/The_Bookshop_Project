import { Component, OnInit, ViewChild, Output,EventEmitter } from '@angular/core';
import { UserDetailsService } from 'src/app/services/userDetails.service';
import { NgForm } from '@angular/forms';


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
  constructor(private userDetailsService: UserDetailsService) {}
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
    console.log(this.radio);
    // this.onClose();
 }
}



