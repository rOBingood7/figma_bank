export function Header() {
  const header = document.createElement("header");
  const header_container = document.createElement("div");
  const header_left = document.createElement("div");
  const header_right = document.createElement("div");
  const email_span = document.createElement("span");
  const logout_link = document.createElement("a");
  const home_link = document.createElement("a");
  const wallet_link = document.createElement("a");
  const transaction_link = document.createElement("a");

  const localed = JSON.parse(localStorage.getItem('user')) 

  header.classList.add("header");
  header_container.classList.add("header_container");
  header_left.classList.add("header_left");
  header_right.classList.add("header_right");

  email_span.innerHTML = localed.email;
  home_link.href = "/";
  wallet_link.href = "/pages/wallets/";
  transaction_link.href = "/pages/transactions/";

  home_link.innerHTML = "Главная";
  wallet_link.innerHTML = "Мои кошелки";
  transaction_link.innerHTML = "Мои транзакции";

  header_left.append(home_link, wallet_link, transaction_link);
  header_container.append(header_left, header_right);
  header_right.append(email_span, logout_link);
  header.append(header_container);

  logout_link.onclick = () => {
    localStorage.clear()

    location.assign('/pages/signin/')

  }
  document.querySelector(".head").append(header);
}
