export class NuevoUsuario {
  private id: number;
  private nombre: string;
  private nombreUsuario: string;
  private email: string;
  private password: string;
  private authorities: string[];

  constructor(
    id?: number,
    nombre?: string,
    nombreUsuario?: string,
    email?: string,
    password?: string,
    authorities?: string[]
  ) {
    this.id = id;
    this.nombre = nombre;
    this.nombreUsuario = nombreUsuario;
    this.email = email;
    this.password = password;
    this.authorities = authorities;
  }

  public getId(): number {
    return this.id;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public getNombreUsuario(): string {
    return this.nombreUsuario;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }

  public getAuthorities(): string[] {
    return this.authorities;
  }

  public setId(value: number) {
    this.id = value;
  }

  public setNombre(value: string) {
    this.nombre = value;
  }

  public setNombreUsuario(value: string) {
    this.nombreUsuario = value;
  }

  public setEmail(value: string) {
    this.email = value;
  }

  public setPassword(value: string) {
    this.password = value;
  }

  public setAuthorities(value: string[]) {
    this.authorities = value;
  }
}
