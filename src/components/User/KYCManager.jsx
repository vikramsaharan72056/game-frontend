import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants/config"; // Adjust as per your project
import { GET_USER_BY_ID, UPDATE_KYC_STATUS } from "../../constants/apiEndpoints";

const KYCManager = () => {
  const userId = sessionStorage.getItem("userId");
  const [kycDetails, setKYCDetails] = useState({
    aadharImage: null,
    panImage: null,
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch KYC details on load
  useEffect(() => {
    fetchKYCDetails();
  }, []);

  const fetchKYCDetails = async () => {
    try {
      const response = await axios.get(GET_USER_BY_ID(userId));
      const { aadhar, pan } = response.data;

      setKYCDetails({
        aadharImage: aadhar ? `${BASE_URL}/uploads/${aadhar}` : null,
        panImage: pan ? `${BASE_URL}/uploads/${pan}` : null,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching KYC details:", error);
      setMessage("Error fetching KYC details.");
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setKYCDetails({ ...kycDetails, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (kycDetails.aadharImage instanceof File)
      formData.append("aadharImage", kycDetails.aadharImage);
    if (kycDetails.panImage instanceof File)
      formData.append("panImage", kycDetails.panImage);

    try {
      await axios.put(UPDATE_KYC_STATUS(userId), formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("KYC details updated successfully.");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      fetchKYCDetails();
    } catch (error) {
      console.error("Error updating KYC details:", error);
      setMessage("Error updating KYC details.");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded shadow">
      <h1 className="text-xl lg:text-2xl font-bold text-center mb-4">KYC Image Upload</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Aadhar Image */}
          <div>
            <label className="block mb-1 font-medium">Upload Aadhar Image</label>
            <input
              type="file"
              name="aadharImage"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500"
            />
            {kycDetails.aadharImage && (
              <img
                src={
                  kycDetails.aadharImage instanceof File
                    ? URL.createObjectURL(kycDetails.aadharImage)
                    : kycDetails.aadharImage
                }
                alt="Aadhar Preview"
                className="mt-2 object-cover rounded"
                loading="lazy"
                style={{ width: "auto", height: "auto", maxWidth: "100px", maxHeight: "100px" }}
              />
            )}
          </div>

          {/* PAN Image */}
          <div>
            <label className="block mb-1 font-medium">Upload PAN Image</label>
            <input
              type="file"
              name="panImage"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500"
            />
            {kycDetails.panImage && (
              <img
                src={
                  kycDetails.panImage instanceof File
                    ? URL.createObjectURL(kycDetails.panImage)
                    : kycDetails.panImage
                }
                alt="PAN Preview"
                className="mt-2 object-cover rounded"
                loading="lazy"
                style={{ width: "auto", height: "auto", maxWidth: "100px", maxHeight: "100px" }}
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Update KYC
          </button>
        </form>
      )}
      {message && (
        <div className="mt-4 text-center text-green-600 font-bold">{message}</div>
      )}
    </div>
  );
};

export default KYCManager;
