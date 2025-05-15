const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({
  type: { type: String, required: true },
  assetName: { type: String, required: true },
  image: { type: String },
  assetID: { type: String, required: true },
  assetStatus: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  serialNumber: { type: String },
  manufacturer: { type: String },
  company: { type: String },
  impact: { type: String },
  systemRole: { type: String },
  urgency: { type: String },
  region: { type: String },
});

module.exports = mongoose.model("Asset", assetSchema);

// {
//     type,assetName,image, assetID,aseetStatus, description, category, serialNumber, manfacturer, company, impact, systemRole, urgency, region
// }
