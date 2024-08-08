import { Header } from "./components/Header";
import { Wallet } from "./components/Wallet";
import { reload } from "./lib/utills";
import { Table } from "./components/Table";
Header();
const wallet_container = document.querySelector(".wallet_container");
const tbody = document.querySelector("tbody");

reload([1, 2, 3, 4], Wallet, wallet_container);
reload([1, 2], Table, tbody);
