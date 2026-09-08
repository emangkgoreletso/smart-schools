import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Student {
  id: string;
  name: string;
}

const Payments: React.FC = () => {

  const navigate = useNavigate();

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  /* =========================
  CHECK AUTH + LOAD STUDENTS
  ========================= */

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login?redirect=/payments");
      return;
    }

    // MOCK API CALL
    const mockStudents: Student[] = [
      { id: "1", name: "John Kgoreletso" },
      { id: "2", name: "Sarah Kgoreletso" }
    ];

    setStudents(mockStudents);
    setLoading(false);

  }, [navigate]);

  /* =========================
  AUTO REDIRECT IF 1 CHILD
  ========================= */

  useEffect(() => {

    if (!loading && students.length === 1) {
      navigate(`/parent/payments/${students[0].id}`);
    }

  }, [students, loading, navigate]);

  /* =========================
  SELECT CHILD
  ========================= */

  const handleStudentSelect = (studentId: string) => {
    navigate(`/parent/payments/${studentId}`);
  };

  /* =========================
  UI
  ========================= */

  if (loading) {
    return <div className="p-10">Loading payments...</div>;
  }

  if (students.length === 0) {
    return (
      <div className="p-10">
        <h2 className="text-xl font-bold">
          No students linked to this account
        </h2>
      </div>
    );
  }

  return (
    <div className="p-10 space-y-6">

      <h1 className="text-3xl font-bold text-maroon-700">
        Select Student for Payment
      </h1>

      <div className="grid gap-4 max-w-md">

        {students.map(student => (

          <button
            key={student.id}
            onClick={() => handleStudentSelect(student.id)}
            className="p-4 border rounded hover:bg-gray-100 text-left"
          >
            {student.name}
          </button>

        ))}

      </div>

    </div>
  );
};

export default Payments;