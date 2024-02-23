import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './utils/auth.guard';
import { UserComponent } from './components/user/user.component';
import { AppraisalComponent } from './components/appraisal/appraisal.component';
import { UbicationComponent } from './components/ubication/ubication.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: UserComponent, canActivate: [authGuard] },
    { path: 'ubications', component: UbicationComponent, canActivate: [authGuard] },
    { path: 'tasation', component: AppraisalComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];
