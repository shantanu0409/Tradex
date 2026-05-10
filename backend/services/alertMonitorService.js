const {
  AlertModel,
} = require("../model/AlertModel");

const {
  UserModel,
} = require(
  "../model/UserModel"
);

const {
  sendEmailAlert,
} = require("./emailService");

const checkPriceAlerts =
  async (
    liveStocks,
    io
  ) => {
    try {
      const alerts =
        await AlertModel.find({
          triggered: false,
        });

      for (const alert of alerts) {
        const stock =
          liveStocks.find(
            (item) =>
              item.symbol ===
              alert.symbol
          );

        if (!stock) continue;

        const currentPrice =
          Number(stock.price);

        let shouldTrigger =
          false;

        if (
          alert.condition ===
          "ABOVE"
        ) {
          shouldTrigger =
            currentPrice >=
            alert.targetPrice;
        }

        if (
          alert.condition ===
          "BELOW"
        ) {
          shouldTrigger =
            currentPrice <=
            alert.targetPrice;
        }

        if (shouldTrigger) {
          console.log(
            "🔔 Triggering alert for:",
            alert.symbol
          );

          alert.triggered =
            true;
          await alert.save();

          // =========================
          // SEND EMAIL
          // =========================
          try {
            console.log(
              "📧 Sending email to:",
              process.env.ALERT_EMAIL
            );

            const user =
  await UserModel.findById(
    alert.userId
  );

if (user?.email) {
  await sendEmailAlert(
    "🔔 Stock Price Alert Triggered",
    `${alert.symbol} ${alert.condition} ₹${alert.targetPrice}\nCurrent Price: ₹${currentPrice}`,
    user.email
  );
}

            console.log(
              "✅ Email sent successfully"
            );
          } catch (emailError) {
            console.log(
              "❌ Email Error:",
              emailError.message
            );
          }

          // =========================
          // SEND SOCKET NOTIFICATION
          // =========================
          try {
            if (io) {
              io.emit(
                "priceAlertTriggered",
                {
                  userId:
                    alert.userId.toString(),
                  symbol:
                    alert.symbol,
                  condition:
                    alert.condition,
                  targetPrice:
                    alert.targetPrice,
                  currentPrice,
                }
              );

              console.log(
                "✅ Socket notification sent"
              );
            } else {
              console.log(
                "❌ io is undefined"
              );
            }
          } catch (socketError) {
            console.log(
              "❌ Socket Error:",
              socketError.message
            );
          }
        }
      }
    } catch (error) {
      console.log(
        "❌ Check Alerts Error:",
        error.message
      );
    }
  };

module.exports = {
  checkPriceAlerts,
};