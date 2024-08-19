import { getData_Fixer, postData } from "../../lib/http.request";
import Toastify from "toastify-js";

const patterns = {
  name: /^[a-zA-Zа-яА-Я\s\-']+$/,
  amount: /^\d+(\.\d{1,2})?$/,
};

const form = document.querySelector("form");
const select = form.querySelector("select");
const currency_inp = document.createElement("input");
currency_inp.type = "text";
currency_inp.name = "manual_сurrency";
currency_inp.placeholder = "Введите валюту вручную";
currency_inp.style.display = "none";

const inps = document.querySelectorAll("input");
form.insertBefore(currency_inp, select ? select.nextSibling : null);

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

  let isError = false;
  const selected_сurrency = select ? select.value : null;
  const manual_сurrency = currency_inp.value.trim();

  inps.forEach((inp) => {
    if (inp.classList.contains("error") || inp.value === "") {
      isError = true;
      inp.classList.add("error");
    }
  });

  if (!selected_сurrency && !manual_сurrency) {
    isError = true;
    if (select) select.classList.add("error");
    currency_inp.classList.add("error");
  } else {
    if (select) select.classList.remove("error");
    currency_inp.classList.remove("error");
  }

  if (isError) {
    Toastify({
      text: "Пожалуйста, исправьте ошибки в форме.",
      gravity: "top",
      position: "center",
    }).showToast();
    return;
  } else {
    await submit(e.target, selected_сurrency, manual_сurrency);
  }
};

async function submit(target, selected_сurrency, manual_сurrency) {
  const fm = new FormData(target);
  const user_string = localStorage.getItem("user");
  const user = JSON.parse(user_string);

  const wallet = {
    id: crypto.randomUUID(),
    userId: user.id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  fm.forEach((val, key) => (wallet[key] = val));

  wallet.currency = selected_сurrency || manual_сurrency;

  try {
    await postData("/wallets", wallet);

    form.reset();
    currency_inp.style.display = "none";
    if (select) select.remove();
    Toastify({
      text: "Кошелек успешно создан!",
      gravity: "top",
      position: "center",
    }).showToast();

    setTimeout(() => {
      location.assign("/pages/wallets/");
    }, 500);
  } catch (error) {
    console.error("Error:", error);
    Toastify({
      text: `Произошла ошибка при создании кошелька: ${error.message}`,
      gravity: "top",
      position: "center",
    }).showToast();
  }
}

async function populateSelect() {
  try {
    const res = await getData_Fixer("/list");

    if (res.data.currencies && Object.keys(res.data.currencies).length > 0) {
      currency_inp.style.display = "none";
      for (let key in res.data.currencies) {
        let opt = new Option(`${key}: ${res.data.currencies[key]}`, key);
        select.append(opt);
      }
    } else {
      currency_inp.style.display = "block";
      if (select) select.remove();
    }
  } catch (error) {
    console.error("Error:", error);
    Toastify({
      text: "Не удалось загрузить валюты. Введите валюту вручную.",
      gravity: "top",
      position: "center",
    }).showToast();

    currency_inp.style.display = "block";

    if (select) {
      select.remove();
    }
  }
}

populateSelect();
