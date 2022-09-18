export class JwtDto {
  token: string;
  type: string;
  nombreUsuario: string;
  authorities: string[];

  public getToken(): string {
    return this.token;
  }

  public getType(): string {
    return this.type;
  }

  public getNombreUsuario(): string {
    return this.nombreUsuario;
  }

  public getAuthorities(): string[] {
    return this.authorities;
  }

  public setToken(value: string) {
    this.token = value;
  }

  public setType(value: string) {
    this.type = value;
  }

  public setNombreUsuario(value: string) {
    this.nombreUsuario = value;
  }

  public setAuthorities(value: string[]) {
    this.authorities = value;
  }
}
