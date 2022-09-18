import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDto } from '../model/JwtDto.model';
import { LoginUsuario } from '../model/LoginUsuario.model';
import { NuevoUsuario } from '../model/NuevoUsuario.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiServerUrl = 'https://ezequielmassabackendportfolio.herokuapp.com';
  //private apiServerUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {}

  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any> {
    return this.httpClient.post<any>(
      `${this.apiServerUrl}/auth/nuevo`,
      nuevoUsuario
    );
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDto> {
    return this.httpClient.post<JwtDto>(
      `${this.apiServerUrl}/auth/login`,
      loginUsuario
    );
  }
}
