

import { useState,useEffect, useRef } from "react"
import { User, Mail, Edit2, Camera, MapPin, Building, ShoppingCart, Package, Clock, Bell } from 'lucide-react'
import '../styles/profile.css'
import { Link } from 'react-router-dom'

export default function MedicalToolsProfilePage() {
  const [profileImage, setProfileImage] = useState(null)
  const fileInputRef = useRef(null)
  const [employee, setEmployee] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setProfileImage(imageUrl)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  useEffect(() => {
    const storedEmployee = localStorage.getItem("employee");
    if (storedEmployee) {
      setEmployee(JSON.parse(storedEmployee));
    }
    console.log(storedEmployee)
  }, []);
  console.log(employee)
 
  if (!employee) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="card-header">
          <div className="cover-image"></div>
           <div className="profile-image-container">
            <div className="profile-image-wrapper">
              <div className="profile-avatar">
                <img
                  src={profileImage || "/placeholder.svg?height=128&width=128"}
                  alt="Profile"
                  className="avatar-image"
                />
                {!profileImage && (
                  <div className="avatar-fallback">
                    <User size={40} />
                  </div>
                )}
              </div>
              <button onClick={triggerFileInput} className="camera-button">
                <Camera size={18} />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="file-input"
              />
            </div>
          </div>
          <div className="hospital-badge">
            <Building className="hospital-icon" size={14} />
            <span>Al-Shifa Specialized Hospital</span>
          </div>
        </div>

        <div className="card-content">
          <div className="user-info">
            <div className="user-details">
              <h1 className="user-name">{employee.name}</h1>
              <div className="user-title">Medical Procurement {employee.role}</div>
              <div className="user-email">
                <Mail size={16} />
                <span>{employee.email}</span>
              </div>
              <div className="user-location">
                <MapPin size={16} />
                <span>Procurement Department - 2nd Floor</span>
              </div>
              <div className="user-badges">
                <span className="badge badge-role">Procurement</span>
                <span className="badge badge-role">Surgical Equipment</span>
                <span className="badge badge-access">Full Access</span>
              </div>
            </div>

            <div className="profile-actions">
              <button className="notification-button">
                <Bell className="button-icon" size={16} /> Notifications
                <span className="notification-badge">3</span>
              </button>
              <button className="edit-button">
                <Edit2 className="button-icon" size={16} /> Edit Profile
              </button>
            </div>
          </div>

          <div className="stats-summary">
            <div className="stat-summary-item">
              <div className="stat-summary-value">28</div>
              <div className="stat-summary-label">
                <ShoppingCart className="stat-icon" size={14} />
                <span>Ongoing Orders</span>
              </div>
            </div>
            <div className="stat-summary-item">
              <div className="stat-summary-value">143</div>
              <div className="stat-summary-label">
                <Package className="stat-icon" size={14} />
                <span>Completed Orders</span>
              </div>
            </div>
            <div className="stat-summary-item">
              <div className="stat-summary-value">12</div>
              <div className="stat-summary-label">
                <Clock className="stat-icon" size={14} />
                <span>Pending Orders</span>
              </div>
            </div>
            <div className="stat-summary-item">
              <div className="stat-summary-value">5</div>
              <div className="stat-summary-label">
                <Bell className="stat-icon" size={14} />
                <span>Inventory Alerts</span>
              </div>
            </div>
          </div>

          <div className="separator"></div>

          <div className="recent-orders-section">
            <h2 className="section-title">Recent Orders</h2>
            <div className="medical-tools">
              <div className="medical-tool-item">
                <div className="medical-tool-image"></div>
                <div className="medical-tool-info">
                  <div className="medical-tool-title">Multi-Parameter Patient Monitor</div>
                  <div className="medical-tool-details">
                    <span className="tool-id">Order ID: MT-7829</span>
                    <span className="tool-status status-processing">Processing</span>
                    <span className="tool-date">Order Date: 15/05/2023</span>
                  </div>
                </div>
              </div>
              <div className="medical-tool-item">
                <div className="medical-tool-image second-tool"></div>
                <div className="medical-tool-info">
                  <div className="medical-tool-title">Cardiac Surgical Instrument Set</div>
                  <div className="medical-tool-details">
                    <span className="tool-id">Order ID: MT-7814</span>
                    <span className="tool-status status-delivered">Delivered</span>
                    <span className="tool-date">Order Date: 02/05/2023</span>
                  </div>
                </div>
              </div>
              <div className="medical-tool-item">
                <div className="medical-tool-image third-tool"></div>
                <div className="medical-tool-info">
                  <div className="medical-tool-title">Advanced Ventilator</div>
                  <div className="medical-tool-details">
                    <span className="tool-id">Order ID: MT-7798</span>
                    <span className="tool-status status-pending">Pending</span>
                    <span className="tool-date">Order Date: 28/04/2023</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="view-all-button-container">
              <Link to="/manage" className="view-all-button">
                View All Orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}