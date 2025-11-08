import { Student } from './Student';

export class StudentSet {
  private students: Student[] = [];

  // Add a new student
  addStudent(name: string, cpf: string, email: string): Student {
    const cleanCPF = cpf.replace(/[.-]/g, '');
    
    // Check if CPF already exists
    if (this.findStudentByCPF(cleanCPF)) {
      throw new Error('Student with this CPF already exists');
    }

    const student = new Student(name, cpf, email);
    this.students.push(student);
    return student;
  }

  // Remove student by CPF
  removeStudent(cpf: string): boolean {
    const cleanCPF = cpf.replace(/[.-]/g, '');
    const index = this.students.findIndex(s => s.getCleanCPF() === cleanCPF);
    
    if (index === -1) {
      return false;
    }

    this.students.splice(index, 1);
    return true;
  }

  // Update student by CPF
  updateStudent(cpf: string, updates: { name?: string; email?: string }): Student {
    const cleanCPF = cpf.replace(/[.-]/g, '');
    const student = this.findStudentByCPF(cleanCPF);
    
    if (!student) {
      throw new Error('Student not found');
    }

    if (updates.name) student.name = updates.name;
    if (updates.email) {
      // Validate email before updating
      new Student(student.name, student.cpf, updates.email);
      student.email = updates.email;
    }

    return student;
  }

  // Find student by CPF
  findStudentByCPF(cpf: string): Student | undefined {
    const cleanCPF = cpf.replace(/[.-]/g, '');
    return this.students.find(s => s.getCleanCPF() === cleanCPF);
  }

  // Get all students
  getAllStudents(): Student[] {
    return [...this.students]; // Return a copy to prevent external modification
  }

  // Get students count
  getCount(): number {
    return this.students.length;
  }
}