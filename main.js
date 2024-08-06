import { Header } from "./components/Header";
import { Table } from "./components/Table";
import { Wallet } from "./components/Wallet";
import { reload } from "./lib/utills";

Header()


const wallets_cont = document.querySelector('.wallet_container')
const transactions_cont = document.querySelector('tbody')


reload([1,2,3,4], Wallet, wallets_cont)
reload([1,2], Table, transactions_cont)