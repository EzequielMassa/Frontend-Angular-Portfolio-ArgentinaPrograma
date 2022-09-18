import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Education } from '../model/Education.model';

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  private apiServerUrl = 'https://ezequielmassabackendportfolio.herokuapp.com';
  //private apiServerUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  public obtenerEducation(educationId: number): Observable<Education> {
    return this.http.get<Education>(
      `${this.apiServerUrl}/usuario/usuarioInfo/education/ver/id/${educationId}`
    );
  }

  public crearEducation(
    id: number,
    education: Education
  ): Observable<Education> {
    return this.http.post<Education>(
      `${this.apiServerUrl}/usuario/usuarioInfo/education/crear/${id}`,
      education
    );
  }

  public modificarEducation(id: number, education: Education): Observable<any> {
    return this.http.put<any>(
      `${this.apiServerUrl}/usuario/usuarioInfo/education/editar/education/${id}`,
      education
    );
  }

  public borrarEducation(educationId: number): Observable<any> {
    return this.http.delete<any>(
      `${this.apiServerUrl}/usuario/usuarioInfo/education/borrar/${educationId}`
    );
  }
}
