const dns = require("dns");

// força o Node a usar IPv4 primeiro
///dns.setDefaultResultOrder("ipv4first");

// define DNS manual (Google)
//dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
