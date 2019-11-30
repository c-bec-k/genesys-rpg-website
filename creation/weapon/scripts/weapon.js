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
        damagePrice = getDamagePrice(),
        rangePrice = getRangePrice(),
        critPrice = getCritPrice(),
        priceLabel = document.querySelector('[data-show-price]')



  priceLabel.innerText = Intl.NumberFormat().format((damagePrice + rangePrice + critPrice) * skillModifier)
}


function getSkillModifier() {
  const skillName = document.querySelector('input[name="skill"]:checked').value

  if (skillName === "Brawl" || skillName === "Melee" || skillName === "Melee (Heavy)" || skillName === "Melee (Light)") { return 0.5 }
  else { return 1 };
}

function getDamagePrice() {
  const damageNumber = parseInt(document.querySelector('#damage').value)
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