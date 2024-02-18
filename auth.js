const handleRegistration = (event) => {
  event.preventDefault();
  const username = getValue("username");
  const first_name = getValue("first_name");
  const last_name = getValue("last_name");
  const email = getValue("email");
  const password = getValue("password");
  const confirm_password = getValue("confirm_password");
  const info = {
    username,
    first_name,
    last_name,
    email,
    password,
    confirm_password,
  };

  if (password === confirm_password) {
    document.getElementById("error").innerText = "";
    if (
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        password
      )
    ) {
      fetch("https://smart-care.onrender.com/patient/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    } else {
      document.getElementById("error").innerText =
        "Password minimum eight characters, at least one uppercase letter, one lowercase letter and one number";
    }
  } else {
    document.getElementById("error").innerText =
      "Password and Confirm Password do not match.";
    alert("Password and Confirm Password do not match!");
  }
};

const getValue = (id) => {
  const value = document.getElementById(id).value;
  return value;
};

const handleLogin = (event) => {
  event.preventDefault();
  const username = getValue("login-username");
  const password = getValue("login-password");
  console.log(username, password);
  if ((username, password)) {
    fetch("https://smart-care.onrender.com/patient/login/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.token && data.user_id) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user_id", data.user_id);
            window.location.href = "index.html";
          }
      });
  }
};
