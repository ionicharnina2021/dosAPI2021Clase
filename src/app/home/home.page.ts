import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data:Datos;
  apiKey =
    '?api_key=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwcm9ncmFtYWhhcm5pbmEyMDEzQGdtYWlsLmNvbSIsImp0aSI6ImUyOWE2YWRlLTNkMWUtNGVlMC1iYzg2LThkZjkyM2Y0M2ExMiIsImlzcyI6IkFFTUVUIiwiaWF0IjoxNTgzMjYyMzU5LCJ1c2VySWQiOiJlMjlhNmFkZS0zZDFlLTRlZTAtYmM4Ni04ZGY5MjNmNDNhMTIiLCJyb2xlIjoiIn0.23ZucqLERXi86Dj4TOo-vmJpW0_zwY4Iwt2vy9SebPY';
  ruta =
    'https://opendata.aemet.es/opendata/api/prediccion/especifica/montaña/pasada/area';
  area = 'peu1';
  respuesta: Respuesta;
  constructor(public http: HttpClient) {}

  async dameTu(): Promise<string> {
    // Un observable que se convierte en promesa
    let valor;
    await this.http
      .get(this.getRuta(this.area))
      .toPromise()
      .then((dato) => {
        console.log('dentro de dame tu');
        valor = dato;
      });
    return new Promise((resolve) => {
      resolve(valor);
    });
  }

  async getDescripcion() {
    await this.http.get(this.respuesta.datos).toPromise().then((
      //  await this.http.get(this.data.metadatos).toPromise().then((
      d
    ) => {
      // Tener en cuenta que devuelve un array de obejtos
      this.data = d[0];
    });
  }
  async load() {
    console.log('respuesta ', this.respuesta);
    await this.dame().then( (respuesta)=>{
      this.respuesta=respuesta;
    });
  }
  dame(): Promise<Respuesta> {
    return new Promise((resolve, reject) => {
      // this.http.get(this.getRuta(this.area)).subscribe(
      this.http.get('https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/06114/'+this.apiKey).subscribe(
        (data) => {
          resolve(data as Respuesta);
        },
        (error) => {
          reject('nada ' + error.message);
        }
      );
    });
  }

  getRuta(area: string): string {
    const slash = '/';
    return this.ruta + slash + area + slash + this.apiKey;
  }
}
export interface Respuesta {
  descripcion: string;
  estado: number;
  datos: string;
  metadatos: string;
}

export interface Metadatos {
  unidad_generadora: string;
  periocidad: string;
  descripcion: string;
}

export interface Datos {
  id: string;
  nombre: string;
  origen: object;
  seccion: Explicacion[];
}
export interface Explicacion {
  apartado: object[];
  lugar: object[];
  nombre: string;
  parrafo: {
    texto: string;
  }[];
}
