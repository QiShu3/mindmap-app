/**
 * 项目管理页面
 */

import React, { useEffect, useState } from 'react';
import { Plus, Search, Grid, List, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { ProjectCard } from '../components/ProjectCard';
import { Project } from '../types';
import { duplicateProject, saveProject } from '../utils/storage';

/**
 * 项目管理页面组件
 */
export const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, actions } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState('');

  // 加载项目列表
  useEffect(() => {
    actions.loadProjects();
  }, [actions]);

  /**
   * 过滤项目
   */
  const filteredProjects = state.projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (project.description && project.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  /**
   * 创建新项目
   */
  const handleCreateProject = async () => {
    if (!newProjectTitle.trim()) return;
    
    console.debug('创建项目:', newProjectTitle.trim());
    const project = await actions.createProject(newProjectTitle.trim());
    console.debug('项目创建结果:', project);
    if (project) {
      setShowCreateDialog(false);
      setNewProjectTitle('');
      navigate(`/editor/${project.id}`);
    }
  };

  /**
   * 打开项目
   */
  const handleOpenProject = (project: Project) => {
    actions.setCurrentProject(project);
    navigate(`/editor/${project.id}`);
  };

  /**
   * 删除项目
   */
  const handleDeleteProject = async (projectId: string) => {
    if (window.confirm('确定要删除这个项目吗？此操作无法撤销。')) {
      await actions.deleteProject(projectId);
    }
  };

  /**
   * 复制项目
   */
  const handleDuplicateProject = async (project: Project) => {
    try {
      const newProject = duplicateProject(project);
      saveProject(newProject);
      await actions.loadProjects(); // 重新加载项目列表
    } catch (error) {
      console.error('复制项目失败:', error);
    }
  };

  /**
   * 重命名项目
   */
  const handleRenameProject = (project: Project) => {
    const newTitle = window.prompt('请输入新的项目名称:', project.title);
    if (newTitle && newTitle.trim() !== project.title) {
      const updatedProject = {
        ...project,
        title: newTitle.trim(),
        updatedAt: new Date()
      };
      actions.saveCurrentProject(updatedProject);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* 头部 */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-6 py-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">思</span>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                思维导图
              </h1>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="搜索项目..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-11 pr-4 py-3 w-80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all duration-200 hover:bg-white/90"
              />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/markmap')}
              className="flex items-center px-4 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl hover:from-green-600 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <FileText className="w-5 h-5 mr-2" />
              Markdown 转思维导图
            </button>
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="p-3 text-gray-600 hover:text-gray-900 hover:bg-white/70 rounded-xl transition-all duration-200 backdrop-blur-sm"
            >
              {viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setShowCreateDialog(true)}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus className="w-5 h-5 mr-2" />
              新建项目
            </button>
          </div>
        </div>
      </header>

      {/* 主内容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {state.isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">加载中...</div>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-4">
              {searchTerm ? '没有找到匹配的项目' : '还没有任何项目'}
            </div>
            {!searchTerm && (
              <button
                onClick={() => setShowCreateDialog(true)}
                className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                <Plus className="w-5 h-5 mr-2" />
                创建第一个项目
              </button>
            )}
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4'
          }>
            {filteredProjects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={handleOpenProject}
                onDelete={handleDeleteProject}
                onDuplicate={handleDuplicateProject}
                onRename={handleRenameProject}
              />
            ))}
          </div>
        )}
      </main>

      {/* 创建项目对话框 */}
      {showCreateDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 w-full max-w-md shadow-2xl border border-gray-200/50 transform transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                创建新项目
              </h2>
            </div>
            
            <div className="mb-6">
              <label htmlFor="project-title" className="block text-sm font-semibold text-gray-700 mb-3">
                项目名称
              </label>
              <input
                id="project-title"
                type="text"
                value={newProjectTitle}
                onChange={(e) => setNewProjectTitle(e.target.value)}
                placeholder="输入项目名称..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 backdrop-blur-sm transition-all duration-200 text-gray-900 placeholder-gray-500"
                autoFocus
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleCreateProject();
                  }
                }}
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowCreateDialog(false);
                  setNewProjectTitle('');
                }}
                className="px-6 py-3 text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
              >
                取消
              </button>
              <button
                onClick={handleCreateProject}
                disabled={!newProjectTitle.trim()}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
              >
                创建
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 错误提示 */}
      {state.error && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg">
          {state.error}
          <button
            onClick={actions.clearError}
            className="ml-2 text-white hover:text-gray-200"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};