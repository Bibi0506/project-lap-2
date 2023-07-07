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
  let response = await fetch(
    `https://dotmocracy-council-website.onrender.com/jobs/user/${window.localStorage.token_id}`
  );
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
      const newStart = new Date(job.start_dateTime);
      const newEnd = new Date(job.endDate);
      let startDay = newStart.getDate();
      let startMonth = newStart.getMonth();
      let startYear = newStart.getFullYear();
      let startHour = newStart.getHours();
      let startMinutes = newStart.getMinutes();
      let meridianStart = "AM";
      if (startMinutes === 0) {
        startMinutes = "00";
      }
      if (startHour > 12) {
        startHour -= 12;
        meridianStart = "PM";
      }
      let endDay = newEnd.getDate();
      let endMonth = newEnd.getMonth();
      let endYear = newEnd.getFullYear();
      let endHour = newEnd.getHours();
      let endMinutes = newEnd.getMinutes();
      let meridianEnd = "AM";
      if (endMinutes === 0) {
        endMinutes = "00";
      }
      if (endHour > 12) {
        endHour -= 12;
        meridianEnd = "PM";
      }
      let completeNewStart = `${startDay}/${
        startMonth + 1
      }/${startYear} - ${startHour}:${startMinutes}${meridianStart}`;
      let completeNewEnd = `${endDay}/${
        endMonth + 1
      }/${endYear} - ${endHour}:${endMinutes}${meridianEnd}`;
      leftTime.textContent = `Time : ${completeNewStart} - ${completeNewEnd}`;
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
      leftLocation.textContent = `Location : ${job.address}`;
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
  let metadata = window.localStorage;

  const options = {
    headers: {
      authorisation: metadata.token,
      is_organisation: metadata.token_organisation,
    },
  };

  let response = await fetch(
    `https://dotmocracy-council-website.onrender.com/jobs/getall`,
    options
  );

  if (response.status === 403) {
    window.location.assign("../index.html");
  } else {
    const data = await response.json();

    jobsForAllUsers.push(data);

    populateDisplay(jobsForAllUsers[0]);
  }
};
respData();

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
    dates.textContent = `dates :  ${job.start_dateTime.split("T")[0]}, ${
      job.endDate.split("T")[0]
    }`;
    middleDiv.appendChild(dates);

    const hours = document.createElement("div");
    hours.classList.add("hours");
    hours.textContent = `hours :  ${job.hours_needed}`;
    middleDiv.appendChild(hours);

    const jobLocation = document.createElement("div");
    jobLocation.classList.add("jobLocation");
    jobLocation.textContent = `Job Location : ${job.address}`;
    middleDiv.appendChild(jobLocation);

    //create and poulate buttons div

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons");
    jobsDiv.appendChild(buttonsDiv);

    let text = checkApplication(job.job_id);

    const apply = document.createElement("div");
    apply.classList.add("apply");
    // apply.textContent = text;
    apply.innerHTML = `${text} <span class="no-display"> ${job.job_id} </span>`;
    if (text === "Applied") {
      apply.style.backgroundColor = "green";
    }
    buttonsDiv.appendChild(apply);

    const contact = document.createElement("div");
    contact.classList.add("contact");
    contact.innerHTML =
      'Contact Employer <span class="no-display">' + job.user_id + "</span>";
    buttonsDiv.appendChild(contact);
  });
};

const applicationsData = [];

async function getAllApplications() {
  const response = await fetch(
    `https://dotmocracy-council-website.onrender.com/applications/index`
  );
  const data = await response.json();
  applicationsData.push(data);
}
getAllApplications();

function checkApplication(id) {
  let metadata = window.localStorage;
  let text = [];
  applicationsData[0].forEach((application) => {
    if (id == application.job_id)
      if (application.user_id == window.localStorage.token_id) {
        text.push(1);
      } else {
        text.push(0);
      }
  });
  if (text.includes(1)) {
    return "Applied";
  } else {
    return "Apply Online";
  }
}
const alldatasAssociatedToUser = [];
const getAllData = async () => {
  let response = await fetch(
    `https://dotmocracy-council-website.onrender.com/jobs/user/${window.localStorage.token_id}`
  );
  const data = await response.json();
  alldatasAssociatedToUser.push(data);
};
getAllJobs();

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
function getSubstring(str, start, end) {
  char1 = str.indexOf(start) + 1;
  char2 = str.lastIndexOf(end);
  return str.substring(char1, char2);
}

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.querySelector(".modal-container");
  const body = document.querySelector("body");

  body.addEventListener("click", function (event) {
    let idNeeded = getSubstring(event.target.innerHTML, ">", "<");

    if (event.target.classList.contains("contact")) {
      if (modal.style.display === "none" || modal.style.display === "") {
        modal.style.display = "block";
        body.style.overflow = "hidden";
        getAllData2(idNeeded);
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

const alldatasAssociatedToUser2 = [];
const getAllData2 = async (id) => {
  let response = await fetch(
    `https://dotmocracy-council-website.onrender.com/jobs/contact/${id}`
  );
  const data = await response.json();
  alldatasAssociatedToUser2.push(data);

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
  return data[0].name;
};

// ---------------------------------------------------------------click apply
document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("click", () => {
    if (event.target.classList.contains("apply")) {
      if (event.target.style.backgroundColor === "green") {
        null;
      } else {
        let jobIdNeeded = getSubstring(event.target.innerHTML, ">", "<");
        console.log("ok");
        createApplication(jobIdNeeded);
        event.target.style.backgroundColor = "green";
        event.target.textContent = "Applied";
        window.location.assign("./volunteer.html");
      }
    }
  });
});

// -----------------------------send post request

const createApplication = async (id) => {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      job_id: id,
      user_id: window.localStorage.token_id,
    }),
  };

  let response = await fetch(
    "https://dotmocracy-council-website.onrender.com/applications/create",
    options
  );
  const data = await response.json();
  //error handling
};

// -----------------------------green dot on date of applied job
const logInButton = document.querySelector("#post-job");
const logInButtonTwo = document.querySelector("#post-job-two");
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
      window.location.assign("./index.html");
      localStorage.clear();
    } catch (error) {
      throw new Error("Cannot logout");
    }
  }
};
logInButton.addEventListener("click", logout);
logInButtonTwo.addEventListener("click", logout);
if (!window.localStorage.token) {
  logInButton.textContent = "Log In";
  logInButtonTwo.textContent = "Log In";
} else {
  logInButton.textContent = "Log Out";
  logInButtonTwo.textContent = "Log Out";
}
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

const usernameArr = [];
const getAllData3 = async () => {
  let response = await fetch(
    `https://dotmocracy-council-website.onrender.com/jobs/contact/${window.localStorage.token_id}`
  );
  const data = await response.json();
  usernameArr.push(data);

  const nameAndHours = document.querySelector(".name-hours");
  let userName2;
  nameAndHours.textContent = usernameArr[0][0].name;
  console.log(usernameArr);
};

getAllData3();
