const express = require("express");
const multer  = require('multer');

// const storageMulter = require("../../helpers/storageMulter");


const upload = multer();

const controller = require("../../controllers/admin/product.controller");
const validate = require("../../validates/admin/product.validate");
const router = express.Router();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
router.get("/", controller.index);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi", controller.changeMulti);
router.get("/create", controller.create);
router.post(
    "/create",
    upload.single("thumbnail"),
    uploadCloud.upload,
    validate.createPost,
    controller.createPost
  );
router.get("/edit/:id", controller.edit);
router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createPost,
  controller.editPatch
);
router.get("/detail/:id", controller.detail)
module.exports = router;