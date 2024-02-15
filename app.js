const laodServices = () => {
  fetch("https://testing-8az5.onrender.com/services/")
    .then((res) => res.json())
    .then((data) => displayServices(data))
    .catch((err) => console.log(err));
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
  fetch(`https://testing-8az5.onrender.com/doctor/list/?search=${
    search ? search : " "
  }`)
    .then((res) => res.json())
    .then((data) => {
        // console.log(data);
        displayDoctors(data?.results)
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
                        <h3>${doctor?.full_name}</h3>
                        <h5>${doctor?.designation}</h5>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing.</p>

                        <p>
                        ${doctor.specialization.map((item) => {
                          return `<button>${item}</button>`;
                        })}
                        </p>

                        <button class="doc-btn">Details</button>
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
        li.innerText = item?.name;
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
        li.innerText = item?.name;
        parent.appendChild(li);
      });
    });
};

const handleSearch = () => {
  const value = document.getElementById("doc-search").value;
  loadDoctors(value);
};

laodServices();

loadDoctors();

loadDesignations();

loadSpecialization();
