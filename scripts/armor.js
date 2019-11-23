import * as prices from "./pricePoints.js";

document.querySelector("form").addEventListener("change", renderSuggestions);
document.querySelectorAll('[type="range"]').forEach(element => {
  element.addEventListener("mousemove", renderSuggestions);
});
document
  .querySelector('input[type="reset"]')
  .addEventListener("click", resetNumbers);

function renderSuggestions(e) {
  const soakAmount = document.querySelector('[name="soak"]:checked').value,
    defenseAmout = document.querySelector('[name="defense"]:checked').value,
    encumbranceReduction = document.querySelector("#reduced-encumbrance").value,
    extraHardPoints = document.querySelector("#extra-hard-points").value,
    totalPrice = getTotalPrice(
      soakAmount,
      defenseAmout,
      extraHardPoints,
      encumbranceReduction
    ),
    totalEncumbrance = renderEncumbrance(
      soakAmount,
      defenseAmout,
      encumbranceReduction
    ),
    totalHardPoints = calculateHP(totalEncumbrance, extraHardPoints);

  renderExtraHardPoints();
  reducedEncumbrance(encumbranceReduction);

  document.querySelector("[data-price]").innerText = totalPrice;
  document.querySelector("[data-enc]").innerText = totalEncumbrance;
  document.querySelector("[data-hp]").innerText = totalHardPoints;
}

function getTotalPrice(soak, defense, hp, enc) {
  const soakPrice = prices.soak.get(soak),
    defensePrice = prices.defense.get(defense),
    reinforcedPrice = document.querySelector("#reinforced").checked
      ? prices.reinforced.get("yes")
      : prices.reinforced.get("no"),
    hardPointPrice = hp * 100,
    encPrice = prices.encumbrance.get(enc),
    basePrice = soakPrice + defensePrice + hardPointPrice + encPrice,
    soakMod = soak > 0 && soak < 2 ? "low" : soak > 1 ? "high" : false,
    defenseMod =
      defense > 0 && defense < 3 ? "low" : defense > 2 ? "high" : false;
  let lowInc = 0,
    highInc = 0;
  if (soakMod === "low" && defenseMod === "low") {
    lowInc = prices.lowLow.get("low");
    highInc = prices.lowLow.get("high");
  } else if (
    (soakMod === "low" && defenseMod === "high") ||
    (soakMod === "high" && defenseMod === "low")
  ) {
    lowInc = prices.lowHigh.get("low");
    highInc = prices.lowHigh.get("high");
  } else if (soakMod === "high" && defenseMod === "high") {
    lowInc = prices.highHigh.get("low");
    highInc = prices.highHigh.get("high");
  }

  if (lowInc) {
    return `${Intl.NumberFormat().format(
      basePrice + lowInc + reinforcedPrice
    )}–${Intl.NumberFormat().format(basePrice + highInc + reinforcedPrice)}`;
  } else {
    return `${Intl.NumberFormat().format(basePrice + reinforcedPrice)}`;
  }
}

function renderExtraHardPoints() {
  const text = document.querySelector("[data-extra-hard-points]"),
    value = document.querySelector("#extra-hard-points").value;

  text.innerText = value;
}

function reducedEncumbrance(enc) {
  const text = document.querySelector("[data-reduced-encumbrance]");

  text.innerText = `${enc === "0" ? "" : "–"}${enc}`;
}

function renderEncumbrance(soak, defense, encumbrance) {
  return 1 + parseInt(soak) + parseInt(`${defense > 0 ? 1 : 0}`) - encumbrance;
}

function calculateHP(enc, hp) {
  return Math.ceil(enc / 2) + parseInt(hp);
}

function resetNumbers() {
  document.querySelector("[data-price]").innerText = 0;
  document.querySelector("[data-enc]").innerText = 1;
  document.querySelector("[data-hp]").innerText = 1;
  document.querySelector("[data-reduced-encumbrance]").innerText = 0;
  document.querySelector("[data-extra-hard-points]").innerText = 0;
}
