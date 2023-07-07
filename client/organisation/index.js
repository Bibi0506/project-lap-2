const postForm = document.querySelector("#post-btn");
const jobForm = document.getElementsByClassName("job-form");
postForm.addEventListener(
  "click",

  postCreated
);
async function postCreated(e) {
  e.preventDefault();
  const data = {
    user_id: window.localStorage.token_id,
    category: document.querySelector("#jobCategory").value,
    title: document.querySelector("#jobTitle").value,
    description: document.querySelector("#jobDescription").value,
    start_dateTime: document.querySelector("#startDate").value,
    endDate: document.querySelector("#endDate").value,
    hours_needed: document.querySelector("#totalHours").value,
    num_volunteers: document.querySelector("#totalPositions").value,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch("http://localhost:3001/jobs", options);
  if (response.status === 201) {
    document.querySelector("#jobCategory").value = "";
    document.querySelector("#jobTitle").value = "";
    document.querySelector("#jobDescription").value = "";
    document.querySelector("#startDate").value = "";
    document.querySelector("#endDate").value = "";
    document.querySelector("#totalHours").value = "";
    document.querySelector("#totalPositions").value = "";
    console.log("Data added to the database successfully!");
  } else {
    console.error("Error adding data to the database.");
  }
  window.location.assign("./index.html");
}

function changeDate(inputDate) {
  //Split date into 3 parts
  const parts = inputDate.split("/");
  console.log(parts);
  //Rearrange new date object
  const dateObj = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
  //Get each bit for the date eg. year, month, day
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const sqlDate = `${year}-${month}-${day}`;
  return sqlDate;
}

async function fetchJobPost() {
  const response = await fetch(
    `http://localhost:3001/jobs/organisations/${window.localStorage.token_id}`
  );
  if (response.status == 404) {
    console.log("Ok");
  } else {
    const data = await response.json();
    addJob(data);
  }
}

async function checkAuth() {
  let metadata = window.localStorage;

  const options = {
    headers: {
      authorisation: metadata.token,
      is_organisation: metadata.token_organisation,
    },
  };
  const response = await fetch(
    `http://localhost:3001/applications/id/0`,
    options
  );
  console.log(response.status);
  if (response.status === 403) {
    window.location.assign("../index.html");
  } else {
    null;
  }
}

checkAuth();

function addJob(jobList) {
  const scroller = document.querySelector(".right-container");
  jobList.forEach((job) => {
    const {
      title,
      description,
      start_dateTime,
      endDate,
      hours_needed,
      num_volunteers,
      address,
    } = job;

    const newStart = new Date(start_dateTime);
    const newEnd = new Date(endDate);

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

    const jobTitle = document.createElement("div");
    jobTitle.classList.add("left");
    jobTitle.innerHTML = `<div class="jobs">
          <div class="left">
              <div class="title">Job Title : ${title}</div>
              <div class="description">Job Description : ${description}</div>
          </div>
          <div class="middle">
              <div class="dates">Dates : ${completeNewStart} to ${completeNewEnd}</div>
              <div class="hours">Hours / day : ${hours_needed}</div>
              <div class="location">Location : ${address} </div>
          </div>
          <div class="right">
              <div class="apply">Number volunteers : ${num_volunteers}</div>
          </div>
      </div>`;
    scroller.appendChild(jobTitle);
  });
}
fetchJobPost();
