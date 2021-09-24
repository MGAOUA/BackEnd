const todos = [
  {
    id: 1,
    task: "Do something",
    completed: false,
  },
  {
    id: 2,
    task: "Do something else",
    completed: true,
  },
];

const getTodos = (req, res) => {
  res.status(200).send({
    message: "Fetched successfully",
    data: todos,
  });
};

const getTodoById = (req, res) => {
  const id = req.params.id;
  const todo = todos.find((elem) => elem.id == id);
  if (!todo) {
    return res.status(404).send({
      message: "todo not found",
      data: {},
    });
  }
  res.status(200).send({
    message: "Fetched successfully",
    data: todo,
  });
};

const createTodo = (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    ...req.body,
  };
  todos.push(newTodo);
  res.status(201).send({
    message: "User created successfully",
    data: newTodo,
  });
};

const updateTodo = (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((elem) => elem.id == id);
  if (index < 0) {
    return res.status(404).send({
      message: "User not found",
      data: {},
    });
  }
  todos[index] = {
    id: todos[index].id,
    ...req.body,
  };
  res.status(200).send({
    message: "User updated successfully",
    data: todos[index],
  });
};

const patchTodo = (req, res) => {
  const action = req.query.action;
  const id = req.params.id;
  const index = todos.findIndex((elem) => elem.id == id);
  if (index < 0) {
    return res.status(404).send({
      message: "User not found",
      data: {},
    });
  }
  switch (action) {
    case "done":
      todos[index] = {
        ...todos[index],
        completed: true,
      };
      break;
    case "undone":
      todos[index] = {
        ...todos[index],
        completed: false,
      };
      break;
    default:
      break;
  }
  res.status(200).send({
    message: "Todo patched successfully",
    data: todos[index],
  });
};

const deleteTodo = (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((elem) => elem.id == id);
  if (index < 0) {
    return res.status(404).send({
      message: "User not found",
      data: {},
    });
  }
  todos.splice(index, 1);
  res.status(200).send({
    message: "User deleted successfully",
    data: {},
  });
};

module.exports = {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  patchTodo,
  deleteTodo,
};
