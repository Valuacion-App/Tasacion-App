import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { User } from '../../interfaces/user.interface';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  displayedColumns: string[] = ['email', 'nombre completo','roles',];
  dataSource = new MatTableDataSource<User>();
  constructor(private _userService: UserService) {

  }

  ngOnInit(): void {
    this.getAllUser()
  }

  getAllUser() {
    this._userService.getAllUser().subscribe((data: User[]) => {
      this.dataSource.data = data;

    })
  }
}
