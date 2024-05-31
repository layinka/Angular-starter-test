import { Injectable } from '@angular/core';
// import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
// import { Web3Modal } from '@web3modal/html'
import {   connect, createConfig, getChainId, injected, reconnect, watchAccount, watchChainId, watchConnections } from '@wagmi/core';
import { auroraTestnet,aurora, arbitrum, Chain, fantom, base, baseSepolia, fantomTestnet, goerli, mainnet, sepolia, polygon, bsc, bscTestnet, celo, celoAlfajores, hardhat, metisGoerli, shardeumSphinx, etherlinkTestnet } from '@wagmi/core/chains';
import { getAccount, readContract,    getPublicClient, getWalletClient} from '@wagmi/core';


import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';


import { FallbackTransport, formatUnits, http, parseUnits } from 'viem';
import { type GetChainIdReturnType } from '@wagmi/core'
import { coinbaseWallet, walletConnect } from '@wagmi/connectors';
import { createWeb3Modal, emailConnector, Web3Modal } from '@web3modal/wagmi';
// import { ethers } from 'ethers';

// import { getEthersProvider } from '../../utils/wagmi-ethers-adapter';
// import { getEthersSigner } from '../../utils/wagmi-ethers-adapter-signer';

const projectId = environment.walletConnectProjectId;

const metadata = {
  name: 'Web3Modal',
  description: 'Crypto Powered Payment Processor',
  url: 'http://localhost:4200', // url must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const defaultChains: any = [hardhat,  mainnet,auroraTestnet, sepolia, baseSepolia, base,etherlinkTestnet, shardeumSphinx]

//@ts-ignore
export const wagmiConfig = createConfig({
  chains: defaultChains,
  connectors: [
    walletConnect({ projectId: projectId, metadata, showQrModal: false }),
    injected({ shimDisconnect: true }),
    coinbaseWallet({
      appName: metadata.name,
      appLogoUrl: metadata.icons[0]
    }),
    emailConnector({ chains: defaultChains, options: { projectId } })
  ],
  transports: {
    [hardhat.id]: http(),
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [base.id]: http(),
    [baseSepolia.id]: http(),
    [etherlinkTestnet.id]: http(),
    [shardeumSphinx.id]: http(),
    [auroraTestnet.id]: http()
  }
})

export const chains: Record<number, Chain> = {
  1: mainnet,
  84532: baseSepolia,
  8453: base,
  11155111: sepolia,
  128123: etherlinkTestnet,
  8082: shardeumSphinx,
  31337: hardhat,
  1313161555: auroraTestnet


} 

let w3modal;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  
  w3modal!: Web3Modal;

  private _chainId$ = new BehaviorSubject<number|undefined>(undefined);
  
  public chainId$ = this._chainId$.asObservable()

  public get chainId(){
    
    return this._chainId$.value;
  }

  private _account$ = new BehaviorSubject<string|undefined>(undefined);
  
  public account$ = this._account$.asObservable()

  public get account(){
    
    return this._account$.value;
  }

  unwatchAccount : any;

  unwatchNetwork : any;

  // private _connected$ = new BehaviorSubject<boolean|undefined>(undefined);
  
  // public connected$ = this._connected$.asObservable()

  // public get connected(){
    
  //   return this._connected$.value;
  // }

  // unwatchConnection : any;


  // walletConnect({ projectId: projectId, metadata, showQrModal: true }),
  //   injected({ /*shimDisconnect: true*/ }),
  //   coinbaseWallet({
  //     appName: metadata.name,
  //     appLogoUrl: metadata.icons[0]
  //   })

  constructor() {
    setTimeout(async () => {
      // const reconnected = await connect(wagmiConfig, {
      //   connector: injected()
      // }).catch((err)=>{
      //   console.error('Error connecting to Web3Modal/walletconnect:', err)
      // })
      const reconnected = await reconnect(wagmiConfig).catch((err)=>{
        console.error('Error connecting to Web3Modal/walletconnect:', err)
      })
      console.log('Connected Connectors: ', reconnected)
      w3modal = createWeb3Modal({
        wagmiConfig: wagmiConfig,
        projectId: projectId,
        enableAnalytics: true, // Optional - defaults to your Cloud configuration
        enableOnramp: true, // Optional - false as default
  
      })

      const {address, isConnected} = getAccount(wagmiConfig);
      if(address && isConnected){            
        this._account$.next(address)
      }else{
        await this.w3modal.open();
      }
      
      const chainId   = getChainId(wagmiConfig);
      if(chainId ){
                  
        this._chainId$.next(chainId );
      }

      //Update chainId on change
      this.unwatchNetwork = watchChainId(wagmiConfig,      
        {
          onChange:  async (chainId) => {
            console.log('Chain ID changed!', chainId)
            if(chainId ){
              
              this._chainId$.next(chainId );

            }else{
              this._chainId$.next(undefined);
            }
          },
        }
      ); 
      
      this.unwatchAccount = watchAccount(wagmiConfig, {
        onChange: async (account) => {
          if(account && account.isConnected){
            
            this._account$.next(account.address);
            
          }else{
            this._account$.next(undefined);
          }
          
        }
      })


    }, 500);
    


  }



  async getAccountInfo() {
    return getAccount(wagmiConfig);
  }


  

  getCurrentChainId() {
    const c: GetChainIdReturnType = getChainId(wagmiConfig);
    return c;
  }

  getChainName(chainId: number){
    const chain = chains[chainId]
    if(chain){
      return chain.name
    }else{
      return undefined
    }

  }

  getChain(chainId: number){
    const chain = chains[chainId]
    if(chain){
      return chain
    }else{
      return undefined
    }

  }


}



