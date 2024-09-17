import jwt from "jsonwebtoken";

const getUser = async (token: string) => {
  try {
    if (token) {
      const user = jwt.verify(token, process.env.JWT_SECRET!);
      return user;
    }
    return null;
  } catch (error) {
    return null;
  }
};

const context = async ({ req, res }: any) => {
  if (req.body.operationName === "IntrospectionQuery") {
    return {};
  }

  if (req.body.operationName === "SignUp" || req.body.operationName === "Login")
    return {};

  const token = req.headers.token;

  const user = await getUser(token);

  if (!user) throw new Error("User is not Authenticated")

  return { user };
};

export default context;
