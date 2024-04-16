import React, { useState } from 'react';
import axios from 'axios';
import './QuestionAnswerPage.css'; // Import CSS file

const QuestionAnswerPage = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/question-answer', { question });
      setAnswer(response.data.answer);
    } catch (error) {
      console.error('Error fetching answer:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  return (
    <div className="container">
      <h1 className="title">Please Ask your query</h1>
      <form className="form-group" onSubmit={handleSubmit}>
        <input type="text" value={question} onChange={handleQuestionChange} className="input" />
        <button type="submit" disabled={!question || loading} className="button">
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
      {answer && <p className="answer">Answer: {answer}</p>}
    </div>
  );
};

export default QuestionAnswerPage;