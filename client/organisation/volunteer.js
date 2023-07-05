// ------------------------------------------------------------------------------ calendar
const options = {
  settings: {
    visibility: {
      theme: "light",
    },
  },
};
let currentDate;

document.addEventListener("DOMContentLoaded", () => {
  const calendar = new VanillaCalendar("#calendar", options);
  calendar.init();
});

document.addEventListener("DOMContentLoaded", () => {
  const calendar = new VanillaCalendar("#calendar", {
    actions: {
      clickDay(e, dates) {
        currentDate = dates;
        checkDate(currentDate);
      },
    },
    settings: {
      visibility: {
        theme: "light",
        today: true,
      },
    },
  });
  calendar.init();
});
// ------------------------------------------------------------------------------ fetch Data
const allJobsAssociatedToUser = [];

const getAllJobs = async () => {
  let response = await fetch(`http://localhost:3001/jobs/user/3`);
  const data = await response.json();
  allJobsAssociatedToUser.push(data);
};
getAllJobs();

function checkDate(date) {
  console.log(allJobsAssociatedToUser);
  const newDate = new Date(date).toString();
  const calendarDate = Date.parse(newDate);
  allJobsAssociatedToUser.forEach((job) => {
    const jobDateStart = Date.parse(job[0].start_dateTime);
    const jobDateEnd = Date.parse(job[0].endDate);
 
  if(calendarDate < jobDateEnd && calendarDate >= jobDateStart){
    const leftBottom = document.querySelector(".left-bottom");
    const booking = document.createElement("div");
    booking.classList.add("booking");
    leftBottom.appendChild(booking);

    const leftTime = document.createElement("div");
    leftTime.classList.add("left-time");
    leftTime.textContent = `Time : ${job.start_dateTime}`;
    booking.appendChild(leftTime);

    const leftTitle = document.createElement("div");
    leftTitle.classList.add("left-title");
    leftTitle.textContent = "Title :";
    booking.appendChild(leftTitle);

    const leftDescription = document.createElement("div");
    leftDescription.classList.add("left-description");
    leftDescription.textContent = "Job Description :";
    booking.appendChild(leftDescription);

    const leftLocation = document.createElement("div");
    leftLocation.classList.add("left-location");
    leftLocation.textContent = "Location :";
    booking.appendChild(leftLocation);
}});
  
}



const respData = async () => {
  let response = await fetch(`http://localhost:3001/jobs/getall`);
  const data = await response.json();
  console.log(data);

  //create and poulate left bottom container

 

  data.forEach((job) => {
    const rightContainer = document.querySelector(".right-container");
    const jobsDiv = document.createElement("div");
    jobsDiv.classList.add("jobs");
    rightContainer.appendChild(jobsDiv);

    //create and poulate left div

    const leftDiv = document.createElement("div");
    leftDiv.classList.add("left");
    jobsDiv.appendChild(leftDiv);

    const title = document.createElement("div");
    title.classList.add("title");
    title.textContent = `title : ${job.title} `;
    leftDiv.appendChild(title);

    const description = document.createElement("div");
    description.classList.add("description");
    description.textContent = `description :  ${job.description}`;
    leftDiv.appendChild(description);

    //create and poulate middle div

    const middleDiv = document.createElement("div");
    middleDiv.classList.add("middle");
    jobsDiv.appendChild(middleDiv);

    const dates = document.createElement("div");
    dates.classList.add("dates");
    dates.textContent = `dates :  ${job.start_date}, ${job.enddate}`;
    middleDiv.appendChild(dates);

    const hours = document.createElement("div");
    hours.classList.add("hours");
    hours.textContent = `hours :  ${job.hours_needed}`;
    middleDiv.appendChild(hours);

    const jobLocation = document.createElement("div");
    jobLocation.classList.add("jobLocation");
    jobLocation.textContent = `Job Location : `;
    middleDiv.appendChild(jobLocation);

    //create and poulate buttons div

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons");
    jobsDiv.appendChild(buttonsDiv);

    const apply = document.createElement("div");
    apply.classList.add("apply");
    apply.textContent = "Apply Online";
    buttonsDiv.appendChild(apply);

    const contact = document.createElement("div");
    contact.classList.add("contact");
    contact.textContent = "Contact Employer";
    buttonsDiv.appendChild(contact);
  });

  // if (respData.ok) {
  //   const data = await respData.json();
  //   console.log(data)
  // } else {
  //   throw "error"
  // }
};

respData();

// ------------------------------------------------------------------------------ filter
function toggleDropdown() {
  var dropdownContent = document.getElementById("dropdown-content");
  dropdownContent.classList.toggle("show");
}

window.onclick = function (event) {
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
