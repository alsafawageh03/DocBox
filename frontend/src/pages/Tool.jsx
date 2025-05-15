import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Tool = () => {
  const { assetID } = useParams();
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        console.log(assetID);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/assets/${assetID}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch asset.");
        }

        
        setAsset(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAsset();
  }, [assetID]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!asset) return <div className="text-center mt-10 text-gray-500">Asset not found</div>;

  return (
    <div className="asset-details p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-4 text-teal-700">{asset.assetName}</h1>
      <p className="mb-2"><strong>Description:</strong> {asset.description}</p>
      <p className="mb-2"><strong>Asset ID:</strong> {asset.assetID}</p>
      <p className="mb-2"><strong>Type:</strong> {asset.type}</p>
      <p className="mb-2"><strong>Status:</strong> {asset.assetStatus}</p>
      <p className="mb-2"><strong>Category:</strong> {asset.category}</p>
      
    </div>
  );
};

export default Tool;

