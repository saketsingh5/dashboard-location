import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sortby',
  templateUrl: './sortby.component.html',
  styleUrls: ['./sortby.component.scss']
})
export class SortbyComponent implements OnInit {
 
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() sendSortVal: EventEmitter<any> = new EventEmitter();
  sortvalue: any = null
  
  ngOnInit(): void {
    
  }

  resetAll(){
    this.sortvalue = null;
  }

  sortItem(val){
    this.sortvalue = val
  }

  apply(){
    this.sendSortVal.emit(this.sortvalue);
    this.closePopup();
  }

  closePopup(){
    this.close.emit()
  }
}
