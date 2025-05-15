import { useState } from "react";

const inputFields = [
  { label: "Type", key: "type", type: "text", required: true },
  { label: "Asset Name", key: "assetName", type: "text", required: true },
  { label: "Asset ID", key: "assetId", type: "text", required: true },
  { label: "Asset Status", key: "assetStatus", type: "text", required: true },
  {
    label: "Description",
    key: "description",
    type: "textarea",
    required: true,
  },
  { label: "Category", key: "category", type: "text" , required: true},
  { label: "Serial Number", key: "serialNumber", type: "text", required: true },
  { label: "Manufacturer", key: "manufacturer", type: "text" },
  { label: "Company", key: "company", type: "text" },
  {
    label: "Impact",
    key: "impact",
    type: "select",
    options: ["Low", "Medium", "High"],
  },
  { label: "System Role", key: "systemRole", type: "text" },
  {
    label: "Urgency",
    key: "urgency",
    type: "select",
    options: ["Low", "Medium", "High"],
  },
  { label: "Region", key: "region", type: "text" },
];

function AddTool() {
  const [formData, setFormData] = useState({});

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    const preparedData = {
      ...formData,
      assetID: formData.assetId,
    };
    // delete preparedData.assetID;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/assets/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preparedData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Asset added successfully!");
        
      } else {
        alert(result.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to server.");
    }
  };

  const onCancel = () => {
    setFormData({});
  };

  return (
    <div className="max-w-6xl mx-auto mt-6 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-2xl font-bold text-center mb-6">
          Create New Asset
        </h3>
        <form onSubmit={onSubmitForm}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inputFields.map((field, index) => (
              <div
                key={index}
                className={field.type === "textarea" ? "md:col-span-2" : ""}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}{" "}
                  {field.required && (
                    <span className="text-red-500 text-sm">(Required)</span>
                  )}
                </label>

                {field.type === "textarea" ? (
                  <textarea
                    rows="4"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    required={field.required}
                    value={formData[field.key] || ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                  />
                ) : field.type === "select" ? (
                  <select
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData[field.key] || ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                  >
                    <option value="">Select {field.label.toLowerCase()}</option>
                    {field.options.map((option, idx) => (
                      <option key={idx} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    required={field.required}
                    value={formData[field.key] || ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-end mt-6 gap-3">
            <button
              type="button"
              onClick={ onCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTool;
