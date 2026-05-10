import React, {
  useState,
} from "react";
import API from "../api";
import "./BuyActionWindow.css";

const BuyActionWindow = ({
  uid,
  closeWindow,
}) => {
  const [
    stockQuantity,
    setStockQuantity,
  ] = useState(1);

  const [
    stockPrice,
    setStockPrice,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  // BUY ORDER
  const handleBuyClick =
    async () => {
      // Validation
      if (
        Number(
          stockQuantity
        ) <= 0 ||
        Number(stockPrice) <= 0
      ) {
        alert(
          "Please enter valid quantity and price."
        );
        return;
      }

      try {
        const currentUser =
          JSON.parse(
            localStorage.getItem(
              "user"
            )
          );

        if (
          !currentUser ||
          !currentUser._id
        ) {
          alert(
            "Please login first."
          );
          return;
        }

        setLoading(true);

        await API.post(
          "/newOrder",
          {
            name: uid,
            qty: Number(
              stockQuantity
            ),
            price: Number(
              stockPrice
            ),
            mode: "BUY",
            userId:
              currentUser._id,
          }
        );

        alert(
          "Buy Order Placed!"
        );

        closeWindow();
      } catch (error) {
        console.log(error);

        if (
          error.response?.data
            ?.message
        ) {
          alert(
            error.response.data
              .message
          );
        } else {
          alert(
            "Buying Failed"
          );
        }
      } finally {
        setLoading(false);
      }
    };

  // CANCEL
  const handleCancelClick =
    () => {
      closeWindow();
    };

  return (
    <>
      {/* Background Overlay */}
      <div
        className="popup-overlay"
        onClick={
          handleCancelClick
        }
      />

      {/* Popup Window */}
      <div
        className="container"
        id="buy-window"
        draggable="true"
      >
        {/* Header */}
        <div className="header">
          <h3>
            Buy {uid}
          </h3>
        </div>

        {/* Order Form */}
        <div className="regular-order">
          <div className="inputs">
            {/* Quantity */}
            <fieldset>
              <legend>
                Qty.
              </legend>

              <input
                type="number"
                name="qty"
                id="qty"
                min="1"
                value={
                  stockQuantity
                }
                onChange={(e) =>
                  setStockQuantity(
                    e.target
                      .value
                  )
                }
              />
            </fieldset>

            {/* Price */}
            <fieldset>
              <legend>
                Price
              </legend>

              <input
                type="number"
                name="price"
                id="price"
                min="0.05"
                step="0.05"
                value={
                  stockPrice
                }
                onChange={(e) =>
                  setStockPrice(
                    e.target
                      .value
                  )
                }
              />
            </fieldset>
          </div>
        </div>

        {/* Footer */}
        <div className="buttons">
          <span>
            Margin Required ₹
            {(
              (Number(
                stockQuantity
              ) || 0) *
              (Number(
                stockPrice
              ) || 0)
            ).toFixed(2)}
          </span>

          <div>
            {/* Buy Button */}
            <button
              className="btn btn-blue"
              onClick={
                handleBuyClick
              }
              disabled={
                loading
              }
            >
              {loading
                ? "Buying..."
                : "Buy"}
            </button>

            {/* Cancel Button */}
            <button
              className="btn btn-grey"
              onClick={
                handleCancelClick
              }
              disabled={
                loading
              }
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyActionWindow;