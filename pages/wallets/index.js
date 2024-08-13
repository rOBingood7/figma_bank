import { Header } from "../../components/Header";
import { Wallet } from "../../components/Wallet";
import { getData } from "../../lib/http.request";
import { reload } from "../../lib/utills";

Header()

const wallet_container = document.querySelector(".wallet_container");
const add_btn = document.querySelector(".add");
const localed = JSON.parse(localStorage.getItem('user'))

add_btn.onclick = () => {
   location.assign('/pages/addWallet/')
}

const res = await getData('/wallets?userId=' + localed.id)

reload(res.data, Wallet, wallet_container);


