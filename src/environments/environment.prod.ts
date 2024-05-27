export const environment = { 
    production: true,
    appName: 'Zarpay',
    api: {
        url: ''
    },
    website: '',
    walletConnectProjectId: "8677fdfb19627f5244ca615baded2c94",
    faucets: [
        {
            chainId: 1313161555,//Aurora test
            faucetAddress: '0xF48aD3edDB835E6EbD86C22BA9e1ED3a0aD910e7'
        },
        {
            chainId: 84532,//Base test
            faucetAddress: '0xE47050824F0Ec836a3A0EA0bfcdBfbF4743bEe77'
        }
    ]
}