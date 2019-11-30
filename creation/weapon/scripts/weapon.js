import * as prices from './pricePoints.js'

document.querySelectorAll('[data-change]').forEach(el => {
  el.addEventListener('click', changeNumber)
})

document.querySelector('#brawn-based').addEventListener('change', changeDamageDisplay )

function changeDamageDisplay() {
  const check = document.querySelector('#brawn-based').checked
  
  document.querySelector('#damage').value = 5
  document.querySelector('[data-show-damage').innerText = check ? '+2' : '5'

}

function changeNumber(e) {
  const direction = e.target.dataset.change,
        target = e.target.dataset.target,
        element = document.querySelector(`#${target}`),
        show = document.querySelector(`[data-show-${target}]`),
        brawn = document.querySelector('#brawn-based');
  let currentNumber = parseInt(element.value),
      max = document.querySelector('#brawn-based').checked ? 8 : 25;

  currentNumber = direction === '-' && currentNumber <= 4 ? 4 : direction === '-' && currentNumber > max ? max : direction === '+' && currentNumber >= max ? max : direction === '+' ? currentNumber + 1 : direction === '-' ? currentNumber - 1 : currentNumber
  element.value = currentNumber
  show.innerText = (brawn.checked) ? `+${currentNumber - 3}` : currentNumber
  const event = new Event('change', { bubbles: true })

  calcualteBlast(currentNumber)

  element.dispatchEvent(event)
}

function calcualteBlast(damage) {
  const spread = [4,3,2,1,0]

  spread.forEach( entry => {
    const number = (damage >= 20) ? 5 * entry : damage - entry
    document.querySelector(`#blast-${entry}`).value = number
    document.querySelector(`[for="blast-${entry}"]`).innerText = number
  })


}

document.querySelector('#form').addEventListener('change', updatePrice)

function updatePrice(e) {
  e.target.attributes.type === "button" ? changeNumber(e) : ''
  const skillModifier = getSkillModifier(),
        damagePrice = getDamagePrice('#damage'),
        rangePrice = getRangePrice(),
        critPrice = getCritPrice(),
        qualitiesPrice = getQualitiesPrice(),
        priceLabel = document.querySelector('[data-show-price]')



  priceLabel.innerText = Intl.NumberFormat().format((damagePrice + rangePrice + critPrice + qualitiesPrice) * skillModifier)
}


function getSkillModifier() {
  const skillName = document.querySelector('input[name="skill"]:checked').value

  if (skillName === "Brawl" || skillName === "Melee" || skillName === "Melee (Heavy)" || skillName === "Melee (Light)") { return 0.5 }
  else { return 1 };
}

function getDamagePrice(element) {
  const damageNumber = parseInt(document.querySelector(element).value)
        for (let [key, val] of prices.damage) {
          if (damageNumber <= key) {return val}
        }
}

function getRangePrice() {
  const range = document.querySelector('input[name="range"]:checked').value

  return prices.range.get(range)
}

function getCritPrice() {
  const crit = parseInt(document.querySelector('input[name="critical"]:checked').value)

  return prices.critical.get(crit)
}

function getQualitiesPrice() {
  const normalQualities = ['accurate', 'auto-fire', 'breach', 'burn', 'concussive', 'cumbersome', 'defensive', 'disorient', 'ensnare', 'guided', 'inaccurate', 'inferior', 'knockdown', 'linked', 'prepare', 'reinforced', 'slow-firing', 'stun', 'sunder', 'tractor', 'unwieldy', 'vicious'],
        otherStuff = 0;
  let priceGrid = []

  normalQualities.forEach(quality => {
    const rating = parseInt(document.querySelector(`[name='${quality}']:checked`).value),
          price = prices.qualities.get(quality)
    priceGrid.push(rating*price)
  })

  priceGrid.push(prices.limitedAmmo.get(parseInt(document.querySelector('[name="limited-ammo"]:checked').value)))

  const blastDamage = getDamagePrice('[name="blast"]:checked')
  priceGrid.push(Math.ceil(.5 * blastDamage))

  return priceGrid.reduce( (a, b) => a + b)
}

document.querySelector('input[type="reset"]').addEventListener('click', () =>{ document.querySelector('[data-show-price]').innerText = 0})