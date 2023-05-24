const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/auth");
const { authenticate } = require("../../middlewares");

router.post("/register", ctrl.registration);
router.post("/login", ctrl.login);
router.post("/logout", authenticate, ctrl.logout);
router.get("/current", authenticate, ctrl.getCurrent);
router.patch("/", authenticate, ctrl.updateSub);

module.exports = router;
