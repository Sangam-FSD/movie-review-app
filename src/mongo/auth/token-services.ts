import { tokenModel } from "./model";

type TCreateTokenInput = {
  userId: string;
  token: string;
};
async function createToken(input: TCreateTokenInput) {
  const token = new tokenModel({
    user_id: input.userId,
    token: input.token,
  });
  await token.save();
}

type TDeleteTokenInput = {
  userId: string;
  token: string;
};

async function deleteToken(input: TDeleteTokenInput) {
  await tokenModel.deleteOne({
    user_id: input.userId,
    token: input.token,
  });
}

async function getToken(input: { token: string }) {
  const token = await tokenModel.findOne({
    token: input.token,
  });
  return token;
}

export const tokenService = {
  createToken,
  deleteToken,
  getToken,
};
