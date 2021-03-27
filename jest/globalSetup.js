const { server } = require("../src/server");

module.exports = async () => {
  global.httpServer = await server.start({ port: 4000 });
};
