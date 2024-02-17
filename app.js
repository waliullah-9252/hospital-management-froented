const laodServices = () => {
  fetch("https://testing-8az5.onrender.com/services/")
    .then((res) => res.json())
    .then((data) => displayServices(data))
    // .catch((err) => console.log(err));
};

const displayServices = (services) => {
  services.forEach((service) => {
    const parent = document.getElementById("services-container");
    const li = document.createElement("li");
    li.innerHTML = `
        <div class="card shadow h-100">
                            <div class="ratio ratio-16x9">
                                <img src=${service.image} alt="...">
                            </div>
                            <div class="card-body  p-3 p-xl-5">
                                <h3 class="card-title h5">${service.name}</h3>
                                <p class="card-text">
                                ${service.description.slice(0, 150)}
                                </p>
                                <a href="#" class="btn btn-primary">Details</a>
                            </div>
                        </div>
        `;
    parent.appendChild(li);
  });
};

const loadDoctors = (search) => {
  document.getElementById("doctors-container").innerHTML = "";
  // document.getElementById("spinner").style.display = "block";
  // console.log(search);
  fetch(`https://smart-care.onrender.com/doctor/list/?search=${
    search ? search : ""
  }`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        if (data.results.length > 0) {
          // document.getElementById("noData").style.display = "none";
          // document.getElementById("spinner").style.display = "none";
          displayDoctors(data?.results)
        }
        else{
          document.getElementById("doctors-container").innerHTML = "";
          // document.getElementById("noData").style.display = "block";
          // document.getElementById("spinner").style.display = "none";
        }
    });
};

const displayDoctors = (doctors) => {
  doctors.forEach((doctor) => {
    // console.log(doctor);
    const parent = document.getElementById("doctors-container");
    const div = document.createElement("div");
    div.classList.add("doc-card");
    div.innerHTML = `
        <img class="doc-card-img" src=${doctor?.image} alt="">
                        <h3>${doctor?.user}</h3>
                        <h5>${doctor?.designation}</h5>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing.</p>

                        <p>
                        ${doctor.specialization.map((item) => {
                          return `<button class="btn btn-sm btn-secondary">${item}</button>`;
                        })}
                        </p>

                        <button class="doc-btn"> <a class="text-decoration-none text-white" target="_blank" href="docDetails.html?doctorId=${doctor.id}">Details</a></button>
        `;
    parent.appendChild(div);
  });
};

const loadDesignations = () => {
  fetch("https://smart-care.onrender.com/doctor/designation/")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      data.forEach((item) => {
        const parent = document.getElementById("drop-deg");
        const li = document.createElement("li");
        li.classList.add("dropdown-item");
        // li.innerText = item?.name;
        li.innerHTML = `
        <li onclick="loadDoctors('${item.name}')" >${item.name} </li>
        `;
        parent.appendChild(li);
      });
    });
};

const loadSpecialization = () => {
  fetch("https://smart-care.onrender.com/doctor/specialization/")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        const parent = document.getElementById("drop-spe");
        const li = document.createElement("li");
        li.classList.add("dropdown-item");
        li.innerHTML = `
        <li onclick="loadDoctors('${item.name}')" >${item.name} </li>
        `;
        parent.appendChild(li);
      });
    });
};

const handleSearch = () => {
  const value = document.getElementById("doc-search").value;
  loadDoctors(value);
};

const reviewLoad = () => {
  fetch("https://smart-care.onrender.com/doctor/reviews/")
  .then((res) => res.json())
  .then((data)=>displayReview(data));
}

const displayReview = (reviews) => {
  reviews.forEach((review) => {
    const parent = document.getElementById("review-container");
    const div = document.createElement("div");
    div.classList.add("review-card");
    div.innerHTML = `
                      <img src="./image/doc3.jpg" alt="">
                        <p>${review.body.slice(0,100)}</p>
                        <h6>${review.created}</h6>
                        <h6>${review.rating}</h6>
    `;
    parent.appendChild(div);
  })
}

laodServices();

loadDoctors();

loadDesignations();

loadSpecialization();

reviewLoad();
