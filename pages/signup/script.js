import { getData, postData } from "../../lib/http.request";

const patterns = {
  name: /^[a-z ,.'-]+$/i,
  surname: /^[a-z ,.'-]+$/i,
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
};

const inps = document.querySelectorAll("input");
const form = document.querySelector("form");

inps.forEach((inp) => {
  inp.onkeyup = (e) => {
    const val = e.target.value;

    if (patterns[inp.name].test(val)) {
      inp.classList.remove("error");
    } else {
      inp.classList.add("error");
    }
    patterns[inp.name].lastIndex = 0;
  };
});

form.onsubmit = (e) => {
  e.preventDefault();

  let isError = false;

  inps.forEach((inp) => {
    if (inp.classList.contains("error") || inp.value === "") {
      isError = true;
      inp.classList.add("error");
    }
  });

  if (isError) {
    alert("Error");
    return;
  } else {
    submit(e.target);
  }
};

async function submit(target) {
  const fm = new FormData(target);
  const user = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString,
    updatedAt: new Date().toISOString,
  };

  fm.forEach((val, key) => (user[key] = val));

  const users = await getData("/users?email=" + user.email);

  if (users.data.length > 0) {
    alert("Пользователь уже зарегистрирован");
    return;
  }
  await postData("/users", user);
  form.reset();
  location.assign("/pages/signin/");
}
