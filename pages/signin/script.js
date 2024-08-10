import {
	getData
} from "../../lib/http.request";

const patterns = {
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

form.onsubmit = async (e) => {
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
		await submit(e.target);
	}
};

async function submit(target) {
	const fm = new FormData(target);
	const user = {};

	fm.forEach((val, key) => (user[key] = val));

	try {
		const users = await getData(`/users?email=${user.email}`);

		if (users.data.length > 0) {
			const existing_user = users.data[0];

			if (existing_user.password === user.password) {
				const stringified = JSON.stringify(existing_user)

				localStorage.setItem('user', stringified)
				location.assign("/");
			} else {
				alert("Пароль неправильный");
			}
		} else {
			alert("Пользователь с таким email не существует");
		}
	} catch (error) {
		console.error("Error:", error);
		alert("Произошла ошибка.");
	}
}