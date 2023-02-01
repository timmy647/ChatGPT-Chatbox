// 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

const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const configuration = new Configuration({
  organization: "org-C2dU3jmesQU77vl1FBonO8kA",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 3080;

// create asimple express api that calls the function above
app.post("/", async (req, res) => {
  const { message, currentModel } = req.body;
  console.log(message);
  const response = await openai.createCompletion({
    model: `${currentModel}`, //"text-davinci-003",
    prompt: `${message}`,
    max_tokens: 100,
    temperature: 0.5,
  });
  res.json({
    message: response.data.choices[0].text,
  });
});

app.get("/models", async (req, res) => {
  const response = await openai.listEngines();
  console.log(response.data.data);
  res.json({
    models: response.data.data,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http:// local host:${port}`);
});
