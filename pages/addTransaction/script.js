import { getData, postData } from "../../lib/http.request";

const form = document.querySelector("form");
const wallets = await getData("/wallets");
const user_string = localStorage.getItem("user");
const userId = JSON.parse(user_string).id;

form.onsubmit = (e) => {
  e.preventDefault();
  submit(e.target);
};

async function submit(target) {
  const fm = new FormData(target);
  const walletName = fm.get("walletName");
  const wallet = wallets.data.find((w) => w.name === walletName);

  const transaction = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  fm.forEach((val, key) => (transaction[key] = val));

  await postData("/transactions", transaction);

  form.reset();
  location.assign("/pages/transactions/");
}
