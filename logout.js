const handleLogOut = ()=>{
    const token = localStorage.getItem('token');
    fetch(`https://smart-care.onrender.com/patient/logout/${token}`,{
        method: 'POST',
        headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
        }
    })
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data);
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
    })
}