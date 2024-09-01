// Importações
import express from "express";

const userRouter = express.Router();

import {allUsers,authenticateUser,createUser,deleteUser,updateUser} from "../controllers/userController.js";

import { verifyTokenUser } from "../middlewares/verifiryTokenUser.js";

userRouter.get("/list",allUsers);
userRouter.post("/create", createUser);
userRouter.post("/login",authenticateUser);
userRouter.put("/update",verifyTokenUser,updateUser);
userRouter.delete("/delete",verifyTokenUser,deleteUser);

export default userRouter;