import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'chart-generator-frontend';
  deviceXs: boolean;
  mediaSub: Subscription;

  constructor(public mediaObserver: MediaObserver) {
    this.mediaSub = this.mediaObserver.asObservable().subscribe(
      (results: MediaChange[]) => {
        const xsResult = results.find(result => result.mqAlias === 'xs');
        this.deviceXs = ![null, undefined].includes(xsResult);
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }

}
