const express = require('express');
const fallback = require('express-history-api-fallback');

const app = express();
const PORT = process.env.PORT || 3001;
const root = `${__dirname}/build`;

app.use(express.static(root));
app.use(fallback('index.html', { root }));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
