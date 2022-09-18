import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  nombreUsuario: string;
  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {
    this.nombreUsuario = this.tokenService.getUserName();
  }
}
