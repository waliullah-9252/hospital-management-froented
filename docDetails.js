const getparams = () => {
  const param = new URLSearchParams(window.location.search).get("doctorId");
  //   console.log(param);
  loadAvailableTime(param);
  fetch(`https://smart-care.onrender.com/doctor/list/${param}`)
    .then((res) => res.json())
    .then((data) => displayDocDetails(data));

  fetch(`https://smart-care.onrender.com/doctor/reviews/?doctor_id${param}`)
    .then((res) => res.json())
    .then((data) => displayClientReview(data));
};

displayDocDetails = (docDetails) => {
  //   console.log(docDetails);
  const parent = document.getElementById("doc-details");
  const div = document.createElement("div");
  div.classList.add("doc-details-container");
  div.innerHTML = `
    <div class="doctor-image">
            <img src=${docDetails.image} alt="">
        </div>
        <div class="doctor-info">
            <h5>${docDetails.user}</h5>
            ${docDetails.designation.map((item) => {
              return `<h6>${item}</h6>`;
            })}
            ${docDetails.specialization.map((item) => {
              return `<button class="btn btn-sm btn-secondary">${item}</button>`;
            })}
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium, odio.</p>
            <h5>Fees: ${docDetails.fee} BDT</h5>
            
            <button type="button" class="btn-sm btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Take Appointment
  </button>
        </div>
    `;
  parent.appendChild(div);
};

const displayClientReview = (reviews) => {
  reviews.forEach((review) => {
    const parent = document.getElementById("doc-client-review");
    const div = document.createElement("div");
    div.classList.add("review-card");
    div.innerHTML = `
                        <img src="./image/doc3.jpg" alt="">
                          <p>${review.body.slice(0, 100)}</p>
                          <h6>${review.created}</h6>
                          <h6>${review.rating}</h6>
      `;
    parent.appendChild(div);
  });
};

const loadAvailableTime = (id) => {
  fetch(`https://smart-care.onrender.com/doctor/available_time/?doctor_id${id}`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        const parent = document.getElementById("available-time");
        const option = document.createElement("option");
        option.value = item.id;
        option.innerText = item.name;
        parent.appendChild(option);
      });
      console.log(data);
    });
};

const handleAppointment = () => {
  const status = document.getElementsByName("status");
  const selected = Array.from(status).find((item) => item.checked);
  const symptom = document.getElementById("symptom").value;
  const availableTime = document.getElementById("available-time");
  const selectedTime = availableTime.options[availableTime.selectedIndex];
  const patient_id = localStorage.getItem("patient_id");
  // console.log(selected.value, symptom, selectedTime.value);
  const info = {
    time: selectedTime.value,
    patient: patient_id,
    doctor: "Dr. Abraham Vandon",
    appointment_types: selected.value,
    appointment_status: "Pending",
    symptom: symptom,
    cancel: false,
  };
  // console.log(info);

  fetch("https://smart-care.onrender.com/appointment/", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(info),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
};

const loadPatientId = () => {
  const user_id = localStorage.getItem("user_id");
  fetch(`https://smart-care.onrender.com/patient/list/?user_id=${user_id}`)
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem("patient_id", data[0].id);
    });
};

getparams();

loadPatientId();
