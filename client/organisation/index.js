const postForm = document.querySelector("#postForm")
const jobForm = document.getElementsByClassName('job-form');
postForm.addEventListener("submit", postCreated);

async function postCreated (e){
  e.preventDefault();
  const data = {user_id: 1,
    category: document.querySelector("#jobCategory").value,
    title:document.querySelector("#jobTitle").value,
    description:document.querySelector("#jobDescription").value,
    start_dateTime:document.querySelector("#startDate").value,
    endDate:document.querySelector("#endDate").value,
    hours_needed:document.querySelector("#totalHours").value,
    num_volunteers:document.querySelector("#totalPositions").value
  };
  const options ={
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }
  const response =await fetch("http://localhost:3001/jobs", options)
    if (response.status ===201) {
      e.target.jobCategory.value =""
      e.target.jobTitle.value =""
      e.target.jobDescription.value =""
      e.target.startDate.value =""
      e.target.endDate.value =""
      e.target.totalHours.value =""
      e.target.totalPositions.value =""
      console.log('Data added to the database successfully!');
      
    } else {
      console.error('Error adding data to the database.');
      
    }
    window.location.assign("./index.html");

    console.log(data)
}

async function fetchJobPost(job) {
  const respData = await fetch(`http://localhost:3001/jobs/organisations/${job}`);
  
  console.log(respData.ok)
  if (respData.ok) {
    const data = await respData.json();
    console.log(data)
  // } else {
  //   throw "error"
  // }

    addJob(data)
  } else {
    throw "Error in collecting Job"

  }
}

function addJob(jobList) {
    
  const scroller = document.querySelector(".right-container");
  jobList.forEach(job => {
      const {title,
      description,start_datetime,enddate,hours_needed,num_volunteers} =job ;
      const jobTitle = document.createElement('div');
      jobTitle.classList.add('left');
      jobTitle.innerHTML =
      `<div class="jobs">
          <div class="left">
              <div class="title">Job Title : ${title}</div>
              <div class="description">Job Description : ${description}</div>
          </div>
          <div class="middle">
              <div class="dates">Dates : ${start_datetime} - ${enddate}</div>
              <div class="hours">Hours / day : ${hours_needed}</div>
              <div class="location">Location : </div>
          </div>
          <div class="right">
              <div class="apply">Number volunteers : ${num_volunteers}</div>
          
          </div>
      </div>`
      ;
      scroller.appendChild(jobTitle);
  })
}

console.log(fetchJobPost(5))
