const title = document.getElementById("title"),
  price = document.getElementById("price"),
  tasks = document.getElementById("tasks"),
  ads = document.getElementById("ads"),
  discount = document.getElementById("discount"),
  total = document.getElementById("total"),
  count = document.getElementById("count"),
  category = document.getElementById("category"),
  submit = document.getElementById("submit");
var mood = "create";
let temp;
// console.log(title, price, tasks, ads, discount, total, count, category, submit);

//get total
function getTotal() {
  if (price.value != "") {
    let res = +price.value + +tasks.value + +ads.value - +discount.value;
    total.innerHTML = res;
    total.style.backgroundColor = "#040";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#a00d02";
  }
}

let dataProduct = [];
// console.log(dataProduct);
//create product
if (localStorage.getItem("products") != null) {
  dataProduct = JSON.parse(localStorage.getItem("products"));
  // console.log(dataProduct);
}
// console.log(dataProduct);

submit.onclick = function () {
  let product = {
    title: title.value,
    price: price.value,
    tasks: tasks.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  // console.log(product);
  // console.log(dataProduct);
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    count.value <= 100
  ) {
    if (mood === "create") {
      if (product.count > 1) {
        for (let i = 0; i < product.count; i++) {
          dataProduct.push(product);
          clearData();
        }
      } else {
        dataProduct.push(product);
        clearData();
      }
    } else {
      dataProduct[temp] = product;
      mood = "create";
      submit.innerHTML = "Add";
      count.style.display = "block";
      total.style.backgroundColor = "#a00d02";
      clearData();
    }
  }
  // dataProduct.push(product);
  localStorage.setItem("products", JSON.stringify(dataProduct));
  showData();
  // console.log(dataProduct);
};

//clear data
function clearData() {
  title.value = "";
  price.value = "";
  tasks.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

//show data
function showData() {
  getTotal();
  // console.log(dataProduct);
  let table = "";
  for (let i = 0; i < dataProduct.length; i++) {
    table += `
    <tr>
      <td>${i + 1}</td>
      <td>${dataProduct[i].title}</td>
      <td>${dataProduct[i].price}</td>
      <td>${dataProduct[i].tasks}</td>
      <td>${dataProduct[i].ads}</td>
      <td>${dataProduct[i].discount}</td>
      <td>${dataProduct[i].total}</td>
      <td>${dataProduct[i].category}</td>
      <td><button onclick="updateData(${i})" id ="update">Update</button></td>
      <td><button onclick="deleteData(${i})" id ="delete">Delete</button></td>
      </tr>
    `;
    // console.log(table);
  }
  document.getElementById("tbody").innerHTML = table;
  let btnDelete = document.getElementById("delete-all");

  if (dataProduct.length > 0) {
    btnDelete.innerHTML = `
    <button onclick="deleteAll()" id="delete-all" > Delete All (${dataProduct.length}) </button>
    `;
  } else {
    btnDelete.innerHTML = "";
  }
  if (total.innerHTML == "") {
    total.style.backgroundColor = "#a00d02";
  }
}
// localStorage.clear();
showData();

//delete data

function deleteData(i) {
  dataProduct.splice(i, 1);
  // localStorage.setItem("products", JSON.stringify(dataProduct));
  localStorage.products = JSON.stringify(dataProduct);
  showData();
}

//delete All

function deleteAll() {
  dataProduct = [];
  // dataProduct.splice(0)
  localStorage.clear();
  showData();
}
function updateData(i) {
  // console.log(i);
  title.value = dataProduct[i].title;
  price.value = dataProduct[i].price;
  tasks.value = dataProduct[i].tasks;
  ads.value = dataProduct[i].ads;
  discount.value = dataProduct[i].discount;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "Update";
  category.value = dataProduct[i].category;
  // dataProduct[i].title = dataProduct[i].title;
  mood = "update";
  temp = i;
  scroll({
    behavior: "smooth",
    top: 0,
  });

  // showData();
  // console.log(dataProduct[i]);
}

var searchMood = "title";

function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "search-title") {
    searchMood = "title";
    search.placeholder = "Search by Title";
  } else {
    searchMood = "category";
    search.placeholder = "Search by Category";
  }
  search.focus();
  search.value = "";
  showData();
  // console.log(searchMood);
}
function searchData(value) {
  let table = "";
  if (searchMood == "title") {
    for (let i = 0; i < dataProduct.length; i++) {
      if (dataProduct[i].title.toLowerCase().includes(value.toLowerCase())) {
        table += `
        <tr>
          <td>${i}</td>
          <td>${dataProduct[i].title}</td>
          <td>${dataProduct[i].price}</td>
          <td>${dataProduct[i].tasks}</td>
          <td>${dataProduct[i].ads}</td>
          <td>${dataProduct[i].discount}</td>
          <td>${dataProduct[i].total}</td>
          <td>${dataProduct[i].category}</td>
          <td><button onclick="updateData(${i})" id ="update">Update</button></td>
          <td><button onclick="deleteData(${i})" id ="delete">Delete</button></td>
          </tr>
        `;
      }
    }
  } else {
    for (let i = 0; i < dataProduct.length; i++) {
      if (dataProduct[i].category.toLowerCase().includes(value.toLowerCase())) {
        table += `
        <tr>
          <td>${i}</td>
          <td>${dataProduct[i].title}</td>
          <td>${dataProduct[i].price}</td>
          <td>${dataProduct[i].tasks}</td>
          <td>${dataProduct[i].ads}</td>
          <td>${dataProduct[i].discount}</td>
          <td>${dataProduct[i].total}</td>
          <td>${dataProduct[i].category}</td>
          <td><button onclick="updateData(${i})" id ="update">Update</button></td>
          <td><button onclick="deleteData(${i})" id ="delete">Delete</button></td>
          </tr>
        `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
