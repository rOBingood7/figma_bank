import { Header } from "../../components/Header";
import { Table } from "../../components/Table";
import { reload } from "../../lib/utills";

Header();

const tbody = document.querySelector("tbody");
const localed = JSON.parse(localStorage.getItem("user"));
const email = document.querySelector(".email");
const add_btn = document.querySelector(".add");
add_btn.onclick = () => {
  location.assign("/pages/addTransaction/");
};
email.innerHTML = localed.email;

reload([1, 2], Table, tbody);
