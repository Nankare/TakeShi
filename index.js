const express = require("express");
const line = require("@line/bot-sdk");

const app = express();

const config = {
  channelAccessToken: process.env.r6LLHE7K3W74vnw1v53TTIM495jeFXGAt7Ulta7o5ISgtxUhTUxR8aU0Si0m77JOM84PPA0zautslbbfIr5HaM+E0+NYyRV6LKqnvDqaoHXDL1iW6jpElUJN1U1FL4D/TuMy2s3Evnw29JEUkZqhfQdB04t89/1O/w1cDnyilFU=,
  channelSecret: process.env.781d3db1e8ac356e0182e1c68b5b329b
};

const client = new line.Client(config);

app.post("/webhook", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then(() => res.json({}))
    .catch(err => console.error(err));
});

function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: "text",
    text: "受信: " + event.message.text
  });
}

app.get("/", (req, res) => {
  res.send("bot is running");
});

app.listen(3000, () => console.log("起動"));
