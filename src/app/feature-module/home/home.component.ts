import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { reconnect } from '@wagmi/core';
import { Web3Service, wagmiConfig } from '../../core-module/services/web3.service';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [CommonModule, RouterModule]
})
export class HomeComponent {

    
  public w3Service = inject(Web3Service);

    async reconnect(){
        await reconnect(wagmiConfig, {
          //connectors: [injected()], 
      })
      }
}
