const express = require("express");

const ctrl = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers/");
const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/contacts");
const { isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getById));

router.post("/", validateBody(schemas.joiSchema), ctrlWrapper(ctrl.add));

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.remove));

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.joiSchema),
  ctrlWrapper(ctrl.update)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.patchFavorite)
);
module.exports = router;
