// ------------------------------------------------------------------------------ calendar
let currentDate;
document.addEventListener("DOMContentLoaded", () => {
  const calendar = new VanillaCalendar("#calendar", {
    actions: {
      clickDay(e, dates) {
        clearJobs();
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
  let response = await fetch(`http://localhost:3001/jobs/user/2`);
  const data = await response.json();

  allJobsAssociatedToUser.push(data);
};
getAllJobs();
function checkDate(date) {
  const newDate = new Date(date).toString();
  const calendarDate = Date.parse(newDate);

  allJobsAssociatedToUser[0].forEach((job) => {
    const initialTime = job.start_dateTime.split("T");
    const jobDateStart = Date.parse(initialTime[0]);
    const jobDateEnd = Date.parse(job.endDate);

    if (calendarDate < jobDateEnd && calendarDate >= jobDateStart) {
      const leftBottom = document.querySelector(".left-bottom");
      const booking = document.createElement("div");
      booking.classList.add("booking");
      leftBottom.appendChild(booking);
      const leftTime = document.createElement("div");
      leftTime.classList.add("left-time");
      leftTime.textContent = `Time : ${new Date(
        job.start_dateTime
      )} - ${new Date(job.endDate)}`;
      booking.appendChild(leftTime);
      const leftTitle = document.createElement("div");
      leftTitle.classList.add("left-title");
      leftTitle.textContent = `Title : ${job.title}`;
      booking.appendChild(leftTitle);
      const leftDescription = document.createElement("div");
      leftDescription.classList.add("left-description");
      leftDescription.textContent = `Job Description : ${job.description}`;
      booking.appendChild(leftDescription);
      const leftLocation = document.createElement("div");
      leftLocation.classList.add("left-location");
      leftLocation.textContent = "Location :";
      booking.appendChild(leftLocation);
    }
  });
}

const clearJobs = () => {
  const allUsersJobs = document.querySelectorAll(".booking");
  allUsersJobs.forEach((entry) => {
    entry.remove();
  });
};
const latestStartSort = document.querySelector("#latest-start-sort");
const resetSort = document.querySelector("#reset-sort");
const titleAscending = document.querySelector("#title-ascending");
const titleDescending = document.querySelector("#title-descending");

titleAscending.addEventListener("click", () => {
  const allUsersJobs = document.querySelectorAll(".jobs");
  allUsersJobs.forEach((entry) => {
    entry.remove();
  });
  let arrCopy = JSON.parse(JSON.stringify(jobsForAllUsers));
  arrCopy[0].sort((a, b) => {
    let fa = a.title.toLowerCase(),
      fb = b.title.toLowerCase();

    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });
  populateDisplay(arrCopy[0]);
});

titleDescending.addEventListener("click", () => {
  const allUsersJobs = document.querySelectorAll(".jobs");
  allUsersJobs.forEach((entry) => {
    entry.remove();
  });
  let arrCopy = JSON.parse(JSON.stringify(jobsForAllUsers));
  arrCopy[0].sort((a, b) => {
    let fa = a.title.toLowerCase(),
      fb = b.title.toLowerCase();

    if (fa < fb) {
      return 1;
    }
    if (fa > fb) {
      return -1;
    }
    return 0;
  });
  populateDisplay(arrCopy[0]);
});

latestStartSort.addEventListener("click", () => {
  const allUsersJobs = document.querySelectorAll(".jobs");
  allUsersJobs.forEach((entry) => {
    entry.remove();
  });
  var newarray = [...jobsForAllUsers[0]].reverse();
  populateDisplay(newarray);
});

resetSort.addEventListener("click", () => {
  const allUsersJobs = document.querySelectorAll(".jobs");
  allUsersJobs.forEach((entry) => {
    entry.remove();
  });
  populateDisplay(jobsForAllUsers[0]);
});

const jobsForAllUsers = [];
const respData = async () => {
  let response = await fetch(`http://localhost:3001/jobs/getall`);
  const data = await response.json();
  jobsForAllUsers.push(data);
  populateDisplay(jobsForAllUsers[0]);
};

const populateDisplay = (arr) => {
  arr.forEach((job) => {
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
    title.textContent = `Title : ${job.title} `;
    leftDiv.appendChild(title);

    const description = document.createElement("div");
    description.classList.add("description");
    description.textContent = `Description :  ${job.description}`;
    leftDiv.appendChild(description);

    //create and poulate middle div

    const middleDiv = document.createElement("div");
    middleDiv.classList.add("middle");
    jobsDiv.appendChild(middleDiv);

    const dates = document.createElement("div");
    dates.classList.add("dates");
    dates.textContent = `Dates :  ${job.start_dateTime.split("T")[0]}, ${
      job.endDate.split("T")[0]
    }`;
    middleDiv.appendChild(dates);

    const hours = document.createElement("div");
    hours.classList.add("hours");
    hours.textContent = `Hours :  ${job.hours_needed}`;
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
    contact.innerHTML =
      'Contact Employer <span class="no-display">' + job.user_id + "</span>";
    // contact.textContent = "Contact Employer";
    buttonsDiv.appendChild(contact);

    // const user_id = document.createElement("span");
    // user_id.classList.add("user_id");
    // user_id.style.display = "none";
    // user_id.textContent = `${job.user_id}`;
  });
};
// if (respData.ok) {
//   const data = await respData.json();
//   console.log(data)
// } else {
//   throw "error"
// }
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

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.querySelector(".modal-container");
  const body = document.querySelector("body");

  function getSubstring(str, start, end) {
    char1 = str.indexOf(start) + 1;
    char2 = str.lastIndexOf(end);
    return str.substring(char1, char2);
  }

  body.addEventListener("click", function (event) {
<<<<<<< HEAD
    console.log(event.target);
=======
    let idNeeded = getSubstring(event.target.innerHTML, ">", "<");
>>>>>>> 963936e7116b5c796c97157a3716bdbaea0cfde2
    if (event.target.classList.contains("contact")) {
      if (modal.style.display === "none" || modal.style.display === "") {
        modal.style.display = "block";
        body.style.overflow = "hidden";
<<<<<<< HEAD
        getAllData(5);
=======
        getAllData(idNeeded);
>>>>>>> 963936e7116b5c796c97157a3716bdbaea0cfde2
      } else {
        modal.style.display = "none";
        body.style.overflow = "auto";
      }
    }
  });

  const modalClose = document.querySelector("#modal-close");
  modalClose.addEventListener("click", function () {
    if (modal.style.display === "block") {
      modal.style.display = "none";
      body.style.overflow = "auto";
      const nameDiv = document.querySelector(".contact-name");
      const emailDiv = document.querySelector(".contact-email");
      const phoneDiv = document.querySelector(".contact-phone-number");
      const addressDiv = document.querySelector(".contact-address");
      nameDiv.remove();
      emailDiv.remove();
      phoneDiv.remove();
      addressDiv.remove();
    }
  });
});

const alldatasAssociatedToUser = [];
const getAllData = async (id) => {
  let response = await fetch(`http://localhost:3001/jobs/contact/${id}`);
  const data = await response.json();
  alldatasAssociatedToUser.push(data);

  const modalContainer = document.querySelector(".modal-centering-container");

  //create and poulate left div

  const nameDiv = document.createElement("div");
  nameDiv.classList.add("contact-name");
  nameDiv.textContent = `Name : ${data[0].name}`;
  modalContainer.appendChild(nameDiv);

  const emailDiv = document.createElement("div");
  emailDiv.classList.add("contact-email");
  emailDiv.textContent = `E-mail : ${data[0].email}`;
  modalContainer.appendChild(emailDiv);

  const phoneDiv = document.createElement("div");
  phoneDiv.classList.add("contact-phone-number");
  phoneDiv.textContent = `Phone Number : ${data[0].phone_number}`;
  modalContainer.appendChild(phoneDiv);

  const addressDiv = document.createElement("div");
  addressDiv.classList.add("contact-address");
  addressDiv.textContent = `Address : ${data[0].address}`;
  modalContainer.appendChild(addressDiv);
};
getAllJobs();
