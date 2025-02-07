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
  // Generate beneficiaryData dynamically
  const beneficiaryData = names.reduce((acc, name) => {
    acc[name] = {
      city: getRandomCity(),
      amt: Math.floor(Math.random() * 100000).toFixed(2)
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

  const landing = document.querySelector(".landing");

  const loader = document.querySelector(".loader");

  const eligibilityForm = document.querySelector("#eligibilityForm");

  eligibilityForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const citizen = {
      name: document.querySelector("#beneficiaryName"),
      email: document.querySelector("#beneficiaryEmail"),
      city: document.querySelector("#beneficiaryCity"),
      addr: document.querySelector("#beneficiaryAddress"),
      bank: document.querySelector("#beneficiaryBank"),
      tin: document.querySelector("#beneficiaryTIN")
    }

    if (citizen.name.value != "" && citizen.email.value != "" && citizen.city.value != "" && citizen.bank.value != "" && citizen.addr.value != "" && citizen.tin.value != "") {
      loader.classList.add("active");
      eligibilityForm.classList.add("close");
    } else {
      alert("Please enter only valid details!");
    }

    let loadTime;

    if (loader.classList.contains("active")) {
      loadTime = setTimeout(() => {
        loader.classList.remove("active");
        landing.classList.remove("active");

        let name = citizen.name.value;
        let email = citizen.email.value;
        let city = citizen.city.value;
        let addr = citizen.addr.value;
        let bank = citizen.bank.value;
        let tin = citizen.tin.value;

        let amt = Math.floor(Math.random() * 100000).toFixed(2);

        populateDashboard(name, email, city, addr, tin, amt, bank);
      }, 5000);
    }
  });

  function populateDashboard(name, email, city, addr, tin, amt, bank) {
    const name_text = document.querySelector(".name");

    const email_text = document.querySelector(".email .txt");

    const city_text = document.querySelector(".city .txt");

    const addr_text = document.querySelector(".address .txt");

    const bank_text = document.querySelector(".bank .txt");

    const tin_text = document.querySelector(".tinId .txt");

    const amt_text = document.querySelector(".amt");

    name_text.textContent = `${name}`;

    email_text.textContent = `${email}`;

    city_text.textContent = `${city}`;

    addr_text.textContent = `${addr}`;

    bank_text.textContent = `${bank}`;

    tin_text.textContent = `${tin}`;

    amt_text.textContent = `Claim Amount: $${amt}`;
  }

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
});