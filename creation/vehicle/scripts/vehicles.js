import { determinePrice } from './prices.js';
import { drawImage } from './imageLocation.js';
const ctx = document.createElement("canvas").getContext("2d");
const imgShow = document.querySelector("#vehicle");

(() => new FontFace("Bebas Neue", "url(BebasNeue.ttf)").then(font => document.fonts.add(font)))();

const img = new Image();
img.onload = () => {
  ctx.canvas.width = img.width;
  ctx.canvas.height = img.height;
  const data = {
    bg: img,
    sil: 1,
    speed: 1,
    handling: 0,
    def: 0,
    armour: 0,
    htt: 1,
    sst: 1

  }
  drawImage(ctx, data);
  const imgURL = ctx.canvas.toDataURL();
  console.log(imgURL);
  imgShow.src = imgURL;
}

img.src = "Vehicle.png";

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
  const data = {
    bg: img,
    sil: vehicle.silhouette,
    speed: vehicle.speed,
    handling: vehicle.handling,
    def: vehicle.defense,
    armour: vehicle.armor,
    htt: vehicle.htt,
    sst: vehicle.sst
  }
  drawImage(ctx, data);
  const imgURL = ctx.canvas.toDataURL();
  imgShow.src = imgURL;
  
}

document.addEventListener('click', buttonClick);
document.addEventListener('input', handleInput);