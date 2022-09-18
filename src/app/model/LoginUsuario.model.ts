export class LoginUsuario {
  private nombreUsuario: string;
  private password: string;

  constructor(nombreUsuario: string, password: string) {
    this.nombreUsuario = nombreUsuario;
    this.password = password;
  }

  public getNombreUsuario(): string {
    return this.nombreUsuario;
  }

  public getPassword(): string {
    return this.password;
  }

  public setNombreUsuario(value: string) {
    this.nombreUsuario = value;
  }

  public setPassword(value: string) {
    this.password = value;
  }
}
