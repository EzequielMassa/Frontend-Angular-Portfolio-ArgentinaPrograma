export class Skill {
  private id?: number;
  private nombre: string;
  private avance: number;

  constructor(id?: number, nombre?: string, avance?: number) {
    this.id = id;
    this.nombre = nombre;
    this.avance = avance;
  }

  public getId(): number {
    return this.id;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public getAvance(): number {
    return this.avance;
  }

  public setId(value: number) {
    this.id = value;
  }

  public setNombre(value: string) {
    this.nombre = value;
  }

  public setAvance(value: number) {
    this.avance = value;
  }
}
