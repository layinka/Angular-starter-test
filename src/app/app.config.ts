import { ApplicationConfig, NgModule } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Ng2SearchPipe, Ng2SearchPipeModule } from 'ng2-search-filter';

import {provideAnimationsAsync} from '@angular/platform-browser/animations/async'
import { NgxSpinnerModule } from 'ngx-spinner';
import { W3MCoreButtonComponentWrapperComponent } from './web3modal-module/w3-mcore-button-component-wrapper/w3-mcore-button-component-wrapper.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
     
    provideHttpClient(),
    provideAnimationsAsync(),
    CommonModule, 
    NgModule, 
    Ng2SearchPipeModule, 
    Ng2SearchPipe,
    NgxSpinnerModule,
    W3MCoreButtonComponentWrapperComponent
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptorService,
    //   multi: true
    // }
  ]
};
