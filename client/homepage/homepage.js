const password = document.querySelector("#password-register");
const email = document.querySelector("#email-register");
const name = document.querySelector("#name-register");
const phone = document.querySelector("#phone-register");
const address = document.querySelector("#address-register");
const name_type = document.querySelector("#name_type");
const passwordLog = document.querySelector("#password-login");
const username = document.querySelector("#email-login");
const snippet = document.querySelector(".homepage-snippet h3");
const snippetName = document.querySelector(".homepage-snippet h1");

let snippetsArray = [];
let snippetsNameArray = [];

snippetOriginalText = snippet.textContent;
snippetsArray.push(snippetOriginalText);

let text =
  "Getting volunteer roles for the local church meant that we could focus on the community rather than cutting the grass";
let textTwo = "Volunteering made me very very happy!";
snippetsArray.push(text);
snippetsArray.push(textTwo);

snippetOriginalName = snippetName.textContent;
snippetsNameArray.push(snippetOriginalName);

let textName = "-Rev. Deadrie Porter";
let textNameTwo = "-Ange";
snippetsNameArray.push(textName);
snippetsNameArray.push(textNameTwo);

let timer;
let i = 1;

function startTimer() {
  timer = setInterval(function () {
    snippet.textContent = snippetsArray[i];
    snippetName.textContent = snippetsNameArray[i];
    if (i === 1) {
      i = 2;
    } else if (i === 2) {
      i = 0;
    } else {
      i = 1;
    }
  }, 10000);
}

startTimer();

const dropdown = document.querySelector(".dropdown_menu");
const icons = document.querySelectorAll(".icon");
const icon = document.querySelector(".icon");
const body = document.querySelector("body");

icons.forEach((icon) => {
  icon.addEventListener("click", (event) => {
    icon.classList.toggle("open");
    dropdown.classList.toggle("openDrop");
  });
});

body.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("center") ||
    e.target.classList.contains("referenceForNav") ||
    e.target.classList.contains("dropdown_menu")
  ) {
    null;
  } else if (dropdown.classList.contains("openDrop")) {
    dropdown.classList.remove("openDrop");
    icon.classList.toggle("open");
  }
});

//modals

const model = document.querySelector(".modal-container");
const blueButton = document.querySelector("#blue-button");
const whiteButton = document.querySelector("#white-button");
var nameType = document.getElementById("name_type");
const modalClose = document.querySelector("#modal-close");

modalClose.addEventListener("click", function () {
  if (model.style.display == "block") {
    model.style.display = "none";
    body.style.overflow = "auto";
    password.value =
      email.value =
      name.value =
      phone.value =
      address.value =
      name_type.value =
      passwordLog.value =
      username.value =
        "";
  }
});

blueButton.addEventListener("click", function () {
  if (model.style.display === "none" || model.style.display === "") {
    model.style.display = "block";
    body.style.overflow = "hidden";
  } else {
    model.style.display = "none";
    body.style.overflow = "auto";
  }
  if (nameType.innerHTML.includes("Business Name :")) {
    nameType.innerHTML = nameType.innerHTML.replace(
      "Business Name :",
      "Name :"
    );
  }
});

whiteButton.addEventListener("click", function () {
  if (model.style.display === "none" || model.style.display === "") {
    model.style.display = "block";
    body.style.overflow = "hidden";
  } else {
    model.style.display = "none";
    body.style.overflow = "auto";
  }
  if (nameType && nameType.innerHTML.includes("Name :")) {
    if (!nameType.innerHTML.includes("Business Name :")) {
      nameType.innerHTML = nameType.innerHTML.replace(
        "Name :",
        "Business Name :"
      );
    }
  }
});

const logInButton = document.querySelector("#post-job");

const logout = (e) => {
  if (e.target.textContent === "Log In") {
    if (model.style.display === "none" || model.style.display === "") {
      model.style.display = "block";
      body.style.overflow = "hidden";
    } else {
      model.style.display = "none";
      body.style.overflow = "auto";
    }
    if (nameType.innerHTML.includes("Business Name :")) {
      nameType.innerHTML = nameType.innerHTML.replace(
        "Business Name :",
        "Name :"
      );
    }
  } else {
    e.preventDefault();
    try {
      window.location.assign("homepage.html");
      localStorage.clear();
    } catch (error) {
      throw new Error("Cannot logout");
    }
  }
};

logInButton.addEventListener("click", logout);

if (!window.localStorage.token) {
  logInButton.textContent = "Log In";
} else {
  logInButton.textContent = "Log Out";
}
