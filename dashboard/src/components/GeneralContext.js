import React, {
  createContext,
  useState,
} from "react";

import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

// Create Context
const GeneralContext =
  createContext();

// Provider
export const GeneralContextProvider =
  ({ children }) => {
    // BUY WINDOW STATE
    const [
      isBuyWindowOpen,
      setIsBuyWindowOpen,
    ] = useState(false);

    // SELL WINDOW STATE
    const [
      isSellWindowOpen,
      setIsSellWindowOpen,
    ] = useState(false);

    // SELECTED STOCK
    const [
      selectedStockUID,
      setSelectedStockUID,
    ] = useState("");

    // OPEN BUY WINDOW
    const openBuyWindow =
      (uid) => {
        setSelectedStockUID(
          uid
        );
        setIsSellWindowOpen(
          false
        );
        setIsBuyWindowOpen(
          true
        );
      };

    // CLOSE BUY WINDOW
    const closeBuyWindow =
      () => {
        setIsBuyWindowOpen(
          false
        );
        setSelectedStockUID(
          ""
        );
      };

    // OPEN SELL WINDOW
    const openSellWindow =
      (uid) => {
        setSelectedStockUID(
          uid
        );
        setIsBuyWindowOpen(
          false
        );
        setIsSellWindowOpen(
          true
        );
      };

    // CLOSE SELL WINDOW
    const closeSellWindow =
      () => {
        setIsSellWindowOpen(
          false
        );
        setSelectedStockUID(
          ""
        );
      };

    return (
      <GeneralContext.Provider
        value={{
          openBuyWindow,
          closeBuyWindow,
          openSellWindow,
          closeSellWindow,
        }}
      >
        {children}

        {/* BUY WINDOW */}
        {isBuyWindowOpen && (
          <BuyActionWindow
            uid={
              selectedStockUID
            }
            closeWindow={
              closeBuyWindow
            }
          />
        )}

        {/* SELL WINDOW */}
        {isSellWindowOpen && (
          <SellActionWindow
            uid={
              selectedStockUID
            }
            closeWindow={
              closeSellWindow
            }
          />
        )}
      </GeneralContext.Provider>
    );
  };

export default GeneralContext;