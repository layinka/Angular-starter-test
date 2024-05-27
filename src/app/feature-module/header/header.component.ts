import { Component, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppToastService } from '../../core-module/services/app-toast.service';
import { HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Web3ModalCoreButtonWrapperModule } from '../../web3modal-module/web3modal.module';
import { CommonModule } from '@angular/common';
import { Web3Service } from '../../core-module/services/web3.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [Web3ModalCoreButtonWrapperModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeaderComponent {

  userId: any
  private w3Service = inject(Web3Service)
  
  private toastService = inject(AppToastService)




  async ngOnInit(): Promise<void> {


  }


  signout() {
    this.toastService.show('Sigout', 'SignOut Successful', 10)
    // this.authService.signOut()

  }
}
