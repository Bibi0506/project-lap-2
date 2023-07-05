document.querySelector("#login-submit").addEventListener("click", async () => {
  const password = document.querySelector("#password-login").value;
  const username = document.querySelector("#email-login").value;

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: username,
      password: password,
    }),
  };

  const response = await fetch("http://localhost:3001/users/login", options);
  const data = await response.json();
  console.log(data);

  if (response.status == 200) {
    localStorage.setItem("token", data.token);
    data.is_organisation
      ? window.location.assign("homepage.html")
      : window.location.assign("homepage.html");
  } else {
    alert(data.error);
    console.log("naaa");
  }
});

document
  .querySelector("#register-submit")
  .addEventListener("click", async () => {
    const password = document.querySelector("#password-register").value;
    const email = document.querySelector("#email-register").value;
    const name = document.querySelector("#name-register").value;
    const phone = parseInt(document.querySelector("#phone-register").value);
    const address = document.querySelector("#address-register").value;
    const name_type = document.querySelector("#name_type").textContent;
    let isOrganisation = false;

    if (name_type === "Business Name :") {
      isOrganisation = true;
    } else {
      isOrganisation = false;
    }

    let textTest = password;
    let pattern =
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;
    let result = pattern.test(textTest);
    if (!result) {
      alert(
        "Your password must be at least 8 characters, including one lowercase, one uppercase, one special character and a number"
      );
    }

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
        phone_number: phone,
        address: address,
        is_organisation: isOrganisation,
      }),
    };

    const response = await fetch(
      "http://localhost:3001/users/register",
      options
    );
    const data = await response.json();
    console.log(data);

    if (response.status == 201) {
      window.location.assign("homepage.html");
    } else {
      alert(data.error);
    }
  });
