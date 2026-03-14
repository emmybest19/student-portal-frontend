import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/api.js";

function AdminResultsUploadPage() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get('/admin/results/students');
        setStudents(res.data.map((s) => ({ id: s._id, name: s.fullName, matric: s.matricNumber, level: s.level })));
      } catch (err) {
        alert(err.response?.data?.message || 'Something went wrong');
      }
    };
    fetchStudents();
  }, []);

  const SEMESTERS = ["1", "2"];

  const [searchQuery, setSearchQuery] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState("1");

  const [courseCode, setCourseCode] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [caScore, setCAScore] = useState("");
  const [examScore, setExamScore] = useState("");

  const [showScoreModal, setShowScoreModal] = useState(false);
  const [error, setError] = useState("");
  const [courses, setCourses] = useState({});
  const [uploadMessage, setUploadMessage] = useState("");

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.matric.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLevel = filterLevel === "all" || student.level === filterLevel;

    return matchesSearch && matchesLevel;
  });

  const currentStudent = selectedStudent
    ? students.find((s) => s.id === selectedStudent)
    : null;

  const getStudentSemesterKey = () => {
    if (!currentStudent) return null;
    return `${currentStudent.matric}_sem${selectedSemester}`;
  };

  const currentSemesterKey = getStudentSemesterKey();

  const studentCourses = currentSemesterKey
    ? courses[currentSemesterKey] || []
    : [];

  const calculateTotal = () => {
    const ca = parseInt(caScore) || 0;
    const exam = parseInt(examScore) || 0;
    return ca + exam;
  };

  const handleSelectStudent = (id) => {
    setSelectedStudent(selectedStudent === id ? null : id);
    setSelectedSemester("1");
    setCourseCode("");
    setCourseTitle("");
    setCAScore("");
    setExamScore("");
  };

  const handleOpenScoreModal = () => {
    setCourseCode("");
    setCourseTitle("");
    setCAScore("");
    setExamScore("");
    setError("");
    setShowScoreModal(true);
  };

  const handleAddCourse = () => {
    setError("");

    if (!courseCode.trim()) {
      setError("Course code required");
      return;
    }

    if (!courseTitle.trim()) {
      setError("Course title required");
      return;
    }

    if (calculateTotal() > 100) {
      setError("Total score cannot exceed 100");
      return;
    }

    const key = getStudentSemesterKey();
    if (!key) return;

    const newCourse = {
      id: `${courseCode}_${Date.now()}`,
      courseCode: courseCode.toUpperCase(),
      courseTitle,
      caScore: parseInt(caScore),
      examScore: parseInt(examScore),
      total: calculateTotal(),
    };

    setCourses((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), newCourse],
    }));

    setUploadMessage(`${courseCode.toUpperCase()} added`);
    setTimeout(() => setUploadMessage(""), 2000);

    setShowScoreModal(false);
  };

  const handleRemoveCourse = (id) => {
    const key = getStudentSemesterKey();
    if (!key) return;

    setCourses((prev) => ({
      ...prev,
      [key]: prev[key].filter((c) => c.id !== id),
    }));
  };

  const handleSubmitAllCourses = async () => {
    if (!currentStudent || studentCourses.length === 0) {
      alert("Add at least one course");
      return;
    }

    try {
      await api.post('/admin/results/upload', {
        studentId: currentStudent.id,
        level: currentStudent.level,
        semester: selectedSemester,
        courses: studentCourses.map((c) => ({
          courseCode: c.courseCode,
          courseName: c.courseTitle,
          creditLoad: 3,
          caScore: c.caScore,
          examScore: c.examScore,
        })),
      });

      setUploadMessage("Courses submitted successfully");

      setTimeout(() => {
        setUploadMessage("");
        setSelectedStudent(null);
        setCourses({});
        setSearchQuery("");
        setFilterLevel("all");
      }, 2000);
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold">Results Upload & Management</h1>
      </motion.div>

      {uploadMessage && (
        <div
          className="p-4 rounded-lg"
          style={{
            backgroundColor: "rgba(34, 197, 94, 0.1)",
            color: "#22c55e",
          }}
        >
          {uploadMessage}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="Search student"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded"
        />

        <select
          value={filterLevel}
          onChange={(e) => setFilterLevel(e.target.value)}
          className="border p-2 rounded "
        >
          <option value="all" className="text-black">All Levels</option>
          <option value="200" className="text-black">200</option>
          <option value="300" className="text-black">300</option>
          <option value="400" className="text-black">400</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredStudents.map((student) => (
          <div
            key={student.id}
            onClick={() => handleSelectStudent(student.id)}
            className="border rounded p-4 cursor-pointer"
          >
            <p className="font-bold">{student.name}</p>
            <p className="text-sm">{student.matric}</p>
            <p className="text-sm">Level {student.level}</p>
          </div>
        ))}
      </div>

      {currentStudent && (
        <div className="border rounded p-6 space-y-4">
          <h2 className="font-bold">{currentStudent.name}</h2>

          <button
            onClick={handleOpenScoreModal}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add Course
          </button>

          {studentCourses.map((course) => (
            <div
              key={course.id}
              className="flex justify-between border p-2 rounded"
            >
              <span>{course.courseCode}</span>
              <span>{course.total}</span>
              <button
                onClick={() => handleRemoveCourse(course.id)}
                className="text-red-600"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            onClick={handleSubmitAllCourses}
            className="bg-green-700 text-white px-4 py-2 rounded w-full"
          >
            Submit Courses
          </button>
        </div>
      )}

      <AnimatePresence>
        {showScoreModal && (
          <motion.div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              color: "#22c55e",
            }}
            className="fixed inset-0 bg-black/50 text-black flex items-center justify-center"
          >
            <div className="bg-white p-6 rounded space-y-3 w-96" style={{
              backgroundColor: "rgba(0, 0, 0)",
              color: "#fff",
            }}>
              <input
                placeholder="Course Code"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                className="border p-2 w-full rounded"
              />

              <input
                placeholder="Course Title"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                className="border p-2 w-full rounded"
              />

              <input
                type="number"
                placeholder="CA"
                value={caScore}
                onChange={(e) => setCAScore(e.target.value)}
                className="border p-2 w-full rounded"
              />

              <input
                type="number"
                placeholder="Exam"
                value={examScore}
                onChange={(e) => setExamScore(e.target.value)}
                className="border p-2 w-full rounded"
              />

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <button
                onClick={handleAddCourse}
                className="bg-green-600 text-white px-4 py-2 rounded w-full"
              >
                Add Course
              </button>

              <button
                onClick={() => setShowScoreModal(false)}
                className="w-full border rounded py-2"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default AdminResultsUploadPage;
