export function Wallet() {
  const wallet = document.createElement("div");
  const type = document.createElement("p");
  const currency = document.createElement("span");

  wallet.classList.add("wallet", "card1");
  type.innerHTML = "Visa";
  currency.innerHTML = "RUB";

  wallet.append(type, currency);
  return wallet
}
