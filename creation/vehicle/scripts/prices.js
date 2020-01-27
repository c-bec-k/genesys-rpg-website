const silhouette =new Map([
  [1, 0.5],
  [4, 1],
  [5, 2],
  [6, 10],
  [10, 100]
]);


const maxSpeed = new Map([
  [1, 0],
  [2, 1000],
  [3, 2500],
  [4, 5000],
  [5, 10000]
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
  ['hours', 0],
  ['days', 10],
  ['weeks', 200],
  ['months', 400],
  ['monthsPlus', 1000]
]);


function getSilMod(sil) {
  for(let [key, val] of silhouette) {
    if (sil <= key) { return val }
  }
}

function getThreshold(value) {
  if (value > 50) {
    return ((value - 50) * 1000) + 4900;
  }
  else {
    return (value - 1) * 100;
  }
};

function getCargo(type, value) {
  for (let  [key, val] of type) {
    if (value <= key) {return val};
  }
};

function determinePrice(vehicle) {
  const silMod = getSilMod(vehicle.silhouette),
    speedPrice = maxSpeed.get(vehicle.speed),
    handlingPrice = handling.get(vehicle.handling),
    defensePrice = defense.get(vehicle.defense),
    armorPrice = armor.get(vehicle.armor),
    consumablesPrice = consumables.get(vehicle.consumables) * ((vehicle.silhouette < 5) ? 1 : 10),
    httPrice = getThreshold(vehicle.htt),
    sstPrice = getThreshold(vehicle.sst),
    occupantsPrice = getCargo(occupants, vehicle.occupants),
    encPrice = getCargo(encumbrance, vehicle.encumbrance);
  console.log(consumablesPrice);
  const totalPrice = (speedPrice + handlingPrice + defensePrice + armorPrice + consumablesPrice + httPrice + sstPrice + occupantsPrice + encPrice) * silMod;
  return Intl.NumberFormat().format(totalPrice);
}

export { maxSpeed, handling, defense, armor, occupants, encumbrance, consumables, determinePrice };