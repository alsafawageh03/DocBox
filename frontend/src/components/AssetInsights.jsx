import React from 'react';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';
import { manageDate } from '../assets/manageData';
import styles from '../styles/future.module.css';

const AssetInsights = () => {
  // Prepare data for charts
  const urgencyData = [
    { name: 'Critical', value: manageDate.filter(a => a.impact === 'critical').length },
    { name: 'High', value: manageDate.filter(a => a.urgency === 'High').length },
    { name: 'Normal', value: manageDate.filter(a => a.urgency === 'normal').length }
  ];

  const categoryData = manageDate.reduce((acc, asset) => {
    const existing = acc.find(item => item.name === asset.category);
    if (existing) {
      existing.value++;
    } else {
      acc.push({ name: asset.category, value: 1 });
    }
    return acc;
  }, []);

  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

  return (
    <div className={styles.insightsContainer}>
      <div className={styles.chartRow}>
        <div className={styles.chartContainer}>
          <h3>Assets by Urgency Level</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={urgencyData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {urgencyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className={styles.chartContainer}>
          <h3>Assets by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8">
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className={styles.attentionList}>
        <h3>Assets Needing Attention</h3>
        <ul>
          {manageDate
            .filter(asset => asset.impact === 'critical' || asset.urgency === 'High')
            .map(asset => (
              <li key={asset.assertID} className={styles.attentionItem}>
                <span className={styles.assetName}>{asset.assetName}</span>
                <span className={styles.assetId}>ID: {asset.assetID}</span>
                <span className={styles.assetCategory}>{asset.category}</span>
                <span className={`${styles.assetUrgency} ${
                  asset.impact === 'critical' ? styles.critical : styles.high
                }`}>
                  {asset.impact === 'critical' ? 'Critical' : 'High Urgency'}
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default AssetInsights;