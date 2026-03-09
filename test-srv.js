const dns = require("dns");

dns.resolveSrv("_mongodb._tcp.kiramman.ix3nq99.mongodb.net", (err, records) => {
  if (err) {
    console.error("Erro ao resolver SRV:", err);
  } else {
    console.log("SRV records:", records);
  }
});