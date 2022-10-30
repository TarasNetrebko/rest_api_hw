const express = require("express");

const router = express.Router();
const ctrl = require("../../controllers/auth");
const { schemas } = require("../../models/user");
const { validateBody, authenticate } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");

router.post(
  "/signup",
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrl.signup)
);
router.post(
  "/signin",
  validateBody(schemas.loginSchema),
  ctrlWrapper(ctrl.signin)
);
router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));
router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));
router.patch(
  "/users",
  authenticate,
  validateBody(schemas.subUpdateSchema),
  ctrlWrapper(ctrl.subUpdate)
);
module.exports = router;
