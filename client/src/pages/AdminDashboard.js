import { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [students, setStudents] = useState([]);
  const [trends, setTrends] = useState([]);
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ name: '', description: '' });
  const token = localStorage.getItem('token');

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };

    axios.get('https://possppole-backend.onrender.com/api/admin/stats', { headers })
      .then(res => setStats(res.data));

    axios.get('https://possppole-backend.onrender.com/api/admin/students', { headers })
      .then(res => setStudents(res.data));

    axios.get('https://possppole-backend.onrender.com/api/admin/trends', { headers })
      .then(res => setTrends(res.data));

    axios.get('https://possppole-backend.onrender.com/api/courses', { headers })
      .then(res => setCourses(res.data));
  }, [token]);

  const createCourse = () => {
    axios.post('https://possppole-backend.onrender.com/api/courses', newCourse, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setCourses(prev => [...prev, res.data]);
      setNewCourse({ name: '', description: '' });
    });
  };

  const toggleStudent = id => {
    axios.put(`https://possppole-backend.onrender.com/api/admin/students/${id}/toggle`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      setStudents(prev =>
        prev.map(s => s._id === id ? { ...s, isActive: !s.isActive } : s)
      );
    });
  };

  const deleteStudent = id => {
    axios.delete(`https://possppole-backend.onrender.com/api/admin/students/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      setStudents(prev => prev.filter(s => s._id !== id));
    });
  };

  const deleteCourse = id => {
    axios.delete(`https://possppole-backend.onrender.com/api/courses/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      setCourses(prev => prev.filter(c => c._id !== id));
    });
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Total Feedback: {stats.feedbackCount}</p>
      <p>Total Students: {stats.studentCount}</p>

      <h3>Feedback Trends</h3>
      <ul>
        {trends.map(t => (
          <li key={t._id}>
            {t._id}: {t.avgRating.toFixed(2)} stars ({t.count} entries)
          </li>
        ))}
      </ul>

      <h3>Student Management</h3>
      <ul>
        {students.map(s => (
          <li key={s._id}>
            {s.name} ({s.email}) - {s.isActive ? 'Active' : 'Blocked'}
            <button onClick={() => toggleStudent(s._id)}>Toggle</button>
            <button onClick={() => deleteStudent(s._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h3>Course Management</h3>
      <input
        placeholder="Course name"
        value={newCourse.name}
        onChange={e => setNewCourse({ ...newCourse, name: e.target.value })}
      />
      <input
        placeholder="Description"
        value={newCourse.description}
        onChange={e => setNewCourse({ ...newCourse, description: e.target.value })}
      />
      <button onClick={createCourse}>Add Course</button>

      <ul>
        {courses.map(c => (
          <li key={c._id}>
            {c.name} - {c.description}
            <button onClick={() => deleteCourse(c._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;