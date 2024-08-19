import moment from "moment";

export function Table(item) {
  const tr = document.createElement("tr");
  const id = document.createElement("td");
  const type = document.createElement("td");
  const category = document.createElement("td");
  const sum = document.createElement("td");
  const date = document.createElement("td");

  id.innerHTML = item.id.slice(0, 8);
  type.innerHTML = item.wallet.name;
  category.innerHTML = item.category;
  sum.innerHTML = `${Number(item.total).toLocaleString()} ${
    item.wallet.currency
  }`;
  date.innerHTML = moment(item.createdAt).fromNow();

  tr.append(id, type, category, sum, date);
  return tr;
}
