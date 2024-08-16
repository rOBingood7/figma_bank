export function Wallet(item) {
  const wallet = document.createElement("div");
  const type = document.createElement("p");
  const currency = document.createElement("span");

  wallet.classList.add("wallet", "card1");
  type.innerHTML = item.name;
  currency.innerHTML = `${item.currency} | ${Number(item.amount).toLocaleString()}`;

  wallet.onclick = () => {
    location.assign(`/pages/walletInfo/?id=`+ item.id)
  }
  wallet.append(type, currency);
  return wallet
}
