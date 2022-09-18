import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { GuardGuard } from './service/guard.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  {
    path: ':userName',
    component: PortfolioComponent,
    canActivate: [GuardGuard],
  },
];

@NgModule({
  imports: [
    [
      RouterModule.forRoot(routes, {
        onSameUrlNavigation: 'ignore',
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ],
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
