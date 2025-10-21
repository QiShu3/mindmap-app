/**
 * 应用状态管理 Hook
 */

import { useReducer, useCallback, useMemo } from 'react';
import { Project, AppState, AppAction } from '../types';
import {
  getAllProjects,
  getProject,
  saveProject,
  deleteProject,
  createNewProject,
} from '../utils/storage';

/**
 * 初始状态
 */
const initialState: AppState = {
  currentProject: null,
  projects: [],
  selectedNodeId: null,
  isLoading: false,
  error: null
};

/**
 * 状态 Reducer
 */
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_CURRENT_PROJECT':
      return {
        ...state,
        currentProject: action.payload,
        error: null
      };

    case 'SET_PROJECTS':
      return {
        ...state,
        projects: action.payload,
        error: null
      };

    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [action.payload, ...state.projects],
        error: null
      };

    case 'UPDATE_PROJECT':
      return {
        ...state,
        currentProject: state.currentProject?.id === action.payload.id ? action.payload : state.currentProject,
        projects: state.projects.map(p => 
          p.id === action.payload.id ? action.payload : p
        ),
        error: null
      };

    case 'DELETE_PROJECT':
      return {
        ...state,
        currentProject: state.currentProject?.id === action.payload ? null : state.currentProject,
        projects: state.projects.filter(p => p.id !== action.payload),
        error: null
      };

    case 'SET_SELECTED_NODE':
      return {
        ...state,
        selectedNodeId: action.payload
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
};

/**
 * 应用状态管理 Hook
 */
export const useAppState = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  /**
   * 加载所有项目
   */
  const loadProjects = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const projects = await getAllProjects();
      dispatch({ type: 'SET_PROJECTS', payload: projects });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: '加载项目失败' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [dispatch]);

  /**
   * 加载单个项目
   */
  const loadProject = useCallback(async (projectId: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const project = getProject(projectId);
      if (project) {
        dispatch({ type: 'SET_CURRENT_PROJECT', payload: project });
        return project;
      } else {
        throw new Error('项目不存在');
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: '加载项目失败' });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [dispatch]);

  /**
   * 创建新项目
   */
  const createProject = useCallback(async (title: string): Promise<Project | null> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const project = createNewProject(title);
      saveProject(project);
      dispatch({ type: 'ADD_PROJECT', payload: project });
      dispatch({ type: 'SET_CURRENT_PROJECT', payload: project });
      return project;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: '创建项目失败' });
      return null;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [dispatch]);

  /**
   * 保存当前项目
   */
  const saveCurrentProject = useCallback(async (project: Project) => {
    try {
      saveProject(project);
      dispatch({ type: 'SET_CURRENT_PROJECT', payload: project });
      dispatch({ type: 'UPDATE_PROJECT', payload: project });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: '保存项目失败' });
    }
  }, [dispatch]);

  /**
   * 删除项目
   */
  const deleteProjectById = useCallback(async (projectId: string) => {
    try {
      deleteProject(projectId);
      dispatch({ type: 'DELETE_PROJECT', payload: projectId });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: '删除项目失败' });
    }
  }, [dispatch]);

  /**
   * 设置当前项目
   */
  const setCurrentProject = useCallback((project: Project | null) => {
    dispatch({ type: 'SET_CURRENT_PROJECT', payload: project });
  }, [dispatch]);

  /**
   * 设置选中的节点
   */
  const setSelectedNode = useCallback((nodeId: string | null) => {
    dispatch({ type: 'SET_SELECTED_NODE', payload: nodeId });
  }, [dispatch]);

  /**
   * 清除错误
   */
  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, [dispatch]);

  const actions = useMemo(() => ({
    loadProjects,
    loadProject,
    createProject,
    saveCurrentProject,
    deleteProject: deleteProjectById,
    setCurrentProject,
    setSelectedNode,
    clearError,
  }), [
    loadProjects,
    loadProject,
    createProject,
    saveCurrentProject,
    deleteProjectById,
    setCurrentProject,
    setSelectedNode,
    clearError,
  ]);

  return {
    state,
    actions,
  };
};