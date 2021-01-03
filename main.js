const l1 = document.getElementById("l1");
const l2 = document.getElementById("l2");
let lastValue = null;

function eventsHandler(e) {
  let txt;
  if (e.type === "click") {
    if (e.target.tagName !== "BUTTON") return;
    txt = e.target.innerText;
  } else if (e.type === "keydown") {
    txt = e.key;
  }
  let preVal = l1.value;
  if (txt === "DEL" || txt === "Backspace") {
    if (preVal.endsWith("ANS")) {
      l1.value = preVal.slice(0, -3);
    } else l1.value = preVal.slice(0, -1);
    return;
  }
  if (txt === "AC" || txt === "Delete") {
    l1.value = "";
    l2.value = "";
    lastValue = null;
    return;
  }
  if (txt === "=" || txt === "Enter") {
    txt = "";
    if (!l2.value && lastValue !== null) {
      l1.value = "ANS";
    }
    if (!preVal) return;
    try {
      preVal = preVal.replace("^", "**");
      preVal = preVal.replace("×", "*");
      preVal = preVal.replace("÷", "/");
      if (lastValue === null) preVal = preVal.replace("ANS", "");
      else preVal = preVal.replace("ANS", lastValue);
      lastValue = eval(preVal);
      l2.value = lastValue;
    } catch (e) {
      l2.value = "Math Error";
    }
    return;
  }
  if (preVal.length > 17) {
    return;
  }
  if (+txt >= 0) {
    l1.value += txt;
    return;
  }
  if ([".", "+", "-", "×", "÷", "*", "/", "^", "%"].includes(txt)) {
    if (!preVal) return;
    if (+preVal[preVal.length - 1] >= 0 || preVal.endsWith("ANS"))
      l1.value += txt;
    return;
  }
  if (txt === "ANS") {
    if (+preVal[preVal.length - 1] >= 0) {
      l1.value = txt;
    } else {
      l1.value = preVal + txt;
    }
  }
}
document.addEventListener("click", eventsHandler, false);
document.addEventListener("keydown", eventsHandler);
