import { useParams } from 'react-router-dom';
import { manageDate } from '../assets/manageData';
import "../styles/manage.css";

const AssetDetails = () => {
  const { assetID } = useParams();
  const asset = manageDate.find(item => item.assetID == (assetID));

  if (!asset) {
    return (
      <div className="text-center text-red-600 font-semibold mt-10">
        Asset not found.
      </div>
    );
  }

  return (
    <div className="asset-details p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-6 text-teal-800 border-b pb-2">
        {asset.assetName}
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={asset.image}
          alt={asset.assetName}
          className=" h-48 object-cover rounded-lg border"
        />

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <Detail label="Description" value={asset.description} />
          <Detail label="Asset ID" value={asset.assetID} />
          <Detail label="Type" value={asset.type} />
          <Detail label="Status" value={asset.aseetStatus} />
          <Detail label="Category" value={asset.category} />
          <Detail label="Serial Number" value={asset.serialNumber} />
          <Detail label="Manufacturer" value={asset.manfacturer} />
          <Detail label="Company" value={asset.company} />
          <Detail label="Impact" value={asset.impact} />
          <Detail label="System Role" value={asset.systemRole} />
          <Detail label="Urgency" value={asset.urgency} />
          <Detail label="Region" value={asset.region} />
        </div>
      </div>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <p>
    <span className="font-semibold">{label}:</span> {value}
  </p>
);

export default AssetDetails;
