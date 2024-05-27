import { Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './feature-module/header/header.component';

import { SidebarComponent } from "./feature-module/sidebar/sidebar.component";
import { ToastsComponent } from './core-module/toasts/toasts.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Web3Service } from './core-module/services/web3.service';
import { SidenavService } from './core-module/services/sidenav.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
const routesWithoutSideBar = [
  '',
  '/',
  '/home',
  '/login',
  '/sign-up',
  '/forgot-password',
  '/reset-password'
]


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent, ToastsComponent, NgxSpinnerModule]
})
export class AppComponent {
  title = 'NGStart';
  sub?: Subscription;
  displaySidebar= new BehaviorSubject(false)

  public web3Service = inject(Web3Service)
  
  public spinnerService = inject(NgxSpinnerService)
  public router = inject(Router)
  public sidenavService= inject(SidenavService)
  
  

  ngOnInit(){
    this.sub = this.router.events.subscribe(event =>{
      if (event instanceof NavigationStart){
        //  console.log(event.url)
        //  console.log('url now', event.url, ', d is ', routesWithoutSideBar.findIndex(ff=>ff==event.url) < 0 )
        this.displaySidebar.next( routesWithoutSideBar.findIndex(ff=>ff==event.url) < 0 )
      }
   })

    // this.sub = this.route.url.subscribe((urls)=>{
    //   console.log('urls now', urls)
    //   const { path, parameters } = urls[0];
    //   console.log('url now', path)
    //   this.displaySidebar = !(path=='' || path=='/home')
    // })

    
  }

  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
      this.sub=undefined;
    }
  }
}
