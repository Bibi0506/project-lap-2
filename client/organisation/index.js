const postForm = document.querySelector("#postForm");
const jobForm = document.getElementsByClassName("job-form");
postForm.addEventListener("submit", postCreated);



async function postCreated(e) {
  e.preventDefault();
  const startDate =document.querySelector("#startDate").value;
  console.log(startDate)
  const startTime =document.querySelector("#startTime").value;
  console.log(startTime)
  const startDateTime = changeDateTime(startDate,startTime)
  const inputDate =document.querySelector("#endDate").value
  const end_date = new Date(changeDate(inputDate))
  const data = {
    user_id: window.localStorage.token_id,
    category: document.querySelector("#jobCategory").value,
    title: document.querySelector("#jobTitle").value,
    description: document.querySelector("#jobDescription").value,
    start_dateTime: startDateTime,
    endDate: end_date,
    hours_needed: document.querySelector("#totalHours").value,
    num_volunteers: document.querySelector("#totalPositions").value
  };
  console.log(data.start_dateTime)
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };


  const response = await fetch("http://localhost:3001/jobs", options);
  if (response.status === 201) {
    e.target.jobCategory.value = "";
    e.target.jobTitle.value = "";
    e.target.jobDescription.value = "";
    e.target.startDate.value = "";
    e.target.endDate.value = "";
    e.target.startTime.value = "";
    e.target.totalHours.value = "";
    e.target.totalPositions.value = "";
    console.log("Data added to the database successfully!");
  } else {
    console.error("Error adding data to the database.");
  }
  window.location.assign("./index.html");
  console.log(data);
}
function changeDateTime(inputDate,startTime) {
  //Split date into parts
  const dateParts = inputDate.split("/");
  const timeParts = startTime.split(':');

  //Rearrange new date object
  const dateObj = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], timeParts[0], timeParts[1]);
  //Get each bit for the date eg. year, month, day
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');

// Format the date and time in the SQL date format (YYYY-MM-DD HH:MM:SS)
const sqlDateTime = `${year}-${month}-${day}T${hours}:${minutes}:00.000Z`;

return sqlDateTime
}

function changeDate(inputDate) {
  //Split date into 3 parts
  const parts = inputDate.split('/');
  //Rearrange new date object
  const dateObj =new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
  
  //Get each bit for the date eg. year, month, day
  const year = dateObj.getFullYear();
  const month =String(dateObj.getMonth()+1).padStart(2, '0');
  const day =String(dateObj.getDate()).padStart(2, '0');
  
  const sqlDate =`${year}-${month}-${day}T00:00:00.000Z`

  return sqlDate
  
}
async function fetchJobPost() {
  const response = await fetch(
    `http://localhost:3001/jobs/organisations/${window.localStorage.token_id}`
  );
  console.log(response);
  if (response.status == 404) {
    console.log("Ok");
  } else {
    const data = await repsonse.json();
    addJob(data);
  }
}

async function checkAuth() {
  let metadata = window.localStorage;
  console.log(metadata);
  const options = {
    headers: {
      authorisation: metadata.token,
      is_organisation: metadata.token_organisation,
    },
  };
  const response = await fetch(
    `http://localhost:3001/applications/index`,
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
  const job = document.querySelector(".jobs")
  const message =document.querySelector(".message")
  jobList.forEach((job) => {
      const {
        job_id,
        is_organisation,
        category,
        title,
        description,
        start_dateTime,
        endDate,
        hours_needed,
        num_volunteers,
        address
      } = job;
      const startDate =sortDates(start_dateTime);
      const lastDate = sortDates(endDate);
      const time = startTime(start_dateTime);
      const jobTitle = document.createElement("div");
      jobTitle.classList.add("left");
      jobTitle.innerHTML = `<div class="jobs">
          <div class="left">
              <div class="title">Job Title : ${title}</div>
              <div class="description">Job Description : ${description}</div>
          </div>
          <div class="middle">
              <div class="dates">Dates : ${startDate} - ${lastDate}</div>
              <div class="start">Start Time: ${time} </div>
              <div class="hours">Hours / day : ${hours_needed}</div>
              <div class="location">Location : ${address} </div>
          </div>
          <div class="right">
              <div class="apply">Number volunteers : ${num_volunteers}</div>
          </div>
      </div>`;
    scroller.appendChild(jobTitle);
    
  })
};

function sortDates(sqlDate){

const dateObj = new Date(sqlDate);

const year = dateObj.getFullYear();
const month = String(dateObj.getMonth() + 1).padStart(2, '0');
const day = String(dateObj.getDate()).padStart(2, '0');

const formattedDate = `${day}/${month}/${year}`;

return(formattedDate)
}

function startTime(sqlDate) {
  const dateObj = new Date(sqlDate);
  const hours = String(dateObj.getUTCHours()).padStart(2, '0');
  const minutes = String(dateObj.getUTCMinutes()).padStart(2, '0');

  const formattedTime = `${hours}:${minutes}`;
  return(formattedTime);
}

console.log(fetchJobPost());
fetchJobPost();
