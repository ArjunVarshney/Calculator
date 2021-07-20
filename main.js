let inpval = document.getElementById("inpval");
let output = document.getElementById("output");
let sidepanelicon = document.querySelector(".sidepanelicon>div");
let sideoperations = document.getElementsByClassName("sideoperations");
let sidepanel = document.getElementsByClassName("sidepanel");
let calc = document.getElementsByClassName("calc");
let operations = document.getElementsByClassName("operations");
let darkmodeswitcher = document.getElementById("darkmode");
let light = document.getElementById("light");
let dark = document.getElementById("dark");
let root = document.querySelector(":root");

let menuicon = document.getElementsByClassName("menuicon");
menuicon[1].style.display = "none";

darkmodeswitcher.addEventListener("click", function () {
  if (document.getElementsByClassName("menuicon")[1].style.display == "none") {
    root.style.setProperty("--white", "#0b121d");
    root.style.setProperty("--black", "#ecf1f3");
    document.getElementsByClassName("menuicon")[0].style.display = "none";
    document.getElementsByClassName("menuicon")[1].style.display = "flex";
  } else {
    root.style.setProperty("--black", "#0b121d");
    root.style.setProperty("--white", "#ecf1f3");
    document.getElementsByClassName("menuicon")[1].style.display = "none";
    document.getElementsByClassName("menuicon")[0].style.display = "flex";
  }
});

function showmenu() {
  let menuicon = document.getElementsByClassName("menu_icon");
  menuicon[0].classList.toggle("open");
  let menu = document.getElementsByClassName("menu");
  menu[0].classList.toggle("menuopen");
}

let press = "";
inpval.addEventListener("input", getop);
document.getElementById("backspace").addEventListener("mousedown", function () {
  press = setTimeout(() => {
    inpval.value = "";
  }, 1000);
});
document.getElementById("backspace").addEventListener("mouseup", function () {
  clearTimeout(press);
});

function getop() {
  let a = allsolve(inpval.value);
  output.innerText = a;
}

function solve(indexid) {
  let f = 0;
  if (indexid == "equals") {
    inpval.value = allsolve(inpval.value);
    output.innerText = "";
    f = 1;
  } else if (indexid == "backspace") {
    inpval.value = inpval.value.substring(0, inpval.value.length - 1);
  } else {
    inpval.value += indexid;
  }
  if (f != 1) {
    getop();
  }
}

sidepanelicon.style.transform = "rotate(0deg)";
function expsidepanel() {
  if (sidepanelicon.style.transform == "rotate(0deg)") {
    sidepanelicon.style.transform = "rotate(180deg)";
    sidepanelicon.parentElement.style.background = "#0062ff";
    sidepanel[0].style.width = "100%";
    calc[0].style.width = "0%";
    operations[0].style.width = "0vw";
  } else {
    sidepanelicon.style.transform = "rotate(0deg)";
    sidepanelicon.parentElement.style.background = "#2d2d2d";
    sidepanel[0].style.width = "0%";
    calc[0].style.width = "100%";
    operations[0].style.width = "20vw";
  }
}

function allsolve(str) {
  for (let i = 0; i < str.length; i++) {
    ch = str.charAt(i);
    if (ch == "(") {
      let c = 0,
        exp = "";
      for (let j = i + 1; j < str.length; j++) {
        ch = str.charAt(j);
        exp = exp + ch;
        if (ch == "(") {
          c++;
        } else if (ch == ")") {
          c--;
        }
        if ((c == 0) & (ch == ")")) {
          let x = allsolve(exp);
          str = str.substring(0, i) + x + substring(j + 1);
          exp = "";
          break;
        }
      }
    }
  }
}

function allsolve(str) {
  str = " " + str + " ";
  let exp = "";
  for (let i = 0; i < str.length; i++) {
    ch = str.charAt(i);
    if (ch == "(") {
      let c = 0;
      for (let j = i + 1; j < str.length; j++) {
        ch = str.charAt(j);
        if (!(c == 0 && ch == ")")) {
          exp = exp + ch;
        }
        if (ch == "(") {
          c++;
        } else if (ch == ")" && c > 0) {
          c--;
        }
        if (c == 0 && ch == ")") {
          let x = allsolve(exp);
          str = str.substring(0, i) + x + str.substring(j + 1);
          exp = "";
          i = 0;
          break;
        }
      }
    } else if (ch == "{") {
      let c = 0;
      for (let j = i + 1; j < str.length; j++) {
        ch = str.charAt(j);
        if (!(c == 0 && ch == "}")) {
          exp = exp + ch;
        }
        if (ch == "{") {
          c++;
        } else if (ch == "}" && c > 0) {
          c--;
        }
        if (c == 0 && ch == "}") {
          let x = allsolve(exp);
          str = str.substring(0, i) + x + str.substring(j + 1);
          exp = "";
          i = 0;
          break;
        }
      }
    } else if (ch == "[") {
      let c = 0;
      for (let j = i + 1; j < str.length; j++) {
        ch = str.charAt(j);
        if (!(c == 0 && ch == "]")) {
          exp = exp + ch;
        }
        if (ch == "[") {
          c++;
        } else if (ch == "]" && c > 0) {
          c--;
        }
        if (c == 0 && ch == "]") {
          let x = allsolve(exp);
          str = str.substring(0, i) + x + str.substring(j + 1);
          exp = "";
          i = 0;
          break;
        }
      }
    } else if (ch == "^") {
      let x = Math.pow(numberbefore(str, i), numberafter(str, i));
      str =
        str.substring(0, i - numberbefore(str, i).length) +
        x +
        str.substring(i + numberafter(str, i).length + 1);
      i = 0;
    } else if (ch == "√") {
      let x = Math.sqrt(numberafter(str, i));
      str =
        str.substring(0, i) +
        x +
        str.substring(i + numberafter(str, i).length + 1);
      i = 0;
    } else if (ch == "π") {
      let x = 22 / 7;
      str = str.replace(ch, "*" + x);
      i = 0;
    } else if (ch == "e") {
      let x = Math.E;
      str = str.replace(ch, "*" + x);
      i = 0;
    }
  }

  for (let i = 0; i < str.length; i++) {
    ch = str.charAt(i);
    if (ch.toUpperCase() != ch.toLowerCase()) {
      exp = exp + ch;
    } else {
      if (exp == "log") {
        let x = Math.log10(numberafter(str, i - 1));
        str =
          str.substring(0, i - 3) +
          x +
          str.substring(i + numberafter(str, i - 1).length);
      } else if (exp == "ln") {
        let x = Math.log(numberafter(str, i - 1));
        str =
          str.substring(0, i - 2) +
          x +
          str.substring(i + numberafter(str, i - 1).length);
      } else if (exp == "sin") {
        let x = Math.sin(numberafter(str, i - 1));
        str =
          str.substring(0, i - 3) +
          x +
          str.substring(i + numberafter(str, i - 1).length);
      } else if (exp == "cos") {
        let x = Math.cos(numberafter(str, i - 1));
        str =
          str.substring(0, i - 3) +
          x +
          str.substring(i + numberafter(str, i - 1).length);
      } else if (exp == "tan") {
        let x = Math.tan(numberafter(str, i - 1));
        str =
          str.substring(0, i - 3) +
          x +
          str.substring(i + numberafter(str, i - 1).length);
      }
      exp = "";
    }
  }
  let a = eval(str);
  a = Math.round(a * 100000) / 100000;
  return a;
}

function numberbefore(str, index) {
  let ch = "",
    num = "";
  for (let i = index - 1; i >= 0; i--) {
    ch = str.charAt(i);
    if (
      ch == "1" ||
      ch == "2" ||
      ch == "3" ||
      ch == "4" ||
      ch == "5" ||
      ch == "6" ||
      ch == "7" ||
      ch == "8" ||
      ch == "9" ||
      ch == "0"
    ) {
      num = ch + num;
    } else {
      return num;
    }
  }
}

function numberafter(str, index) {
  let ch = "",
    num = "";
  for (let i = index + 1; i < str.length; i++) {
    ch = str.charAt(i);
    if (
      ch == "1" ||
      ch == "2" ||
      ch == "3" ||
      ch == "4" ||
      ch == "5" ||
      ch == "6" ||
      ch == "7" ||
      ch == "8" ||
      ch == "9" ||
      ch == "0"
    ) {
      num = num + ch;
    } else {
      return num;
    }
  }
}

function showmenu() {
  let menuicon = document.getElementsByClassName("menu_icon");
  menuicon[0].classList.toggle("open");
  let menu = document.getElementsByClassName("menu");
  menu[0].classList.toggle("menuopen");
}

setTimeout(function () {
  let element = document.getElementsByClassName("loader_bg");
  let ele = document.querySelector(".loader_bg>img");
  element[0].style.backgroundColor = "transparent";
  element[0].style.color = "transparent";
  ele.style.opacity = "0";
}, 2000);

setTimeout(function () {
  let element = document.getElementsByClassName("loader_bg");
  element[0].style.display = "none";
}, 2500);
