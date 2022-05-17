const silhouetteMod = (sil) => [0.5,1,1,1,2,10,10,10,10,10][sil - 1];

const speedPrice = (speed) => [0,1000,2500,5000,10000][speed - 1];

const handlingPrice = (handling) => new Map([[-4, -4000], [-3, -2000], [-2, -1500], [-1, -1000], [0, 0], [1, 1000], [2, 2000], [3, 5000], [4, 10000]]).get(handling);

const defensePrice = (def) => [0,100,1000,3000,6000][def];

const armorPrice = (ar) => [0,2500,5000,10000,25000,50000,100000,200000][ar];

const lessThanPrice = (arr) => (num) => arr.find(([k,v]) => num <= k)[1];

const occupantPrice = lessThanPrice([[1, 0], [4, 100], [10, 250], [20, 500], [50, 1000], [250, 5000], [1000, 25000],[Infinity, 50000]]);

const encumbrancePrice = lessThanPrice([[1, 0], [4, 10], [10, 50], [25, 100], [50, 1000], [100, 2500], [250, 5000], [1000, 10000], [Infinity, 20000]]);

const thresholdPrice = (val) => val > 50 ? ((val - 50) * 1000) + 4900 : (val - 1) * 100;

const consumables = (cons) => new Map([['hours', 0],['days', 10],['weeks', 200],['months', 400],['monthsPlus', 1000]]).get(cons);

function determinePrice(vehicle) {
  const silMod = silhouetteMod(vehicle.silhouette);
  const speed = speedPrice(vehicle.speed);
  const handling = handlingPrice(vehicle.handling);
  const defense = defensePrice(vehicle.defense);
  const armor = armorPrice(vehicle.armor);
  const consumable = consumables(vehicle.consumables) * ((vehicle.silhouette < 5) ? 1 : 10);
  const htt = thresholdPrice(vehicle.htt);
  const sst = thresholdPrice(vehicle.sst);
  const occupants = occupantPrice(vehicle.occupants);
  const enc = encumbrancePrice(vehicle.encumbrance);
  const total = (speed + handling + defense + armor + consumable + htt + sst + occupants + enc) * silMod;
  return Intl.NumberFormat().format(total);
}

export {  determinePrice };