import { Component, OnInit } from '@angular/core';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { StateService } from '../../services/state.service';
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [SidenavComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit{

  constructor(private _stateService: StateService) {}

  ngOnInit(): void {
    this.getStates()
  }
  getStates() {
    this._stateService.getAllStates().subscribe(data => {
      console.log(data);
    })
  }
}
