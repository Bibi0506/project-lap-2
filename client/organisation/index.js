const postForm = document.querySelector("#postForm")
const jobForm = document.getElementsByClassName('job-form');
postForm.addEventListener("submit", postCreated);

function postCreated (e){
    e.preventDefault();
    const data = {"Category": document.querySelector("#job-category").value,
    "Title":document.querySelector("#job-title").value,
    "Description":document.querySelector("#job-description").value,
    "StartDate":document.querySelector("#start-date").value,
    "EndDate":document.querySelector("#end-date").value,
    "StartTime":document.querySelector("#start-time").value,
    "Hours_Needed":document.querySelector("#total-hours").value,
    "No_Volunteers_Needed":document.querySelector("#total-positions").value
};

    console.log (data);
}

    
