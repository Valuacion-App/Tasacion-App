import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { authGuard } from './utils/auth.guard';
import { UserComponent } from './components/user/user.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: UserComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];
