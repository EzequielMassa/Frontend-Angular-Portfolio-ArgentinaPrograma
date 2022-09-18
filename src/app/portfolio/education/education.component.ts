import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { slideInUpAnimation } from 'angular-animations';
import { ToastrService } from 'ngx-toastr';
import { Education } from 'src/app/model/Education.model';
import { EducationService } from 'src/app/service/education.service';
import { TokenService } from 'src/app/service/token.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent implements OnInit {
  public educations: Education[] = [];
  public newEducation: Education = new Education();
  nombreUsuario: string;
  isLogged = false;
  userId: number;
  eduData: any;
  formEdu: FormGroup;
  formEduEdit: FormGroup;

  url_education_img_default: string = '../../../assets/images/ap-img.webp';
  constructor(
    private tokenService: TokenService,
    private userService: UsuarioService,
    private ruta: ActivatedRoute,
    public eduServ: EducationService,
    public modalService: NgbModal,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private toastr: ToastrService
  ) {
    this.nombreUsuario = this.tokenService.getUserName();
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.getUserId();
    } else {
      this.isLogged = false;
    }

    if (this.ruta.snapshot.params['userName']) {
      this.getEducations();
    }
  }

  public getUserId(): void {
    this.userService.getUsuario(this.tokenService.getUserName()).subscribe({
      next: (response: any) => {
        this.userId = response.id;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public getEducations(): void {
    this.userService
      .getUsuario(this.ruta.snapshot.params['userName'])
      .subscribe({
        next: (response: any) => {
          response.usuarioInfo.educations.forEach((edu) => {
            let education = new Education(
              edu.idEdu,
              edu.institucion,
              edu.titulo,
              edu.fecha_inicio,
              edu.fecha_fin,
              edu.url_institucion_img
            );

            this.educations.push(education);
          });
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        },
      });
  }

  public crearEducation(): void {
    if (this.formEdu.valid) {
      this.newEducation.setInstitucion(this.formEdu.get('institucion').value);
      this.newEducation.setTitulo(this.formEdu.get('titulo').value);

      this.newEducation.setFecha_inicio(
        this.datePipe.transform(
          this.formEdu.get('fechaInicio').value,
          'yyyy-MM-dd'
        )
      );

      this.newEducation.setFecha_fin(
        this.datePipe.transform(
          this.formEdu.get('fechaFin').value,
          'yyyy-MM-dd'
        )
      );

      this.newEducation.setUrl_institucion_img(
        this.formEdu.get('urlImgEdu').value
      );

      this.eduServ.crearEducation(this.userId, this.newEducation).subscribe({
        next: (response: any) => {
          this.educations = [];
          this.getEducations();
          this.toastr.success('Successfully update!');
          this.modalService.dismissAll();
        },
        error: (err) => {
          this.toastr.error('Something went wrong please try again!');
        },
      });
    }
  }

  public eliminarEdu(eduData): void {
    const dataValue = this.eduData.getAttribute('data-id');
    this.eduServ.borrarEducation(dataValue).subscribe({
      next: (response: void) => {
        this.educations = [];
        this.getEducations();
        this.toastr.success('Successfully deleted!');
        this.modalService.dismissAll();
      },
      error: (err) => {
        this.toastr.error('Something went wrong please try again!');
      },
    });
  }

  public openEduModal(popupContent, eduData): void {
    this.eduData = eduData;
    this.modalService.open(popupContent, { centered: true });
  }

  public obtenerEdu(contenidoEdit, eduData): void {
    const dataValue = eduData.getAttribute('data-id');

    this.eduServ.obtenerEducation(dataValue).subscribe({
      next: (response: any) => {
        this.newEducation.setId(response.idEdu);
        this.newEducation.setInstitucion(response.institucion);
        this.newEducation.setTitulo(response.titulo);
        this.newEducation.setUrl_institucion_img(response.url_institucion_img);
        this.newEducation.setFecha_inicio(response.fecha_inicio);

        this.newEducation.setFecha_fin(response.fecha_fin);

        this.formEduEdit = this.formBuilder.group({
          institucionEdit: [
            this.newEducation.getInstitucion(),
            [
              Validators.required,
              Validators.maxLength(50),
              Validators.minLength(4),
            ],
          ],
          tituloEdit: [
            this.newEducation.getTitulo(),
            [
              Validators.required,
              Validators.maxLength(50),
              Validators.minLength(4),
            ],
          ],
          fechaInicioEdit: [
            this.newEducation.getFecha_inicio(),

            [Validators.required],
          ],
          fechaFinEdit: [
            this.newEducation.getFecha_fin(),

            [Validators.required],
          ],

          urlImgEduEdit: [this.newEducation.getUrl_institucion_img(), []],
        });
        this.modalService.open(contenidoEdit, { centered: true });
      },
    });
  }

  public modificarEducation(): void {
    if (this.formEduEdit.valid) {
      this.newEducation.setInstitucion(
        this.formEduEdit.get('institucionEdit').value
      );
      this.newEducation.setTitulo(this.formEduEdit.get('tituloEdit').value);
      this.newEducation.setFecha_inicio(
        this.datePipe.transform(
          this.formEduEdit.get('fechaInicioEdit').value,
          'yyyy-MM-dd'
        )
      );
      this.newEducation.setFecha_fin(
        this.datePipe.transform(
          this.formEduEdit.get('fechaFinEdit').value,
          'yyyy-MM-dd'
        )
      );

      this.newEducation.setUrl_institucion_img(
        this.formEduEdit.get('urlImgEduEdit').value
      );
      this.eduServ
        .modificarEducation(this.newEducation.getId(), this.newEducation)
        .subscribe({
          next: (response: any) => {
            this.educations = [];
            this.getEducations();
            this.toastr.success('Successfully update!');
            this.modalService.dismissAll();
          },
          error: (err) => {
            this.toastr.error('Something went wrong please try again!');
          },
        });
    }
  }

  crearEduForm(content) {
    this.formEdu = this.formBuilder.group({
      institucion: [
        ' ',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(4),
        ],
      ],
      titulo: [
        ' ',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(4),
        ],
      ],
      fechaInicio: [null, [Validators.required]],
      fechaFin: [null, [Validators.required]],

      urlImgEdu: [' ', []],
    });
    this.modalService.open(content, { centered: true });
  }

  get institucion() {
    return this.formEdu.get('institucion');
  }

  get titulo() {
    return this.formEdu.get('titulo');
  }
  get fechaInicio() {
    return this.formEdu.get('fechaInicio');
  }
  get fechaFin() {
    return this.formEdu.get('fechaFin');
  }

  get urlImgEdu() {
    return this.formEdu.get('urlImgEdu');
  }

  get institucionEdit() {
    return this.formEduEdit.get('institucionEdit');
  }

  get tituloEdit() {
    return this.formEduEdit.get('tituloEdit');
  }
  get fechaInicioEdit() {
    return this.formEduEdit.get('fechaInicioEdit');
  }
  get fechaFinEdit() {
    return this.formEduEdit.get('fechaFinEdit');
  }
  get urlImgEduEdit() {
    return this.formEduEdit.get('urlImgEduEdit');
  }
}
