// walletconnect.js - รองรับ WalletConnect
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3 from 'web3';

export async function initWalletConnect(callback) {
  const provider = new WalletConnectProvider({
    rpc: {
      1: 'https://mainnet.infura.io/v3/YOUR_INFURA_ID',
      137: 'https://polygon-rpc.com'
    }
  });

  await provider.enable();
  const web3 = new Web3(provider);

  const accounts = await web3.eth.getAccounts();
  const address = accounts[0];

  callback({ web3, address });

  provider.on('accountsChanged', (accounts) => callback({ web3, address: accounts[0] }));
  provider.on('disconnect', () => {
    console.log('Wallet disconnected');
  });
}
