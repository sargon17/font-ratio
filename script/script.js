const initialScale = document.querySelector("#initialScale");
const generateBtn = document.querySelector("#generateBtn");
const optionPx = document.querySelector("#optionPx");
const optionEm = document.querySelector("#optionEm");

let ratioSettings = {
  goldenRatio: 1.618,
  isUnitPixel: false,
};

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
    n = n.toFixed(3);
    result.push(n);
  }
  return result;
}

function generatingHandeler(initialValue, ratio) {
  initialValue = parseInt(initialValue);
  let values = [];
  values = ratioCalcEm(ratio);

  for (let index = 0; index < 6; index++) {
    let text = document.querySelector(`#text-${index}`);
    text.setAttribute("style", `font-size: ${values[index] * initialValue}px;`);
    console.log(text);
  }
}

generateBtn.addEventListener("click", () => {
  generatingHandeler(initialScale.value, ratioSettings.goldenRatio);
});

optionPx.addEventListener("click", (target) => {
  unitSwitcher(target.target.id);
});
