const soak = new Map([
  ["0", 0],
  ["1", 50],
  ["2", 500],
  ["3", 1000],
  ["4", 2500]
]);

const defense = new Map([
  ["0", 0],
  ["1", 50],
  ["2", 500],
  ["3", 2000],
  ["4", 5000]
]);

const encumbrance = new Map([
  ["0", 0],
  ["1", 75],
  ["2", 250],
  ["3", 500]
]);

const reinforced = new Map([
  ["no", 0],
  ["yes", 3000]
]);

const lowLow = new Map([
  ["low", 100],
  ["high", 250]
]);

const lowHigh = new Map([
  ["low", 250],
  ["high", 500]
]);

const highHigh = new Map([
  ["low", 1000],
  ["high", 2000]
]);

export { soak, defense, encumbrance, reinforced, lowLow, lowHigh, highHigh };
