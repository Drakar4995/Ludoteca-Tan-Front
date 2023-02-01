import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', //Es el que linkea con el html y se pueden usar las variables de la clase
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Tutorial de Angular + Springboot';
}
