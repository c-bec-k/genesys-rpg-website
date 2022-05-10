import * as prices from "./pricePoints.js";

document.querySelector("form").addEventListener("change", renderSuggestions);
document.querySelector('input[type="reset"]').addEventListener("click", resetNumbers);

const getbasePrice = (formData) => {
  const price = Array.from(formData);
  return price.reduce( (accum, [name, val]) => accum + prices[name][parseInt(val)],0);
}

const getPriceMod = (formData) => {
  const soak = parseInt(formData.get('soak'));
  const defense = parseInt(formData.get('defense'));
  console.log(`Soak: ${soak}; Defense: ${defense}`);
  if (soak === 0 || defense === 0) return [0,0];
  const soakName = soak > 1 ? 'high' : 'low';
  const defenseName = defense > 3 ? 'High' : 'Low';
  console.log(`Soak Name: ${soakName}; Defense Name: ${defenseName}`);
  console.log(prices[`${soakName}${defenseName}`]);
  return prices[`${soakName}${defenseName}`];
}

const getEncValue = (formData) => {
  const soak = parseInt(formData.get('soak'));
  const defense = parseInt(formData.get('defense'));
  const encumbrance = parseInt(formData.get('encumbrance'))
  return 1 + soak + (defense ? 1 : 0) - encumbrance;
}

const getHardPoints = (formData) => {
  return Math.floor(getEncValue(formData) * 0.5) + parseInt(formData.get('hardPoints'));
}

const generatePriceString = (base, low, high) => {
  if (low === 0 || high === 0) return Intl.NumberFormat().format(base);
  return `${Intl.NumberFormat().format(base + low)}–${Intl.NumberFormat().format(base + high)}`;
}

function renderSuggestions() {
  const formData = new FormData(document.querySelector("form"));
  const basePrice = getbasePrice(formData);
  const [priceModLow, priceModHigh] = getPriceMod(formData);
  const totalEncumbrance = getEncValue(formData);
  const hardPoints = getHardPoints(formData);
  const priceString = generatePriceString(basePrice, priceModLow, priceModHigh);
  document.querySelector("[data-price]").innerText = priceString;
  document.querySelector("[data-enc]").innerText = totalEncumbrance;
  document.querySelector("[data-hp]").innerText = hardPoints;
}

function resetNumbers() {
  document.querySelector("[data-price]").innerText = 0;
  document.querySelector("[data-enc]").innerText = 1;
  document.querySelector("[data-hp]").innerText = 1;
}