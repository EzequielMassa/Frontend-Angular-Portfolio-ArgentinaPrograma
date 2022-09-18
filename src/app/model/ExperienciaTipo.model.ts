export class ExperienciaTipo {
  private id?: number;
  private tipo: string;

  constructor(tipo?: string) {
    this.tipo = tipo;
  }

  public getId(): number {
    return this.id;
  }

  public getTipo(): string {
    return this.tipo;
  }

  public setId(value: number) {
    this.id = value;
  }

  public setTipo(value: string) {
    this.tipo = value;
  }
}
