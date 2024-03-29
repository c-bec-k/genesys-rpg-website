import * as prices from './pricePoints.js'

const swapDamage = () => {
  //calcualteBlast(parseInt(document.querySelector('[name="damage"]:checked').value));
  document.querySelectorAll('[data-damage]').forEach( (el) => el.classList.toggle('hidden'));
  document.querySelector('#brawn-based').checked ? document.querySelector('#bdmg-3').click() : document.querySelector('#dmg-3').click();
}

const resetTopRow = () => {
  document.querySelector('[data-show-price]').innerText = 0;
  document.querySelector('[data-show-profile]').innerText = '';
  document.querySelector('input[name="name"]').innerText = '';
  if (document.querySelector('#brawn-based').checked) swapDamage();
  document.querySelector('form').reset();
}

const getSkillModifier = (formData) => ['Brawl', 'Melee', 'Melee (Light)', 'Melee (Heavy)'].includes(formData.get('skill')) ? 0.5 : 1;

const getRangePrice = (formData) => prices.range.get(formData.get('range'));

const getCritPrice = (formData) => prices.critical[parseInt(formData.get('critical'))];

const qualityFilter = ([name, val]) => parseInt(val) && !['damage','critical', 'brawn-based'].includes(name);

const formattingMap = ([name, val]) => {
  const price = name === 'limited ammo' ? prices.limitedAmmo[parseInt(val)] :
                name === 'blast' ? prices.damage(parseInt(val)) * 0.5 :
                parseInt(val) * prices.qualities.get(name);
  return [name.concat( (!['auto-fire', 'inferior', 'knockdown', 'reinforced', 'stun damage', 'sunder', 'superior'].includes(name)) ? ` ${val}`: '' ), price];
}

const qualityReducer = (prev, [quality, price]) => [prev[0].concat(quality), prev[1] + price];

const getQualitiesPrice = (formData) => {
    return Array.from(formData).filter(qualityFilter).map(formattingMap).reduce(qualityReducer, [[],0]);

}

const formatWeaponString = (formData) => {
  const [qualityList, _] = getQualitiesPrice(formData);
  const dmgStr = formData.get('brawn-based') ? `+${parseInt(formData.get('damage'))-3}` : formData.get('damage');
  const baseString = `${formData.get('name')} (${formData.get('skill').replace('(','[').replace(')',']')}; Damage ${dmgStr}; Critical ${formData.get('critical') > 0 ? `${formData.get('critical')}` : '–'}; Range [${formData.get('range')}]`;
  return qualityList.length ? baseString.concat(`; ${qualityList.join(', ')})`) : baseString.concat(')');
}

const calcualteBlast = (formData) => {
  const damage = parseInt(formData.get('damage'));
  [4,3,2,1,0].forEach( entry => {
    const number = (damage >= 20) ? 20 - (5 * entry) : damage - entry;
    document.querySelector(`#blast-${entry}`).value = number;
    document.querySelector(`[for="blast-${entry}"]`).innerText = number;
  });
  damage >= 20 ? document.querySelector('[for="blast-4"]').classList.add('hidden') : document.querySelector('[for="blast-4"]').classList.remove('hidden');
  damage >= 20 ? document.querySelector('#blast-4').classList.add('hidden') : document.querySelector('#blast-4').classList.remove('hidden');
}

const updatePrice = () => {
  const formData = new FormData(document.querySelector("form"));
  const skillModifier = getSkillModifier(formData);
  const damagePrice = prices.damage(parseInt(formData.get('damage')));
  const rangePrice = getRangePrice(formData);
  const critPrice = getCritPrice(formData);
  calcualteBlast(formData);
  const [_, qualitiesPrice] = getQualitiesPrice(formData);
  document.querySelector('[data-show-price]').innerText = Intl.NumberFormat().format((damagePrice + rangePrice + critPrice + qualitiesPrice) * skillModifier);
  document.querySelector('[data-show-profile]').innerText = formatWeaponString(formData);
}

document.querySelector('#brawn-based').addEventListener('change', swapDamage);
document.querySelector('#form').addEventListener('input', updatePrice);
document.querySelector('input[type="reset"]').addEventListener('click', resetTopRow);