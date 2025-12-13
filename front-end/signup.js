const inputs = document.querySelectorAll(".inp");
const submit = document.getElementById("submit");

submit.addEventListener("click", async(e)=>{
    e.preventDefault();
    try {
         const signup = {};
        inputs.forEach((input)=>{
            signup[input.name] = input.value;
        });
        const response = await fetch("https://expense-tracker-opu1.onrender.com/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(signup)
        });
        if(response.ok){
            alert("Signup successful! Please log in.");
            window.location.href = "login.html";
        } else {
            const result = await response.json();
            alert(`Signup failed: ${result.message}`);
        }
        
    } catch (error) {
        console.log(error);
        
    }
});

