

const API_BASE = "https://expense-tracker-opu1.onrender.com"
const authbtn = document.getElementById("authbtn");
const logoutContainer = document.getElementById("logout-container");
const logoutBtn = document.getElementById("logout-btn");
const tableBody = document.getElementById("tableBody");

 const token = JSON.parse(localStorage.getItem("token"))?.token||null;
if(token){
   if(authbtn){
    authbtn.style.display = "none";
  }

  if(logoutContainer){
    logoutContainer.style.display = "block";
  }


const headers = {
  "Content-Type" : "application/json",
  Authorization : `Bearer ${token}`,
}

const $addBtn = document.getElementById("addBtnTran");
const table = document.getElementById("table");
const incomeEl = document.getElementById("income");
const expenceEl = document.getElementById("expence");
const totalEl = document.getElementById("total");

// tab buttons (switch between transactions and add form)
const tabButtons = document.querySelectorAll(".tab-button");

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const target = btn.dataset.target;
    document.querySelectorAll("#tab-content > section").forEach((sec) => {
      sec.style.display = sec.id === target ? "block" : "none";
    });

    if (target === "transactions-section") {
      // refresh table when coming back
      fetchTransactions();
    } else {
      // clear form when opening add section
      document.querySelector(".transaction-Name").value = "";
      document.querySelector(".amount").value = "";
      document.querySelector(".modeltype").value = "";
    }
  });
});

function formatCurrency(n) {
  return `₹${parseFloat(n).toFixed(2)}`;
}

// ------------ FETCH ALL -----------------
async function fetchTransactions() {
  try {
    const res = await fetch(`${API_BASE}/getAllTransactions`, {
      method: "GET",
      headers,
    });

    const data = await res.json();
    const list = data.getAllTransactions || [];

    renderTransactions(list);
    return list;
  } catch (err) {
    console.log(err);
  }
}

// ------------ RENDER TABLE ---------------

function renderTransactions(list = []) {
  tableBody.innerHTML = "";

  list.forEach((t) => {
    const row = document.createElement("tr");
    row.id = t._id;

    row.innerHTML = `
      <td>${t.name}</td>
      <td>${formatCurrency(t.amount)}</td>
      <td>${t.type}</td>
      <td>${t.date}</td>
      <td>
        <button class="deleteTran">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });

  updateTotals(list);
}


// ------------ TOTALS ------------------
function updateTotals(list) {
  const income = list.filter(t => t.type === "Credit")
                     .reduce((s, t) => s + t.amount, 0);

  const expence = list.filter(t => t.type === "Debit")
                      .reduce((s, t) => s + t.amount, 0);

  incomeEl.innerText = formatCurrency(income);
  expenceEl.innerText = formatCurrency(expence);
  totalEl.innerText = formatCurrency(income - expence);
}


// ------------ ADD TRANSACTION ---------------
$addBtn.addEventListener("click", async () => {
  const name = document.querySelector(".transaction-Name").value.trim();
  const amount = parseFloat(document.querySelector(".amount").value.trim());
  const type = document.querySelector(".modeltype").value;

  if (!name || !amount || !type) {
    alert("Please enter valid name, amount and type");
    return;
  }

  const date = new Date().toLocaleString();

  const body = { name, amount, type, date };

  await fetch(`${API_BASE}/addTransactions`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  // clear inputs
  document.querySelector(".transaction-Name").value = "";
  document.querySelector(".amount").value = "";
  document.querySelector(".modeltype").value = "";

  fetchTransactions();

  // after adding, show transactions tab
  document.querySelector('[data-target="transactions-section"]').click();
});

// ------------ DELETE TRANSACTION ----------------
table.addEventListener("click", async (e) => {
  if (!e.target.classList.contains("deleteTran")) return;

  const row = e.target.closest("tr");
  const id = row.id;


  await fetch(`${API_BASE}/deleteTransaction/${id}`, {
    method: "DELETE",
    headers,
  });

  fetchTransactions();
});

// ------------ INIT -----------------
fetchTransactions();
  
}else{
if (authbtn) {
        authbtn.style.display = "flex"; 
    }

    if (logoutContainer) {
        logoutContainer.style.display = "none"; 
    }

    if(tableBody){
      tableBody.innerHTML = "";
    }

    document.getElementById("income").innerText = "₹0";
    document.getElementById("expence").innerText = "₹0";
    document.getElementById("total").innerText = "₹0";

    const $addBtn = document.getElementById("addBtnTran"); 
    if ($addBtn) {
        $addBtn.addEventListener("click", () => {
        
            window.location.href = "login.html";
        });
    }
 
}

if(logoutBtn){
  logoutBtn.addEventListener("click", ()=>{
    localStorage.removeItem("token");
   
    window.location.reload();
  }  )
}


