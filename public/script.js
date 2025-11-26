// script.js — Enroll modal + Stripe checkout integration

document.addEventListener('DOMContentLoaded', () => {
  const enrollBtns = document.querySelectorAll('.enroll-btn');
  const modal = document.getElementById('enrollModal');
  const closeModal = document.getElementById('closeModal');
  const form = document.getElementById('enrollForm');
  const courseIdInput = document.getElementById('courseId');

  enrollBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      courseIdInput.value = btn.dataset.id;
      modal.style.display = 'flex';
    });
  });

  closeModal.onclick = () => (modal.style.display = 'none');
  window.onclick = e => { if (e.target == modal) modal.style.display = 'none'; };

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const courseId = document.getElementById('courseId').value;
    const whatsappOptIn = document.getElementById('whatsappOptIn').checked;

    try {
      const res = await fetch('/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, courseId, whatsappOptIn })
      });
      const data = await res.json();
      if (data.url) {
        window.location = data.url;
      } else {
        alert('Error creating payment session.');
      }
    } catch (err) {
      console.error(err);
      alert('Payment initiation failed.');
    }
  });
});

// Advanced Chatbot Logic
const botHeader = document.getElementById("chatbot-header");
const botWindow = document.getElementById("chatbot-window");
const botInput = document.getElementById("chatbot-input");
const botMessages = document.getElementById("chatbot-messages");
const typing = document.getElementById("chatbot-typing");

// toggle chatbot
botHeader.onclick = () => {
  botWindow.style.display = botWindow.style.display === "flex" ? "none" : "flex";
};

// helpers
function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("chatbot-msg", sender);
  msg.innerText = text;
  botMessages.appendChild(msg);
  botMessages.scrollTop = botMessages.scrollHeight;
}

function botRespond(message) {
  typing.style.display = "block";

  setTimeout(() => {
    typing.style.display = "none";

    message = message.toLowerCase();

    if (message.includes("course")) {
      addMessage("We offer Python, AWS, and Medical Billing courses. Which one interests you?", "bot");
    } else if (message.includes("fee") || message.includes("price")) {
      addMessage("Python ₹20,000 • AWS ₹30,000 • Medical Billing ₹20,000.", "bot");
    } else if (message.includes("contact")) {
      addMessage("You can reach us at +91 99999 99999 or via WhatsApp.", "bot");
    } else if (message.includes("location") || message.includes("address")) {
      addMessage("We are located in Hyderabad, Telangana, India.", "bot");
    } else {
      addMessage("I can help you with courses, fees, contact, or location. 😊", "bot");
    }

  }, 800); // typing delay
}

// quick button clicks
document.querySelectorAll(".quick-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const text = btn.innerText;
    addMessage(text, "user");
    botRespond(text);
  });
});

// PDF / Course Content Viewer
document.querySelectorAll(".pdf-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const file = btn.getAttribute("data-file");
    document.getElementById("contentFrame").src = file;
    document.getElementById("contentModal").style.display = "block";
  });
});

document.getElementById("closeContentModal").addEventListener("click", () => {
  document.getElementById("contentModal").style.display = "none";
  document.getElementById("contentFrame").src = "";
});

window.addEventListener("click", (event) => {
  const modal = document.getElementById("contentModal");
  if (event.target === modal) {
    modal.style.display = "none";
    document.getElementById("contentFrame").src = "";
  }
});

// keyboard input
botInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && botInput.value.trim()) {
    addMessage(botInput.value, "user");
    botRespond(botInput.value);
    botInput.value = "";
  }
});

// OPEN COURSE CONTENT IN NEW TAB
/*document.querySelectorAll(".pdf-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const file = btn.getAttribute("data-file");
    window.open(file, "_blank");
  });
});*/

// OPEN COURSE CONTENT IN SAME PAGE (FULL WIDTH)
document.querySelectorAll(".pdf-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const file = btn.getAttribute("data-file");
    window.location.href = file;  // Loads the course page in same window
  });
});

document.getElementById("enrollForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const course = document.getElementById("courseId").value;

    let amount = 0;

    if (course === "python") amount = 20000;
    if (course === "aws") amount = 30000;
    if (course === "healthcare") amount = 20000;

    const options = {
        key: "rzp_test_1234567890ABCDE", // 👉 Replace with your Razorpay Key
        amount: amount * 100,
        currency: "INR",
        name: "BIT INFINITY",
        description: "Course Enrollment Payment",
        handler: function (response) {
            alert("Payment Successful ✔️\nPayment ID: " + response.razorpay_payment_id);
        },
        prefill: {
            name: name,
            email: email,
            contact: phone
        },
        theme: {
            color: "#0d6efd"
        }
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
});



