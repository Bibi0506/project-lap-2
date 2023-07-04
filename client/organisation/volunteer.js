// ------------------------------------------------------------------------------ fetch Data



// ------------------------------------------------------------------------------ calendar
const options = {
  settings: {
    visibility: {
      theme: 'light',
    },
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const calendar = new VanillaCalendar("#calendar", options);
  calendar.init();
});
//selecting specific day
// const calendarDay = document.querySelectorAll(".vanilla-calendar-day_selected");
// calendarDay.addEventListener("click", function () {
//   console.log("clicked");
// });
setTimeout(()=>{const buttons = document.querySelectorAll("button")
buttons.forEach((button) => {
button.addEventListener("click", () => {
console.log(button)})
}) },1000)

setTimeout(()=>{console.log(document.querySelector(".vanilla-calendar-day"))},1000)
console.log(document.querySelector(".vanilla-calendar-day"))
// ------------------------------------------------------------------------------ modal
const modal = document.querySelector(".modal-container");
const contactButtons = document.querySelectorAll(".contact");
const modalClose = document.querySelector("#modal-close");
const body = document.querySelector("body");

modalClose.addEventListener("click", function () {
  if (modal.style.display === "block") {
    modal.style.display = "none";
    body.style.overflow = "auto";
  }
});

contactButtons.forEach(function (contactButton) {
  contactButton.addEventListener("click", function () {
    if (modal.style.display === "none" || modal.style.display === "") {
      modal.style.display = "block";
      body.style.overflow = "hidden";
    } else {
      modal.style.display = "none";
      body.style.overflow = "auto";
    }
  });
});

// ------------------------------------------------------------------------------ filter
function toggleDropdown() {
  var dropdownContent = document.getElementById("dropdown-content");
  dropdownContent.classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches(".dropdown-toggle")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};




