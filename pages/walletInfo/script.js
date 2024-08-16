import VanillaTilt from "vanilla-tilt";
import { Wallet } from "../../components/Wallet";
import { getData, getData_Fixer } from "../../lib/http.request";
import { reload } from "../../lib/utills";

const currencies = document.querySelectorAll(".currencies");
const conversion_form = document.querySelector("form");
const wallet_container = document.querySelector(".wallet_container");
const localed = JSON.parse(localStorage.getItem("user"));
const res = await getData("/wallets?userId=" + localed.id);
const res_currencies = await getData_Fixer("/list");
const res_conversion = await getData_Fixer("/convert");
const cards = document.querySelectorAll(".card");

let activeCard = 0;

cards.forEach((card) => {
  card.onclick = () => {
    if (card === activeCard) {
      card.classList.remove("active");
      activeCard = 0;
    } else {
      if (activeCard) {
        activeCard.classList.remove("active");
      }
      card.classList.add("active");
      activeCard = card;
    }
  };
});

currencies.forEach((select) => {
  for (let key in res_currencies.data.currencies) {
    let opt = new Option(`${key}`, key);
    select.append(opt);
  }
});

conversion_form.onsubmit = async (e) => {
  e.preventDefault();
};

reload(res.data, Wallet, wallet_container);
