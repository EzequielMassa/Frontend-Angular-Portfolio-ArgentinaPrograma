import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioInfo } from '../model/UsuarioInfo.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioInfoService {
  private apiServerUrl = 'https://ezequielmassabackendportfolio.herokuapp.com';
  //private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  public modificarUsuario(
    id: number,
    usuarioInfo: UsuarioInfo
  ): Observable<any> {
    return this.http.put<any>(
      `${this.apiServerUrl}/usuario/usuarioInfo/editar/${id}`,
      usuarioInfo
    );
  }
}
