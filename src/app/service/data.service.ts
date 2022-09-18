import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiServerUrl = 'https://ezequielmassabackendportfolio.herokuapp.com';
  //private apiServerUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  export(id: number) {
    return this.http.get(
      `${this.apiServerUrl}/usuario/usuarioInfo/fileUpload/download/${id}`,
      { responseType: 'blob' }
    );
  }
}
