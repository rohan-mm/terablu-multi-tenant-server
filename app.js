const express = require("express");
const app = express();
const mqtt = require("mqtt");
const { fetchRules } = require("./apiCall");
const { sendEmail } = require("./emailConfig");
const { testCondition } = require("./helper");
const client = mqtt.connect("mqtt://broker.hivemq.com");

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Terablu multi-tenant server",
  });
});
// Rohan - mqtt://139.162.59.52:1883
client.on("connect", function () {
  client.subscribe("rohan/#");
  console.log("Rohan has subscribed successfully");
});

client.on("message", async function (topic, message) {
  let recievedValue = message.toString();
  let deviceId = topic.split("/")[3];

  //   console.log(JSON.parse(temp).value_1, deviceId);
  const rules = await fetchRules(deviceId)
    .then((response, err) => {
      if (response.status === 200) {
        return response.data.result.hits;
      } else {
        console.log("error in fetching rules");
        return [];
      }
    })
    .catch((e) => {
      console.log("error in fetching rules", e);
      return [];
    });
  rules.map((element) => {
    const { device, condition, action } = element._source;
    if (
      testCondition(
        JSON.parse(recievedValue)[device.key],
        parseInt(condition.value),

        condition.operator
      )
    ) {
      console.log("condition passed");
      if (action.action === "email") {
        console.log("sending email now");
        sendEmail(
          "rohantaufique2@gmail.com",
          device.deviceId,
          new Date(),
          `value ${condition.operator} ${condition.value}`,
          JSON.parse(recievedValue)[device.key],
          condition.name
        );
      }
    } else {
      console.log("condition failed");
    }
  });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server Running at port: ${process.env.PORT}`);
});
