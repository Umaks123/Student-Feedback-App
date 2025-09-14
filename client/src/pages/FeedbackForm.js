import { useState, useEffect } from 'react';
import axios from 'axios';

function FeedbackForm() {
  const [course, setCourse] = useState('');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('https://possppole-backend.onrender.com/api/courses', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setCourses(res.data));
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('https://possppole-backend.onrender.com/api/feedback', {
      course, rating, message
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert('Feedback submitted!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={course} onChange={e => setCourse(e.target.value)} required>
        <option value="">Select Course</option>
        {courses.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
      </select>
      <input type="number" min="1" max="5" value={rating} onChange={e => setRating(e.target.value)} required />
      <textarea placeholder="Message" value={message} onChange={e => setMessage(e.target.value)} required />
      <button type="submit">Submit Feedback</button>
    </form>
  );
}

export default FeedbackForm;