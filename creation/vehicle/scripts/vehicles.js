import { determinePrice } from './prices.js';

const clamp = (min, current, max) => Math.min(max, Math.max(current, min));

const buttonClick = (e) => {
  if (e.target.dataset.direction) {
    const direction = parseInt(e.target.dataset.value);
    const target = e.target.dataset.target;
    const el = document.querySelector(`[data-${target}]`);
    const { min, max, value } = el;
    const minNumber = parseInt(min);
    const maxNumber = parseInt(max) || Infinity;
    const current = (direction > 0) ? parseInt(value)+1 : parseInt(value)-1;
    el.value = clamp(minNumber, current, maxNumber);
    handleInput();
  }
}


const handleInput = (e) => {
  if (e?.data && e.type === 'input') {
    const max = parseInt(e.target.max) || Infinity;
    const {min, value} = e.target;
    e.target.value = clamp(parseInt(min), parseInt(value), max);
  }
  const formBody = new FormData(document.querySelector('form'));
  const vehicle = Object.fromEntries(Array.from(formBody, ([k,v])=> isNaN(v) ? [k,v] : [k, parseInt(v)]));
  const vehiclePrice = determinePrice(vehicle);
  document.querySelector(`[data-price`).innerText = vehiclePrice;
}

document.addEventListener('click', buttonClick);
document.addEventListener('input', handleInput);