class StudentController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.setupNav();
    this.route();
    window.addEventListener("hashchange", () => this.route());
    document.getElementById("year").textContent = new Date().getFullYear();
  }

  setupNav() {
    document.querySelectorAll("nav a").forEach(link => {
      link.addEventListener("click", () => {
        document.querySelectorAll("nav a").forEach(a => a.classList.remove("active"));
        link.classList.add("active");
      });
    });
  }

  route() {
    const hash = location.hash || "#home";
    if (hash === "#home") this.view.showHome();
    if (hash === "#about") this.view.showAbout();
    if (hash === "#register") this.view.showRegister(this.handleRegister);
    if (hash === "#login") this.view.showLogin(this.handleLogin);
  }

  handleRegister = (data) => {
    try {
      this.model.addStudent(data);
      this.view.showMessage("regFeedback", "Registration successful!", "success");
    } catch (err) {
      this.view.showMessage("regFeedback", err.message, "error");
    }
  };

  handleLogin = (data) => {
    try {
      const student = this.model.login(data.username, data.password);
      this.view.showMessage("loginFeedback", `Welcome, ${student.name}!`, "success");
    } catch (err) {
      this.view.showMessage("loginFeedback", err.message, "error");
    }
  };
}