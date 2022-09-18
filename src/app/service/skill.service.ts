import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from '../model/Skill.model';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  private apiServerUrl = 'https://ezequielmassabackendportfolio.herokuapp.com';
  //private apiServerUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  public obtenerSkill(skillId: number): Observable<Skill> {
    return this.http.get<Skill>(
      `${this.apiServerUrl}/usuario/usuarioInfo/skill/ver/id/${skillId}`
    );
  }

  public crearSkill(id: number, skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(
      `${this.apiServerUrl}/usuario/usuarioInfo/skill/crear/${id}`,
      skill
    );
  }

  public modificarSkill(id: number, skill: Skill): Observable<any> {
    return this.http.put<any>(
      `${this.apiServerUrl}/usuario/usuarioInfo/skill/editar/skill/${id}`,
      skill
    );
  }

  public borrarSkill(skillId: number): Observable<any> {
    return this.http.delete<any>(
      `${this.apiServerUrl}/usuario/usuarioInfo/skill/borrar/${skillId}`
    );
  }
}
