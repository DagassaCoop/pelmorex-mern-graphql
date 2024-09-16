import { GraphQLResolveInfo, GraphQLError } from "graphql";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

import UserModel from "../../db/models/user.model";

const saltRounds = 10

const userResolver = {
  Query: {
    async users(
      _: any,
      args: Record<string, any>,
      context: any,
      info: GraphQLResolveInfo
    ) {
      try {
        return await UserModel.find();
      } catch (error: any) {
        return new GraphQLError(error.message);
      }
    },
    async user(
      _: any,
      { id }: Record<string, string>,
      context: any,
      info: GraphQLResolveInfo
    ) {
      try {
        return await UserModel.findById(id);
      } catch (error: any) {
        return new GraphQLError(error.message);
      }
    },
    async authUser(_: any, args: Record<string, any>, { user }: { user: { id: string, email: string }}) {
      try {
        return await UserModel.findById(user.id);
      } catch (error: any) {
        return new GraphQLError(error.message);
      }
    }
  },
  Mutation: {
    async signUp(
      _: any,
      {
        input,
      }: Record<
        string,
        { username: string; email: string; password: string; status: string }
      >,
      context: any
    ) {
      const { username, email, password, status } = input;

      if (!username || !email || !password || !status)
        throw new Error("All fields must be defined");

      const userToCreate = await UserModel.create({
        username,
        email,
        password: await bcrypt.hash(password, saltRounds),
        status,
        createdAt: new Date()
      });
      const user = await userToCreate.save();

      const token = jsonwebtoken.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: process.env.TOKEN_EXPIRY_TIME }
      );

      const userWithToken = {
        user,
        userJwtToken: {
          token,
        },
      };

      return userWithToken;
    },
    async login(
      _: any,
      { input }: Record<string, { email: string; password: string }>
    ) {
      const { email, password } = input;

      if (!email || !password) throw new Error("All fields must be defined");

      const user = await UserModel.findOne({ email });

      if (!user) throw new Error("No user with that email");

      const validPassword = user.password === await bcrypt.hash(password, saltRounds)

      if (!validPassword) throw new Error("Incorrect password");

      const token = jsonwebtoken.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: process.env.TOKEN_EXPIRY_TIME }
      );

      const userWithToken = {
        user,
        userJwtToken: {
          token,
        },
      };

      return userWithToken;
    },
  },
};

export default userResolver;
