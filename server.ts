const express = require('express');
const fallback = require('express-history-api-fallback');

const app = express();
const PORT = 3000;
const root = `${__dirname}/dist`;

app.use(express.static(root));
app.use(fallback('index.html', { root }));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});