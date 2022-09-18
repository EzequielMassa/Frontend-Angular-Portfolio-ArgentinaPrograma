import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experiencia } from '../model/Experiencia.model';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  private apiServerUrl = 'https://ezequielmassabackendportfolio.herokuapp.com';
  //private apiServerUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  public obtenerExperiencia(experienciaId: number): Observable<Experiencia> {
    return this.http.get<Experiencia>(
      `${this.apiServerUrl}/usuario/usuarioInfo/experiencia/ver/experiencia/id/${experienciaId}`
    );
  }

  public crearExperiencia(
    id: number,
    expTypeId: number,
    experiencia: Experiencia
  ): Observable<Experiencia> {
    return this.http.post<Experiencia>(
      `${this.apiServerUrl}/usuario/usuarioInfo/experiencia/crear/${id}/${expTypeId}`,
      experiencia
    );
  }

  public modificarExperiencia(
    id: number,
    expTypeId: number,
    experiencia: Experiencia
  ): Observable<any> {
    return this.http.put<any>(
      `${this.apiServerUrl}/usuario/usuarioInfo/experiencia/editar/experiencia/${id}/${expTypeId}`,
      experiencia
    );
  }

  public borrarExperiencia(experienciaId: number): Observable<any> {
    return this.http.delete<any>(
      `${this.apiServerUrl}/usuario/usuarioInfo/experiencia/borrar/experiencia/${experienciaId}`
    );
  }
}
