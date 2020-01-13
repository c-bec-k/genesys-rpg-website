const speed = new Map([
  [1, 0],
  [2, 1000],
  [3, 2500],
  [4, 5000]
]);

const handling = new Map([
  [-4, -4000],
  [-3, -2000],
  [-2, -1500],
  [-1, -1000],
  [0, 0],
  [1, 1000],
  [2, 2000],
  [3, 5000],
  [4, 10000]
]);

const defense = new Map([
  [0, 0],
  [1, 100],
  [2, 1000],
  [3, 3000],
  [4, 6000]
]);

const armor = new Map([
  [0, 0],
  [1, 2500],
  [2, 5000],
  [3, 10000],
  [4, 25000],
  [5, 50000],
  [6, 100000],
  [7, 200000]
]);

const occupants = new Map([
  [1, 0],
  [4, 100],
  [10, 250],
  [20, 500],
  [50, 1000],
  [250, 5000],
  [1000, 25000],
]);

const encumbrance = new Map([
  [1, 0],
  [4, 10],
  [10, 50],
  [25, 100],
  [50, 1000],
  [100, 2500],
  [250, 5000],
  [1000, 10000],
  [99999999999, 20000]
]);

const consumables = new Map([
  ['6 hours', 0],
  ['1–6 days', 10],
  ['1–3 weeks', 200],
  ['1–5 months', 400],
  ['6+ months', 1000]
]);

export { speed, handling, defense, armor, occupants, encumbrance, consumables };