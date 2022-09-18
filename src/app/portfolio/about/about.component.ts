import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Acerca } from 'src/app/model/Acerca.model';
import { AboutService } from 'src/app/service/about.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenService } from 'src/app/service/token.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  public acerca: Acerca;
  public acercaEdit: Acerca = new Acerca();
  nombreUsuario: string;
  isLogged = false;

  formAbout: FormGroup;
  constructor(
    private tokenService: TokenService,
    private userService: UsuarioService,
    public aboutService: AboutService,
    private ruta: ActivatedRoute,
    public modalService: NgbModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.nombreUsuario = this.tokenService.getUserName();
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }

    if (this.ruta.snapshot.params['userName']) {
      this.getAbout();
    }
  }

  public getAbout(): void {
    this.userService
      .getUsuario(this.ruta.snapshot.params['userName'])
      .subscribe({
        next: (response: any) => {
          this.acerca = new Acerca();
          this.acerca.setId(response.usuarioInfo.acerca.idAbout);
          this.acerca.setDescripcion(response.usuarioInfo.acerca.descripcion);
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        },
      });
  }

  public modificarAcerca(): void {
    if (this.formAbout.valid) {
      this.acerca.setDescripcion(this.formAbout.get('about').value);
      this.aboutService
        .modificarAcerca(this.acerca.getId(), this.acerca)
        .subscribe({
          next: (response: any) => {
            this.getAbout();
            this.toastr.success('Successfully update!');
            this.modalService.dismissAll();
          },
          error: (err) => {
            this.toastr.error('Something went wrong please try again!');
          },
        });
    }
  }

  openVerticallyCentered(content) {
    this.formAbout = this.formBuilder.group({
      about: [
        this.acerca.getDescripcion(),
        [
          Validators.required,
          Validators.maxLength(600),
          Validators.minLength(4),
        ],
      ],
    });
    this.modalService.open(content, { centered: true });
  }

  get about() {
    return this.formAbout.get('about');
  }
}
