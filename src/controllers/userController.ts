import { Router, Request, Response } from "express";
import { messages } from "../constants/messages";
import userService from "../services/userService";

const router: Router = Router();

router.post("/register", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: messages.PASSWORD_EMAIL_REQUIRED });

  const exist = await userService.getUser(email);
  if (exist) return res.status(409).json({ error: messages.EXISTING_USER });

  const register = await userService.registerUser(email, password, false);

  if (register)
    return res.status(201).json({ message: messages.SUCCESFULLY_REGISTERED });

  return res.status(500).json({ error: messages.ERROR_SERVER });
});

router.post("/register-admin", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: messages.PASSWORD_EMAIL_REQUIRED });

  const exist = await userService.getUser(email);
  if (exist) return res.status(409).json({ error: messages.EXISTING_USER });

  const register = await userService.registerUser(email, password, true);

  if (register)
    return res.status(201).json({ message: messages.SUCCESFULLY_REGISTERED });

  return res.status(500).json({ error: messages.ERROR_SERVER });
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const token = await userService.loginUser(email, password);
  if (!token)
    return res.status(404).json({ error: messages.INVALID_CREDENTIALS });

  return res.status(200).json({ token });
});

export default router;
