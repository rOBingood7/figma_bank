import { getData, patchData, postData } from "../../lib/http.request";
import Toastify from "toastify-js";

const patterns = {
  category: /^[a-zA-Zа-яА-Я\s\-']+$/,
  total: /^\d+(\.\d{1,2})?$/,
};
const inps = document.querySelectorAll("input");
const form = document.querySelector("form");
const select = form.querySelector("select");
let wallets = [];

inps.forEach((inp) => {
  inp.onkeyup = (e) => {
    const val = e.target.value;
    const pattern = patterns[inp.name];

    if (pattern && pattern.test(val)) {
      inp.classList.remove("error");
      inp.classList.add("correct");
    } else {
      inp.classList.remove("correct");
      inp.classList.add("error");
    }
    pattern.lastIndex = 0;
  };
});

form.onsubmit = async (e) => {
  e.preventDefault();
  await submit(e.target);
};

async function submit(target) {
  const fm = new FormData(target);
  const transaction = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  fm.forEach((val, key) => (transaction[key] = val));

  const finded_wallet = wallets.find(
    (item) => item.id === transaction.walletId
  );

  if (Number(transaction.total) > Number(finded_wallet.amount)) {
    Toastify({
      text: "Недостаточно денег на счету!",
      gravity: "top",
      position: "center",
    }).showToast();
    return;
  }

  const updated_wallet = {
    ...finded_wallet,
    amount: finded_wallet.amount - transaction.total,
  };
  delete updated_wallet.id;
  delete updated_wallet.userId;

  transaction.wallet = updated_wallet;

  try {
    const res = await patchData(`/wallets/${transaction.walletId}`, {
      amount: updated_wallet.amount,
    });

    if (res.status !== 200) {
      throw new Error("Не получилось выполнить транзакцию!");
    }

    await postData("/transactions", transaction);

    form.reset();
    Toastify({
      text: "Транзакция успешно выполнена!",
      gravity: "top",
      position: "center",
    }).showToast();

    setTimeout(() => {
      location.assign("/pages/transactions/");
    }, 500);
  } catch (error) {
    console.error("Error:", error);
    Toastify({
      text: `Произошла ошибка: ${error.message}`,
      gravity: "top",
      position: "center",
    }).showToast();
  }
}

const user_string = localStorage.getItem("user");
const userId = JSON.parse(user_string).id;

const res = await getData(`/wallets?userId=${userId}`);

if (res.status === 200 && res.data.length > 0) {
  wallets = res.data;
  for (let item of wallets) {
    let opt = new Option(item.name, item.id);
    select.append(opt);
  }
} else {
  throw new Error("Не удалось загрузить кошельки.");
}
