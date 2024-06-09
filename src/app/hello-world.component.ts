import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-hello-world',
  template: `<h1>Hello World <a [routerLink]="['/']">back</a></h1>`,
  imports: [ RouterLink ]
})
export class HellowWorldComponent {

}
