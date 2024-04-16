import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import FileUploadPage from './components/FileUploadPage';
import QuestionAnswerPage from './components/QuestionAnswerPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<FileUploadPage />} />
        <Route path="/question-answer" element={<QuestionAnswerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
