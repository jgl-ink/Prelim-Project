class StudentModel {
  constructor() {
    this.students = [];
    this.currentUser = null;
  }

  addStudent(student) {
    if (this.students.find(s => s.username === student.username)) {
      throw new Error("Username already taken");
    }
    this.students.push(student);
  }

  login(username, password) {
    const student = this.students.find(
      s => s.username === username && s.password === password
    );
    if (!student) throw new Error("Invalid username or password");
    this.currentUser = student;
    return student;
  }
}