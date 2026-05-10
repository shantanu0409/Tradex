import React, {
  useEffect,
  useState,
} from "react";
import API from "../api";
import socket from "../socket";

const Orders = () => {
  const [orders, setOrders] =
    useState([]);
  const [loading, setLoading] =
    useState(true);

    const [search, setSearch] =
  useState("");

  // FETCH ORDERS
  const fetchOrders =
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
          setOrders([]);
          setLoading(false);
          return;
        }

        const res =
          await API.get(
  `/allOrders?userId=${currentUser._id}`
);

        setOrders(res.data);
        setLoading(false);
      } catch (error) {
        console.log(
          "Fetch Orders Error:",
          error
        );
        setLoading(false);
      }
    };

  // CANCEL ORDER
  const cancelOrder =
    async (id) => {
      try {
        await API.delete(
          `/cancelOrder/${id}`
        );

        setOrders((prev) =>
          prev.filter(
            (order) =>
              order._id !== id
          )
        );

        alert(
          "Order Cancelled"
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
            "Cancel Failed"
          );
        }
      }
    };

  // SOCKET EVENTS + POLLING
  useEffect(() => {
    fetchOrders();

    const interval =
      setInterval(
        fetchOrders,
        5000
      );

    // NEW ORDER
    socket.on(
      "newOrder",
      (order) => {
        setOrders((prev) => {
          const exists =
            prev.some(
              (item) =>
                String(
                  item._id
                ) ===
                String(
                  order._id
                )
            );

          if (exists)
            return prev;

          return [
            order,
            ...prev,
          ];
        });
      }
    );

    // EXECUTED ORDER
    socket.on(
      "orderExecuted",
      (
        updatedOrder
      ) => {
        setOrders((prev) =>
          prev.map(
            (order) =>
              String(
                order._id
              ) ===
              String(
                updatedOrder._id
              )
                ? {
                    ...order,
                    ...updatedOrder,
                    status:
                      "EXECUTED",
                  }
                : order
          )
        );
      }
    );

    // CANCELLED ORDER
    socket.on(
      "orderCancelled",
      (id) => {
        setOrders((prev) =>
          prev.filter(
            (order) =>
              order._id !== id
          )
        );
      }
    );

    return () => {
      socket.off(
        "newOrder"
      );
      socket.off(
        "orderExecuted"
      );
      socket.off(
        "orderCancelled"
      );
      clearInterval(
        interval
      );
    };
  }, []);

  const filteredOrders =
  orders.filter(
    (order) => {
      const stockName =
        (
          order.stock ||
          order.name ||
          ""
        ).toLowerCase();

      const orderType =
        (
          order.type ||
          order.mode ||
          ""
        ).toLowerCase();

      return (
        stockName.includes(
          search.toLowerCase()
        ) ||
        orderType.includes(
          search.toLowerCase()
        )
      );
    }
  );
  // LOADING
  if (loading) {
    return (
      <div
        style={{
          color: "#666",
          textAlign:
            "center",
          marginTop:
            "100px",
          fontSize: "24px",
        }}
      >
        Loading Orders...
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "30px",
        background:
          "#f7f7f7",
        color: "#333",
        minHeight:
          "100vh",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems:
            "center",
          marginBottom:
            "30px",
          flexWrap:
            "wrap",
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
            Order History
          </h1>

          <p
            style={{
              margin: 0,
              color: "#777",
              fontSize: "14px",
            }}
          >
            Track all your
            trades and
            executions
          </p>
        </div>

        <div
          style={{
            background:
              "#ffffff",
            padding:
              "10px 14px",
            borderRadius:
              "6px",
            fontWeight:
              "600",
            border:
              "1px solid #e5e7eb",
            boxShadow:
              "none",
            color: "#333",
            fontSize: "14px",
          }}
        >
          Total Orders:{" "}
          {filteredOrders.length}
        </div>
      </div>

<div
  style={{
    ...cardStyle,
    padding: "16px",
    marginBottom: "20px",
  }}
>
  <input
    type="text"
    placeholder="Search orders by stock or type..."
    value={search}
    onChange={(e) =>
      setSearch(
        e.target.value
      )
    }
    style={{
      width: "100%",
      padding: "10px 12px",
      border:
        "1px solid #d1d5db",
      borderRadius: "6px",
      fontSize: "14px",
      outline: "none",
      boxSizing:
        "border-box",
    }}
  />
</div>
      {/* EMPTY STATE */}
      {filteredOrders.length === 0?(
        <div
          style={{
            ...cardStyle,
            padding:
              "50px",
            textAlign:
              "center",
          }}
        >
          <h3
            style={{
              marginBottom:
                "15px",
              color: "#222",
            }}
          >
            No Orders Yet
          </h3>

          <p
            style={{
              color: "#777",
            }}
          >
            Your placed
            orders will
            appear here
          </p>
        </div>
      ) : (
        /* TABLE */
        <div
          style={{
            ...cardStyle,
            overflowX:
              "auto",
            padding: 0,
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse:
                "collapse",
            }}
          >
            <thead>
              <tr
                style={{
                  background:
                    "#f9fafb",
                }}
              >
                <th
                  style={
                    thStyle
                  }
                >
                  Stock
                </th>
                <th
                  style={
                    thStyle
                  }
                >
                  Qty
                </th>
                <th
                  style={
                    thStyle
                  }
                >
                  Price
                </th>
                <th
                  style={
                    thStyle
                  }
                >
                  Value
                </th>
                <th
                  style={
                    thStyle
                  }
                >
                  Type
                </th>
                <th
                  style={
                    thStyle
                  }
                >
                  Status
                </th>
                <th
                  style={
                    thStyle
                  }
                >
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders
                .filter(Boolean)
                .map(
                  (
                    order,
                    index
                  ) => {
                    const orderValue =
                      (
                        Number(
                          order.qty ||
                            0
                        ) *
                        Number(
                          order.price ||
                            0
                        )
                      ).toFixed(
                        2
                      );

                    const orderType =
                      order.type ||
                      order.mode;

                    const orderStatus =
                      order.status ||
                      "PENDING";

                    return (
                      <tr
                        key={
                          order?._id ||
                          `${order?.name}-${order?.qty}-${index}`
                        }
                        style={{
                          borderTop:
                            "1px solid #e5e7eb",
                        }}
                      >
                        <td
                          style={{
                            ...tdStyle,
                            fontWeight:
                              "600",
                            color:
                              "#222",
                          }}
                        >
                          {order.stock ||
                            order.name}
                        </td>

                        <td
                          style={
                            tdStyle
                          }
                        >
                          {order.qty}
                        </td>

                        <td
                          style={
                            tdStyle
                          }
                        >
                          ₹
                          {Number(
                            order.price ||
                              0
                          ).toFixed(
                            2
                          )}
                        </td>

                        <td
                          style={
                            tdStyle
                          }
                        >
                          ₹
                          {
                            orderValue
                          }
                        </td>

                        <td
                          style={{
                            ...tdStyle,
                            color:
                              orderType ===
                              "BUY"
                                ? "#16a34a"
                                : "#dc2626",
                            fontWeight:
                              "600",
                          }}
                        >
                          {
                            orderType
                          }
                        </td>

                        <td
                          style={
                            tdStyle
                          }
                        >
                          <span
                            style={{
                              background:
                                orderStatus ===
                                "EXECUTED"
                                  ? "#16a34a"
                                  : "#f59e0b",
                              color:
                                "white",
                              padding:
                                "4px 10px",
                              borderRadius:
                                "6px",
                              fontSize:
                                "12px",
                              fontWeight:
                                "600",
                            }}
                          >
                            {
                              orderStatus
                            }
                          </span>
                        </td>

                        <td
                          style={
                            tdStyle
                          }
                        >
                          <button
                            style={{
                              ...cancelBtn,
                              opacity:
                                orderStatus ===
                                "EXECUTED"
                                  ? 0.5
                                  : 1,
                              cursor:
                                orderStatus ===
                                "EXECUTED"
                                  ? "not-allowed"
                                  : "pointer",
                            }}
                            disabled={
                              orderStatus ===
                                "EXECUTED" ||
                              !order?._id
                            }
                            onClick={() => {
                              if (
                                order?._id
                              ) {
                                cancelOrder(
                                  order._id
                                );
                              }
                            }}
                          >
                            {orderStatus ===
                            "EXECUTED"
                              ? "Executed"
                              : "Cancel"}
                          </button>
                        </td>
                      </tr>
                    );
                  }
                )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Shared Card Style
const cardStyle = {
  background: "#ffffff",
  borderRadius: "8px",
  border:
    "1px solid #e5e7eb",
  boxShadow: "none",
};

// Table Header
const thStyle = {
  padding: "18px",
  textAlign: "left",
  color: "#777",
  fontSize: "13px",
  fontWeight: "600",
  textTransform:
    "uppercase",
  letterSpacing: "0.5px",
};

// Table Data
const tdStyle = {
  padding: "18px",
  color: "#333",
};

// Cancel Button
const cancelBtn = {
  background: "#ef4444",
  border: "none",
  color: "white",
  padding: "8px 14px",
  borderRadius: "6px",
  fontWeight: "600",
  cursor: "pointer",
};

export default Orders;