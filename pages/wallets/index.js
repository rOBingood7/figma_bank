import { Header } from "../../components/Header";
import { Wallet } from "../../components/Wallet";
import { reload } from "../../lib/utills";

Header()

const wallet_container = document.querySelector(".wallet_container");
const add_btn = document.querySelector(".add");

add_btn.onclick = () => {
   location.assign('/pages/addWallet/')
}
reload([1, 2, 3, 4], Wallet, wallet_container);

