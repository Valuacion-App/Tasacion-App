import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { navbarData } from './nav-data';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SideNavToggle } from '../../interfaces/sidenav.interface';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter()
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;
  isLoggedIn$: Observable<boolean>;
  constructor(private router: Router) {

  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth
    if(this.screenWidth <= 768) {
      this.collapsed = false
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
    }
  }
  ngOnInit(): void {
    this.screenWidth = window.innerWidth
  }
  toggleCollapse() : void {
    this.collapsed = !this.collapsed
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
  }

  closeSidenav() : void {
    this.collapsed = false
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
  }

  logOut() {
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }
}
