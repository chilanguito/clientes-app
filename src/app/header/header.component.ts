import { Component } from '@angular/core';
import { AuthService } from '../usuario/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  title: string = 'App Angular'

  constructor(private authService: AuthService, private router: Router) { }


  logout(): void {
    this.authService.logout();
    swal('Logout', `Hola ${this.authService.usuario.username},has cerrado sesión con éxito`,'success');
    this.router.navigate(['/login']);
  }
}
