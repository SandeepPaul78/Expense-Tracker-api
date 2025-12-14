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
        } else if (response.status === 400){

            const errorData = await response.json();
            displayValidationErrors(errorData.errors);


        }
        
        else {
            
            alert("Signup failed");
        }
        
    } catch (error) {
        console.log(error);
        
    }
});

function displayValidationErrors(errors) {
    const errorDiv = document.getElementById('show-errors-msg'); 
  
    errorDiv.innerHTML = ''; 
    errorDiv.style.display = 'block';
    
   
    errors.forEach(err => {
        const p = document.createElement('p');
        p.className = 'error-style'; // CSS styling के लिए
        p.textContent = `Error in ${err.param}: ${err.msg}`;
        errorDiv.appendChild(p);
    });
}

