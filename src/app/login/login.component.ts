import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { fadeInDownOnEnterAnimation } from 'angular-animations';
import { LoginUsuario } from '../model/LoginUsuario.model';
import { NuevoUsuario } from '../model/NuevoUsuario.model';

import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [fadeInDownOnEnterAnimation()],
})
export class LoginComponent implements OnInit {
  isLogged = false;
  isLogginFail = false;
  loginUsuario: LoginUsuario;
  nombreUsuario: string;
  password!: string;
  roles: string[] = [];
  errMsj: string = '';

  form: FormGroup;
  formUser: FormGroup;
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    public modalService: NgbModal,
    private ruta: Router
  ) {
    this.form = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(4)]],
      pass: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLogginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  get userName() {
    return this.form.get('userName');
  }

  get pass() {
    return this.form.get('pass');
  }

  public onLogin(): void {
    if (this.form.valid) {
      this.nombreUsuario = this.form.get('userName').value;
      this.password = this.form.get('pass').value;
      this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);

      this.authService.login(this.loginUsuario).subscribe(
        (data) => {
          this.isLogged = true;
          this.isLogginFail = false;
          this.tokenService.setToken(data.token);
          this.tokenService.setUserName(data.nombreUsuario);
          this.tokenService.setAuthorities(data.authorities);
          this.roles = data.authorities;
          this.ruta.navigate([`${this.tokenService.getUserName()}`]);
        },
        (err) => {
          this.isLogged = false;
          this.isLogginFail = true;
          this.errMsj = 'Credenciales Incorrectas';
        }
      );
    }
  }
  openVerticallyCentered(contenido) {
    this.formUser = this.formBuilder.group({
      newUserName: ['', [Validators.required]],
      newPass: ['', [Validators.required, Validators.minLength(8)]],
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
    });
    this.modalService.open(contenido, { centered: true });
  }
  get nombre() {
    return this.formUser.get('nombre');
  }
  get newUserName() {
    return this.formUser.get('newUserName');
  }
  get email() {
    return this.formUser.get('email');
  }
  get newPass() {
    return this.formUser.get('newPass');
  }

  public crearUsuario(): void {
    if (this.formUser.valid) {
      let newUser = new NuevoUsuario();
      newUser.setNombre(this.formUser.get('nombre').value);
      newUser.setNombreUsuario(this.formUser.get('newUserName').value);
      newUser.setEmail(this.formUser.get('email').value);
      newUser.setPassword(this.formUser.get('newPass').value);

      this.authService.nuevo(newUser).subscribe((data) => {
        this.modalService.dismissAll();
      });
    }
  }
}
