import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Experiencia } from 'src/app/model/Experiencia.model';
import { ExperienciaTipo } from 'src/app/model/ExperienciaTipo.model';
import { ExperienceTypeService } from 'src/app/service/experience-type.service';
import { ExperienceService } from 'src/app/service/experience.service';
import { TokenService } from 'src/app/service/token.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent implements OnInit {
  public experiencias: Experiencia[] = [];
  public newExperience: Experiencia = new Experiencia();
  public tipoExperiencias: ExperienciaTipo[] = [];
  expTypeId: number;
  expData: any;
  nombreUsuario: string;

  isLogged = false;
  userId: number;
  formExp: FormGroup;
  formExpEdit: FormGroup;

  url_empresa_img_default: string = '../../../assets/images/ap-img.webp';

  constructor(
    private tokenService: TokenService,
    private userService: UsuarioService,
    private ruta: ActivatedRoute,
    public expServ: ExperienceService,
    public expTypeServ: ExperienceTypeService,
    public modalService: NgbModal,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private toastr: ToastrService
  ) {
    this.expTypeServ.obtenerTiposExperiencia().subscribe((data) => {
      this.tipoExperiencias = data;
    });
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
      this.getExperiencias();
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
  public getExperiencias(): void {
    this.userService
      .getUsuario(this.ruta.snapshot.params['userName'])
      .subscribe({
        next: (response: any) => {
          response.usuarioInfo.experiencias.forEach((exp) => {
            let experiencia = new Experiencia(
              exp.idExp,
              exp.puesto,
              exp.empresa,
              exp.url_img_empresa,
              exp.fecha_inicio,
              exp.fecha_fin,
              exp.rol,
              exp.ubicacion
            );
            experiencia.setExpType(exp.expType);
            this.experiencias.push(experiencia);
          });
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        },
      });
  }

  public crearExperiencia(): void {
    if (this.formExp.valid) {
      this.newExperience.setPuesto(this.formExp.get('puesto').value);
      this.newExperience.setEmpresa(this.formExp.get('empresa').value);
      this.expTypeId = this.expTypeId = this.formExp.get('expTipo').value;

      this.newExperience.setFecha_inicio(
        this.datePipe.transform(
          this.formExp.get('fechaInicio').value,
          'yyyy-MM-dd'
        )
      );

      this.newExperience.setFecha_fin(
        this.datePipe.transform(
          this.formExp.get('fechaFin').value,
          'yyyy-MM-dd'
        )
      );

      this.newExperience.setRol(this.formExp.get('rol').value);

      this.newExperience.setUbicacion(this.formExp.get('ubicacion').value);

      this.newExperience.setUrl_img_empresa(
        this.formExp.get('urlImgEmp').value
      );

      this.expServ
        .crearExperiencia(this.userId, this.expTypeId, this.newExperience)
        .subscribe({
          next: (response: any) => {
            this.experiencias = [];
            this.getExperiencias();
            this.toastr.success('Successfully update!');
            this.modalService.dismissAll();
          },
          error: (err) => {
            this.toastr.error('Something went wrong please try again!');
          },
        });
    }
  }

  public eliminarExp(expData): void {
    const dataValue = this.expData.getAttribute('data-id');
    this.expServ.borrarExperiencia(dataValue).subscribe({
      next: (response: void) => {
        this.experiencias = [];
        this.getExperiencias();
        this.toastr.success('Successfully deleted!');
        this.modalService.dismissAll();
      },
      error: (err) => {
        this.toastr.error('Something went wrong please try again!');
      },
    });
  }

  public openExpModal(popupContent, expData): void {
    this.expData = expData;
    this.modalService.open(popupContent, { centered: true });
  }

  public obtenerExp(contenidoEdit, expData): void {
    const dataValue = expData.getAttribute('data-id');

    this.expServ.obtenerExperiencia(dataValue).subscribe({
      next: (response: any) => {
        this.newExperience.setId(response.idExp);
        this.newExperience.setPuesto(response.puesto);
        this.newExperience.setEmpresa(response.empresa);
        this.newExperience.setExpType(response.expType);
        this.newExperience.setUrl_img_empresa(response.url_img_empresa);
        this.newExperience.setFecha_inicio(response.fecha_inicio);

        this.newExperience.setFecha_fin(response.fecha_fin);

        this.newExperience.setRol(response.rol);
        this.newExperience.setUbicacion(response.ubicacion);

        this.formExpEdit = this.formBuilder.group({
          puestoEdit: [
            this.newExperience.getPuesto(),
            [
              Validators.required,
              Validators.maxLength(50),
              Validators.minLength(4),
            ],
          ],
          empresaEdit: [
            this.newExperience.getEmpresa(),
            [
              Validators.required,
              Validators.maxLength(50),
              Validators.minLength(4),
            ],
          ],
          expTipoEdit: ['', [Validators.required]],
          fechaInicioEdit: [
            this.newExperience.getFecha_inicio(),

            [Validators.required],
          ],
          fechaFinEdit: [
            this.newExperience.getFecha_fin(),

            [Validators.required],
          ],

          rolEdit: [
            this.newExperience.getRol(),
            [
              Validators.required,
              Validators.maxLength(600),
              Validators.minLength(4),
            ],
          ],
          ubicacionEdit: [
            this.newExperience.getUbicacion(),
            [
              Validators.required,
              Validators.maxLength(100),
              Validators.minLength(4),
            ],
          ],
          urlImgEmpEdit: [this.newExperience.getUrl_img_empresa(), []],
        });
        this.modalService.open(contenidoEdit, { centered: true });
      },
    });
  }

  public modificarExperiencia(): void {
    if (this.formExpEdit.valid) {
      this.newExperience.setPuesto(this.formExpEdit.get('puestoEdit').value);
      this.newExperience.setEmpresa(this.formExpEdit.get('empresaEdit').value);
      this.expTypeId = this.expTypeId =
        this.formExpEdit.get('expTipoEdit').value;
      this.newExperience.setFecha_inicio(
        this.datePipe.transform(
          this.formExpEdit.get('fechaInicioEdit').value,
          'yyyy-MM-dd'
        )
      );
      this.newExperience.setFecha_fin(
        this.datePipe.transform(
          this.formExpEdit.get('fechaFinEdit').value,
          'yyyy-MM-dd'
        )
      );

      this.newExperience.setRol(this.formExpEdit.get('rolEdit').value);

      this.newExperience.setUbicacion(
        this.formExpEdit.get('ubicacionEdit').value
      );

      this.newExperience.setUrl_img_empresa(
        this.formExpEdit.get('urlImgEmpEdit').value
      );
      this.expServ
        .modificarExperiencia(
          this.newExperience.getId(),
          this.expTypeId,
          this.newExperience
        )
        .subscribe({
          next: (response: any) => {
            this.experiencias = [];
            this.getExperiencias();
            this.toastr.success('Successfully update!');
            this.modalService.dismissAll();
          },
          error: (err) => {
            this.toastr.error('Something went wrong please try again!');
          },
        });
    }
  }

  crearExpForm(content) {
    this.formExp = this.formBuilder.group({
      puesto: [
        ' ',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(4),
        ],
      ],
      empresa: [
        ' ',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(4),
        ],
      ],
      expTipo: ['', [Validators.required]],
      fechaInicio: [null, [Validators.required]],
      fechaFin: [null, [Validators.required]],

      rol: [
        ' ',
        [
          Validators.required,
          Validators.maxLength(600),
          Validators.minLength(4),
        ],
      ],
      ubicacion: [
        ' ',
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.minLength(4),
        ],
      ],
      urlImgEmp: [' ', []],
    });

    this.modalService.open(content, { centered: true });
  }

  get puesto() {
    return this.formExp.get('puesto');
  }

  get empresa() {
    return this.formExp.get('empresa');
  }

  get expTipo() {
    return this.formExp.get('expTipo');
  }

  get fechaInicio() {
    return this.formExp.get('fechaInicio');
  }
  get fechaFin() {
    return this.formExp.get('fechaFin');
  }
  get rol() {
    return this.formExp.get('rol');
  }
  get ubicacion() {
    return this.formExp.get('ubicacion');
  }

  get urlImgEmp() {
    return this.formExp.get('urlImgEmp');
  }

  get puestoEdit() {
    return this.formExpEdit.get('puestoEdit');
  }

  get empresaEdit() {
    return this.formExpEdit.get('empresaEdit');
  }

  get expTipoEdit() {
    return this.formExpEdit.get('expTipoEdit');
  }
  get fechaInicioEdit() {
    return this.formExpEdit.get('fechaInicioEdit');
  }
  get fechaFinEdit() {
    return this.formExpEdit.get('fechaFinEdit');
  }
  get rolEdit() {
    return this.formExpEdit.get('rolEdit');
  }
  get ubicacionEdit() {
    return this.formExpEdit.get('ubicacionEdit');
  }
  get urlImgEmpEdit() {
    return this.formExpEdit.get('urlImgEmpEdit');
  }
}
