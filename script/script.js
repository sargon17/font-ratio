const initialScale = document.querySelector("#initialScale");
const generateBtn = document.querySelector("#generateBtn");
const optionPx = document.querySelector("#optionPx");
const optionEm = document.querySelector("#optionEm");

let ratioSettings = {
  goldenRatio: 1.618,
  isUnitPixel: false,
};
let emValues = [];
let pxValues = [];
generatingHandeler(initialScale.value, ratioSettings.goldenRatio);
updateUnitSwitcher();

function unitSwitcher(targetId) {
  if (targetId === "optionPx" && !ratioSettings.isUnitPixel) {
    ratioSettings.isUnitPixel = !ratioSettings.isUnitPixel;
  } else if (targetId === "optionEm" && ratioSettings.isUnitPixel) {
    ratioSettings.isUnitPixel = !ratioSettings.isUnitPixel;
  }
  // console.log(isUnitPixel);
  updateUnitSwitcher();
}

function roundNumber(number, decimals) {
  return Math.floor(number * 10 ** decimals) / 10 ** decimals;
}
// ? Can be better??
function updateUnitSwitcher() {
  switch (ratioSettings.isUnitPixel) {
    case true:
      optionPx.classList.add("mt__multiple-btn-chosen");
      optionEm.classList.remove("mt__multiple-btn-chosen");
      updateUnitDisplayer(pxValues, "px");
      break;
    case false:
      optionPx.classList.remove("mt__multiple-btn-chosen");
      optionEm.classList.add("mt__multiple-btn-chosen");
      updateUnitDisplayer(emValues, "em");
      break;
  }
}

function updateUnitDisplayer(values, um) {
  let i = 0;
  values.forEach((value) => {
    let element = document.querySelector(`#unitDisplayer-${i}`);
    i++;
    // value = value.toFixed(3);
    element.innerHTML = `${value}${um}`;
  });
}

// ? can be better??
function ratioCalcEm(ratio) {
  let result = [];

  for (let index = 0; index < 6; index++) {
    let n;
    if (index === 0) {
      n = 1 / ratio;
    } else if (index === 1) {
      n = 1;
    } else {
      n = ratio ** (index - 1);
    }
    n = roundNumber(n, 3);
    result.push(n);
  }
  return result;
}

function generatingHandeler(initialValue, ratio) {
  initialValue = parseInt(initialValue);

  emValues = ratioCalcEm(ratio);
  pxValues = emValues.map((value) => {
    value = value * initialValue;
    return roundNumber(value, 3);
  });

  console.log(emValues, pxValues);
  for (let index = 0; index < 6; index++) {
    let text = document.querySelector(`#text-${index}`);
    text.setAttribute("style", `font-size: ${pxValues[index]}px;`);
  }
}

generateBtn.addEventListener("click", () => {
  generatingHandeler(initialScale.value, ratioSettings.goldenRatio);
});

optionPx.addEventListener("click", (target) => {
  unitSwitcher(target.target.id);
});
optionEm.addEventListener("click", (target) => {
  unitSwitcher(target.target.id);
});
