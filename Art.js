const path = require('path')
const config = require('./config/project');
const fadecandyConfig = require('./config/server');

const OPC = require(path.join(config.fadecandyNodeDir, 'opc'));

class Art {
  constructor(host, port) {
    host = host || fadecandyConfig.listen[0];
    port = port || fadecandyConfig.listen[1];

    this.opc = new OPC(host, port);
  }

  draw() {
    console.log('Art.draw not overrode by subclass...');
  }

  drawFrame() {
    console.log('Art.drawFrame not overriden by subclass...');
  }

  connect() {
    return Promise.resolve(this.opc._reconnect());
  }
}

module.exports = Art;
