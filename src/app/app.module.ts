import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './portfolio/header/header.component';
import { AboutComponent } from './portfolio/about/about.component';
import { ExperienceComponent } from './portfolio/experience/experience.component';
import { EducationComponent } from './portfolio/education/education.component';
import { SkillsComponent } from './portfolio/skills/skills.component';
import { ProjectsComponent } from './portfolio/projects/projects.component';
import { LoginComponent } from './login/login.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AboutService } from './service/about.service';
import { ExperienceService } from './service/experience.service';
import { DatePipe } from '@angular/common';
import { EducationService } from './service/education.service';
import { SkillService } from './service/skill.service';
import { ProjectService } from './service/project.service';
import { UsuarioInfoService } from './service/usuarioInfo.service';
import { interceptorProvider } from './service/interceptor.service';
import { UsuarioService } from './service/usuario.service';
import { NavbarComponent } from './portfolio/navbar/navbar.component';
import { BannerComponent } from './portfolio/banner/banner.component';
import { ContactComponent } from './portfolio/contact/contact.component';
import { FooterComponent } from './portfolio/footer/footer.component';
import { SafePipe } from './safe.pipe';
import { SocialComponent } from './portfolio/social/social.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    BannerComponent,
    AboutComponent,
    ExperienceComponent,
    EducationComponent,
    SkillsComponent,
    ProjectsComponent,
    LoginComponent,
    PortfolioComponent,
    ContactComponent,
    FooterComponent,
    SafePipe,
    SocialComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 2500,
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule,
  ],
  providers: [
    UsuarioInfoService,
    AboutService,
    ExperienceService,
    EducationService,
    SkillService,
    ProjectService,
    UsuarioService,
    interceptorProvider,
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
