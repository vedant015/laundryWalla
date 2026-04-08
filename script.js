// This is the list of laundry services I want to show on the page.
const services = [
  { name: "Dry Cleaning", price: 200 },
  { name: "Wash & Fold", price: 100 },
  { name: "Ironing", price: 20 },
  { name: "Stain Removal", price: 500 },
  { name: "Leather & Suede Cleaning", price: 999 },
  { name: "Wedding Dress Cleaning", price: 2800 }
];

// I am using a simple array for the cart.
const cart = [];

// These are the main boxes and buttons from the HTML.
const serviceList = document.getElementById("serviceList");
const cartItems = document.getElementById("cartItems");
const emptyCart = document.getElementById("emptyCart");
const totalAmount = document.getElementById("totalAmount");
const bookingForm = document.getElementById("bookingForm");
const formError = document.getElementById("formError");
const bookingMessage = document.getElementById("bookingMessage");
const scrollBtn = document.getElementById("scrollBtn");
const newsletterForm = document.getElementById("newsletterForm");

// Put your real EmailJS keys here after making the service and template.
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";

// This shows the service cards on the screen.
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

// This shows what the user added in the cart box.
function showCart() {
  let html = "";
  let total = 0;

  for (let i = 0; i < cart.length; i++) {
    for (let j = 0; j < services.length; j++) {
      if (services[j].name === cart[i]) {
        total = total + services[j].price;
        html += `<li><span>${services[j].name}</span><span>₹${services[j].price}.00</span></li>`;
        break;
      }
    }
  }

  cartItems.innerHTML = html;
  totalAmount.textContent = `₹${total}.00`;
  emptyCart.style.display = cart.length === 0 ? "block" : "none";
}

// When I click the button, the item goes into the cart or comes out.
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

// Check if email looks normal.
function validEmail(email) {
  if (email.indexOf("@") === -1) {
    return false;
  }

  if (email.indexOf(".") === -1) {
    return false;
  }

  return email.indexOf("@") < email.lastIndexOf(".");
}

// Phone number should be 10 digits only.
function validPhone(phone) {
  if (phone.length !== 10) {
    return false;
  }

  for (let i = 0; i < phone.length; i++) {
    if (phone[i] < "0" || phone[i] > "9") {
      return false;
    }
  }

  return true;
}

// This makes one text string for the booking email.
function getServiceSummary() {
  let text = "";
  let total = 0;

  for (let i = 0; i < cart.length; i++) {
    for (let j = 0; j < services.length; j++) {
      if (services[j].name === cart[i]) {
        total = total + services[j].price;
        text += services[j].name + " - ₹" + services[j].price + ".00";

        if (i < cart.length - 1) {
          text += ", ";
        }

        break;
      }
    }
  }

  return {
    servicesText: text,
    total: total
  };
}

// Show a message below the form.
function setBookingMessage(text, isError) {
  bookingMessage.className = "booking-message";
  bookingMessage.textContent = text;
  if (text !== "") {
    bookingMessage.classList.add("show");
  }

  if (isError) {
    bookingMessage.classList.add("error");
  }
}

// Scroll down to the booking section when the top button is clicked.
scrollBtn.addEventListener("click", function () {
  document.getElementById("services").scrollIntoView({ behavior: "smooth" });
});

// This is the main booking form submit part.
bookingForm.addEventListener("submit", function (event) {
  event.preventDefault();

  formError.textContent = "";
  setBookingMessage("", false);

  const fullName = document.getElementById("fullName").value.trim();
  const emailId = document.getElementById("emailId").value.trim();
  const phoneNumber = document.getElementById("phoneNumber").value.trim();

  if (cart.length === 0) {
    formError.textContent = "Please add at least one service before booking.";
    return;
  }

  if (!validEmail(emailId)) {
    formError.textContent = "Please enter a valid email address.";
    return;
  }

  if (!validPhone(phoneNumber)) {
    formError.textContent = "Phone number should be exactly 10 digits.";
    return;
  }

  const summary = getServiceSummary();

  const params = {
    full_name: fullName,
    email: emailId,
    phone: phoneNumber,
    services: summary.servicesText,
    total_amount: "₹" + summary.total + ".00"
  };

  if (
    window.emailjs &&
    EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY" &&
    EMAILJS_SERVICE_ID !== "YOUR_SERVICE_ID" &&
    EMAILJS_TEMPLATE_ID !== "YOUR_TEMPLATE_ID"
  ) {
    emailjs.init(EMAILJS_PUBLIC_KEY);

    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
      .then(function () {
        setBookingMessage("Thank you for booking. We will contact you soon.", false);
      })
      .catch(function () {
        setBookingMessage("Booking saved, but email not sent", true);
      });
  } else {
    setBookingMessage("Thank you for booking. We will contact you soon.", false);
  }

  bookingForm.reset();
  cart.length = 0;
  showServices();
  showCart();
});

// Newsletter form for simple interaction.
newsletterForm.addEventListener("submit", function (event) {
  event.preventDefault();
  alert("Thanks for subscribing!");
  newsletterForm.reset();
});

// Initial render.
showServices();
showCart();