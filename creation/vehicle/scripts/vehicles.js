import { suggestedNumbers } from './suggestions.js';
import * as prices from './prices.js';

const silhouetteSelection = document.querySelector('[data-silhouette]');

silhouetteSelection.addEventListener('change', updateSuggestions);

function updateSuggestions() {
  const suggestions = document.querySelectorAll('[data-suggest]');
  const currentSilhouette = document.querySelector('input[name="silhouette"]:checked').value;
  console.log(currentSilhouette);
  suggestions.forEach( suggestion => {
    const value = suggestion.dataset.suggest;
    // console.log(suggestedNumbers[currentSilhouette])
    suggestion.innerText = suggestedNumbers[currentSilhouette][value];
  });
}

const handling = document.querySelector('#handling')
handling.addEventListener('click', checkAria)

function checkAria(e) {
  const clicked = e.currentTarget
  const checked = clicked.getAttribute('aria-checked') === 'true'
  clicked.setAttribute('aria-checked', !checked)
}