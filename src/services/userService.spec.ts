import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userService from "./userService";
import User from "../models/User";

jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../models/User", () => ({
  findOne: jest.fn(),
  prototype: { save: jest.fn() },
}));

describe("userService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should login a user and return a token", async () => {
    const email = "test@example.com";
    const password = "testpassword";

    const mockUser = {
      email: "test@example.com",
      password: "hashedPassword",
      isAdmin: false,
    };

    (User.findOne as jest.Mock).mockResolvedValue(mockUser);

    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const token = "mockToken";
    (jwt.sign as jest.Mock).mockReturnValue(token);

    const result = await userService.loginUser(email, password);

    expect(User.findOne).toHaveBeenCalledWith({ email });
    expect(bcrypt.compare).toHaveBeenCalledWith(password, mockUser.password);
    expect(jwt.sign).toHaveBeenCalledWith(
      { email: mockUser.email, isAdmin: mockUser.isAdmin },
      process.env.SECRET_JWT!,
      {
        expiresIn: "1h",
      }
    );
    expect(result).toBe(token);
  });
  it("should register a new user", async () => {
    const email = "test@example.com";
    const password = "testpassword";
    const admin = false;

    const hashedPassword = "hashedPassword";

    // Mock bcrypt.hash()
    (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

    await userService.registerUser(email, password, admin);

    expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
  });
});
