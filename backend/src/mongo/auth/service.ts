import { userModel } from "./model";

type TCreateUserInput = {
  username: string;
  email: string;
  password: string;
};
async function createUser(input: TCreateUserInput) {
  const user = new userModel({
    userName: input.username,
    password: input.password,
    email: input.email,
  });
  await user.save();
}

type TUpdateUserInput = {
  username: string;
  email: string;
  password: string;
};

async function updateUser(toUpdateUserId: string, input: TUpdateUserInput) {
  const user = await userModel.findById(toUpdateUserId);
  if (!user) {
    throw new Error("user not found");
  }

  await userModel.replaceOne({ _id: toUpdateUserId }),
    {
      username: input.username,
      email: input.email,
      password: input.password,
    };
}

type TDeleteUserInput = {
  username: string;
  email: string;
  password: string;
};

async function deleteUser(toDeleteUserId: string, input: TDeleteUserInput) {
  const user = await userModel.findById(toDeleteUserId);

  if (!user) {
    throw new Error("userId not found");
  }

  userModel.replaceOne({ _id: toDeleteUserId }),
    {
      username: input.username,
      email: input.email,
      password: input.password,
    };
}

async function getAllUser() {
  const user = await userModel.find();
  return user;
}

async function getUserByEmail(input: { email: string }) {
  const user = await userModel.findOne({
    email: input.email,
  });
  return user;
}

async function getUserById(userId: string) {
  const user = await userModel.findById(userId);
  return user;
}

export const userMongoService = {
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  getAllUser,
  getUserById,
};
