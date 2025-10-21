/**
 * 应用上下文
 */

import React, { createContext, useContext, ReactNode } from 'react';
import { useAppState } from '../hooks/useAppState';
import { AppState, Project } from '../types';

interface AppContextType {
  state: AppState;
  actions: {
    loadProjects: () => Promise<void>;
    loadProject: (projectId: string) => Promise<Project | null>;
    createProject: (title?: string) => Promise<Project | null>;
    saveCurrentProject: (project: Project) => Promise<void>;
    deleteProject: (projectId: string) => Promise<void>;
    setCurrentProject: (project: Project | null) => void;
    setSelectedNode: (nodeId: string | null) => void;
    clearError: () => void;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

/**
 * 应用上下文提供者
 */
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const { state, actions } = useAppState();

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
};

/**
 * 使用应用上下文的 Hook
 */
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};