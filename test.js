document.getElementById("expression").value = "23e+453+39e-495.3049582";

function lsolve() {
  document.getElementById("expression").value = allsolve(
    document.getElementById("expression").value
  );
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
      str = str.substring(0, i) + x + str.substring(i + numberafter(str, i).length + 1);
      i = 0;
    } else if (ch == "π") {
      let x = 22 / 7;
      str = str.replace(ch, '*'+x);
      i = 0;
    } else if (ch == "e") {
      let x = Math.E;
      str = str.replace(ch, "*"+x);
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
