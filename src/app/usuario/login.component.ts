import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  titulo : string ='Por favor sign In!';

  constructor() { }

  ngOnInit() {
  }

}
