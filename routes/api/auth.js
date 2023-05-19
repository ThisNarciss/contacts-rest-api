const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/auth");

router.post("/register", ctrl.registration);
router.post("/login", ctrl.login);
router.post("/logout", ctrl.logout);
router.get("/current", ctrl.getCurrent);

module.exports = router;
