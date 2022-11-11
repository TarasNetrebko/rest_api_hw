const express = require("express");

const router = express.Router();
const ctrl = require("../../controllers/auth");
const { schemas } = require("../../models/user");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");

router.post(
  "/signup",
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrl.signup)
);
router.get("users/verify/:verificationToken", ctrlWrapper(ctrl.verify));
router.post(
  "users/verify",
  validateBody(schemas.verifyEmailSchema),
  ctrlWrapper(ctrl.resendEmail)
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
router.patch(
  "users/avatars",
  authenticate,
  upload.single("avatars"),
  ctrlWrapper(ctrl.updateAvatar)
);
module.exports = router;
