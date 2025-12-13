const inputs = document.querySelectorAll(".inp");
const submit = document.getElementById("submit");
// const authbtn = document.getElementById("authbtn");

submit.addEventListener("click", async(e)=>{
    e.preventDefault();
    try {
         const login = {};
        inputs.forEach((input)=>{
            login[input.name] = input.value;
        });
        const response = await fetch("https://expense-tracker-opu1.onrender.com/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(login)
        });
        if(response.ok){
           const result = await response.json();
              localStorage.setItem("token", JSON.stringify(result));
              window.location.href = "index.html";

        }else{
            alert("Login failed");
        }
        
    } catch (error) {
        console.error("Error during login:", error);
        
    }
}); 


