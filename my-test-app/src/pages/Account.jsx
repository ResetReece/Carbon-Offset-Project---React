import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Nav from "../Components/nav";
import Footer from "../Components/footer";
import {
  getAuthToken,
  logout,
  loadUserProfile,
  updateUserProfile,
  changePassword,
  getUserOrders,
} from "../utils/auth";
import {
  validateImageFile,
  readFileAsDataURL,
  uploadProfileImage,
  deleteProfileImage,
  initializeCropper,
  getCroppedCanvas,
  destroyCropper,
} from "../utils/image";
import { isValidEmail, validatePassword } from "../utils/validators";
import { defaultImage } from "../utils/constants";

export default function Account() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("personal");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [profileImage, setProfileImage] = useState(defaultImage);
  const [hasProfileImage, setHasProfileImage] = useState(false);
  const [orders, setOrders] = useState([]);
  const [showCropModal, setShowCropModal] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  // Password change states
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  const fileInputRef = useRef(null);
  const cropImageRef = useRef(null);
  const previewCanvasRef = useRef(null);

  // Load user data on mount
  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      navigate("/auth");
      return;
    }

    loadUserData();
  }, [navigate]);

  async function loadUserData() {
    try {
      setLoading(true);
      const profile = await loadUserProfile();
      setUserData(profile);
      setEditName(profile.name || "");
      setEditEmail(profile.email || "");

      if (profile.profileImage) {
        setProfileImage(profile.profileImage);
        setHasProfileImage(true);
      }

      // Load orders
      const userOrders = await getUserOrders();
      setOrders(Array.isArray(userOrders) ? userOrders : []);

      setError("");
    } catch (error) {
      console.error("Error loading user data:", error);
      setError("Failed to load account information");
    } finally {
      setLoading(false);
    }
  }

  function toggleEditMode() {
    if (editMode) {
      setEditName(userData.name || "");
      setEditEmail(userData.email || "");
    }
    setEditMode(!editMode);
  }

  function cancelEdit() {
    setEditName(userData.name || "");
    setEditEmail(userData.email || "");
    setEditMode(false);
  }

  async function saveChanges() {
    if (!editName.trim()) {
      setError("Name cannot be empty");
      return;
    }

    if (!isValidEmail(editEmail)) {
      setError("Invalid email address");
      return;
    }

    try {
      const updates = {};
      if (editName !== userData.name) updates.name = editName;
      if (editEmail !== userData.email) updates.email = editEmail;

      if (Object.keys(updates).length === 0) {
        setEditMode(false);
        return;
      }

      await updateUserProfile(updates);
      setUserData({ ...userData, ...updates });
      setEditMode(false);
      setError("");
    } catch (error) {
      console.error("Error saving changes:", error);
      setError("Failed to save changes");
    }
  }

  function handleImageFileSelect(e) {
    const file = e.target.files[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.isValid) {
      setError(validation.errors[0]);
      return;
    }

    setCurrentFile(file);
    readFileAsDataURL(file).then((dataUrl) => {
      if (cropImageRef.current) {
        cropImageRef.current.src = dataUrl;
        setTimeout(() => {
          if (cropImageRef.current && typeof Cropper !== "undefined") {
            destroyCropper();
            initializeCropper(cropImageRef.current);
          }
        }, 100);
      }
      setShowCropModal(true);
    });
  }

  async function saveCrop() {
    if (!currentFile) return;

    try {
      const canvas = getCroppedCanvas(180, 180);
      if (!canvas) {
        setError("Failed to crop image");
        return;
      }

      canvas.toBlob(async (blob) => {
        const token = getAuthToken();
        setUploadStatus("Uploading...");

        const result = await uploadProfileImage(blob, token);
        if (result.success) {
          setProfileImage(result.imageUrl);
          setHasProfileImage(true);
          setUploadStatus("Image uploaded successfully!");
          setShowCropModal(false);
          setCurrentFile(null);
          setTimeout(() => setUploadStatus(""), 3000);
        } else {
          setError(result.error || "Upload failed");
        }
      }, "image/jpeg", 0.8);
    } catch (err) {
      console.error("Error uploading image:", err);
      setError("Failed to upload image");
    }
  }

  function cancelCrop() {
    setShowCropModal(false);
    setCurrentFile(null);
    destroyCropper();
  }

  async function handleDeleteProfileImage() {
    if (!hasProfileImage) return;

    try {
      const token = getAuthToken();
      const result = await deleteProfileImage(token);

      if (result.success) {
        setProfileImage(defaultImage);
        setHasProfileImage(false);
        setError("");
      } else {
        setError(result.error || "Failed to delete image");
      }
    } catch (err) {
      console.error("Error deleting image:", err);
      setError("Failed to delete image");
    }
  }

  async function handleChangePassword() {
    setPasswordError("");
    setPasswordSuccess("");

    if (!oldPassword || !newPassword || !confirmPassword) {
      setPasswordError("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    const validation = validatePassword(newPassword);
    if (!validation.isValid) {
      setPasswordError(validation.errors[0]);
      return;
    }

    try {
      await changePassword(oldPassword, newPassword);
      setPasswordSuccess("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        logout();
      }, 2000);
    } catch (err) {
      setPasswordError(err.message || "Failed to change password");
    }
  }

  function handleLogout() {
    logout();
  }

  if (loading) {
    return (
      <>
        <Nav />
        <div className="account-container">
          <p>Loading account information...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />

      <div className="account-container">
        <h2>My Account</h2>
        {error && <div className="error-message" style={{ display: "block" }}>{error}</div>}

        <div className="account-wrapper">
          {/* Sidebar Navigation */}
          <div className="account-sidebar">
            <ul className="account-tabs">
              <li>
                <a
                  href="javascript:void(0)"
                  className={`account-tab-link ${activeTab === "personal" ? "active" : ""}`}
                  onClick={() => setActiveTab("personal")}
                >
                  Personal Details
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className={`account-tab-link ${activeTab === "security" ? "active" : ""}`}
                  onClick={() => setActiveTab("security")}
                >
                  Security
                </a>
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  className={`account-tab-link ${activeTab === "orders" ? "active" : ""}`}
                  onClick={() => setActiveTab("orders")}
                >
                  Order History
                </a>
              </li>
            </ul>
          </div>

          <div className="account-content">
            {/* Personal Details Tab */}
            {activeTab === "personal" && (
              <div id="personal" className="account-section active">
                {/* Profile Image Section */}
                <div className="profile-section">
                  <div className="profile-image-container" id="profileImageContainer">
                    <img
                      id="profileImage"
                      src={profileImage}
                      alt="Profile Picture"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    {hasProfileImage && (
                      <div className="profile-overlay" id="profileOverlay">
                        <button
                          className="delete-pic-btn"
                          id="deleteBtn"
                          onClick={handleDeleteProfileImage}
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      id="profileImageInput"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleImageFileSelect}
                      style={{ display: "none" }}
                    />
                    <button
                      className="upload-btn"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Upload Photo
                    </button>
                    {uploadStatus && (
                      <div
                        id="uploadStatus"
                        style={{
                          marginTop: "10px",
                          fontSize: "14px",
                          color: uploadStatus.includes("success") ? "#27ae60" : "#e74c3c",
                        }}
                      >
                        {uploadStatus}
                      </div>
                    )}
                  </div>
                </div>

                {/* User Information Display */}
                <div className="user-info">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <h3 style={{ margin: 0, color: "#2c3e50" }}>Account Information</h3>
                    <a
                      href="javascript:void(0)"
                      onClick={toggleEditMode}
                      className="edit-link"
                      id="editToggle"
                    >
                      {editMode ? "Cancel" : "Edit"}
                    </a>
                  </div>

                  <div className="info-item">
                    <div className="info-label">Full Name</div>
                    {editMode ? (
                      <input
                        type="text"
                        className="edit-input"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveChanges();
                          if (e.key === "Escape") cancelEdit();
                        }}
                      />
                    ) : (
                      <div className="info-value">{userData?.name || "Loading..."}</div>
                    )}
                  </div>

                  <div className="info-item">
                    <div className="info-label">Email</div>
                    {editMode ? (
                      <input
                        type="email"
                        className="edit-input"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveChanges();
                          if (e.key === "Escape") cancelEdit();
                        }}
                      />
                    ) : (
                      <div className="info-value">{userData?.email || "Loading..."}</div>
                    )}
                  </div>

                  {editMode && (
                    <div style={{ display: "flex", gap: "10px", marginTop: "15px", marginBottom: "15px" }}>
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
                    <div className="info-value">
                      {userData?.createdAt
                        ? new Date(userData.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "Loading..."}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div id="security" className="account-section">
                <h3>Security</h3>
                <div className="password-change-form">
                  {passwordError && (
                    <div className="error-message" style={{ display: "block" }}>
                      {passwordError}
                    </div>
                  )}
                  {passwordSuccess && (
                    <div className="success-message" style={{ display: "block" }}>
                      {passwordSuccess}
                    </div>
                  )}

                  <div className="form-group">
                    <label htmlFor="oldPassword">Current Password</label>
                    <input
                      type="password"
                      id="oldPassword"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="Enter current password"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password (min 8 characters)"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm New Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                    />
                  </div>

                  <button className="password-change-btn" onClick={handleChangePassword}>
                    Change Password
                  </button>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div id="orders" className="account-section">
                <h3>Order History</h3>
                <div id="ordersList" style={{ marginTop: "20px" }}>
                  {orders.length === 0 ? (
                    <p style={{ color: "#7f8c8d", fontStyle: "italic" }}>
                      You haven't placed any orders yet.
                    </p>
                  ) : (
                    <div className="orders-list">
                      {orders.map((order) => (
                        <div key={order.id} className="order-card" style={{ marginBottom: "20px" }}>
                          <div className="data-table">
                            <table style={{ width: "100%" }}>
                              <tbody>
                                <tr>
                                  <td style={{ textAlign: "left" }}>
                                    <strong>Order ID:</strong>
                                  </td>
                                  <td>{order.id}</td>
                                </tr>
                                <tr>
                                  <td style={{ textAlign: "left" }}>
                                    <strong>Date:</strong>
                                  </td>
                                  <td>
                                    {new Date(order.date).toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    })}
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ textAlign: "left" }}>
                                    <strong>Total:</strong>
                                  </td>
                                  <td>${order.total?.toFixed(2) || "0.00"}</td>
                                </tr>
                                <tr>
                                  <td style={{ textAlign: "left" }}>
                                    <strong>Status:</strong>
                                  </td>
                                  <td>{order.status || "Completed"}</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Image Cropping Modal */}
      {showCropModal && (
        <div className="crop-modal" style={{ display: "flex" }}>
          <div className="crop-modal-content">
            <h3>Crop Your Image</h3>
            <div className="crop-preview-section">
              <div className="crop-preview-item">
                <p>Adjust Crop</p>
                <div className="cropper-container">
                  <img id="cropImage" ref={cropImageRef} src="" alt="Crop preview" />
                </div>
              </div>
              <div className="crop-preview-item">
                <p>Preview</p>
                <div className="circular-preview">
                  <canvas id="previewCanvas" ref={previewCanvasRef}></canvas>
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
  );
}
