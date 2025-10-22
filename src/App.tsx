/**
 * 主应用组件
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { NavigationPage } from './pages/NavigationPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { EditorPage } from './pages/EditorPage';
import MarkdownToMindmap from './pages/MarkdownToMindmap';
import { ApiTestPage } from './pages/ApiTestPage';

/**
 * 主应用组件
 */
function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<NavigationPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/editor/:projectId" element={<EditorPage />} />
            <Route path="/markmap" element={<MarkdownToMindmap />} />
            <Route path="/api-test" element={<ApiTestPage />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
