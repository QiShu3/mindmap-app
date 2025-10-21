/**
 * 思维导图应用类型定义
 */

import { Node, Edge } from '@xyflow/react';

/**
 * 思维导图节点类型
 */
export interface MindMapNode extends Node {
  type: 'mindMapNode';
  data: {
    label: string;
    nodeType: 'root' | 'branch' | 'leaf';
    color: string;
    fontSize: number;
    isEditing?: boolean;
  };
}

/**
 * 思维导图边类型
 */
export interface MindMapEdge extends Edge {
  type: 'smoothstep' | 'straight' | 'step';
  animated: boolean;
  style?: {
    stroke: string;
    strokeWidth: number;
  };
}

// 项目数据类型
export interface Project {
  id: string;
  title: string;
  description?: string;
  nodes: MindMapNode[];
  edges: MindMapEdge[];
  createdAt: Date;
  updatedAt: Date;
  thumbnail?: string;
}

// 导出配置类型
export interface ExportConfig {
  format: 'png' | 'pdf' | 'json';
  quality: number;
  width: number;
  height: number;
  backgroundColor: string;
}

// 节点样式配置类型
export interface NodeStyleConfig {
  backgroundColor: string;
  color: string;
  fontSize: number;
}

// 默认节点样式配置
export const defaultNodeStyles: Record<string, NodeStyleConfig> = {
  level0: { backgroundColor: '#3B82F6', color: '#FFFFFF', fontSize: 18 },
  level1: { backgroundColor: '#10B981', color: '#FFFFFF', fontSize: 16 },
  level2: { backgroundColor: '#F59E0B', color: '#FFFFFF', fontSize: 14 },
  level3: { backgroundColor: '#EF4444', color: '#FFFFFF', fontSize: 12 }
};

// 默认导出配置
export const defaultExportConfig: ExportConfig = {
  format: 'png',
  quality: 1.0,
  width: 1920,
  height: 1080,
  backgroundColor: '#FFFFFF'
};

// 工具栏操作类型
export type ToolbarAction = 
  | 'add-node'
  | 'delete-node'
  | 'undo'
  | 'redo'
  | 'zoom-in'
  | 'zoom-out'
  | 'fit-view'
  | 'export';

// 节点创建参数类型
export interface CreateNodeParams {
  parentId?: string;
  position: { x: number; y: number };
  label?: string;
  level?: number;
}

// 应用状态类型
export interface AppState {
  currentProject: Project | null;
  projects: Project[];
  selectedNodeId: string | null;
  isLoading: boolean;
  error: string | null;
}

// 应用操作类型
export type AppAction =
  | { type: 'SET_PROJECTS'; payload: Project[] }
  | { type: 'SET_CURRENT_PROJECT'; payload: Project }
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: Project }
  | { type: 'DELETE_PROJECT'; payload: string }
  | { type: 'SET_SELECTED_NODE'; payload: string | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_ERROR' };