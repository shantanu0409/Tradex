import React, {
  useEffect,
  useState,
} from "react";
import API from "../api";
import io from "socket.io-client";

const socket = io(
 process.env.REACT_APP_API_URL ||
    "http://localhost:3002"
);

const Funds = () => {
  const [
    balance,
    setBalance,
  ] = useState(0);

  // FETCH BALANCE
  useEffect(() => {
    const fetchBalance =
      async () => {
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
            return;
          }

          const res =
          await API.get(
  `/balance/${currentUser._id}`
);

          setBalance(
            res.data.balance
          );
        } catch (error) {
          console.log(error);
        }
      };

    fetchBalance();

    // REALTIME BALANCE UPDATE
    socket.on(
      "balanceUpdated",
      (data) => {
        const currentUser =
          JSON.parse(
            localStorage.getItem(
              "user"
            )
          );

        if (
          currentUser &&
          data.userId ===
            currentUser._id
        ) {
          setBalance(
            data.balance
          );
        }
      }
    );

    // CLEANUP
    return () => {
      socket.off(
        "balanceUpdated"
      );
    };
  }, []);

  // ADD FUNDS
  const handleAddFunds =
    async () => {
      try {
        const amount =
          prompt(
            "Enter amount to add"
          );

        if (
          !amount ||
          Number(amount) <= 0
        ) {
          return;
        }

        const currentUser =
          JSON.parse(
            localStorage.getItem(
              "user"
            )
          );

        const res =
          await API.post(
  "/addFunds",
            {
              userId:
                currentUser._id,
              amount:
                Number(amount),
            }
          );

        setBalance(
          res.data.balance
        );

        alert(
          "Funds Added Successfully"
        );
      } catch (error) {
        console.log(error);
        alert(
          "Failed to Add Funds"
        );
      }
    };

  // WITHDRAW FUNDS
  const handleWithdraw =
    async () => {
      try {
        const amount =
          prompt(
            "Enter withdraw amount"
          );

        if (
          !amount ||
          Number(amount) <= 0
        ) {
          return;
        }

        const currentUser =
          JSON.parse(
            localStorage.getItem(
              "user"
            )
          );

        const res =
          await API.post(
            "/withdrawFunds",
            {
              userId:
                currentUser._id,
              amount:
                Number(amount),
            }
          );

        setBalance(
          res.data.balance
        );

        alert(
          "Withdraw Successful"
        );
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
            "Withdraw Failed"
          );
        }
      }
    };

  // OPEN COMMODITY ACCOUNT
  const handleOpenAccount =
    () => {
      window.open(
        "https://zerodha.com/open-account/",
        "_blank"
      );
    };

  const rows = [
    [
      "Available Balance",
      `₹${balance.toFixed(
        2
      )}`,
      true,
    ],
    ["Used Margin", "₹0.00"],
    [
      "Available Cash",
      `₹${balance.toFixed(
        2
      )}`,
    ],
    [
      "Opening Balance",
      "₹100000.00",
    ],
    ["Payin", "₹0.00"],
    ["SPAN", "₹0.00"],
    [
      "Delivery Margin",
      "₹0.00",
    ],
    ["Exposure", "₹0.00"],
    [
      "Options Premium",
      "₹0.00",
    ],
    [
      "Collateral (Liquid Funds)",
      "₹0.00",
    ],
    [
      "Collateral (Equity)",
      "₹0.00",
    ],
    [
      "Total Collateral",
      "₹0.00",
    ],
  ];

  return (
    <div
      style={{
        padding: "30px",
        background:
          "#f7f7f7",
        minHeight:
          "100vh",
        color: "#333",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          ...cardStyle,
          marginBottom:
            "30px",
          display: "flex",
          justifyContent:
            "space-between",
          alignItems:
            "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              marginBottom:
                "8px",
              fontSize:
                "30px",
              fontWeight:
                "600",
              color: "#222",
            }}
          >
            Funds & Balance
          </h1>

          <p
            style={{
              margin: 0,
              color: "#777",
              fontSize: "14px",
            }}
          >
            Manage your
            trading funds
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <button
            style={
              greenBtn
            }
            onClick={
              handleAddFunds
            }
          >
            Add Funds
          </button>

          <button
            style={
              blueBtn
            }
            onClick={
              handleWithdraw
            }
          >
            Withdraw
          </button>
        </div>
      </div>

      {/* MAIN GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "2fr 1fr",
          gap: "20px",
        }}
      >
        {/* EQUITY */}
        <div
          style={
            cardStyle
          }
        >
          <h3
            style={
              sectionTitleStyle
            }
          >
            Equity
          </h3>

          {rows.map(
            (
              item,
              index
            ) => (
              <div
                key={index}
                style={{
                  display:
                    "flex",
                  justifyContent:
                    "space-between",
                  padding:
                    "14px 0",
                  borderBottom:
                    index !==
                    rows.length -
                      1
                      ? "1px solid #e5e7eb"
                      : "none",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    color:
                      "#777",
                    fontSize:
                      "14px",
                  }}
                >
                  {item[0]}
                </p>

                <p
                  style={{
                    margin: 0,
                    color:
                      item[2]
                        ? "#16a34a"
                        : "#222",
                    fontWeight:
                      "600",
                  }}
                >
                  {item[1]}
                </p>
              </div>
            )
          )}
        </div>

        {/* COMMODITY ACCOUNT */}
        <div
          style={
            cardStyle
          }
        >
          <h3
            style={
              sectionTitleStyle
            }
          >
            Commodity
            Account
          </h3>

          <p
            style={{
              color: "#777",
              marginTop:
                "15px",
              marginBottom:
                "30px",
              lineHeight:
                "1.6",
            }}
          >
            You don't have
            a commodity
            account yet.
          </p>

          <button
            style={
              blueBtn
            }
            onClick={
              handleOpenAccount
            }
          >
            Open Account
          </button>
        </div>
      </div>
    </div>
  );
};

// SHARED CARD STYLE
const cardStyle = {
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  padding: "24px",
  boxShadow: "none",
};

// SECTION TITLE
const sectionTitleStyle = {
  margin: 0,
  marginBottom: "20px",
  fontSize: "18px",
  fontWeight: "600",
  color: "#222",
};

// GREEN BUTTON
const greenBtn = {
  background: "#16a34a",
  border: "none",
  color: "white",
  padding: "10px 16px",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "500",
  fontSize: "14px",
};

// BLUE BUTTON
const blueBtn = {
  background: "#387ed1",
  border: "none",
  color: "white",
  padding: "10px 16px",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "500",
  fontSize: "14px",
};

export default Funds;