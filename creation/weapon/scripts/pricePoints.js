const damage = new Map([
  ["5", 100],
  ["7", 250],
  ["9", 500],
  ["12", 1000],
  ["30", 3000]
])

const range = new Map([
  ["Engaged", 0],
  ['Short', 0],
  ['Medium', 100],
  ['Long', 300],
  ['Extreme', 600]
])

const critical = new Map([
  ['0', 0],
  ['1', 600],
  ['2', 300],
  ['3', 150],
  ['4', 50],
  ['5', 0],
  ['6', 0]
])

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
  ["prepare", -75],
  ["reinforced", 250],
  ["slow-firing", -75],
  ["stun", 50],
  ["stun-damage", 0],
  ["sunder", 250],
  ["superior", 250],
  ["tractor", 100],
  ["unwieldy", -100],
  ["vicious", 100]
])

export { damage, range, critical, qualities }