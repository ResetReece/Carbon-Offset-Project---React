import { useState, useRef } from 'react'
import '../App.css'
import Nav from '../Components/nav';
import Footer from '../Components/footer';

export default function Account() {
  const [activeTab, setActiveTab] = useState('personal')
  const [isEditMode, setIsEditMode] = useState(false)
  const [userName, setUserName] = useState('John Doe')
  const [userEmail, setUserEmail] = useState('john@example.com')
  const [userCreated] = useState('January 15, 2024')
  const [errorMessage] = useState('')
  const [showCropModal, setShowCropModal] = useState(false)
  const [profileImage, setProfileImage] = useState('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 100%27%3E%3Crect fill=%27%23e0e0e0%27 width=%27100%27 height=%27100%27/%3E%3Ccircle cx=%2750%27 cy=%2735%27 r=%2720%27 fill=%27%23999%27/%3E%3Cpath d=%27M 25 70 Q 25 55 50 55 Q 75 55 75 70 L 75 100 L 25 100 Z%27 fill=%27%23999%27/%3E%3C/svg%3E')
  const [orders] = useState([])
  const fileInputRef = useRef(null)
  const cropImageRef = useRef(null)

  const switchTab = (tabName) => {
    setActiveTab(tabName)
  }

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode)
  }

  const saveChanges = () => {
    setIsEditMode(false)
  }

  const cancelEdit = () => {
    setIsEditMode(false)
  }

  const deleteProfileImage = () => {
    setProfileImage('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 100%27%3E%3Crect fill=%27%23e0e0e0%27 width=%27100%27 height=%27100%27/%3E%3Ccircle cx=%2750%27 cy=%2735%27 r=%2720%27 fill=%27%23999%27/%3E%3Cpath d=%27M 25 70 Q 25 55 50 55 Q 75 55 75 70 L 75 100 L 25 100 Z%27 fill=%27%23999%27/%3E%3C/svg%3E')
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setShowCropModal(true)
        if (cropImageRef.current) {
          cropImageRef.current.src = event.target?.result || ''
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const cancelCrop = () => {
    setShowCropModal(false)
  }

  const saveCrop = () => {
    setShowCropModal(false)
  }

  const logout = () => {
    console.log('Logging out...')
  }

  return (
    <>
      <Nav />

      <div className="account-container">
        <h2>My Account</h2>
        <div className="error-message" id="errorMessage">{errorMessage}</div>

        <div className="account-wrapper">
          <div className="account-sidebar">
            <ul className="account-tabs">
              <li>
                <button
                  className={`account-tab-link ${activeTab === 'personal' ? 'active' : ''}`}
                  onClick={() => switchTab('personal')}
                >
                  Personal Details
                </button>
              </li>
              <li>
                <button
                  className={`account-tab-link ${activeTab === 'security' ? 'active' : ''}`}
                  onClick={() => switchTab('security')}
                >
                  Security
                </button>
              </li>
              <li>
                <button
                  className={`account-tab-link ${activeTab === 'orders' ? 'active' : ''}`}
                  onClick={() => switchTab('orders')}
                >
                  Order History
                </button>
              </li>
            </ul>
          </div>

          <div className="account-content">
            {activeTab === 'personal' && (
              <div className="account-section">
                <div className="profile-section">
                  <div className="profile-image-container" id="profileImageContainer">
                    <img id="profileImage" src={profileImage} alt="Profile Picture" />
                    <div className="profile-overlay" id="profileOverlay">
                      <button className="delete-pic-btn" id="deleteBtn" onClick={deleteProfileImage}>
                        ✕
                      </button>
                    </div>
                  </div>
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      id="profileImageInput"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                    <button className="upload-btn" onClick={handleUploadClick}>
                      Upload Photo
                    </button>
                    <div id="uploadStatus" style={{ marginTop: '10px', fontSize: '14px' }}></div>
                  </div>
                </div>

                <div className="user-info">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ margin: 0, color: '#2c3e50' }}>Account Information</h3>
                    <button className="edit-link" id="editToggle" onClick={toggleEditMode}>
                      {isEditMode ? 'Cancel' : 'Edit'}
                    </button>
                  </div>
                  <div className="info-item">
                    <div className="info-label">Full Name</div>
                    {isEditMode ? (
                      <input
                        type="text"
                        className="edit-input"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') saveChanges()
                          if (e.key === 'Escape') cancelEdit()
                        }}
                      />
                    ) : (
                      <div className="info-value">{userName}</div>
                    )}
                  </div>
                  <div className="info-item">
                    <div className="info-label">Email</div>
                    {isEditMode ? (
                      <input
                        type="email"
                        className="edit-input"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') saveChanges()
                          if (e.key === 'Escape') cancelEdit()
                        }}
                      />
                    ) : (
                      <div className="info-value">{userEmail}</div>
                    )}
                  </div>
                  {isEditMode && (
                    <div id="editActions" style={{ display: 'flex', gap: '10px', marginTop: '15px', marginBottom: '15px' }}>
                      <button className="edit-save-btn" onClick={saveChanges}>
                        Save Changes
                      </button>
                      <button className="edit-cancel-btn" onClick={cancelEdit}>
                        Cancel
                      </button>
                    </div>
                  )}
                  <div className="info-item">
                    <div className="info-label">Account Created</div>
                    <div className="info-value">{userCreated}</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="account-section">
                <h3>Security</h3>
                <div id="securityContent"></div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="account-section">
                <h3>Order History</h3>
                <div id="ordersList" style={{ marginTop: '20px' }}>
                  {orders.length === 0 && (
                    <p id="noOrderMessage" style={{ color: '#7f8c8d', fontStyle: 'italic' }}>
                      You haven't placed any orders yet.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      {showCropModal && (
        <div id="cropModal" className="crop-modal">
          <div className="crop-modal-content">
            <h3>Crop Your Image</h3>
            <div className="crop-preview-section">
              <div className="crop-preview-item">
                <p>Adjust Crop</p>
                <div className="cropper-container">
                  <img id="cropImage" ref={cropImageRef} src="" alt="Crop Preview" />
                </div>
              </div>
              <div className="crop-preview-item">
                <p>Preview</p>
                <div className="circular-preview">
                  <canvas id="previewCanvas"></canvas>
                </div>
              </div>
            </div>
            <div className="crop-modal-buttons">
              <button onClick={cancelCrop} className="crop-btn-cancel">
                Cancel
              </button>
              <button onClick={saveCrop} className="crop-btn-confirm">
                Crop & Upload
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}
