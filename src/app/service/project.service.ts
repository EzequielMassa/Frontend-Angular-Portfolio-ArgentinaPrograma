import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../model/Project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiServerUrl = 'https://ezequielmassabackendportfolio.herokuapp.com';
  //private apiServerUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  public obtenerProject(projectId: number): Observable<Project> {
    return this.http.get<Project>(
      `${this.apiServerUrl}/usuario/usuarioInfo/project/ver/id/${projectId}`
    );
  }

  public crearProject(id: number, project: Project): Observable<Project> {
    return this.http.post<Project>(
      `${this.apiServerUrl}/usuario/usuarioInfo/project/crear/${id}`,
      project
    );
  }

  public modificarProject(id: number, project: Project): Observable<any> {
    return this.http.put<any>(
      `${this.apiServerUrl}/usuario/usuarioInfo/project/editar/proyecto/${id}`,
      project
    );
  }

  public borrarProject(projectId: number): Observable<any> {
    return this.http.delete<any>(
      `${this.apiServerUrl}/usuario/usuarioInfo/project/borrar/${projectId}`
    );
  }
}
