const mergeBtn = document.getElementById("merge-btn");
const hexColorCode = document.querySelector(".hex-color-code");
const rgbaColorCode = document.querySelector(".rgba-color-code");
const colorCode = document.querySelectorAll(".color-code");

function mergeColorCode() {
  let hexInp = document.querySelector("#hex-inp").value;
  const opacity = document.querySelector("#opacity-inp").value
    ? document.querySelector("#opacity-inp").value
    : 1;
  hexInp = hexInp.replace("#", "");
  let hexCode = hexInp;
  if (hexCode.length === 3) {
    hexCode = `${hexCode[0]}${hexCode[0]}${hexCode[1]}${hexCode[1]}${hexCode[2]}${hexCode[2]}`;
  }
  const r = parseInt(hexCode.substring(0, 2), 16);
  const g = parseInt(hexCode.substring(2, 4), 16);
  const b = parseInt(hexCode.substring(4, 6), 16);
  const res = `rgba(${r},${g},${b},${opacity})`;
  console.log(res);
  return res;
}
function rgbaToHex(rgba) {
  const regex = /rgba\((\d+),(\d+),(\d+),([\d.]+)\)/;
  const replacedRgba = rgba.match(regex);
  console.log(replacedRgba);
  let r = parseInt(replacedRgba[1]);
  let g = parseInt(replacedRgba[2]);
  let b = parseInt(replacedRgba[3]);
  let a = parseFloat(replacedRgba[4]);
  const hex = `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}${(a * 255)
    .toString(16)
    .padStart(2, "0")
    .slice(0, 2)}`;
  return hex;
}
function mergeAndUpdate() {
  const mergedRgbaCode = mergeColorCode();
  rgbaColorCode.innerText = mergedRgbaCode;
  const mergedHexCode = rgbaToHex(mergedRgbaCode);
  hexColorCode.innerText = mergedHexCode;

  colorDiv();
}

mergeBtn.addEventListener("click", mergeAndUpdate);

// Copy button functionality
function copyButtonFunctionality() {
  const copyBtn = document.querySelectorAll(".copy-btn");
  copyBtn.forEach((cBtn, index) => {
    cBtn.addEventListener("click", function () {
      let range = document.createRange();
      range.selectNode(colorCode[index]);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand("copy");
      window.getSelection().removeAllRanges();
      alert("Color code copied to clipboard!");
    });
  });
}
// color-div functionality
function colorDiv() {
  const colorDivs = document.querySelectorAll(".color-div");
  colorDivs.forEach((color) => {
    color.style.backgroundColor = rgbaColorCode.innerText;
  });
}
copyButtonFunctionality();
colorDiv();
