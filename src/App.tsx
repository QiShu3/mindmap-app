/**
 * 主应用组件
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { ProjectsPage } from './pages/ProjectsPage';
import { EditorPage } from './pages/EditorPage';
import MarkdownToMindmap from './pages/MarkdownToMindmap';

/**
 * 主应用组件
 */
function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<ProjectsPage />} />
            <Route path="/editor/:projectId" element={<EditorPage />} />
            <Route path="/markmap" element={<MarkdownToMindmap />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
