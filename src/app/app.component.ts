import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {

  }

  // go to url in browser in another tab
  goToUrl(url: string) {
    window.open(url, '_blank');
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: "smooth" });

  }
}
