import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlumnosService } from '../../services/alumnos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  formulario: any;
  formulario2: any;
  mensajeEspere: any;
  res = null;

  constructor(private as: AlumnosService) { }

  ngOnInit(): void {
    this.primerformularioReactivo();
    this.segundoformularioReactivo();
  }

  espere () {
    this.mensajeEspere = Swal.fire({
      text: 'Por favor espere...',
      imageUrl: '../../../assets/gif/loading2.gif',
      imageWidth: 100,
      imageHeight: 100,
      imageAlt: 'Custom image',
      showConfirmButton: false,
      allowOutsideClick: false
    });
  }

  primerformularioReactivo() {
    this.formulario = new FormGroup({
      no_control: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(10),
        Validators.pattern('[0-9]{9,10}')
      ])
    });
  }

  segundoformularioReactivo() {
    this.formulario2 = new FormGroup({
      no_control2: new FormControl({
        value: '',
        disabled: true
      }),
      nombre: new FormControl({
        value: '',
        disabled: true
      }),
      apellidos: new FormControl({
        value: '',
        disabled: true
      }),
      fecha_nacimiento: new FormControl({
        value: '',
        disabled: true
      }),
      semestre_actual: new FormControl({
        value: '',
        disabled: true
      }),
      carrera: new FormControl({
        value: '',
        disabled: true
      }),
      especialidad: new FormControl({
        value: '',
        disabled: true
      }),
      edad: new FormControl({
        value: '',
        disabled: true
      })
    });
  }

  buscar() {
    this.espere();
    let no_control = this.formulario.get('no_control').value;
    console.log(no_control);
    this.as.getEstudiante(no_control).subscribe((res :any) => {
      let estudiante = res;
      this.res = estudiante;
      console.log(res);
      this.pasandoDatos(estudiante);
      this.cerrarLoading();
    }, (err) => {
      console.log(err);
      this.cerrarLoading();
      this.res = null;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se encontro el alumno!'
      });
    });

  }

  cerrarLoading() {
    setTimeout(() => {//para detener el loading
      //console.log(this.loading);
      this.mensajeEspere.close();
    }, 500);
  }

  pasandoDatos(estudiante :any) {
    //console.log(estudiante);
    this.formulario2.patchValue({
      no_control2: estudiante.no_control,
      nombre: estudiante.nombre,
      apellidos: estudiante.apellidos,
      fecha_nacimiento: estudiante.fecha_nacimiento,
      semestre_actual: estudiante.semestre_actual,
      carrera: estudiante.carrera,
      especialidad: estudiante.especialidad,
      edad: estudiante.edad
    });
  }

}
