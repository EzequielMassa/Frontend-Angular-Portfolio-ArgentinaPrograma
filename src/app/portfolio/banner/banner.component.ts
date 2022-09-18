import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioInfo } from 'src/app/model/UsuarioInfo.model';
import { HttpErrorResponse } from '@angular/common/http';
import { UsuarioInfoService } from 'src/app/service/usuarioInfo.service';
import { TokenService } from 'src/app/service/token.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { saveAs } from 'file-saver';
import { DataService } from 'src/app/service/data.service';
import { ToastrService } from 'ngx-toastr';
import {
  fadeInOnEnterAnimation,
  rubberBandOnEnterAnimation,
  zoomInRightOnEnterAnimation,
} from 'angular-animations';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    zoomInRightOnEnterAnimation(),
    fadeInOnEnterAnimation(),

    rubberBandOnEnterAnimation(),
  ],
})
export class BannerComponent implements OnInit {
  public usuarioInfo: UsuarioInfo;
  public usuarioInfoEdit: UsuarioInfo = new UsuarioInfo();
  nombreUsuario: string;
  imgBack: string = 'https://bit.ly/3RE39E1';
  imgProfile: string = 'https://bit.ly/3eiLWl1';
  fileCv: File = null;
  downloableCv: number;
  Useremail: string;
  isLogged = false;
  formBanner: FormGroup;
  formUpload: FormGroup;

  constructor(
    private tokenService: TokenService,
    private userService: UsuarioService,
    public usuarioInfoService: UsuarioInfoService,
    private fileUploadService: FileUploadService,
    private dataService: DataService,
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
      this.getUserInfo();
    }
  }

  public getUserInfo(): void {
    this.userService
      .getUsuario(this.ruta.snapshot.params['userName'])
      .subscribe({
        next: (response: any) => {
          this.usuarioInfo = new UsuarioInfo();
          this.usuarioInfo.setId(response.usuarioInfo.idInfo);
          this.usuarioInfo.setNombre(response.usuarioInfo.nombre);
          this.usuarioInfo.setApellido(response.usuarioInfo.apellido);
          this.usuarioInfo.setUbicacion(response.usuarioInfo.ubicacion);
          this.usuarioInfo.setOcupacion(response.usuarioInfo.ocupacion);
          this.usuarioInfo.setUrl_back_img(response.usuarioInfo.url_back_img);
          this.usuarioInfo.setUrl_prof_img(response.usuarioInfo.url_prof_img);
          this.imgBack = this.usuarioInfo.getUrl_back_img();
          this.imgProfile = this.usuarioInfo.getUrl_prof_img();
          this.downloableCv = response.usuarioInfo.file.fileId;

          this.Useremail = response.email;
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        },
      });
  }

  getDownloableCv() {
    this.exportPdf();
  }

  exportPdf() {
    this.dataService
      .export(this.downloableCv)
      .subscribe((data) => saveAs(data, `file`));
  }

  public modificarUsuario(): void {
    if (this.formBanner.valid) {
      this.usuarioInfoEdit.setId(this.usuarioInfo.getId());
      this.usuarioInfoEdit.setNombre(this.formBanner.get('name').value);
      this.usuarioInfoEdit.setApellido(this.formBanner.get('lastName').value);
      this.usuarioInfoEdit.setUbicacion(this.formBanner.get('location').value);
      this.usuarioInfoEdit.setOcupacion(this.formBanner.get('position').value);
      this.usuarioInfoEdit.setUrl_prof_img(
        this.formBanner.get('imgProf').value
      );
      this.usuarioInfoEdit.setUrl_back_img(this.formBanner.get('imgBg').value);
      this.usuarioInfoService
        .modificarUsuario(this.usuarioInfo.getId(), this.usuarioInfoEdit)
        .subscribe({
          next: (response: any) => {
            this.getUserInfo();
            this.toastr.success('Successfully update!');
            this.modalService.dismissAll();
          },
          error: (err) => {
            this.toastr.error('Something went wrong please try again!');
          },
        });
    }
  }

  handleFile(event): void {
    this.fileCv = event.target.files[0];
  }

  uploadCv(): void {
    const formData: FormData = new FormData();

    formData.append('file', this.fileCv);

    this.fileUploadService
      .uploadFile(this.usuarioInfo.getId(), formData)
      .subscribe({
        next: (response: any) => {
          this.toastr.success('Successfully update!');
          this.modalService.dismissAll();
          this.getUserInfo();
        },
        error: (err) => {
          this.toastr.error('Something went wrong please try again!');
        },
      });
  }

  openFileForm(fileContent) {
    this.formUpload = this.formBuilder.group({
      file: [null, []],
    });
    this.modalService.open(fileContent, { centered: true });
  }

  /* modal   */
  openVerticallyCentered(content) {
    this.formBanner = this.formBuilder.group({
      name: [
        this.usuarioInfo.getNombre(),
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.minLength(4),
        ],
      ],
      lastName: [
        this.usuarioInfo.getApellido(),
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.minLength(4),
        ],
      ],
      location: [
        this.usuarioInfo.getUbicacion(),
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.minLength(4),
        ],
      ],

      position: [
        this.usuarioInfo.getOcupacion(),
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.minLength(4),
        ],
      ],
      imgProf: [this.usuarioInfo.getUrl_prof_img()],
      imgBg: [this.usuarioInfo.getUrl_back_img()],
    });
    this.modalService.open(content, { centered: true });
  }
  get name() {
    return this.formBanner.get('name');
  }

  get lastName() {
    return this.formBanner.get('lastName');
  }
  get location() {
    return this.formBanner.get('location');
  }

  get position() {
    return this.formBanner.get('position');
  }
  get imgProf() {
    return this.formBanner.get('imgProf');
  }
  get imgBg() {
    return this.formBanner.get('imgBg');
  }

  get file() {
    return this.formUpload.get('file');
  }
}
