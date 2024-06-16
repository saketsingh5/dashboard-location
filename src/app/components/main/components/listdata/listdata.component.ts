import { Component, OnInit } from '@angular/core';
import { DATA } from '@assets/constant/app.constant';

@Component({
  selector: 'app-listdata',
  templateUrl: './listdata.component.html',
  styleUrls: ['./listdata.component.scss']
})
export class ListdataComponent implements OnInit {

  listOfData = DATA;
  showSortBy:boolean = false
  searchText:string = ''
  ngOnInit(): void {
    
    console.log(this.searchText);
    
  }

  sortVal(val){
    switch (val) {
      case 'asc':
        this.listOfData.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'dsc':
        this.listOfData.sort((a, b) => b.name.localeCompare(a.name));
          break;  
      default:
        break;
    }
  }

  sort(){
     this.showSortBy = !this.showSortBy
  }

  search() {
    if (this.searchText.trim()) {
      this.listOfData = DATA.filter(item =>
        item.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.listOfData = DATA
    }
  }

  searchItem(){
    setTimeout(() => {
      this.search();
    }, 2000);
  }

  closeSortBy(){
    this.sort();
  }
}
