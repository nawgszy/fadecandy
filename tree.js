const Art = require('./Art');

const red = [160, 0, 0];
const green = [0, 160, 0];
const blue = [0, 0, 160];
const yellow = [200, 200, 0];

class Christmas extends Art {
  initializeTree() {
    const numLeds = 512;
    for (let i = 0; i < numLeds; i++) {
      this.opc.setPixel(i, ...green);
    }

    this.opc.writePixels();

    this.drawFrame(0);

    return Promise.resolve();
  }

  drawFrame(shift) {
    const brightnessModulator = (color, brightness) => {
      return [
        color[0] * brightness,
        color[1] * brightness,
        color[2] * brightness,
      ];
    };

    const numLeds = 512;
    for (let i = 0; i < numLeds; i++) {
      let num = (i % 9) / 3;

      let color;
      switch(num) {
        case 0:
          color = blue;
          break;
        case 1:
          color = yellow;
          break;
        case 2:
          color = red;
          break;
        default:
          color = green;
      }

      let pixelId = (i + shift) % 512;
      
      this.opc.setPixel(pixelId, ...color);
    }

    this.opc.writePixels();
  }

  draw() {
    let i = 0;

    return new Promise((resolve, reject) => {
      setInterval(() => {
        this.drawFrame(i);
      }, 2000);

      setInterval(() => {
        i++;
      }, 2000);

      setTimeout(() => resolve(), 1000000);
    });
  }
}

let christmas = new Christmas();

christmas.connect()
.then(() => christmas.initializeTree())
.then(() => christmas.draw())
.then(process.exit);
