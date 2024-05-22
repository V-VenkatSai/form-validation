const usernameElement = document.getElementById("username");
const emailElement = document.getElementById("email");
const phoneElement = document.getElementById("phone");
const passwordElement = document.getElementById("password");
const confirmPasswordElement = document.getElementById("confirm-password");
const form = document.querySelector(".form");

document.getElementById("submit").addEventListener("click", (event) => {
  event.preventDefault();
  validateValues();
});

function validateValues() {
  const username = usernameElement.value.trim();
  const email = emailElement.value.trim();
  const phone = phoneElement.value.trim();
  const password = passwordElement.value.trim();
  const confirmPassword = confirmPasswordElement.value.trim();

  validateText(username, "username", 8);
  validateText(email, "email", 1);
  validateText(phone, "phone", 10);
  validateText(password, "password", 8);
  if (password.length >= 8) {
    validateText(confirmPassword, "confirm-password", 1, password);
  }
}

function validateText(inputVal, elementIdName, minLength, validatePwd) {
  if (
    (elementIdName === "confirm-password" || elementIdName === "email") &&
    inputVal.length > 0
  ) {
    if (elementIdName === "confirm-password") {
      if (inputVal !== validatePwd) {
        displayResult(`${elementIdName}`, `passwords does not match`);
      } else {
        displayResult(`${elementIdName}`, "");
      }
    } else if (elementIdName === "email") {
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(inputVal)) {
        displayResult(`${elementIdName}`, `enter valid email address`);
      } else {
        displayResult(`${elementIdName}`, "");
      }
    }
  } else if (inputVal === "") {
    displayResult(`${elementIdName}`, `${elementIdName} is required`);
  } else if (inputVal.length >= minLength) {
    displayResult(`${elementIdName}`, "");
  } else if (inputVal.length < minLength) {
    displayResult(
      `${elementIdName}`,
      `${elementIdName} must be atleast ${minLength} characters long`
    );
  }
}

function displayResult(elementIdName, inputVal) {
  let matchingItem = document.getElementById(`${elementIdName}`).parentElement;
  const inputElement = matchingItem.querySelector("input").classList;
  inputElement.remove("correct");
  inputElement.remove("incorrect");

  if (matchingItem) {
    if (!inputVal) {
      matchingItem.querySelector("input").classList.add("correct");
      matchingItem.querySelector("span").innerText = "";
    } else {
      matchingItem.querySelector("input").classList.add("incorrect");
      matchingItem.querySelector("span").innerText = inputVal;
    }
  }
}
