export class Acerca {
  private id?: number;
  private descripcion: string;
  constructor($id?: number, $descripcion?: string) {
    this.id = $id;
    this.descripcion = $descripcion;
  }

  public getId(): number {
    return this.id;
  }
  public setId(value: number) {
    this.id = value;
  }

  public getDescripcion(): string {
    return this.descripcion;
  }

  public setDescripcion(value: string) {
    this.descripcion = value;
  }
}
