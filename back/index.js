const express = require("express"); // es5
const cors = require("cors"); // import cors from "cors"
const app = express();
app.use(cors());
app.use(express.json());

let todos = [
  {
    id: 1,
    completed: true,
    description: "Uxlamayman darsda",
    username: "Backend",
  },
  {
    id: 2,
    completed: false,
    description: "Uxlayman uyda",
    username: "Backend",
  },
  {
    id: 3,
    completed: true,
    description: "Vazifani qilaman",
    username: "Backend",
  },
];

// http://localhost:3000/todos -> GET
app.get("/todos", (req, res) => {
  res.send(todos);
});

// http://localhost:3000/todos/todoID -> DELETE
app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  todos = todos.filter((todo) => todo.id !== +id);
  res.send(todos);
});

app.post("/todos", (req, res) => {
  const description = req.body.description;
  const username = req.body.username;
  const todo = {
    id: todos.length + 1,
    completed: false,
    description,
    username,
  };
  console.log("todo = ", todo);
  todos.push(todo);
  res.send(todos);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
