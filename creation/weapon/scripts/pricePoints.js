const damage = (n) => {
  switch (true) {
    case n <= 3:
      return 0;
    case n <= 5:
      return 100;
    case n <= 7:
      return 250;
    case n <= 9:
      return 900;
    case n <= 12:
      return 1000;
    default:
      return 3000;
  }
}

const range = new Map([
  ["Engaged", 0],
  ['Short', 0],
  ['Medium', 100],
  ['Long', 300],
  ['Extreme', 600],
  ['Strategic', 1000]
]);

const critical = [0, 600, 300, 150, 50, 0, 0];

const qualities = new Map([
  ["accurate", 50],
  ["auto-fire", 250],
  ["breach", 1000],
  ["burn", 200],
  ["concussive", 1000],
  ["cumbersome", -100],
  ["defensive", 50],
  ["disorient", 50],
  ["ensnare", 200],
  ["guided", 100],
  ["inaccurate", -75],
  ["inferior", -100],
  ["knockdown", 100],
  ["linked", 200],
  ["pierce", 100],
  ["prepare", -75],
  ["reinforced", 250],
  ["slow-firing", -75],
  ["stun", 50],
  ["stun damage", 0],
  ["sunder", 250],
  ["superior", 250],
  ["tractor", 100],
  ["unwieldy", -100],
  ["vicious", 100]
]);

const limitedAmmo = [0, -500, -400, -300, -200, -100];

export { damage, range, critical, qualities, limitedAmmo }