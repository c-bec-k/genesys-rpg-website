import { determinePrice } from './prices.js';

let vehicle = {
  silhouette: 2,
  speed: 2,
  handling: 0,
  defense: 0,
  armor: 0,
  htt: 1,
  sst: 1,
  occupants: 1,
  consumables: 'hours',
  encumbrance: 0,
  price: 50
}

// for ( let [key, val] of Object.entries(vehicle)) {
//   console.log(key, val);
// }

document.addEventListener('click', buttonClick);
document.addEventListener('input', handleInput);

function buttonClick(e) {
  if (e.target.dataset.direction) {
    const type = `change_${e.target.dataset.target}`;
    const payload = { value: parseInt(e.target.dataset.value), target: e.target.dataset.target }
    const action = { type, payload };
    reducer(vehicle, action);
    vehicle.price = determinePrice(vehicle);
    renderVehicle();
  };
}

function reducer(state, action) {
  const { target, value } = action.payload;
  switch(action.type) {
    case 'change_silhouette':
    case 'change_htt':
    case 'change_sst':
    case 'change_occupants':
    case 'change_encumbrance':
      modify(value, target);
      break;
      // return state.silhouette = state.silhouette + value;
    case 'decrease':
      // return modify('minus', action.payload.target);
    case 'change':
      // return { ...vehicle, target: value };
  }  
}

function renderVehicle() {
  ["price", "silhouette", "htt", "sst", "occupants", "encumbrance"].forEach( elem => {
    document.querySelector(`[data-${elem}]`).innerText = vehicle[elem];
  })
}

function modify(direction, target) {
  
  const el = document.querySelector(`[data-${target}]`);
  const minNumber = parseInt(el.dataset.min);
  const maxNumber = parseInt(el.dataset.max);
  const current = vehicle[target];
  let adjusted;
  if ((current === minNumber && direction === -1) || (current === maxNumber && direction === 1)) {
    adjusted = current;
  } else {
    adjusted = (direction === 1) ? current+1 : current-1;
  }
  vehicle[target] = adjusted;
  // el.innerText = state[target];
  // console.log(vehicle)
}


function handleInput(e) {
  const { name, value } = e.target;
  vehicle[name] = (name === 'consumables') ? value : parseInt(value);
  vehicle.price = determinePrice(vehicle);
  renderVehicle();
}