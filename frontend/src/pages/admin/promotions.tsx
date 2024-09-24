import React, { useState } from "react";

const ManagePromotions: React.FC = () => {
  const [promotions, setPromotions] = useState<string[]>([]);
  const [newPromotion, setNewPromotion] = useState<string>("");

  const addPromotion = () => {
    setPromotions([...promotions, newPromotion]);
    setNewPromotion("");
  };

  const deletePromotion = (index: number) => {
    setPromotions(promotions.filter((_, i) => i !== index));
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Manage Promotions</h1>

      <div>
        <input
          type="text"
          placeholder="Enter new promotion"
          value={newPromotion}
          onChange={(e) => setNewPromotion(e.target.value)}
          className="border p-2 mr-2"
        />
        <button
          onClick={addPromotion}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Promotion
        </button>
      </div>

      <div className="mt-5">
        <h2 className="text-xl font-bold mb-3">Existing Promotions</h2>
        <ul>
          {promotions.map((promotion, index) => (
            <li key={index} className="mb-2">
              {promotion}
              <button
                onClick={() => deletePromotion(index)}
                className="ml-4 text-red-500"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManagePromotions;
