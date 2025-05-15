
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { manageDate } from "../assets/manageData";
import "../styles/manage.css";


const Manage = () => {
  const [assets, setAssets] = useState([]);
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmployee = localStorage.getItem("employee");
    if (storedEmployee) {
      const parsed = JSON.parse(storedEmployee);
      setEmployee(parsed);
    }
    // Set the assets (assuming manageDate is defined)
    setAssets(manageDate);
  }, []);

  // Conditional rendering based on the employee role
  if (!employee) {
    return <div>Loading profile...</div>;
  }

  if (employee.role.toLowerCase() !== "manager") {
    return (
      <div className="not-allowed-container">
        <div className="not-allowed-message">
          <h2>NOT ALLOWED TO YOU</h2>
        </div>
      </div>
    );
  }
  

  const handleCardClick = (assetID) => {
    navigate(`/dashboard/asset/${assetID}`);
  };
  

  return (
    <div className="manage-container">
      {/* <h1>Manage Assets</h1> */}
      <div className="assets-grid">
        {assets.map((asset) => (
          <div 
            key={asset.assetID} 
            className="asset-card"
            onClick={() => handleCardClick(asset.assetID)}
          >
            <img src={asset.image} alt={asset.assetName} className="asset-image" />
            <div className="asset-info">
              <h3>{asset.assetName}</h3>
              {/* <p>{asset.description}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Manage;