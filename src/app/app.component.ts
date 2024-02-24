import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SideNavToggle } from './interfaces/sidenav.interface';
import { BodyComponent } from "./components/body/body.component";
import { SpinnerComponent } from './components/spinner/spinner.component';
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, SidenavComponent, BodyComponent, SpinnerComponent]
})
export class AppComponent {
  isSideNavCollapsed = false
  screenWidth = 0

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth
    this.isSideNavCollapsed = data.collapsed
  }
}
