const initialScale = document.querySelector("#initialScale");
const generateBtn = document.querySelector("#generateBtn");

let goldenRatioN = 1.618;

// ratioCalc(14, goldenRatioN)

function ratioCalcPixels(initialValue, ratio) {
  let result = [];

  for (let index = 0; index < 6; index++) {
    let n;
    if (index === 0) {
      n = initialValue / ratio;
    } else if (index === 1) {
      n = initialValue;
    } else {
      n = initialValue * ratio ** (index - 1);
    }
    n.toFixed(3);
    result.push(n);
  }
  return result;
}
function generatingHandeler(initialValue, ratio) {
  initialValue = parseInt(initialValue);
  let values = ratioCalcPixels(initialValue, ratio);

  for (let index = 0; index < 6; index++) {
    let text = document.querySelector(`#text-${index}`);
    text.setAttribute("style", `font-size: ${values[index]}px;`);
    console.log(text);
  }
}

generateBtn.addEventListener("click", () => {
  generatingHandeler(initialScale.value, goldenRatioN);
});
