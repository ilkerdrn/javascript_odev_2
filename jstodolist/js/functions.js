const ul_DOM = document.getElementById("list");
const toastLive = document.getElementById("liveToast");
const toastTitle = document.querySelector("#toast-title");
const toastMsg = document.querySelector(".toast-body");
const toastImg = document.querySelector("#toast-img");
const newTask = document.querySelector("#task");

// Şayet querySelectorAll("li") deseydik yalnızca statik elementleri alırdı
let liCollection = document.getElementsByTagName("li");
let taskListLS = [];

function updateLocalStorage() {
  for (let t = 0; t < liCollection.length; t++) {
    taskListLS.push(liCollection[t].innerText);
  }
  localStorage.setItem("tList", JSON.stringify(taskListLS));
}

updateLocalStorage();

function newElement() {
  if (newTask.value.trim()) {
    const li_DOM = document.createElement("li");
    li_DOM.innerHTML = `${newTask.value}<button type="button" onclick="deleteItem(this)" class="btn-close float-end" aria-label="Close"></button>`;
    li_DOM.setAttribute("onclick", "changeCls(this)");
    ul_DOM.appendChild(li_DOM);
    localStorage.clear();
    taskListLS = [];
    updateLocalStorage();
    toastImg.setAttribute("src", "img/emoji-smile-upside-down.svg");
    toastTitle.classList.remove("text-danger");
    toastTitle.classList.remove("text-primary");
    toastTitle.classList.add("text-success");
    toastTitle.innerText = "BİNGO!";
    toastMsg.innerText = "Görev başarıyla listeye eklendi.";
    btnMarkAll.disabled = false;
    btnDeleteAll.disabled = false;
  } else {
    toastImg.setAttribute("src", "img/emoji-dizzy.svg");
    toastTitle.classList.remove("text-success");
    toastTitle.classList.remove("text-primary");
    toastTitle.classList.add("text-danger");
    toastTitle.innerText = "OoOoo!..";
    toastMsg.innerText = "Olmayan bir görevi yapamazsın";
  }
  const toast = new bootstrap.Toast(toastLive);
  toast.show();
  newTask.value = "";
}

function changeCls(obj) {
  obj.classList.toggle("checked");
}

function deleteItem(item) {
  item.parentNode.remove();
  localStorage.clear();
  taskListLS = [];
  updateLocalStorage();
}

const btnMarkAll = document.querySelector("#btnMarkAll");
const btnDeleteAll = document.querySelector("#btnDelAll");

function markAll() {
  if (btnMarkAll.innerText == "Günü Kurtardım") {
    for (let i = liCollection.length - 1; i >= 0; --i) {
      liCollection[i].classList.add("checked");
    }
    btnMarkAll.classList.remove("btn-success");
    btnMarkAll.classList.add("btn-secondary");
    btnMarkAll.innerText = "Nerdeeee :(";
  } else {
    for (let i = liCollection.length - 1; i >= 0; --i) {
      liCollection[i].classList.remove("checked");
    }
    btnMarkAll.classList.remove("btn-secondary");
    btnMarkAll.classList.add("btn-success");
    btnMarkAll.innerText = "Günü Kurtardım";
  }
}

function deleteTaskList() {
  let text =
    "UYARI!\nListenin tamamı silinecek. Bu işlem geri alınamaz. Emin misiniz?";
  if (confirm(text)) {
    for (let i = liCollection.length - 1; i >= 0; --i) {
      liCollection[i].remove();
    }
    localStorage.clear();
    taskListLS = [];
    toastImg.setAttribute("src", "img/trash3.svg");
    toastTitle.classList.remove("text-success");
    toastTitle.classList.remove("text-danger");
    toastTitle.classList.add("text-primary");
    toastTitle.innerText = "AJANDAN TERTEMİZ";
    toastMsg.innerText = "Listen tamamen silindi";
    const toast = new bootstrap.Toast(toastLive);
    toast.show();
    newTask.value = "";

    btnMarkAll.disabled = true;
    btnDeleteAll.disabled = true;
  }
}
