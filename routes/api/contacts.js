const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { isValidId, authenticate } = require("../../middlewares");

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, ctrl.add);

router.delete("/:contactId", authenticate, isValidId, ctrl.del);

router.put("/:contactId", authenticate, isValidId, ctrl.update);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  ctrl.updateFavorite
);

module.exports = router;
