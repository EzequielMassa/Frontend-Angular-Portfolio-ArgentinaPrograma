import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExperienciaTipo } from '../model/ExperienciaTipo.model';

@Injectable({
  providedIn: 'root',
})
export class ExperienceTypeService {
  private apiServerUrl = 'https://ezequielmassabackendportfolio.herokuapp.com';
  //private apiServerUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  public obtenerTiposExperiencia(): Observable<ExperienciaTipo[]> {
    return this.http.get<ExperienciaTipo[]>(
      `${this.apiServerUrl}/usuario/usuarioInfo/experiencia/tipos/ver`
    );
  }
}
