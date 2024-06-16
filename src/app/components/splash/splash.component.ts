import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {
  loadingTime: any;
  loadingPercentage = 0;
  time = 10;
  ngOnInit(): void {
    this.calculateLoadingPercentage();
  }

  calculateLoadingPercentage() {
    this.loadingTime = setInterval(() => {
      this.time !== this.loadingPercentage
        ? this.loadingPercentage++
        : this.navigate();
    }, 100);
  }

  navigate(){}
}
