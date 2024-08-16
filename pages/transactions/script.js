import {
  Header
} from "../../components/Header";
import {
  Table
} from "../../components/Table";
import {
  getData
} from "../../lib/http.request";
import {
  reload
} from "../../lib/utills";

Header();

const tbody = document.querySelector("tbody");
const localed = JSON.parse(localStorage.getItem("user"));
const add_btn = document.querySelector(".add");
const email = document.querySelector(".email");

email.innerHTML = localed.email;
add_btn.onclick = () => {
  location.assign("/pages/addTransaction/");
};


const {
  data
} = await getData('/transactions?userId=' + localed.id)


reload(data.toSorted((a, b) => new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1 ), Table, tbody);