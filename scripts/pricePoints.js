const soak = new Map([
  ["1", 50],
  ["2", 500],
  ["3", 1000],
  ["4", 2500]
]);

const defense = new Map([
  ["1", 50],
  ["2", 500],
  ["3", 2000],
  ["4", 5000]
]);

const encumbrance = new Map([
  ["1", 75],
  ["2", 250],
  ["3", 500]
]);

const reinforced = new Map([[true, 3000]]);

export const armorPrice = {
  soak: soak,
  defense: defense,
  encumbrance: encumbrance,
  reinforced: reinforced
};
