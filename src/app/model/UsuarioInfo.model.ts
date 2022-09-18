export class UsuarioInfo {
  private id?: number;
  private nombre: string;
  private apellido: string;
  private ubicacion: string;
  private ocupacion: string;
  private url_back_img: string;
  private url_prof_img: string;

  constructor(
    $id?: number,
    $nombre?: string,
    $apellido?: string,
    $ubicacion?: string,
    $ocupacion?: string,
    $url_back_img?: string,
    $url_prof_img?: string
  ) {
    this.id = $id;
    this.nombre = $nombre;
    this.apellido = $apellido;
    this.ubicacion = $ubicacion;
    this.ocupacion = $ocupacion;
    this.url_back_img = $url_back_img;
    this.url_prof_img = $url_prof_img;
  }

  public getId(): number {
    return this.id;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public getApellido(): string {
    return this.apellido;
  }

  public getUbicacion(): string {
    return this.ubicacion;
  }

  public getOcupacion(): string {
    return this.ocupacion;
  }

  public getUrl_back_img(): string {
    return this.url_back_img;
  }

  public getUrl_prof_img(): string {
    return this.url_prof_img;
  }

  public setId(value: number) {
    this.id = value;
  }

  public setNombre(value: string) {
    this.nombre = value;
  }

  public setApellido(value: string) {
    this.apellido = value;
  }

  public setUbicacion(value: string) {
    this.ubicacion = value;
  }

  public setOcupacion(value: string) {
    this.ocupacion = value;
  }

  public setUrl_back_img(value: string) {
    this.url_back_img = value;
  }

  public setUrl_prof_img(value: string) {
    this.url_prof_img = value;
  }
}
