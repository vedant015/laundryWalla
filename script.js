const services = [
  { name: "Dry Cleaning", price: 200 },
  { name: "Wash & Fold", price: 100 },
  { name: "Ironing", price: 20 },
  { name: "Stain Removal", price: 500 },
  { name: "Leather & Suede Cleaning", price: 999 },
  { name: "Wedding Dress Cleaning", price: 2800 }
];

const cart = [];

const serviceList = document.getElementById("serviceList");
const cartItems = document.getElementById("cartItems");
const emptyCart = document.getElementById("emptyCart");
const totalAmount = document.getElementById("totalAmount");
const bookingForm = document.getElementById("bookingForm");
const bookingMessage = document.getElementById("bookingMessage");
const scrollBtn = document.getElementById("scrollBtn");
const newsletterForm = document.getElementById("newsletterForm");

const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";

function showServices() {
  let html = "";

  for (let i = 0; i < services.length; i++) {
    const item = services[i];
    const inCart = cart.indexOf(item.name) !== -1;

    html += `
      <div class="service-item">
        <div class="service-info">
          <span class="service-name">${item.name}</span>
          <span class="service-price">₹${item.price}.00</span>
        </div>
        <button class="mini-btn ${inCart ? "remove-btn" : "add-btn"}" onclick="toggleService(${i})">
          ${inCart ? "Remove Now" : "Add Items"}
        </button>
      </div>
    `;
  }

  serviceList.innerHTML = html;
}

function showCart() {
  let html = "";
  let total = 0;

  for (let i = 0; i < cart.length; i++) {
    const name = cart[i];
    const service = services.find(function (item) {
      return item.name === name;
    });

    if (service) {
      total = total + service.price;
      html += `<li><span>${service.name}</span><span>₹${service.price}.00</span></li>`;
    }
  }

  cartItems.innerHTML = html;
  totalAmount.textContent = `₹${total}.00`;

  if (cart.length === 0) {
    emptyCart.style.display = "block";
  } else {
    emptyCart.style.display = "none";
  }
}

function toggleService(index) {
  const serviceName = services[index].name;
  const found = cart.indexOf(serviceName);

  if (found === -1) {
    cart.push(serviceName);
  } else {
    cart.splice(found, 1);
  }

  showServices();
  showCart();
}

scrollBtn.addEventListener("click", function () {
  document.getElementById("services").scrollIntoView({ behavior: "smooth" });
});

bookingForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const fullName = document.getElementById("fullName").value;
  const emailId = document.getElementById("emailId").value;
  const phoneNumber = document.getElementById("phoneNumber").value;

  let serviceText = "No items added";
  let total = 0;

  if (cart.length > 0) {
    serviceText = "";

    for (let i = 0; i < cart.length; i++) {
      const item = services.find(function (service) {
        return service.name === cart[i];
      });

      if (item) {
        total = total + item.price;
        serviceText += item.name + " - ₹" + item.price + ".00";

        if (i < cart.length - 1) {
          serviceText += ", ";
        }
      }
    }
  }

  const params = {
    full_name: fullName,
    email: emailId,
    phone: phoneNumber,
    services: serviceText,
    total_amount: "₹" + total + ".00"
  };

  if (window.emailjs && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
      .then(function () {
        bookingMessage.textContent = "Thank you For Booking the Service We will get back to you soon!";
      })
      .catch(function () {
        bookingMessage.textContent = "Email could not be sent right now.";
      });
  } else {
    bookingMessage.textContent = "Thank you For Booking the Service We will get back to you soon!";
  }

  bookingForm.reset();
  cart.length = 0;
  showServices();
  showCart();
});

newsletterForm.addEventListener("submit", function (event) {
  event.preventDefault();
  alert("Thanks for subscribing!");
  newsletterForm.reset();
});

showServices();
showCart();