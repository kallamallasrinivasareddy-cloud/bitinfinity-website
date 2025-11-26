// app/page.tsx
import { useEffect } from "react";
import Script from "next/script";

export default function HomePage() {
  useEffect(() => {
    // If script.js uses global DOM behavior, you can call an init function here
    // If you prefer to import the file content, see step 4 below.
    if (typeof window !== "undefined" && (window as any).initBitInfinity) {
      (window as any).initBitInfinity();
    }
  }, []);

  return (
    <>
      {/* Load Razorpay checkout script from CDN */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />

      <main>
        <header className="header">
          <div className="container header-row">
            <div className="brand">
              <img src="/assets/logo.png" alt="BIT INFINITY" className="logo" />
            </div>

            <nav className="nav-links">
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#courses">Courses</a>
              <a href="/blog">Blog</a>
              <a href="/contact">Contact Us</a>
            </nav>

            <div className="socials">
              <a href="https://github.com/bitinfinity" target="_blank" rel="noreferrer"><img src="/assets/github.svg" alt="GitHub" /></a>
              <a href="https://x.com/bitinfinity" target="_blank" rel="noreferrer"><img src="/assets/x.svg" alt="X" /></a>
              <a href="https://instagram.com/bitinfinity" target="_blank" rel="noreferrer"><img src="/assets/instagram.svg" alt="Instagram" /></a>
              <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer"><img src="/assets/whatsapp.svg" alt="WhatsApp" /></a>
            </div>
          </div>
        </header>

        <section className="hero" id="home">
          <div className="container">
            <h1>BIT INFINITY</h1>
            <p>Software Training with <strong>100% Placement Assistance</strong></p>
            <a href="#courses" className="btn primary">Explore Courses</a>
          </div>
        </section>

        <section id="about" className="container about">
          <h2>About Us</h2>
          <p>
            BIT INFINITY provides high-quality professional training in <strong>Python, AWS Cloud, and US Healthcare</strong> with guaranteed placement support.
            Our mission is to empower students with hands-on skills and real-world project experience.
          </p>
        </section>

        <section id="courses" className="container courses">
          <h2>Our Courses</h2>
          <div className="course-list">
            {/* Python Course Card */}
            <div className="course-card" data-id="python">
              <img src="/assets/python-course.jpg" alt="Python Course" className="course-img" />
              <h3>Python Full Stack with Generative AI</h3>
              <p>Master full-stack web development and integrate Generative AI into real projects.</p>
              <p><strong>₹20,000</strong></p>
              <div className="course-actions">
                <button className="btn primary enroll-btn" data-id="python">Enroll Now</button>
                <button className="pdf-btn" data-file="courses/python.html"><span className="pdf-icon">📄</span> View Content</button>
              </div>
            </div>

            {/* AWS Course Card */}
            <div className="course-card" data-id="aws">
              <img src="/assets/aws-course.png" alt="AWS Course" className="course-img" />
              <h3>AWS Cloud & DevOps</h3>
              <p>Hands-on Cloud, DevOps, DevSecOps, and AIops training using AWS and open-source tools.</p>
              <p><strong>₹30,000</strong></p>
              <div className="course-actions">
                <button className="btn primary enroll-btn" data-id="aws">Enroll Now</button>
                <button className="pdf-btn" data-file="courses/aws.html"><span className="pdf-icon">📄</span> View Content</button>
              </div>
            </div>

            {/* Healthcare Course Card */}
            <div className="course-card" data-id="healthcare">
              <img src="/assets/medical-billing.jpg" alt="Medical Billing Course" className="course-img" />
              <h3>US Healthcare</h3>
              <p>Gain domain knowledge in US healthcare systems, workflows, and billing processes.</p>
              <p><strong>₹20,000</strong></p>
              <div className="course-actions">
                <button className="btn primary enroll-btn" data-id="healthcare">Enroll Now</button>
                <button className="pdf-btn" data-file="courses/healthcare.html"><span className="pdf-icon">📄</span> View Content</button>
              </div>
            </div>

          </div>
        </section>

        <footer className="footer">
          <div className="container footer-content">
            <div className="links">
              <a href="#home">Home</a> |
              <a href="#about">About</a> |
              <a href="#courses">Courses</a> |
              <a href="/blog">Blog</a> |
              <a href="/contact">Contact Us</a>
            </div>
            <div className="socials">
              <a href="https://github.com/bitinfinity" target="_blank" rel="noreferrer"><img src="/assets/github.svg" alt="GitHub" /></a>
              <a href="https://x.com/bitinfinity" target="_blank" rel="noreferrer"><img src="/assets/x.svg" alt="X" /></a>
              <a href="https://instagram.com/bitinfinity" target="_blank" rel="noreferrer"><img src="/assets/instagram.svg" alt="Instagram" /></a>
              <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer"><img src="/assets/whatsapp.svg" alt="WhatsApp" /></a>
            </div>
            <p>© 2025 BIT INFINITY — All rights reserved.</p>
          </div>
        </footer>

        {/* Enrollment Modal HTML */}
        <div id="enrollModal" className="modal">
          <div className="modal-content">
            <span id="closeModal" className="close">&times;</span>
            <h3>Enroll Now</h3>
            <form id="enrollForm">
              <input type="hidden" id="courseId" />
              <div className="form-group">
                <label>Name</label>
                <input type="text" id="name" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" id="email" required />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input type="text" id="phone" required />
              </div>
              <div className="form-row optin">
                <label>
                  <input type="checkbox" id="whatsappOptIn" />
                  I agree to receive updates via WhatsApp
                </label>
              </div>
              <button type="submit" className="btn primary">Proceed to Payment</button>
            </form>
          </div>
        </div>

        {/* Chatbot + Content viewer modals (copied unchanged) */}
        <div id="chatbot">
          <div id="chatbot-header">💬 Need Help?</div>
          <div id="chatbot-window">
            <div id="chatbot-messages"></div>
            <div id="chatbot-typing" style={{ display: "none" }}>Bot is typing…</div>
            <div id="chatbot-quick">
              <button className="quick-btn">Courses</button>
              <button className="quick-btn">Fees</button>
              <button className="quick-btn">Contact</button>
              <button className="quick-btn">Location</button>
            </div>
            <input type="text" id="chatbot-input" placeholder="Type your message..." />
          </div>
        </div>

        <div id="contentModal" className="modal">
          <div className="modal-content large">
            <span id="closeContentModal" className="close">&times;</span>
            <iframe id="contentFrame" src="" frameBorder="0"></iframe>
          </div>
        </div>

      </main>

      {/* Optionally include original script (for quick parity) */}
      <Script src="/script.js" strategy="afterInteractive" />
    </>
  );
}
