import { ExperienciaTipo } from './ExperienciaTipo.model';

export class Experiencia {
  private id?: number;

  private puesto: string;
  private empresa: string;
  private url_img_empresa: string;
  private fecha_inicio: string;
  private fecha_fin: string;
  private rol: string;
  private ubicacion: string;
  private expTipo: ExperienciaTipo;

  constructor(
    id?: number,
    puesto?: string,
    empresa?: string,

    url_img_empresa?: string,
    fecha_inicio?: string,
    fecha_fin?: string,
    rol?: string,
    ubicacion?: string
  ) {
    this.id = id;
    this.puesto = puesto;
    this.empresa = empresa;
    this.url_img_empresa = url_img_empresa;
    this.fecha_inicio = fecha_inicio;
    this.fecha_fin = fecha_fin;
    this.rol = rol;
    this.ubicacion = ubicacion;
  }

  public getId(): number {
    return this.id;
  }
  public setId(value: number) {
    this.id = value;
  }

  public getPuesto(): string {
    return this.puesto;
  }

  public getEmpresa(): string {
    return this.empresa;
  }

  public getUrl_img_empresa(): string {
    return this.url_img_empresa;
  }

  public getFecha_inicio(): string {
    return this.fecha_inicio;
  }

  public getFecha_fin(): string {
    return this.fecha_fin;
  }

  public getRol(): string {
    return this.rol;
  }

  public getUbicacion(): string {
    return this.ubicacion;
  }

  public setPuesto(value: string) {
    this.puesto = value;
  }

  public setEmpresa(value: string) {
    this.empresa = value;
  }

  public setUrl_img_empresa(value: string) {
    this.url_img_empresa = value;
  }

  public setFecha_inicio(value: string) {
    this.fecha_inicio = value;
  }

  public setFecha_fin(value: string) {
    this.fecha_fin = value;
  }

  public setRol(value: string) {
    this.rol = value;
  }

  public setUbicacion(value: string) {
    this.ubicacion = value;
  }

  public getExpType(): ExperienciaTipo {
    return this.expTipo;
  }
  public setExpType(value: ExperienciaTipo) {
    this.expTipo = value;
  }
}
