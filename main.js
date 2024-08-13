import { Header } from "./components/Header";
import { Wallet } from "./components/Wallet";
import { reload } from "./lib/utills";
import { Table } from "./components/Table";
import { getData } from "./lib/http.request";
Header();

const localed = JSON.parse(localStorage.getItem('user')) 
const email = document.querySelector('.email')
const wallet_container = document.querySelector(".wallet_container");
const tbody = document.querySelector("tbody");
const h1 = document.querySelector("h1");

h1.innerHTML = `Добро пожаловать, ${localed.name} ${localed.surname}`
email.innerHTML = localed.email


const res = await getData('/wallets?userId=' + localed.id)

reload(res.data, Wallet, wallet_container);

reload([1, 2], Table, tbody);

