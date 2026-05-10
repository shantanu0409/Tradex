require("dotenv").config();


const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");


  const {
  getLiveStock,
} = require(
  "./services/liveStockService"
);

const {
  checkPriceAlerts,
} = require(
  "./services/alertMonitorService"
);

const {
  AlertModel,
} = require(
  "./model/AlertModel"
);

// Routes
const authRoutes = require(
  "./routes/authRoutes"
);
const watchlistRoutes = require(
  "./routes/watchlistRoutes"
);
const alertRoutes = require(
  "./routes/alertRoutes"
);
const fundsRoutes = require(
  "./routes/fundsRoutes"
);
const ordersRoutes = require(
  "./routes/ordersRoutes"
);
const stockRoutes = require(
  "./routes/stockRoutes"
);
const portfolioRoutes = require(
  "./routes/portfolioRoutes"
);

const profileRoutes =
  require(
    "./routes/profileRoutes"
  );

// Config
const PORT =
  process.env.PORT || 3002;
const uri =
  process.env.MONGO_URL;

  
// ===============================
// EXPRESS APP
// ===============================

const app = express();

const server =
  http.createServer(app);
const allowedOrigins = [
  // Local development
  "http://localhost:3000", // Frontend
  "http://localhost:3001", // Dashboard

  // Production (replace with your actual deployed URLs)
  "https://your-frontend.vercel.app",
  "https://your-dashboard.vercel.app",
];
// ===============================
// SOCKET IO
// ===============================

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// ===============================
// MONGOOSE
// ===============================

mongoose.set(
  "bufferCommands",
  false
);

let isDbConnected =
  false;

// ===============================
// MIDDLEWARE
// ===============================

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(
  bodyParser.json()
);
app.use("/", watchlistRoutes);
app.use("/", authRoutes);
app.use("/", alertRoutes);
app.set("io", io);
app.use("/", fundsRoutes);

app.use("/", ordersRoutes);

app.use("/", stockRoutes);
app.use(
  "/",
  profileRoutes
);
app.set(
  "isDbConnected",
  isDbConnected
);
app.use("/", portfolioRoutes);
// ===============================
// SOCKET CONNECTION
// ===============================

io.on(
  "connection",

  (socket) => {

    console.log(
      "User Connected:",
      socket.id
    );

socket.on(
  "subscribeStocks",

  async (symbols) => {
    try {
      // Get all active (not yet triggered) alerts
      const activeAlerts =
        await AlertModel.find({
          triggered: false,
        }).select("symbol");

      // Extract alert symbols
      const alertSymbols =
        activeAlerts.map(
          (alert) =>
            alert.symbol
        );

      // Merge watchlist symbols and alert symbols
      // Remove duplicates using Set
      const allSymbols = [
        ...new Set([
          ...symbols,
          ...alertSymbols,
        ]),
      ];

      // Fetch live stock data for all symbols
      const stocks =
        await Promise.all(
          allSymbols.map(
            async (symbol) =>
              await getLiveStock(
                symbol
              )
          )
        );

      const liveStocks =
        stocks.filter(Boolean);

      // Check price alerts
      await checkPriceAlerts(
        liveStocks,
        io
      );

      // Send live prices to frontend
      socket.emit(
        "liveStocks",
        liveStocks
      );
    } catch (error) {
      console.log(
        "Subscribe Stocks Error:",
        error.message
      );
    }
  }
);

socket.on(
  "disconnect",

  () => {
    console.log(
      "User Disconnected"
    );
  }
);
}
);
        



// ===============================
// START SERVER
// ===============================
mongoose
  .connect(uri)
  .then(() => {
    console.log(
      "DB connected successfully!"
    );

    isDbConnected = true;
    app.set(
      "isDbConnected",
      true
    );

    server.listen(
      PORT,
      () => {
        console.log(
          `App started on port ${PORT}!`
        );
      }
    );
    setInterval(async () => {
  try {
    const activeAlerts =
      await AlertModel.find({
        triggered: false,
      }).select("symbol");

    if (
      activeAlerts.length === 0
    ) {
      return;
    }

    const symbols = [
      ...new Set(
        activeAlerts.map(
          (alert) =>
            alert.symbol
        )
      ),
    ];

    const stocks =
      await Promise.all(
        symbols.map(
          async (symbol) =>
            await getLiveStock(
              symbol
            )
        )
      );

    const liveStocks =
      stocks.filter(Boolean);

    await checkPriceAlerts(
      liveStocks,
      io
    );
  } catch (error) {
    console.log(
      "Background Alert Check Error:",
      error.message
    );
  }
}, 4000); // every 10 seconds

  })
  .catch((err) => {
    console.log(
      "DB connection failed:",
      err.message
    );

    isDbConnected = false;
    app.set(
      "isDbConnected",
      false
    );

    process.exit(1);
  });

mongoose.connection.on(
  "connected",
  () => {
    console.log(
      "DB connected"
    );
    
    isDbConnected = true;
    app.set(
      "isDbConnected",
      true
    );
  }
);

mongoose.connection.on(
  "disconnected",
  () => {
    console.log(
      "DB disconnected"
    );

    isDbConnected = false;
    app.set(
      "isDbConnected",
      false
    );
  }
);