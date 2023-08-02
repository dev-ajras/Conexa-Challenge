import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userService = {
  getUser: async (email: string) => {
    return await User.findOne({ email });
  },
  registerUser: async (email: string, password: string, admin: boolean) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        email,
        password: hashedPassword,
        isAdmin: admin,
      });
      await newUser.save();
      return true;
    } catch (error) {
      console.log(error);
      return;
    }
  },
  loginUser: async (email: string, password: string) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return null;
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return null;
      }

      const token = jwt.sign(
        { email: user.email, isAdmin: user.isAdmin },
        process.env.SECRET_JWT!,
        {
          expiresIn: "1h",
        }
      );

      return token;
    } catch (error) {
      console.log(error);
      return;
    }
  },
};

export default userService;
