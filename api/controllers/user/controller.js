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
const getUser = async (req, res) => {
  const getUsers = await User.find();
  res.status(200).send({ message: "fetched successfuly", data: { getUsers } });
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
const getUserByIdFromBDD = async (req, res) => {
  const id = req.params.id;
  //const user = await User.find({ _id: id }); // give an array as result
  const user = await User.findOne({ _id: id });
  if (!user) {
    return res.status(404).send({ message: "User not found", data: {} });
  }
  res.status(200).send({ message: "fetch sucess", data: user });
};

const User = require("../../../models/user");
const CreatUser = async (req, res) => {
  // console.log(req.body);
  // const newuser = { ...req.body, id: users.length + 1 };
  // users.push(newuser);

  const newUser = new User({ ...req.body });
  await newUser.save();
  res
    .status(201)
    .send({ message: "user created successfuly", data: { newUser } });
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

const UpdateUserFormBdd = async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ _id: id });
  if (!user) {
    return res.status(404).send({ message: "User not found", data: {} });
  }

  const UpdatedUser = await User.updateOne({ _id: id }, { ...req.body });
  res
    .status(200)
    .send({ message: "user updated from BDD successfyly", data: UpdatedUser });
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

const deleteUserFromBdd = async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ _id: id });
  if (!user) {
    return res.status(404).send({ message: "not found", data: {} });
  }
  const deleteUser = await User.deleteOne({ _id: id });
  res.status(200).send({ message: "user deleted successfuly", data: {} });
};
module.exports = {
  getUser,
  getUserById,
  getUserByIdFromBDD,
  UpdateUserFormBdd,
  CreatUser,
  updateUser,
  deleteUser,
  deleteUserFromBdd,
};
