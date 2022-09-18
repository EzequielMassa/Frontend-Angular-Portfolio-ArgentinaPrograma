import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Skill } from 'src/app/model/Skill.model';
import { SkillService } from 'src/app/service/skill.service';
import { TokenService } from 'src/app/service/token.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements OnInit {
  public skills: Skill[] = [];
  public newSkill: Skill = new Skill();
  isLogged = false;
  sklData: any;
  nombreUsuario: string;
  userId: number;
  formSkill: FormGroup;
  formSkillEdit: FormGroup;
  constructor(
    private tokenService: TokenService,
    private userService: UsuarioService,
    private ruta: ActivatedRoute,
    public skillServ: SkillService,
    public modalService: NgbModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.getUserId();
    } else {
      this.isLogged = false;
    }
    if (this.ruta.snapshot.params['userName']) {
      this.getSkills();
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
  public getSkills(): void {
    this.userService
      .getUsuario(this.ruta.snapshot.params['userName'])
      .subscribe({
        next: (response: any) => {
          response.usuarioInfo.skills.forEach((skl) => {
            let skill = new Skill(skl.idSkill, skl.nombre, skl.avance);

            this.skills.push(skill);
          });
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        },
      });
  }

  public crearSkill(): void {
    if (this.formSkill.valid) {
      this.newSkill.setNombre(this.formSkill.get('nombre').value);
      this.newSkill.setAvance(parseFloat(this.formSkill.get('avance').value));

      this.skillServ.crearSkill(this.userId, this.newSkill).subscribe({
        next: (response: any) => {
          this.skills = [];
          this.getSkills();
          this.modalService.dismissAll();
          this.toastr.success('Successfully update!');
        },
        error: (err) => {
          this.toastr.error('Something went wrong please try again!');
        },
      });
    }
  }

  public eliminarSkill(sklData): void {
    const dataValue = this.sklData.getAttribute('data-id');

    this.skillServ.borrarSkill(dataValue).subscribe({
      next: (response: void) => {
        this.skills = [];
        this.getSkills();
        this.modalService.dismissAll();
        this.toastr.success('Successfully deleted!');
      },
      error: (err) => {
        this.toastr.error('Something went wrong please try again!');
      },
    });
  }

  public openSklModal(popupContent, sklData): void {
    this.sklData = sklData;
    this.modalService.open(popupContent, { centered: true });
  }

  public obtenerSkill(contenidoEdit, sklData): void {
    const dataValue = sklData.getAttribute('data-id');

    this.skillServ.obtenerSkill(dataValue).subscribe({
      next: (response: any) => {
        this.newSkill.setId(response.idSkill);
        this.newSkill.setNombre(response.nombre);
        this.newSkill.setAvance(response.avance);

        this.formSkillEdit = this.formBuilder.group({
          nombreEdit: [
            this.newSkill.getNombre(),
            [
              Validators.required,
              Validators.maxLength(50),
              Validators.minLength(3),
            ],
          ],
          avanceEdit: [this.newSkill.getAvance(), [Validators.required]],
        });
        this.modalService.open(contenidoEdit, { centered: true });
      },
    });
  }

  public modificarSkill(): void {
    if (this.formSkillEdit.valid) {
      this.newSkill.setNombre(this.formSkillEdit.get('nombreEdit').value);
      this.newSkill.setAvance(
        parseFloat(this.formSkillEdit.get('avanceEdit').value)
      );

      this.skillServ
        .modificarSkill(this.newSkill.getId(), this.newSkill)
        .subscribe({
          next: (response: any) => {
            this.skills = [];
            this.getSkills();
            this.modalService.dismissAll();
            this.toastr.success('Successfully update!');
          },
          error: (err) => {
            this.toastr.error('Something went wrong please try again!');
          },
        });
    }
  }

  crearSkillForm(content) {
    this.formSkill = this.formBuilder.group({
      nombre: [
        ' ',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(3),
        ],
      ],
      avance: ['0', [Validators.required]],
    });
    this.modalService.open(content, { centered: true });
  }

  get nombre() {
    return this.formSkill.get('nombre');
  }

  get avance() {
    return this.formSkill.get('avance');
  }

  get nombreEdit() {
    return this.formSkillEdit.get('nombreEdit');
  }

  get avanceEdit() {
    return this.formSkillEdit.get('avanceEdit');
  }
}
