import {
	getData,
	patchData,
	postData
} from "../../lib/http.request";

const form = document.querySelector("form");
const select = form.querySelector("select");
const user_string = localStorage.getItem("user");
const userId = JSON.parse(user_string).id;
let wallets = []

form.onsubmit = (e) => {
	e.preventDefault();
	submit(e.target);
};

async function submit(target) {
	const fm = new FormData(target);

	const transaction = {
		id: crypto.randomUUID(),
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	};

	fm.forEach((val, key) => (transaction[key] = val));

	const findedWallet = wallets.find(item => item.id ===  transaction.walletId) 
	
	if(Number(transaction.total) > Number(findedWallet.amount)) {
		alert('Недостаточно денег на счету!')
		return
	}

	delete findedWallet.id
	delete findedWallet.userId

	transaction.wallet = findedWallet

	const res = await patchData('/wallets/' + transaction.walletId, {amount: findedWallet.amount - transaction.total})

	if(res.status !== 200) {
		alert('Не получилось выполнить транзакцию!')
		return
	}

	await postData("/transactions", transaction);

	form.reset();
	location.assign("/pages/transactions/");
}

const res = await getData('/wallets?userId=' + userId)

if(res.status === 200) {
	wallets = res.data
	for(let item of res.data) {
		let opt = new Option(item.name, item.id)
		select.append(opt)
	}
}

