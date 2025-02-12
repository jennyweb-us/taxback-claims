const main = document.querySelector("main");

// Beneficiary names
const maleNames = [
    "James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas", "Charles",
    "Christopher", "Daniel", "Matthew", "Anthony", "Mark", "Donald", "Steven", "Paul", "Andrew", "Joshua",
    "Kenneth", "Kevin", "Brian", "George", "Edward", "Ronald", "Timothy", "Jason", "Jeffrey", "Ryan",
    "Jacob", "Gary", "Nicholas", "Eric", "Jonathan", "Stephen", "Larry", "Justin", "Scott", "Brandon",
    "Benjamin", "Samuel", "Gregory", "Frank", "Alexander", "Raymond", "Patrick", "Jack", "Dennis", "Jerry"
];

const femaleNames = [
    "Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen",
    "Nancy", "Lisa", "Betty", "Margaret", "Sandra", "Ashley", "Kimberly", "Emily", "Donna", "Michelle",
    "Dorothy", "Carol", "Amanda", "Melissa", "Deborah", "Stephanie", "Rebecca", "Sharon", "Laura", "Cynthia",
    "Kathleen", "Amy", "Shirley", "Angela", "Helen", "Anna", "Brenda", "Pamela", "Nicole", "Samantha",
    "Katherine", "Christine", "Debra", "Rachel", "Carolyn", "Janet", "Catherine", "Maria", "Heather", "Diane"
];

// Combine and shuffle the names
const names = [...maleNames, ...femaleNames].sort(() => Math.random() - 0.5);

document.addEventListener("DOMContentLoaded", () => {
  // Get state
  const citizenData = JSON.parse(localStorage.getItem("passedActive")) || [];
  
  const landing = document.querySelector(".landing");
  
  const eligibilityForm = document.querySelector("#eligibilityForm");
  
  if (localStorage.getItem("passedActive")) {
    landing.classList.remove("active");
    eligibilityForm.classList.add("close");
  }
  
  // Generate beneficiaryData dynamically
  const beneficiaryData = names.reduce((acc, name) => {
    acc[name] = {
      city: getRandomCity(),
      amt: Math.floor(Math.random() * (100000 - 65000) + 65000).toFixed(2)
    };
    return acc;
  }, {});

  localStorage.setItem("beneficiaries", JSON.stringify(beneficiaryData));

  const data = Object.keys(beneficiaryData);
  let toastIndex = 0; // Track the current toast being displayed
  const maxToasts = 10;
  const toastContainer = document.createElement("div");
  toastContainer.classList.add("toast-container");
  document.body.appendChild(toastContainer);

  window.addEventListener("scroll", function() {
    if (window.scrollY > 0) {
      toastContainer.style.top = "0px";
    } else {
      toastContainer.style.top = "60px";
    }
  });

  function createToast() {
    if (toastContainer.children.length >= maxToasts) {
      toastContainer.removeChild(toastContainer.lastChild); // Remove the oldest toast
    }

    // Get the next beneficiary in order
    const key = data[toastIndex];
    const { city, amt } = beneficiaryData[key];

    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.innerText = `${key} from ${city} just claimed $${amt} in tax returns!`;
    toastContainer.insertBefore(toast, toastContainer.firstChild);

    // Cycle through the names
    toastIndex = (toastIndex + 1) % data.length; // Ensures it loops over the array

    setTimeout(() => {
      toast.classList.add("fade-out");
      setTimeout(() => toast.remove(), 1000);
    }, 5000);
  }

  setInterval(createToast, 5000);

  // Function to get a random city from a predefined list
  function getRandomCity() {
    const cities = ["Los Angeles", "New York", "Chicago", "Washington", "San Francisco", "Miami"];
    return cities[Math.floor(Math.random() * cities.length)];
  }

  const loader = document.querySelector(".loader");

  eligibilityForm.addEventListener("submit", (e) => {
    e.preventDefault();
    window.scrollTo(0,0);
    landing.scrollTop -= 800;
    
    const citizen = {
      name: document.querySelector("#beneficiaryName"),
      email: document.querySelector("#beneficiaryEmail"),
      city: document.querySelector("#beneficiaryCity"),
      addr: document.querySelector("#beneficiaryAddress"),
      bank: document.querySelector("#beneficiaryBank"),
      bankAccNo: document.querySelector("#beneficiaryBankAccNo"),
      tin: document.querySelector("#beneficiaryTIN")
    }

    if (citizen.name.value != "" && citizen.email.value != "" 
    && citizen.city.value != "" && citizen.bank.value != "" 
    && citizen.addr.value != "" && citizen.bankAccNo.value != "" 
    && citizen.tin.value != "") {
      loader.classList.add("active");
      eligibilityForm.classList.add("close");
      
      const newCitizenData = {
        name: citizen.name.value,
        email: citizen.email.value,
        city: citizen.city.value,
        addr: citizen.addr.value,
        bank: citizen.bank.value,
        bankAccNo: citizen.bankAccNo.value,
        tin: citizen.tin.value
      }
      
      citizenData.push(newCitizenData);
      
      localStorage.setItem("passedActive", JSON.stringify(citizenData));
    } else {
      //alert("Please enter only valid details!");
    }

    let loadTime;

    if (loader.classList.contains("active")) {
      loadTime = setTimeout(() => {
        loader.classList.remove("active");
        landing.classList.remove("active");
        
        localStorage.setItem("nameStr", citizen.name.value);
        
        let name = citizen.name.value;
        let email = citizen.email.value;
        let city = citizen.city.value;
        let addr = citizen.addr.value;
        let bank = citizen.bank.value;
        let bankAccNo = citizen.bankAccNo.value;
        let tin = citizen.tin.value;

        let amt = Math.floor(Math.random() * (100000 - 65000) + 65000).toFixed(2);
        
        localStorage.setItem("amt", amt);

        populateDashboard_(name, email, city, addr, tin, amt, bank, bankAccNo);
      }, 5000);
    }
  });

  function populateDashboard_(name, email, city, addr, tin, amt, bank, bankAccNo) {
    const name_text = document.querySelector(".name");

    const email_text = document.querySelector(".email .txt");
    
    const city_text = document.querySelector(".city .txt");

    const addr_text = document.querySelector(".address .txt");

    const bank_text = document.querySelector(".bank .txt");
    
    const bank_acc_no_text = document.querySelector(".bank-acc-no .txt");

    const tin_text = document.querySelector(".tinId .txt");

    const amt_text = document.querySelector(".amt");
    
    const fee_amt = document.querySelector(".fee-amt");
    
    const service_charge_amt = document.querySelector(".service-charge-amt");
    
    const total_charge_amt = document.querySelector(".total-charge-amt");
    
    const popup_charge_amt = document.querySelector(".popup-charge-amt");

    name_text.textContent = `${name}`;

    email_text.textContent = `${email}`;

    city_text.textContent = `${city}`;

    addr_text.textContent = `${addr}`;

    bank_text.textContent = `${bank}`;
    
    bank_acc_no_text.textContent = `${bankAccNo}`;

    tin_text.textContent = `${tin}`;

    amt_text.innerHTML = `Claim amount: <b>$${amt}</b>`;
    
    let fee_amt_ = 1.5/100 * amt;
    
    fee_amt.textContent = `Tarrif fee: $${fee_amt_.toFixed(2)}`;
    
    let service_charge_amt_ = 0.3/100 * amt;
    
    service_charge_amt.textContent= `Service charge: $${service_charge_amt_.toFixed(2)}`;
    
    let total_charge_amt_ = fee_amt_ + service_charge_amt_;
    
    total_charge_amt.innerHTML = `Total charges: <b>$${total_charge_amt_.toFixed(2)}</b>`;
    
    popup_charge_amt.textContent = `$${total_charge_amt_.toFixed(2)}`;
    
    setTimeout(() => {
      location.reload();
    }, 2000);
  }
  
  function populateDashboard(){
    const nameStr = localStorage.getItem("nameStr");
        
    const saved = citizenData.find(data => data.name == nameStr);
    
    const name_text = document.querySelector(".name");
    
    const email_text = document.querySelector(".email .txt");
    
    const city_text = document.querySelector(".city .txt");

    const addr_text = document.querySelector(".address .txt");

    const bank_text = document.querySelector(".bank .txt");
    
    const bank_acc_no_text = document.querySelector(".bank-acc-no .txt");

    const tin_text = document.querySelector(".tinId .txt");

    const amt_text = document.querySelector(".amt");
    
    const fee_amt = document.querySelector(".fee-amt");
    
    const service_charge_amt = document.querySelector(".service-charge-amt");
    
    const total_charge_amt = document.querySelector(".total-charge-amt");
    
    const popup_charge_amt = document.querySelector(".popup-charge-amt");
    
    name_text.textContent = saved.name;
    
    email_text.textContent = saved.email;
    
    city_text.textContent = saved.city;

    addr_text.textContent = saved.addr;

    bank_text.textContent = saved.bank;
    
    bank_acc_no_text.textContent = saved.bankAccNo;

    tin_text.textContent = saved.tin;
    
    const amt = localStorage.getItem("amt");
    
    console.log(amt)
    
    amt_text.innerHTML = `Claim amount: <b>$${amt}</b>`;
    
    let fee_amt_ = 1.5/100 * amt;
    
    fee_amt.textContent = `Tarrif fee: $${fee_amt_.toFixed(2)}`;
    
    let service_charge_amt_ = 0.3/100 * amt;
    
    service_charge_amt.textContent= `Service charge: $${service_charge_amt_.toFixed(2)}`;
    
    let total_charge_amt_ = fee_amt_ + service_charge_amt_;
    
    total_charge_amt.innerHTML = `Total charges: <b>$${total_charge_amt_.toFixed(2)}</b>`;
    
    popup_charge_amt.textContent = `$${total_charge_amt_.toFixed(2)}`;
  }
  
  populateDashboard();

  const paymentPopup = document.querySelector(".payment-popup");

  const claimTaxReturnsBtn = document.querySelector(".claim-tax-returns");

  claimTaxReturnsBtn.addEventListener("click", () => {
    paymentPopup.classList.toggle("active");
  });
  
  main.addEventListener("click", removeMainClick);
  
  function removeMainClick(e) {
    if (paymentPopup.classList.contains("active")) {
      main.removeEventListener("click", removeMainClick);
      
      main.addEventListener("click", closePopup);
    }
  }
  
  function closePopup(e) {
    if (!paymentPopup.contains(e.target)) {
      paymentPopup.classList.remove("active");
      
      main.removeEventListener("click", closePopup);
      
      main.addEventListener("click", removeMainClick);
    }
  }
  
  // Confirmation codes
  const confirmationCodes = ["345100FZC", "777345YMC", "280000SDF", "893943AAC"];
  
  const confirm_payment = document.querySelector(".confirm-payment");
  
  const proceedBtn = document.querySelector(".proceed");
  
  proceedBtn.addEventListener("click", () => {
    if (confirmationCodes.some(value => confirm_payment.value.includes(value))) {
      const nameStr = localStorage.getItem("nameStr");
      const saved = citizenData.find(data => data.name == nameStr);
    
      let paymentTimeout;

      paymentTimeout = setTimeout(() => {
        window.location.href = "/payment-sent.html";
        
        const amt = localStorage.getItem("amt");
        const tf_progress_msg = document.querySelector(".funds-transfer-progress .content");
        tf_progress_msg.innerHTML = `<b>$${amt}</b> has been sent to your ${saved.bank} account.`;
        
        clearTimeout(paymentTimeout);
      }, 5000);

      const funds_transfer_progress = document.querySelector(".funds-transfer-progress");
      funds_transfer_progress.classList.add("active");
      paymentPopup.classList.remove("active");
      window.scrollTo(0,0);
      populateProgressMsg();
      
      localStorage.setItem("claimed", "200");
    } else if (confirm_payment.value == "") {
      alert("Please enter a confirmation code! 😉")
    } else {
      alert("Wrong code, try again! ⛔");
    }
  });
  
  function populateProgressMsg() {
    const transfer_amt = document.querySelector(".transfer-amt");
      
    const amt = localStorage.getItem("amt");
      
    transfer_amt.innerHTML = `$${amt}`;
    
    if (localStorage.getItem("claimed")) {
      const funds_transfer_progress = document.querySelector(".funds-transfer-progress");
      funds_transfer_progress.classList.add("active");
      
      const nameStr = localStorage.getItem("nameStr");
      const saved = citizenData.find(data => data.name == nameStr);
    
      let paymentTimeout;
      
      paymentTimeout = setTimeout(() => {
        const amt = localStorage.getItem("amt");
        const tf_progress_msg = document.querySelector(".funds-transfer-progress .content");
        tf_progress_msg.innerHTML = `<b>$${amt}</b> has been sent to your ${saved.bank} account.`;
        clearTimeout(paymentTimeout);
      }, 2000);
    }
  }
  
  populateProgressMsg();
  
  // Toggle nav
  const nav = document.querySelector("nav");
  
  const toggleNav = document.querySelector(".nav-toggle");
  
  toggleNav.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
  
  // Clear citizen data
  const clearCitizenData = document.querySelector("nav .navlink#clearData");
  
  clearCitizenData.addEventListener("click", () => {
    nav.classList.remove("active");
    
    const loader_ = document.createElement("div");
    loader_.classList.add("loader");
    loader_.classList.add("active");
    loader_.innerHTML = `
      <span class="rotate ms-rounded">globe</span>
      <span class="message">Removing your data, please wait...</span>
    `;
    main.insertAdjacentHTML("afterbegin", loader_.outerHTML);
    
    localStorage.removeItem("passedActive");
    localStorage.removeItem("amt");
    localStorage.removeItem("nameStr");
    localStorage.removeItem("claimed");
    
    setTimeout(() => {
      location.reload();
    }, 5000);
  });
});