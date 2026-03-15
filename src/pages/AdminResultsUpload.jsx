import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function AdminResultsUploadPage() {
  const STUDENTS = [
    { id: 1, name: "Adaeze Nwachukwu", matric: "CVE/21/001", level: "300" },
    { id: 2, name: "John Ibrahim", matric: "CVE/20/104", level: "400" },
    { id: 3, name: "Chioma Okafor", matric: "CVE/22/045", level: "200" },
    { id: 4, name: "Emeka Nwosu", matric: "CVE/21/055", level: "300" },
    { id: 5, name: "Zainab Mohammed", matric: "CVE/22/078", level: "200" },
    { id: 6, name: "Samuel Okoro", matric: "CVE/20/089", level: "400" },
    { id: 7, name: "Grace Okafor", matric: "CVE/21/023", level: "300" },
    { id: 8, name: "Michael Chukwu", matric: "CVE/22/034", level: "200" },
  ];

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

  const filteredStudents = STUDENTS.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.matric.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLevel = filterLevel === "all" || student.level === filterLevel;

    return matchesSearch && matchesLevel;
  });

  const currentStudent = selectedStudent
    ? STUDENTS.find((s) => s.id === selectedStudent)
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

  const handleSubmitAllCourses = () => {
    if (!currentStudent || studentCourses.length === 0) {
      alert("Add at least one course");
      return;
    }

    const dataToSubmit = {
      studentMatric: currentStudent.matric,
      semester: selectedSemester,
      courses: studentCourses,
    };

    console.log("Send to backend:", dataToSubmit);

    setUploadMessage("Courses submitted successfully");

    setTimeout(() => {
      setUploadMessage("");
      setSelectedStudent(null);
      setCourses({});
      setSearchQuery("");
      setFilterLevel("all");
    }, 2000);
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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="p-4 rounded-lg"
          style={{
            backgroundColor: "rgba(34, 197, 94, 0.1)",
            color: "#22c55e",
          }}
        >
          {uploadMessage}
        </motion.div>
      )}

      <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="Search student"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--border-color)',
            color: 'var(--text-primary)',
          }}
          className="border p-2 rounded transition-colors duration-200"
        />

        <select
          value={filterLevel}
          onChange={(e) => setFilterLevel(e.target.value)}
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--border-color)',
            color: 'var(--text-primary)',
          }}
          className="border p-2 rounded transition-colors duration-200"
        >
          <option value="all">All Levels</option>
          <option value="200">200</option>
          <option value="300">300</option>
          <option value="400">400</option>
        </select>
      </motion.div>

      <motion.div variants={containerVariants} className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredStudents.map((student) => (
          <motion.div
            key={student.id}
            onClick={() => handleSelectStudent(student.id)}
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            style={{
              backgroundColor: 'var(--card-bg)',
              borderColor: selectedStudent === student.id ? 'var(--color-primary)' : 'var(--border-color)',
              borderWidth: '2px',
            }}
            className="rounded p-4 cursor-pointer transition-colors duration-200"
          >
            <p className="font-bold" style={{ color: 'var(--text-primary)' }}>{student.name}</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{student.matric}</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Level {student.level}</p>
          </motion.div>
        ))}
      </motion.div>

      {currentStudent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--border-color)',
          }}
          className="border rounded p-6 space-y-4"
        >
          <h2 className="font-bold" style={{ color: 'var(--text-primary)' }}>{currentStudent.name}</h2>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenScoreModal}
            className="text-white px-4 py-2 rounded transition-colors duration-200"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            Add Course
          </motion.button>

          {studentCourses.map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              whileHover={{ x: 5 }}
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border-color)',
              }}
              className="flex justify-between border p-2 rounded transition-colors duration-200"
            >
              <span style={{ color: 'var(--text-primary)' }}>{course.courseCode}</span>
              <span style={{ color: 'var(--text-primary)' }}>{course.total}</span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleRemoveCourse(course.id)}
                style={{ color: 'var(--error)' }}
              >
                Remove
              </motion.button>
            </motion.div>
          ))}

          <button
            onClick={handleSubmitAllCourses}
            className="bg-green-700 text-white px-4 py-2 rounded w-full"
          >
            Submit Courses
          </button>
        </motion.div>
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
