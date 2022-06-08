"use strict";
const thead = document.querySelector("thead");
const tbody = document.querySelector("tbody");
const loadTodosBtn = document.getElementById("load-todos-btn");

const loginZone = document.querySelector(".login-zone");
const todoZone = document.querySelector(".todo-zone");

const addTodoBtn = document.getElementById("add-todo-btn");
const descriptionInput = document.getElementById("description-input");

const loginForm = document.getElementById("login-form");
const usernameInput = document.getElementById("username-input");

const url = "http://localhost:3000/todos";
let username = "";

// AJAX
// function getTodos() {
//   let httpRequest = new XMLHttpRequest();

//   console.log("Loading...");

//   httpRequest.addEventListener("load", function () {
//     console.log("Loaded");

//     const todos = JSON.parse(this.responseText); // parse JSON
//     renderTodos(todos);
//   });

//   httpRequest.open("GET", url);
//   httpRequest.send();
// }

// FETCH web api
async function getTodos() {
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log("data = ", data);
  } catch (err) {
    console.error(err.message);
  }
}

async function createTodo(description) {
  try {
    const res = await fetch(url, { method: "POST" });
    const data = await res.json();
    renderTodos(data);
  } catch (err) {
    console.log(err.message);
  }

  // let httpRequest = new XMLHttpRequest();
  // httpRequest.addEventListener("load", function () {
  //   console.log(this.responseText);
  //   const todos = JSON.parse(this.responseText); // parse JSON
  //   renderTodos(todos);
  // });

  // httpRequest.open("POST", url);
  // httpRequest.setRequestHeader("Content-Type", "application/json");
  // httpRequest.send(JSON.stringify({ description, username }));
}

async function deleteTodo(todoID) {
  try {
    const res = await fetch(url + `/${todoID}`, { method: "DELETE" });
    const data = await res.json();
    renderTodos(data);
  } catch (err) {
    console.error(err.message);
  }

  // let httpRequest = new XMLHttpRequest();

  // httpRequest.addEventListener("load", function () {
  //   console.log("Loaded");
  //   const todos = JSON.parse(this.responseText); // parse JSON
  //   renderTodos(todos);
  // });
  // httpRequest.open("DELETE", url + `/${todoID}`);
  // httpRequest.send();
}

function renderTodos(todos = []) {
  tbody.innerHTML = "";

  for (let todo of todos) {
    const tableRow = document.createElement("tr");

    tableRow.appendChild(createTD(todo.id));
    tableRow.appendChild(createTD(todo.description));
    tableRow.appendChild(createTD(todo.username));
    tableRow.appendChild(createTD(todo.completed));
    tableRow.appendChild(
      createTD(
        `<button>Edit</button><button onclick="deleteTodo('${todo.id}')" >Delete</button><button>Toggle</button>`,
        true
      )
    );

    tbody.appendChild(tableRow);
  }
}

function createTD(text, withInnerHTML = false) {
  const td = document.createElement("td");
  if (withInnerHTML) td.innerHTML = text;
  else td.innerText = text;
  return td;
}

function toggleZone(showZone, hideZone) {
  showZone.classList.remove("hide");
  hideZone.classList.add("hide");
}

loadTodosBtn.addEventListener("click", getTodos);

addTodoBtn.addEventListener("click", () => {
  const description = descriptionInput.value.trim();

  if (!description) return alert("Todo ni kiriting");
  createTodo(description);
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = usernameInput.value.trim();

  if (!value) return alert("Username ni kiriting");
  username = value;
  toggleZone(todoZone, loginZone);
});
