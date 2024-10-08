import { Header } from "./components/Header";
import { Wallet } from "./components/Wallet";
import { reload } from "./lib/utills";
import { Table } from "./components/Table";
import { getData } from "./lib/http.request";
Header();

const localed = JSON.parse(localStorage.getItem("user"));
const wallet_container = document.querySelector(".wallet_container");
const tbody = document.querySelector("tbody");
const email = document.querySelector(".email");
const h1 = document.querySelector("h1");

h1.innerHTML = `Добро пожаловать, ${localed.name} ${localed.surname}`;
email.innerHTML = localed.email;

const res = await getData("/wallets?userId=" + localed.id);
const res_trans = await getData("/transactions?userId=" + localed.id);

reload(res.data, Wallet, wallet_container);

reload(res_trans.data, Table, tbody);
