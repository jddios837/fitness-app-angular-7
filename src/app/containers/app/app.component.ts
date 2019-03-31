import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      Hello Ultimate Angular!
      <div class="wrapper">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
