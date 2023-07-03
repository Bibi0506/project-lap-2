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
