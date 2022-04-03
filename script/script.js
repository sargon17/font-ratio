const initialScale = document.querySelector("#initialScale");
const generateBtn = document.querySelector("#generateBtn");
const optionPx = document.querySelector("#optionPx");
const optionEm = document.querySelector("#optionEm");
const customText = document.querySelector("#customText");
const textsSizes = document.querySelectorAll(".font__text-section p");

let ratioSettings = {
  isUnitPixel: false,
  selectedRatio: 0,
  ratios: [
    {
      name: "Golden Ratio (1.618)",
      value: 1.618,
      id: 0,
    },
    {
      name: "Perfect Fifth (1.500)",
      value: 1.5,
      id: 1,
    },
    {
      name: "Augmented Fourth (1.414)",
      value: 1.414,
      id: 2,
    },
    {
      name: "Perfect Fourth (1.330)",
      value: 1.33,
      id: 3,
    },
    {
      name: "Major Third (1.250)",
      value: 1.25,
      id: 4,
    },
    {
      name: "Minor Third (1.200)",
      value: 1.2,
      id: 5,
    },
    {
      name: "Major Second (1.125)",
      value: 1.125,
      id: 6,
    },
    {
      name: "Minor Second (1.067)",
      value: 1.067,
      id: 7,
    },
  ],
};
let emValues = [];
let pxValues = [];
generatingHandler(
  initialScale.value,
  ratioSettings.ratios[ratioSettings.selectedRatio].value
);
updateUnitSwitcher();
textModifier();

textsSizes.forEach((element) => {
  element.addEventListener("click", (event) => {
    textClickHandler(event);
  });
});

let ratioList = document.querySelector("#choseRatio");
choseRatioCreate(ratioSettings.ratios);
function choseRatioCreate(ratios) {
  ratioList.innerHTML = "";
  ratios.forEach((ratio) => {
    let option = document.createElement("option");
    option.value = ratio.value;
    option.innerHTML = ratio.name;
    option.id = ratio.id;
    ratioList.appendChild(option);
  });
}

function choseRatioHendler(event) {
  ratioSettings.ratios.forEach((ratio) => {
    if (ratio.value === parseFloat(event.target.value)) {
      ratioSettings.selectedRatio = ratio.id;
    }
  });
  generatingHandler(
    initialScale.value,
    ratioSettings.ratios[ratioSettings.selectedRatio].value
  );
}

// copy to clipboard the value
function textClickHandler(event) {
  let value;
  if (ratioSettings.isUnitPixel) {
    value = event.target.style.fontSize;
  } else {
    value = event.target.className;
  }
  navigator.clipboard.writeText(`font-size: ${value};`);

  const message = document.querySelector("#messageDisplayer");
  message.classList.remove("mt__d-none");
  setTimeout(() => message.classList.add("mt__d-none"), 500);
}

// funtion to change the unit
function unitSwitcher(targetId) {
  if (targetId === "optionPx" && !ratioSettings.isUnitPixel) {
    ratioSettings.isUnitPixel = !ratioSettings.isUnitPixel;
  } else if (targetId === "optionEm" && ratioSettings.isUnitPixel) {
    ratioSettings.isUnitPixel = !ratioSettings.isUnitPixel;
  }

  updateUnitSwitcher();
}
// random number generator
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

// unit displayer function
function updateUnitDisplayer(values, um) {
  let i = 0;
  values.forEach((value) => {
    let element = document.querySelector(`#unitDisplayer-${i}`);
    i++;
    // value = value.toFixed(3);
    element.innerHTML = `${value}${um}`;
  });
}

// ratio calculator function
// ? can be better??
function ratioCalcEm(ratio) {
  console.log(ratio);
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

// generating all the ratios
function generatingHandler(initialValue, ratio) {
  initialValue = parseInt(initialValue);

  emValues = ratioCalcEm(ratio);
  pxValues = emValues.map((value) => {
    value = value * initialValue;
    updateUnitSwitcher();
    return roundNumber(value, 3);
  });

  for (let index = 0; index < 6; index++) {
    let text = document.querySelector(`#text-${index}`);
    text.setAttribute("style", `font-size: ${pxValues[index]}px;`);
    text.className = `${emValues[index]}em`;
  }
}

// funtion to change the example text
function textModifier() {
  let value = customText.value;
  const elements = document.querySelectorAll(".font__text-section p");

  if (!value) {
    value = "Lorem ipsum dolor sit amet, consectetur";
  }

  elements.forEach((element) => {
    element.innerHTML = value;
  });
}

// function to controll the initial scale
function initialScaleHandler(event) {
  switch (event.key) {
    case "ArrowUp":
      initialScale.value = parseInt(initialScale.value) + 1;
      break;
    case "ArrowDown":
      if (initialScale.value > 0) {
        initialScale.value = parseInt(initialScale.value) - 1;
      }
      break;
  }
  generatingHandler(
    initialScale.value,
    ratioSettings.ratios[ratioSettings.selectedRatio].value
  );
}

generateBtn.addEventListener("click", () => {
  generatingHandler(
    initialScale.value,
    ratioSettings.ratios[ratioSettings.selectedRatio].value
  );
});

customText.addEventListener("keyup", () => {
  textModifier();
});
optionPx.addEventListener("click", (target) => {
  unitSwitcher(target.target.id);
});
optionEm.addEventListener("click", (target) => {
  unitSwitcher(target.target.id);
});

initialScale.addEventListener("keydown", (event) => {
  initialScaleHandler(event);
});
initialScale.addEventListener("keyup", () =>
  generatingHandler(
    initialScale.value,
    ratioSettings.ratios[ratioSettings.selectedRatio].value
  )
);
ratioList.addEventListener("change", (event) => {
  choseRatioHendler(event);
});
