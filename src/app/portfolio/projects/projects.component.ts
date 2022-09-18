import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Project } from 'src/app/model/Project.model';
import { ProjectService } from 'src/app/service/project.service';
import { TokenService } from 'src/app/service/token.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  public projects: Project[] = [];
  public newProject: Project = new Project();
  isLogged = false;
  prjData: any;
  nombreUsuario: string;
  userId: number;
  projImg: string;
  formProj: FormGroup;
  formProjEdit: FormGroup;
  constructor(
    private tokenService: TokenService,
    private userService: UsuarioService,
    private ruta: ActivatedRoute,
    public projServ: ProjectService,
    public modalService: NgbModal,
    private formBuilder: FormBuilder,
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
      this.getProjects();
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

  public getProjects(): void {
    this.userService
      .getUsuario(this.ruta.snapshot.params['userName'])
      .subscribe({
        next: (response: any) => {
          response.usuarioInfo.projects.forEach((prj) => {
            let project = new Project(
              prj.idPrj,
              prj.nombre,
              prj.descripcion,
              prj.url_project,
              prj.imgProject
            );
            this.projects.push(project);
          });
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        },
      });
  }

  public crearProject(): void {
    if (this.formProj.valid) {
      this.newProject.setNombre(this.formProj.get('nombre').value);
      this.newProject.setDescripcion(this.formProj.get('descripcion').value);

      this.newProject.setUrl_project(this.formProj.get('urlProject').value);
      this.newProject.setImgProject(this.formProj.get('imgProject').value);

      this.projServ.crearProject(this.userId, this.newProject).subscribe({
        next: (response: any) => {
          this.projects = [];
          this.getProjects();
          this.toastr.success('Successfully update!');
          this.modalService.dismissAll();
        },
        error: (err) => {
          this.toastr.error('Something went wrong please try again!');
        },
      });
    }
  }

  public eliminarPrj(prjData): void {
    const dataValue = this.prjData.getAttribute('data-id');

    this.projServ.borrarProject(dataValue).subscribe({
      next: (response: void) => {
        this.projects = [];
        this.getProjects();
        this.toastr.success('Successfully deleted!');
        this.modalService.dismissAll();
      },
      error: (err) => {
        this.toastr.error('Something went wrong please try again!');
      },
    });
  }

  public openPrjModal(popupContent, prjData): void {
    this.prjData = prjData;
    this.modalService.open(popupContent, { centered: true });
  }

  public obtenerPrj(contenidoEdit, prjData): void {
    const dataValue = prjData.getAttribute('data-id');

    this.projServ.obtenerProject(dataValue).subscribe({
      next: (response: any) => {
        this.newProject.setId(response.idPrj);
        this.newProject.setNombre(response.nombre);
        this.newProject.setDescripcion(response.descripcion);
        this.newProject.setUrl_project(response.url_project);
        this.newProject.setImgProject(response.imgProject);

        this.formProjEdit = this.formBuilder.group({
          nombreEdit: [
            this.newProject.getNombre(),
            [
              Validators.required,
              Validators.maxLength(50),
              Validators.minLength(4),
            ],
          ],
          descripcionEdit: [
            this.newProject.getDescripcion(),
            [
              Validators.required,
              Validators.maxLength(800),
              Validators.minLength(4),
            ],
          ],
          urlProjectEdit: [
            this.newProject.getUrl_project(),
            [
              Validators.required,
              Validators.maxLength(200),
              Validators.minLength(4),
            ],
          ],
          imgProjectEdit: [
            this.newProject.getImgProject(),
            [Validators.maxLength(200)],
          ],
        });
        this.modalService.open(contenidoEdit, { centered: true });
      },
    });
  }

  public modificarProject(): void {
    if (this.formProjEdit.valid) {
      this.newProject.setNombre(this.formProjEdit.get('nombreEdit').value);
      this.newProject.setDescripcion(
        this.formProjEdit.get('descripcionEdit').value
      );

      this.newProject.setUrl_project(
        this.formProjEdit.get('urlProjectEdit').value
      );
      this.newProject.setImgProject(
        this.formProjEdit.get('imgProjectEdit').value
      );
      this.projServ
        .modificarProject(this.newProject.getId(), this.newProject)
        .subscribe({
          next: (response: any) => {
            this.projects = [];
            this.getProjects();
            this.toastr.success('Successfully update!');
            this.modalService.dismissAll();
          },
          error: (err) => {
            this.toastr.error('Something went wrong please try again!');
          },
        });
    }
  }

  crearPrjForm(content) {
    this.formProj = this.formBuilder.group({
      nombre: [
        ' ',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(4),
        ],
      ],
      descripcion: [
        ' ',
        [
          Validators.required,
          Validators.maxLength(800),
          Validators.minLength(4),
        ],
      ],
      urlProject: [
        ' ',
        [
          Validators.required,
          Validators.maxLength(200),
          Validators.minLength(4),
        ],
      ],
      imgProject: [' ', [Validators.maxLength(200)]],
    });
    this.modalService.open(content, { centered: true });
  }

  get nombre() {
    return this.formProj.get('nombre');
  }

  get descripcion() {
    return this.formProj.get('descripcion');
  }
  get urlProject() {
    return this.formProj.get('urlProject');
  }
  get imgProject() {
    return this.formProj.get('imgProject');
  }
  get nombreEdit() {
    return this.formProjEdit.get('nombreEdit');
  }

  get descripcionEdit() {
    return this.formProjEdit.get('descripcionEdit');
  }
  get urlProjectEdit() {
    return this.formProjEdit.get('urlProjectEdit');
  }

  get imgProjectEdit() {
    return this.formProjEdit.get('imgProjectEdit');
  }
}
