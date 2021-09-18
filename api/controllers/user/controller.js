const users = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
  },
];

//CRUD API
const getUser = (req, res) => {
  res.status(200).send(users);
};

const getUserById = (req, res) => {
  const id = req.params.id;
  const user = users.find((e) => e.id == id);
  if (!user) {
    return res.status(404).send({
      message: "user not found",
      data: {},
    });
  }
  res.status(200).send({
    message: "fetched successfully ",
    data: user,
  });
};

const CreatUser = (req, res) => {
  console.log(req.body);
  const newuser = { ...req.body, id: users.length + 1 };
  users.push(newuser);
  res.status(201).send(newuser);
};

const updateUser = (req, res) => {
  const id = req.params.id;
  const index = users.findIndex((e) => e.id == id);
  if (index < 0) {
    return res.status(404).send({ message: "user not found", data: {} });
  }
  users[index] = {
    id: users[index].id,
    ...req.body,
  };
  res.status(200).send({
    message: "User Updated Successfully",
    data: users[index],
  });
};

const deleteUser = (req, res) => {
  const id = req.params.id;
  const index = users.findIndex((e) => e.id == id);
  if (index < 0)
    return res.status(404).send({
      message: "user not found",
      data: {},
    });
  users.splice(index, 1);
  res.status(200).send({ message: "user deleted successfuly", data: {} });
};

module.exports = {
  getUser,
  getUserById,
  CreatUser,
  updateUser,
  deleteUser,
};
