import React, { useState } from "react";
import API from "../api";

function Profile() {
  const userData = localStorage.getItem("user");
  const currentUser = userData
    ? JSON.parse(userData)
    : null;

  const [formData, setFormData] = useState({
    fullname:
      currentUser?.fullname ||
      currentUser?.name ||
      "",
    mobile:
      currentUser?.mobile || "",
  });

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!currentUser?._id) {
      setMessage(
        "User information not found."
      );
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await API.put(
        `/profile/${currentUser._id}`,
        formData
      );

      const updatedUser = {
        ...currentUser,
        ...res.data,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      setMessage(
        "Profile updated successfully."
      );
    } catch (error) {
      console.log(
        "Profile Update Error:",
        error
      );

      setMessage(
        error.response?.data
          ?.message ||
          "Failed to update profile."
      );
    } finally {
      setLoading(false);
    }
  };

  const fullName =
    currentUser?.fullname ||
    currentUser?.name ||
    "Trader";

  const initials = fullName
    .split(" ")
    .map((word) =>
      word[0]?.toUpperCase()
    )
    .slice(0, 2)
    .join("");

  const isGoogleAccount =
    !!currentUser?.googleId;

  const balance = Number(
    currentUser?.balance || 0
  );

  const formatCurrency = (value) =>
    `₹${Number(value).toLocaleString(
      "en-IN",
      {
        maximumFractionDigits: 2,
      }
    )}`;

  return (
    <div
      style={{
        padding: "30px",
        color: "#333",
      }}
    >
      {/* Page Header */}
      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "28px",
            fontWeight: "600",
            color: "#222",
          }}
        >
          My Profile
        </h2>

        <p
          style={{
            marginTop: "6px",
            color: "#777",
            fontSize: "14px",
          }}
        >
          Manage your account
          information.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "minmax(320px, 420px) minmax(360px, 1fr)",
          gap: "20px",
          alignItems: "start",
        }}
      >
        {/* Profile Summary Card */}
        <div style={cardStyle}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div style={avatarStyle}>
              {initials}
            </div>

            <h3
              style={{
                margin: "16px 0 6px",
                fontSize: "22px",
                fontWeight: "600",
                color: "#222",
              }}
            >
              {fullName}
            </h3>

            <p
              style={{
                margin: 0,
                color: "#777",
                fontSize: "14px",
              }}
            >
              {currentUser?.email}
            </p>
          </div>

          <div
            style={{
              marginTop: "24px",
            }}
          >
            <InfoRow
              label="Mobile"
              value={
                currentUser?.mobile ||
                "Not provided"
              }
            />

            <InfoRow
              label="Wallet Balance"
              value={formatCurrency(
                balance
              )}
            />

            <InfoRow
              label="Account Type"
              value={
                isGoogleAccount
                  ? "Google OAuth"
                  : "Email & Password"
              }
            />

            <InfoRow
              label="User ID"
              value={
                currentUser?._id ||
                "-"
              }
              small
            />
          </div>
        </div>

        {/* Edit Profile Card */}
        <div style={cardStyle}>
          <h3 style={titleStyle}>
            Edit Profile
          </h3>

          {message && (
            <div
              style={{
                background:
                  message
                    .toLowerCase()
                    .includes(
                      "success"
                    )
                    ? "#ecfdf5"
                    : "#fef2f2",
                color:
                  message
                    .toLowerCase()
                    .includes(
                      "success"
                    )
                    ? "#15803d"
                    : "#dc2626",
                border:
                  message
                    .toLowerCase()
                    .includes(
                      "success"
                    )
                    ? "1px solid #bbf7d0"
                    : "1px solid #fecaca",
                padding: "12px 14px",
                borderRadius: "8px",
                fontSize: "14px",
                marginBottom: "20px",
              }}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSave}>
            <div
              style={{
                marginBottom: "18px",
              }}
            >
              <label
                style={labelStyle}
              >
                Full Name
              </label>

              <input
                type="text"
                name="fullname"
                value={
                  formData.fullname
                }
                onChange={
                  handleChange
                }
                style={inputStyle}
                required
              />
            </div>

            <div
              style={{
                marginBottom: "18px",
              }}
            >
              <label
                style={labelStyle}
              >
                Email Address
              </label>

              <input
                type="email"
                value={
                  currentUser?.email ||
                  ""
                }
                style={{
                  ...inputStyle,
                  background:
                    "#f9fafb",
                  color: "#6b7280",
                }}
                disabled
              />
            </div>

            <div
              style={{
                marginBottom: "24px",
              }}
            >
              <label
                style={labelStyle}
              >
                Mobile Number
              </label>

              <input
                type="text"
                name="mobile"
                value={
                  formData.mobile
                }
                onChange={
                  handleChange
                }
                style={inputStyle}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={buttonStyle}
            >
              {loading
                ? "Saving..."
                : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  label,
  value,
  small,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent:
          "space-between",
        gap: "12px",
        padding: "12px 0",
        borderBottom:
          "1px solid #f1f5f9",
      }}
    >
      <span
        style={{
          color: "#777",
          fontSize: "13px",
          fontWeight: "500",
        }}
      >
        {label}
      </span>

      <span
        style={{
          color: "#222",
          fontSize: small
            ? "12px"
            : "14px",
          fontWeight: "500",
          textAlign: "right",
          wordBreak:
            "break-all",
        }}
      >
        {value}
      </span>
    </div>
  );
}

const cardStyle = {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  padding: "24px",
};

const titleStyle = {
  margin: 0,
  marginBottom: "20px",
  fontSize: "18px",
  fontWeight: "600",
  color: "#222",
};

const avatarStyle = {
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  background: "#387ed1",
  color: "#ffffff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "28px",
  fontWeight: "600",
}; 

const labelStyle = {
  display: "block",
  marginBottom: "6px",
  color: "#555",
  fontSize: "13px",
  fontWeight: "500",
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #d1d5db",
  borderRadius: "6px",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
}; 

const buttonStyle = {
  background: "#387ed1",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
}; 

export default Profile;
