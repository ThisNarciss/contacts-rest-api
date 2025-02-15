const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/auth");
const ctrlEmail = require("../../controllers/email");
const { authenticate, upload } = require("../../middlewares");

router.post("/register", ctrl.registration);
router.post("/login", ctrl.login);
router.post("/logout", authenticate, ctrl.logout);
router.get("/current", authenticate, ctrl.getCurrent);
router.patch("/", authenticate, ctrl.updateSub);
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateUserAvatar
);
router.get("/verify/:verificationToken", ctrlEmail.verifyUserEmail);
router.post("/verify", ctrlEmail.repeatedVerify);

module.exports = router;
