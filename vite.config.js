// vite.config.js
import {
    resolve
} from 'path'
import {
    defineConfig
} from 'vite'


export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                addTransaction: resolve(__dirname, 'pages/addTransaction/index.html'),
                addWallet: resolve(__dirname, 'pages/addWallet/index.html'),
                signin: resolve(__dirname, 'pages/signin/index.html'),
                signup: resolve(__dirname, 'pages/signup/index.html'),
                transactions: resolve(__dirname, 'pages/transactions/index.html'),
                walletInfo: resolve(__dirname, 'pages/walletInfo/index.html'),
                wallets: resolve(__dirname, 'pages/wallets/index.html'),
            },
        },
        target: "ES2022"
    },
});