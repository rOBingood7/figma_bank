import VanillaTilt from "vanilla-tilt";
function getRandomGradient() {
  const gradients = [
    "linear-gradient(135deg, #ff7e5f, #feb47b)",
    "linear-gradient(135deg, #692A82, #A444FF)",
    "linear-gradient(135deg, #18C08C, #2AD5FF)",
    "linear-gradient(135deg, #252E63, #4BFFDF)",
  ];
  return gradients[Math.floor(Math.random() * gradients.length)];
}

function getGradient(itemId) {
  const stored_gradient = localStorage.getItem(`gradient_${itemId}`);
  if (stored_gradient) {
    return stored_gradient;
  } else {
    const new_gradient = getRandomGradient();
    localStorage.setItem(`gradient_${itemId}`, new_gradient);
    return new_gradient;
  }
}

export function Wallet(item) {
  const wallet = document.createElement("div");
  const type = document.createElement("p");
  const currency = document.createElement("span");

  wallet.classList.add("wallet");
  type.innerHTML = item.name;
  currency.innerHTML = `${item.currency} | ${Number(
    item.amount
  ).toLocaleString()}`;

  wallet.style.background = getGradient(item.id);

  VanillaTilt.init(wallet, {
    reverse: true,
  });

  wallet.onclick = () => {
    location.assign(`/pages/walletInfo/?id=` + item.id);
  };

  wallet.append(type, currency);
  return wallet;
}
