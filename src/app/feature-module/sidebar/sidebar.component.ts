import { Component, HostBinding } from '@angular/core';
import { SidenavService } from '../../core-module/services/sidenav.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, NgbDropdownModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  
  
  constructor(
    public sidenavService: SidenavService,
    public route: ActivatedRoute
  ) { }

  

  @HostBinding('class.is-expanded')
  get isExpanded() {
    return this.sidenavService.isExpanded;
  }

  menuItems = [

    { name: "Home", path: "home", icon: "bi bi-house"}
    // { name: "Documentation", path: "", icon: "bi bi-house" },
  ]

}
