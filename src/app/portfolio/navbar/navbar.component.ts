import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLogged = false;
  toggle: boolean = false;
  nombreUsuario: string;
  constructor(
    private router: Router,
    private ruta: ActivatedRoute,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }

    if (this.ruta.snapshot.params['userName']) {
      this.nombreUsuario = this.ruta.snapshot.params['userName'];
    }
  }

  onLogout(): void {
    this.tokenService.logOut();
    window.location.reload();
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  openMobileMenu(event) {
    this.toggle = !this.toggle;
  }
}
