import React from 'react';
import styles from '../styles/future.module.css';
import MaintenanceAlerts from '../components/MaintenanceAlerts';
import ProcurementTracking from '../components/ProcurementTracking';
import AssetInsights from '../components/AssetInsights';

const Future = () => {
  return (
    <div className={styles.futureContainer}>
    
      <div className={styles.gridLayout}>
        <section className={styles.section}>
          <h2>Upcoming Maintenance & Lifecycle Alerts</h2>
          <MaintenanceAlerts />
        </section>
        
        <section className={styles.section}>
          <h2>Procurement & Request Tracking</h2>
          <ProcurementTracking />
        </section>
        
        <section className={`${styles.section} ${styles.insightsSection}`}>
          <h2>Asset Insights</h2>
          <AssetInsights />
        </section>
      </div>
    </div>
  );
};

export default Future;