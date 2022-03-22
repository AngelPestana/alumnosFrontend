import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Estudiante } from '../models/Estudiante';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  url: string = 'http://localhost:8080/api/estudiantes/edit';

  constructor(private http: HttpClient) { }

  getEstudiantes () {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
        //Siempre especificar el tipo de autorizacion
      })
    };
    return this.http.get(this.url, httpOptions);
  }

  getEstudiante(id: string) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
        //Siempre especificar el tipo de autorizacion
      })
    };
    return this.http.get(this.url + '/' + id, httpOptions);
  }
}

