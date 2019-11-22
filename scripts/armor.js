import { armorPrice } from "./pricePoints.js";

const price = document.querySelector("[data-price]"),
  enc = document.querySelector("[data-enc"),
  hp = document.querySelector("[data-hp");

document.querySelector("form").addEventListener("change", renderSuggestions);

function renderSuggestions(e) {
  const soak = document.querySelector('[name="soak"]:checked'),
    defense = document.querySelector('[name="defense"]:checked');
  // console.log(soak.value, defense.value);
}
