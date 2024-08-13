import { getData, postData } from "../../lib/http.request";
const patterns = {
  name: /^[a-z ,.'-]+$/i,
  amount: /^\d+$/,
};

const form = document.querySelector("form");
const inps = document.querySelectorAll("input");

inps.forEach((inp) => {
  inp.onkeyup = (e) => {
    const val = e.target.value;

    if (patterns[inp.name].test(val)) {
      inp.style.border = "3px solid blue";
    } else {
      inp.style.border = "3px solid red";
    }
    patterns[inp.name].lastIndex = 0;
  };
});

form.onsubmit = (e) => {
  e.preventDefault();
  submit(e.target);
};

async function submit(target) {
  const fm = new FormData(target);
  const user_string = localStorage.getItem("user");
  const user = JSON.parse(user_string);
  const wallet = {
    id: crypto.randomUUID(),
    userId: user.id,
    createdAt: new Date().toISOString,
    updatedAt: new Date().toISOString,
  };
  fm.forEach((val, key) => (wallet[key] = val));

  await postData("/wallets", wallet);

  form.reset();
  location.assign("/pages/wallets/");
}
