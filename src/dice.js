export class Dice {
  constructor(count, max) {
    this.max = max;
    this.count = count;
  }

  roll() {
    let out = 0;
    for(let i = 0; i < this.count; i++) {
      out += Math.floor(Math.random() * this.max) + 1;
    }
    return out;
  }

  avgRoll() {
    return ((this.max + 1) / 2) * this.count;
  }

  minRoll() {
    return this.count;
  }

  maxRoll() {
    return this.max * this.count;
  }

  rollType(type) {
    if(type == 0) return this.minRoll();
    if(type == 1) return this.avgRoll();
    if(type == 2) return this.maxRoll();

    return this.roll();
  }

  getCount() {
    return this.count;
  }

  getMax() {
    return this.max;
  }

  toString() {
    if(this.max === 1) return this.count + "";
    return this.count + "d" + this.max;
  }
}
