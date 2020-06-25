import { Component, Input, Output, EventEmitter } from '@angular/core';
import {  } from 'protractor';

@Component({
    selector: 'app-message',
    templateUrl: './messageModal.component.html', 
    styleUrls: ['./messageModal.component.css']

})
export class MessageModalComponent {
 @Input () message: string;
 @Output() close = new EventEmitter<void>()


 onClose(){
     this.close.emit(); 
 }
}