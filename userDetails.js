const loadUserDetails = () =>{
    const user_id = localStorage.getItem("user_id");
    fetch(`https://smart-care.onrender.com/users/${user_id}`)
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data);
        const parent = document.getElementById("user-details-container");
        const div = document.createElement("div");
        div.classList.add("all-user");
        div.innerHTML = `
        <div class="user-details-image">
                <img src="./image/doc3.jpg" alt="">
            </div>
            <div class="user-details-info">
                <h4>${data.username}</h4>
                <h3>${data.first_name + data.last_name}</h3>
                <h3>${data.email}</h3>
            </div>
        `;
        parent.appendChild(div);
    });
};

loadUserDetails();