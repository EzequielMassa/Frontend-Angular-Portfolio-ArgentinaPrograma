export class Education {
  private id?: number;
  private institucion: string;
  private titulo: string;
  private fecha_inicio: string;
  private fecha_fin: string;
  private url_institucion_img: string;

  constructor(
    id?: number,
    institucion?: string,
    titulo?: string,
    fecha_inicio?: string,
    fecha_fin?: string,
    url_institucion_img?: string
  ) {
    this.id = id;
    this.institucion = institucion;
    this.titulo = titulo;
    this.fecha_inicio = fecha_inicio;
    this.fecha_fin = fecha_fin;
    this.url_institucion_img = url_institucion_img;
  }

  public getId(): number {
    return this.id;
  }

  public getInstitucion(): string {
    return this.institucion;
  }

  public getTitulo(): string {
    return this.titulo;
  }

  public getFecha_inicio(): string {
    return this.fecha_inicio;
  }

  public getFecha_fin(): string {
    return this.fecha_fin;
  }

  public getUrl_institucion_img(): string {
    return this.url_institucion_img;
  }

  public setId(value: number) {
    this.id = value;
  }

  public setInstitucion(value: string) {
    this.institucion = value;
  }

  public setTitulo(value: string) {
    this.titulo = value;
  }

  public setFecha_inicio(value: string) {
    this.fecha_inicio = value;
  }

  public setFecha_fin(value: string) {
    this.fecha_fin = value;
  }

  public setUrl_institucion_img(value: string) {
    this.url_institucion_img = value;
  }
}
