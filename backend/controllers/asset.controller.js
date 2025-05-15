const httpStatusText = require("../utils/httpStatusText");
const Asset = require("../models/asset");
const appError = require("../utils/appError");
const asyncWrapper = require("../utils/asyncWrapper")

// GET all assets
const getAssets = asyncWrapper(async (req, res, next) => {
 
    const query = req.query;
    console.log(query);

    const limit = parseInt(query.limit) || 10;
    const page =  parseInt(query.page) || 1;
    const skip = (page - 1) * limit;
    const allAssets = await Asset.find({}, { __v: false })
      .limit(limit)
      .skip(skip);
    res
      .status(200)
      .json({ status: httpStatusText.SUCCESS, data: { assets: allAssets } });
  
});

// GET an asset
const getAsset = asyncWrapper(async (req, res, next) => {

    const asset = await Asset.findById(req.params.id);
    if (!asset) {
      const error = appError.create(
        "Asset not found",
        404,
        httpStatusText.FAIL
      );
      return next(error);
    }
    res.status(200).json({ status: httpStatusText.SUCCESS, data: asset });
  
})

// Add a new asset
const addAsset =asyncWrapper (async (req, res, next) => {
  const {
    type,
    assetName,
    assetID,
    assetStatus,
    description,
    category,
    serialNumber,
    manufacturer,
    company,
    impact,
    systemRole,
    urgency,
    region,
  } = req.body;

 
    // ckeck validation inputs
    if (
      !type ||
      !assetName ||
      !assetID ||
      !assetStatus ||
      !description ||
      !category||
      !serialNumber
    ) {
      const error = appError.create(
        "Ensure entering required data",
        400,
        httpStatusText.FAIL
      );
      return next(error);
    }

    // check about the serialNumder
    const existingAsset = await Asset.findOne({ serialNumber });

    if (existingAsset) {
      const error = appError.create(
        "asset already exists",
        400,
        httpStatusText.FAIL,
      );
      return next(error);
    }

    // add the new asset to database
    const newAsset = await Asset.create(req.body );

    res.status(201).json({
      status: httpStatusText.SUCCESS,
      message: "asset added successfully",
      data: newAsset,
    });
})

// Update an asset
const updateAsset = asyncWrapper(async (req, res, next) => {

  const _id = req.params.Id
 
    const asset = await Asset.findById(_id);
    if (!asset) {
      const error = appError.create(
        "Asset not found",
        404,
        httpStatusText.FAIL
      );
      return next(error);
    }

    const updatedAsset = await Asset.updateOne({ _id }, { ...req.body });
    console.log( updateAsset)
    res
      .status(200)
      .json({ status: httpStatusText.SUCCESS, data: { _id , updatedAsset } });
  } )


// Delete an asset
const deleteAsset = asyncWrapper(async (req, res, next) => {

  const asset = await Asset.findByIdAndDelete(req.params.id);

  if (!asset) {
    const error = appError.create("Asset not found", 404, httpStatusText.FAIL);
    return next(error);
  }

  await Asset.deleteOne({ assetID: req.params.Id });

  console.log(req.params)
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "Asset deleted successfully",
  });
});




module.exports = { getAssets, getAsset, addAsset, updateAsset, deleteAsset };
