class StudentView {
  constructor() {
    this.app = document.getElementById("root");
  }

  clear() {
    this.app.innerHTML = "";
  }

  showHome() {
    this.clear();
    this.app.innerHTML = `
      <h1>Welcome to Summit University</h1>
      <h2>Vision</h2>
      <p>“To elevate minds and inspire innovation that transforms societies and shapes a sustainable future.”</p>
      <h2>Mission</h2>
      <ul>
        <li>Empower students with knowledge that bridges disciplines and cultures.</li>
        <li>Foster creativity, collaboration, and ethical leadership in every field.</li>
        <li>Transform learning into action through research, innovation, and community partnerships.</li>
      </ul>
      <p>Summit University is a global center for innovation, creativity, and leadership. With flexible programs that blend technology, arts, sciences, and social impact, Summit challenges students to rise beyond limits.</p>
    `;
  }

  showAbout() {
    this.clear();
    this.app.innerHTML = `
      <h1>About Summit University</h1>
      <h2>Campus Facilities</h2>
      <ul>
        <li><b>Summit Dome:</b> Central hub for research and events.</li>
        <li><b>Innovation Studios:</b> Maker spaces, VR/AR labs, design workshops.</li>
        <li><b>Eco-Campus:</b> Green architecture, solar grids, gardens.</li>
        <li><b>Exploration Halls:</b> Space, oceanic, and frontier sciences.</li>
        <li><b>Global Exchange Centers:</b> International learning connections.</li>
      </ul>
      <h2>Special Programs</h2>
      <ul>
        <li><b>Convergence Tracks:</b> Blending multiple disciplines.</li>
        <li><b>Living Labs:</b> Hands-on sustainability projects.</li>
        <li><b>Summit Global Exchange:</b> Semester abroad experience.</li>
        <li><b>Leadership Incubator:</b> Startup & NGO accelerator.</li>
        <li><b>Arts & Culture Residency:</b> Collaborations with global artists.</li>
      </ul>
    `;
  }

    showRegister(handler) {
  this.clear();
  const form = document.createElement("form");
  form.innerHTML = `
    <h1>Student Registration</h1>
    <input name="name" placeholder="Full Name" required />
    <input name="email" type="email" placeholder="Email" required />
    <input name="education" placeholder="Educational Background" required />
    <input name="username" placeholder="Username" required />
    <input id="password" name="password" type="password" placeholder="Password" required />
    <div id="strengthBar" style="height:8px; width:100%; background:#ccc; border-radius:4px; margin-top:4px;"></div>
    <button type="submit">Register</button>
    <div class="feedback" id="regFeedback"></div>
  `;

  const passwordInput = form.querySelector("#password");
  const bar = form.querySelector("#strengthBar");
  passwordInput.addEventListener("input", () => {
    const val = passwordInput.value;
    let score = 0;
    if (val.length >= 8) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    if (score === 0) bar.style.background = "#ccc";
    else if (score === 1) bar.style.background = "red";
    else if (score === 2) bar.style.background = "orange";
    else if (score >= 3) bar.style.background = "green";
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());

    if (typeof handler === "function") {
      // call provided handler and show feedback if it returns a promise/result
      try {
        const res = handler(data);
        if (res && typeof res.then === "function") {
          res.then(msg => this.showMessage("regFeedback", msg || "Registered", "success"))
             .catch(err => this.showMessage("regFeedback", err?.message || "Registration failed", "error"));
        } else {
          this.showMessage("regFeedback", "Registered", "success");
        }
      } catch (err) {
        this.showMessage("regFeedback", err?.message || "Registration failed", "error");
      }
    } else {
      // emit event so controller can pick it up if not wired
      window.dispatchEvent(new CustomEvent("app:register", { detail: data }));
      this.showMessage("regFeedback", "Registration submitted", "success");
    }
  });
  this.app.append(form);
}

  showLogin(handler) {
    this.clear();
    const form = document.createElement("form");
    form.innerHTML = `
      <h1>Login</h1>
      <input name="username" placeholder="Username" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
      <div class="feedback" id="loginFeedback"></div>
    `;
    form.addEventListener("submit", e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());

      if (typeof handler === "function") {
        try {
          const res = handler(data);
          if (res && typeof res.then === "function") {
            res.then(msg => this.showMessage("loginFeedback", msg || "Logged in", "success"))
               .catch(err => this.showMessage("loginFeedback", err?.message || "Login failed", "error"));
          } else {
            this.showMessage("loginFeedback", "Logged in", "success");
          }
        } catch (err) {
          this.showMessage("loginFeedback", err?.message || "Login failed", "error");
        }
      } else {
        window.dispatchEvent(new CustomEvent("app:login", { detail: data }));
        this.showMessage("loginFeedback", "Login submitted", "success");
      }
    });
    this.app.append(form);
  }
}