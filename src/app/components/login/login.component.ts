import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import {FormControl, FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule,
            MatInputModule,
            MatIconModule,
            MatButtonModule,
            ReactiveFormsModule,
            FormsModule,
            RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: FormGroup;
  loading: boolean = false
  constructor(private fb: FormBuilder,private _userService: UserService, private router: Router, private toastr: ToastrService) {

    this.user = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]]
    })
  }

  login() {
    const email = this.user.get('email')!.value
    const password = this.user.get('password')!.value

    if(!email || !password) {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return
    }

    const user: User = {
      email: email,
      password: password
    }

    this.loading = true;
    this._userService.login(user).subscribe({
      next: (token) => {
        localStorage.setItem('token', token);
        this.toastr.success('Inicio Sesion', 'Felicidades');
        this.router.navigate(['/user'])
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false
        this.msjError(err)
      }
    })
  }

  msjError(err: HttpErrorResponse) {
    if(err.error.message) {
      this.toastr.error(err.error.message, 'Error');
    } else if(err.error.errors) {
      this.toastr.error(err.error.errors, 'Error');
    } else {
      this.toastr.error('Ocurrio un error, comuniquese con el administrador', 'Error');
    }
  }

}
