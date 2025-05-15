import React from "react";
import { manageDate } from "../assets/manageData";
import styles from "../styles/future.module.css";

const MaintenanceAlerts = () => {
  // Filter assets that might need maintenance (mock logic)
  const maintenanceAssets = manageDate
    .filter((asset) => asset.impact === "critical" || asset.urgency === "High")
    .map((asset) => ({
      ...asset,
      // Mock warranty date (in a real app, this would come from your data)
      warrantyDate: new Date(
        Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000
      ).toLocaleDateString(),
      nextMaintenance: new Date(
        Date.now() + Math.random() * 15 * 24 * 60 * 60 * 1000
      ).toLocaleDateString(),
    }));

  return (
    <div className={styles.tableContainer}>
      <table className={styles.dataTable}>
        <thead>
          <tr>
            <th>Asset Name</th>
            <th>Asset ID</th>
            <th>Warranty Until</th>
            <th>Next Maintenance</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {maintenanceAssets.map((asset) => (
            <tr key={asset.assetID}>
              <td>{asset.assetName}</td>
              <td>{asset.assetID}</td>
              <td>{asset.warrantyDate}</td>
              <td>{asset.nextMaintenance}</td>
              <td>
                <span
                  className={`${styles.statusBadge} ${
                    asset.impact === "critical"
                      ? styles.critical
                      : styles.warning
                  }`}
                >
                  {asset.impact === "critical" ? "Critical" : "Monitor"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaintenanceAlerts;
