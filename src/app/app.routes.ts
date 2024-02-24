import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './utils/auth.guard';
import { UserComponent } from './components/user/user.component';
import { AppraisalComponent } from './components/appraisal/appraisal.component';
import { LoginLayoutComponent } from './components/login-layout/login-layout.component';
import { HomeLayoutComponent } from './components/home-layout/home-layout.component';
import { UbicationComponent } from './components/ubication/ubication.component';

export const routes: Routes = [
  { path: '', component: HomeLayoutComponent, canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'user', pathMatch: 'full' },
      { path: 'user', component: UserComponent },
      { path: 'tasation', component: AppraisalComponent },
      { path: 'ubications', component: UbicationComponent },
    ]
  },

  {
    path: 'login', component: LoginLayoutComponent,
    children: [
      {path: '', component: LoginComponent}
    ]
  },
  { path: '**', redirectTo: 'user', pathMatch: 'full' }

    // { path: 'login', component: LoginComponent },
];
