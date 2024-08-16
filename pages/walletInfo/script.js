import VanillaTilt from "vanilla-tilt";
import Chart from 'chart.js/auto';
import {
	Wallet
} from "../../components/Wallet";
import {
	getData,
	getData_Fixer
} from "../../lib/http.request";
import {
	reload
} from "../../lib/utills";


const currencies = document.querySelectorAll(".currencies");
const conversion_form = document.querySelector("form");
const wallet_container = document.querySelector(".wallet_container");
const cards = document.querySelectorAll(".card");
let activeCard = 0;

const localed = JSON.parse(localStorage.getItem("user"));
const id = location.search.split('=').at(-1)

const res_currencies = await getData_Fixer("/list");
const res = await getData("/wallets/" + id);


cards.forEach((card) => {
	card.onclick = () => {
		if (card === activeCard) {
			card.classList.remove("active");
			activeCard = 0;
		} else {
			if (activeCard) {
				activeCard.classList.remove("active");
			}
			card.classList.add("active");
			activeCard = card;
		}
	};
});

if(res_currencies?.data?.currencies) {
	currencies.forEach((select) => {
		for (let key in res_currencies.data.currencies) {
			let opt = new Option(`${key}`, key);
			select.append(opt);
		}
	});
}

conversion_form.onsubmit = async (e) => {
	e.preventDefault();

	const convertData = {}

	new FormData(e.target).forEach((val, key) => convertData[key] = val)

	const {to, from, amount} = convertData
	
	const res = await getData_Fixer(`/convert?to=${to}&from=${from}&amount=${amount}`)

	console.log(res);
};

reload([res.data], Wallet, wallet_container);

const transactions = await getData("/transactions?walletId=" + id);

const ctx = document.querySelector('#canvas')

new Chart(ctx, {
	type: "line",
	data: {
	labels: ["Ansor", "Umarjon", "MuhammadAziz", "Sherobod", "Mirkomil", "Xondamir"],
	datasets: [{
		label: 'My First Dataset',
		data: [7.1,5.4,2.0,3.0,8.4,7.0],
		fill: false,
		borderColor: 'rgb(75, 192, 192)',
		tension: 0.1
	}]
	}
})
