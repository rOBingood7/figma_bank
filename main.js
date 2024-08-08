import { Header } from "./components/Header";
<<<<<<< HEAD
import { Wallet } from "./components/Wallet";
import { reload } from "./lib/utills";
import { Table } from "./components/Table";
Header();
const wallet_container = document.querySelector(".wallet_container");
const tbody = document.querySelector("tbody");

reload([1, 2, 3, 4], Wallet, wallet_container);
reload([1, 2], Table, tbody);
=======
import { Table } from "./components/Table";
import { Wallet } from "./components/Wallet";
import { reload } from "./lib/utills";

Header()


const wallets_cont = document.querySelector('.wallet_container')
const transactions_cont = document.querySelector('tbody')


reload([1,2,3,4], Wallet, wallets_cont)
reload([1,2], Table, transactions_cont)
>>>>>>> a6bbcbc891c0b3b2df067a6c8ffc23f267f77479
