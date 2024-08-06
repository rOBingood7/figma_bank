export function Table() {
  const tr = document.createElement("tr");
  const id = document.createElement("td");
  const type = document.createElement("td");
  const category = document.createElement("td");
  const sum = document.createElement("td");
  const date = document.createElement("td");

  id.innerHTML = "1232312";
  type.innerHTML = "VISA";
  category.innerHTML = "Автомобиль";
  sum.innerHTML = "414,000,000";
  date.innerHTML = "4 дня назад";

  tr.append(id, type, category, sum, date);
  return tr;
}
