const express = require("express");
const assetController = require("../controllers/asset.controller");
// const {verifyToken} = require("../middleware/verifyToken");
const allowedTo = require("../middleware/allowedTo");
const userRoles = require("../utils/userRoles")

const router = express.Router();


// .post(verifyToken, allowedTo(userRoles.MANAGER), assetController.addAsset);

router
  .route("/").get(assetController.getAssets)
  .post( assetController.addAsset);

router
  .route("/:id")
  .get(assetController.getAsset)
  .patch(assetController.updateAsset)
  .delete(assetController.deleteAsset);

module.exports = router;
 
