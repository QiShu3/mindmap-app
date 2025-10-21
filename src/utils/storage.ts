/**
 * 本地存储 API 实现
 */

import { Project, MindMapNode, defaultNodeStyles } from '../types';

/**
 * 生成唯一 ID
 */
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * 保存项目到本地存储
 */
export const saveProject = (project: Project): void => {
  try {
    const projectData = {
      ...project,
      createdAt: project.createdAt.toISOString(),
      updatedAt: project.updatedAt.toISOString()
    };
    localStorage.setItem(`mindmap_${project.id}`, JSON.stringify(projectData));
  } catch (error) {
    console.error('保存项目失败:', error);
    throw new Error('保存项目失败');
  }
};

/**
 * 从本地存储获取项目
 */
export const getProject = (projectId: string): Project | null => {
  try {
    const data = localStorage.getItem(`mindmap_${projectId}`);
    if (!data) return null;
    
    const projectData = JSON.parse(data);
    return {
      ...projectData,
      createdAt: new Date(projectData.createdAt),
      updatedAt: new Date(projectData.updatedAt)
    };
  } catch (error) {
    console.error('获取项目失败:', error);
    return null;
  }
};

/**
 * 获取所有项目
 */
export const getAllProjects = (): Project[] => {
  try {
    const projects: Project[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('mindmap_')) {
        const data = localStorage.getItem(key);
        if (data) {
          const projectData = JSON.parse(data);
          projects.push({
            ...projectData,
            createdAt: new Date(projectData.createdAt),
            updatedAt: new Date(projectData.updatedAt)
          });
        }
      }
    }
    return projects.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  } catch (error) {
    console.error('获取项目列表失败:', error);
    return [];
  }
};

/**
 * 删除项目
 */
export const deleteProject = (projectId: string): void => {
  try {
    localStorage.removeItem(`mindmap_${projectId}`);
  } catch (error) {
    console.error('删除项目失败:', error);
    throw new Error('删除项目失败');
  }
};

/**
 * 创建新项目
 */
export const createNewProject = (title?: string): Project => {
  const projectId = generateId();
  const rootNodeId = generateId();
  
  const rootNode: MindMapNode = {
    id: rootNodeId,
    type: 'mindMapNode',
    position: { x: 400, y: 100 },
    data: {
      label: '中心主题',
      nodeType: 'root',
      color: defaultNodeStyles.level0.color,
      fontSize: defaultNodeStyles.level0.fontSize
    }
  };

  const project: Project = {
    id: projectId,
    title: title || '新建思维导图',
    description: '',
    nodes: [rootNode],
    edges: [],
    createdAt: new Date(),
    updatedAt: new Date()
  };

  return project;
};

/**
 * 复制项目
 */
export const duplicateProject = (originalProject: Project): Project => {
  const newProject: Project = {
    ...originalProject,
    id: generateId(),
    title: `${originalProject.title} (副本)`,
    nodes: originalProject.nodes.map(node => ({
      ...node,
      id: generateId()
    })),
    edges: [], // 重新生成边连接
    createdAt: new Date(),
    updatedAt: new Date()
  };

  return newProject;
};

/**
 * 更新项目
 */
export const updateProject = (project: Project): void => {
  const updatedProject = {
    ...project,
    updatedAt: new Date()
  };
  saveProject(updatedProject);
};

/**
 * 安全的 Base64 编码函数，支持 Unicode 字符
 */
const safeBase64Encode = (str: string): string => {
  try {
    // 使用 TextEncoder 将字符串转换为 UTF-8 字节数组
    const encoder = new TextEncoder();
    const bytes = encoder.encode(str);
    
    // 将字节数组转换为二进制字符串
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    
    // 使用 btoa 编码二进制字符串
    return btoa(binary);
  } catch (error) {
    console.error('Base64 encoding failed:', error);
    // 降级方案：使用 URL 编码
    return encodeURIComponent(str);
  }
};

/**
 * 生成项目缩略图
 */
export const generateThumbnail = (project: Project): string => {
  // 这里可以实现更复杂的缩略图生成逻辑
  // 目前返回一个简单的 SVG 字符串
  const nodeCount = project.nodes.length;
  const edgeCount = project.edges.length;
  
  const svgContent = `
    <svg width="200" height="120" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="120" fill="#f8fafc"/>
      <circle cx="100" cy="60" r="20" fill="#3b82f6"/>
      <text x="100" y="90" text-anchor="middle" font-size="12" fill="#64748b">
        ${nodeCount} 节点 ${edgeCount} 连接
      </text>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${safeBase64Encode(svgContent)}`;
};

/**
 * 导出项目数据
 */
export const exportProjectData = (project: Project): string => {
  return JSON.stringify(project, null, 2);
};

/**
 * 导入项目数据
 */
export const importProjectData = (jsonData: string): Project => {
  try {
    const data = JSON.parse(jsonData);
    const project: Project = {
      ...data,
      id: generateId(), // 生成新的 ID 避免冲突
      createdAt: new Date(data.createdAt),
      updatedAt: new Date()
    };
    return project;
  } catch (error) {
    console.error('导入项目数据失败:', error);
    throw new Error('导入项目数据失败，请检查文件格式');
  }
};