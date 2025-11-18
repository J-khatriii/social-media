import express from "express";
import { acceptConnectionRequest, dicoverUsers, followUser, getUserConnections, getUserData, getUserProfiles, sendConnectionRequest, unfollowUser, updateUserData } from "../controllers/userController.js";
import { protect } from "../middlewares/auth.js";
import { upload } from "../config/multer.js";

const userRouter = express.Router();

userRouter.get("/data", protect, getUserData);
userRouter.post("/update", upload.fields([{name: "Profile", maxCount: 1}, {name: "cover", maxCount: 1}]), protect, updateUserData);
userRouter.post("/discover", protect, dicoverUsers);
userRouter.post("/follow", protect, followUser);
userRouter.post("/unfollow", protect, unfollowUser);
userRouter.post("/connect", protect, sendConnectionRequest);
userRouter.post("/accept", protect, acceptConnectionRequest);
userRouter.get("/connections", protect, getUserConnections);
userRouter.post("/profiles", getUserProfiles);

export default userRouter;