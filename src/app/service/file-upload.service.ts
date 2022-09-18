import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private apiServerUrl = 'https://ezequielmassabackendportfolio.herokuapp.com';
  //private apiServerUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  public uploadFile(
    id: number,

    file: FormData
  ): Observable<any> {
    return this.http.post<any>(
      `${this.apiServerUrl}/usuario/usuarioInfo/fileUpload/upload/db/${id}`,
      file
    );
  }

  public downloadFile(id: number): Observable<Blob> {
    return this.http.get<Blob>(
      `${this.apiServerUrl}/usuario/usuarioInfo/fileUpload/download/${id}`
    );
  }
}
