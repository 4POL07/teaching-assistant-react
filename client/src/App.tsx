import React, { useState, useEffect } from 'react';
import { Student } from './types/Student';
import { studentService } from './services/StudentService';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import './App.css';

const App: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  // Load students on component mount
  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      setError('');
      const studentsData = await studentService.getAllStudents();
      setStudents(studentsData);
    } catch (err) {
      setError('Failed to load students. Please try again.');
      console.error('Error loading students:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = async (studentData: { name: string; cpf: string; email: string }) => {
    try {
      setError('');
      await studentService.createStudent(studentData);
      await loadStudents(); // Reload the list
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleUpdateStudent = async (cpf: string, updates: { name?: string; email?: string }) => {
    try {
      setError('');
      await studentService.updateStudent(cpf, updates);
      setEditingStudent(null);
      await loadStudents(); // Reload the list
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleDeleteStudent = async (cpf: string) => {
    try {
      setError('');
      await studentService.deleteStudent(cpf);
      await loadStudents(); // Reload the list
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleEditClick = (student: Student) => {
    setEditingStudent(student);
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  const handleFormSubmit = async (studentData: { name: string; cpf: string; email: string }) => {
    if (editingStudent) {
      // Update existing student
      await handleUpdateStudent(editingStudent.cpf, {
        name: studentData.name,
        email: studentData.email
      });
    } else {
      // Add new student
      await handleAddStudent(studentData);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Teaching Assistant React</h1>
        <p>Managing ESS student information</p>
      </header>

      <main className="App-main">
        {error && (
          <div className="error-message">
            <strong>Error:</strong> {error}
          </div>
        )}

        <StudentForm
          onSubmit={handleFormSubmit}
          onCancel={editingStudent ? handleCancelEdit : undefined}
          editingStudent={editingStudent}
        />

        <StudentList
          students={students}
          onEdit={handleEditClick}
          onDelete={handleDeleteStudent}
          loading={loading}
        />
      </main>
    </div>
  );
};

export default App;