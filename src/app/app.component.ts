import { Component } from '@angular/core';
import { SPINNER } from 'ngx-ui-loader';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  SPINNER = SPINNER;
  title = 'personal-cv-front';
}
