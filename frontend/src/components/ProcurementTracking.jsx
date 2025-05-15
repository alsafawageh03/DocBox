import React from "react";
import styles from "../styles/future.module.css";

// Mock procurement data
const procurementData = [
  {
    id: 1,
    itemType: "X-ray Machine",
    department: "Radiology",
    quantity: 2,
    urgency: "High",
    status: "Pending Approval",
    requestedBy: "Dr. Smith",
    dateRequested: "2025-05-10",
  },
  {
    id: 2,
    itemType: "Patient Monitor",
    department: "ICU",
    quantity: 5,
    urgency: "Medium",
    status: "Ordered",
    requestedBy: "Nurse Johnson",
    dateRequested: "2025-05-05",
  },
  {
    id: 3,
    itemType: "Defibrillator",
    department: "ER",
    quantity: 1,
    urgency: "Critical",
    status: "Shipped",
    requestedBy: "Dr. Williams",
    dateRequested: "2025-04-28",
  },
];

const ProcurementTracking = () => {
  return (
    <div className={styles.cardContainer}>
      {procurementData.map((item) => (
        <div
          key={item.id}
          className={`${styles.procurementCard} ${
            item.urgency === "Critical"
              ? styles.criticalCard
              : item.urgency === "High"
              ? styles.highCard
              : styles.mediumCard
          }`}
        >
          <div className={styles.cardHeader}>
            <h3>{item.itemType}</h3>
            <span
              className={`${styles.urgencyBadge} ${
                item.urgency === "Critical"
                  ? styles.critical
                  : item.urgency === "High"
                  ? styles.high
                  : styles.medium
              }`}
            >
              {item.urgency}
            </span>
          </div>
          <div className={styles.cardDetails}>
            <p>
              <strong>Department:</strong> {item.department}
            </p>
            <p>
              <strong>Quantity:</strong> {item.quantity}
            </p>
            <p>
              <strong>Status:</strong> {item.status}
            </p>
            <p>
              <strong>Requested By:</strong> {item.requestedBy}
            </p>
            <p>
              <strong>Date Requested:</strong> {item.dateRequested}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProcurementTracking;
