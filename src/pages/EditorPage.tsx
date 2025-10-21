/**
 * 思维导图编辑器页面
 */

import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  NodeChange,
  EdgeChange,
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useApp } from '../contexts/AppContext';
import { MindMapNode, MindMapEdge } from '../types';
import { Toolbar } from '../components/Toolbar';
import { Sidebar } from '../components/Sidebar';
import CustomNode from '../components/CustomNode';
import { ArrowLeft, Save } from 'lucide-react';

/**
 * 思维导图编辑器页面组件
 */
export const EditorPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { state, actions } = useApp();
  
  const [nodes, setNodes, onNodesChange] = useNodesState<MindMapNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<MindMapEdge>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAutoSaving, setIsAutoSaving] = useState(false);

  // 定义节点类型
  const nodeTypes = useMemo(() => ({
    mindMapNode: CustomNode as any,
  }), []);



  /**
   * 自动保存
   */
  const autoSave = useCallback(async () => {
    if (!state.currentProject) return;
    
    setIsAutoSaving(true);
    try {
      const updatedProject = {
        ...state.currentProject,
        nodes,
        edges,
        updatedAt: new Date(),
      };
      await actions.saveCurrentProject(updatedProject);
    } catch (error) {
      console.error('自动保存失败:', error);
    } finally {
      setIsAutoSaving(false);
    }
  }, [state.currentProject, nodes, edges, actions]);

  /**
   * 更新节点数据
   */
  const updateNodeData = useCallback(
    (nodeId: string, data: Partial<MindMapNode['data']>) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, ...data } }
            : node
        )
      );
      // 触发自动保存
      setTimeout(() => {
        autoSave();
      }, 100);
    },
    [setNodes, autoSave]
  );

  /**
   * 导出为 JSON
   */
  const exportToJSON = useCallback(() => {
    if (!state.currentProject) return;
    
    const data = {
      project: state.currentProject,
      nodes,
      edges,
      exportedAt: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${state.currentProject.title}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [state.currentProject, nodes, edges]);

  /**
   * 导出为 PNG
   */
  const exportToPNG = useCallback(() => {
    if (!state.currentProject) return;
    
    // 获取 ReactFlow 实例的 DOM 元素
    const reactFlowElement = document.querySelector('.react-flow__viewport');
    if (!reactFlowElement) return;
    
    // 使用 html2canvas 库来截图（需要安装）
    // 这里先用简单的方法提示用户
    alert('PNG 导出功能需要安装 html2canvas 库。当前版本暂不支持，请使用 JSON 导出。');
  }, [state.currentProject]);

  // 加载项目数据
  useEffect(() => {
    if (projectId) {
      const loadProject = async () => {
        console.debug('加载项目:', projectId);
        const project = await actions.loadProject(projectId);
        console.debug('项目加载结果:', project);
        if (project) {
          setNodes(project.nodes || []);
          setEdges(project.edges || []);
        } else {
          // 项目不存在，返回项目列表
          navigate('/');
        }
      };
      loadProject();
    }
  }, [projectId, actions, navigate]);

  // 添加事件监听器
  useEffect(() => {
    /**
     * 处理节点更新事件
     */
    const handleUpdateNode = (event: CustomEvent) => {
      const { nodeId, data } = event.detail;
      updateNodeData(nodeId, data);
    };

    /**
     * 处理导出事件
     */
    const handleExportMindMap = (event: CustomEvent) => {
      const { format } = event.detail;
      if (format === 'json') {
        exportToJSON();
      } else if (format === 'png') {
        exportToPNG();
      }
    };

    /**
     * 处理导入事件
     */
    const handleImportMindMap = (event: CustomEvent) => {
      const { data } = event.detail;
      if (data.nodes && data.edges) {
        setNodes(data.nodes);
        setEdges(data.edges);
      }
    };

    /**
     * 处理复制节点事件
     */
    const handleDuplicateNode = (event: CustomEvent) => {
      const { nodeId } = event.detail;
      const node = nodes.find(n => n.id === nodeId);
      if (node) {
        const newNode = {
          ...node,
          id: `node-${Date.now()}`,
          position: {
            x: node.position.x + 50,
            y: node.position.y + 50,
          },
          data: {
            ...node.data,
            label: `${node.data.label} (副本)`,
          },
        };
        setNodes(nds => [...nds, newNode]);
      }
    };

    /**
     * 处理删除节点事件
     */
    const handleDeleteNode = (event: CustomEvent) => {
      const { nodeId } = event.detail;
      setNodes(nds => nds.filter(n => n.id !== nodeId));
      setEdges(eds => eds.filter(e => e.source !== nodeId && e.target !== nodeId));
    };

    // 添加事件监听器
    window.addEventListener('updateNode', handleUpdateNode as EventListener);
    window.addEventListener('exportMindMap', handleExportMindMap as EventListener);
    window.addEventListener('importMindMap', handleImportMindMap as EventListener);
    window.addEventListener('duplicateNode', handleDuplicateNode as EventListener);
    window.addEventListener('deleteNode', handleDeleteNode as EventListener);

    // 清理事件监听器
    return () => {
      window.removeEventListener('updateNode', handleUpdateNode as EventListener);
      window.removeEventListener('exportMindMap', handleExportMindMap as EventListener);
      window.removeEventListener('importMindMap', handleImportMindMap as EventListener);
      window.removeEventListener('duplicateNode', handleDuplicateNode as EventListener);
      window.removeEventListener('deleteNode', handleDeleteNode as EventListener);
    };
  }, [nodes, updateNodeData, setNodes, setEdges, exportToJSON, exportToPNG]);

  /**
   * 处理连接创建
   */
  const onConnect = useCallback(
    (params: Connection) => {
      const edge: MindMapEdge = {
        ...params,
        id: `edge-${Date.now()}`,
        type: 'smoothstep',
        animated: false,
        style: { stroke: '#94a3b8', strokeWidth: 2 },
      };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges]
  );

  /**
   * 处理节点变化
   */
  const handleNodesChange = useCallback(
    (changes: any[]) => {
      onNodesChange(changes);
      // 自动保存
      autoSave();
    },
    [onNodesChange, autoSave]
  );

  /**
   * 处理边变化
   */
  const handleEdgesChange = useCallback(
    (changes: any[]) => {
      onEdgesChange(changes);
      // 自动保存
      autoSave();
    },
    [onEdgesChange, autoSave]
  );

  /**
   * 手动保存
   */
  const handleSave = useCallback(async () => {
    if (!state.currentProject) return;
    
    try {
      const updatedProject = {
        ...state.currentProject,
        nodes,
        edges,
        updatedAt: new Date(),
      };
      await actions.saveCurrentProject(updatedProject);
    } catch (error) {
      console.error('保存失败:', error);
    }
  }, [state.currentProject, nodes, edges, actions]);

  /**
   * 添加新节点
   */
  const addNode = useCallback((type: 'root' | 'branch' | 'leaf') => {
    const newNode: MindMapNode = {
      id: `node-${Date.now()}`,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      type: 'mindMapNode',
      data: {
        label: `新${type === 'root' ? '根' : type === 'branch' ? '分支' : '叶子'}节点`,
        nodeType: type,
        color: type === 'root' ? '#3b82f6' : type === 'branch' ? '#10b981' : '#f59e0b',
        fontSize: type === 'root' ? 18 : type === 'branch' ? 16 : 14,
      },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [setNodes]);

  /**
   * 删除选中的节点和边
   */
  const deleteSelected = useCallback(() => {
    setNodes((nds) => nds.filter((node) => !(node as any).selected));
    setEdges((eds) => eds.filter((edge) => !(edge as any).selected));
  }, [setNodes, setEdges]);

  if (!state.currentProject) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500">加载中...</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* 顶部工具栏 */}
      <div className="h-20 bg-white/80 backdrop-blur-sm border-b border-gray-200/50 flex items-center justify-between px-8 shadow-sm">
        <div className="flex items-center space-x-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center px-4 py-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
            返回
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">思</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {state.currentProject?.title || '未命名项目'}
            </h1>
          </div>
          {isAutoSaving && (
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>自动保存中...</span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => {
              console.debug('测试导出 JSON');
              exportToJSON();
            }}
            className="flex items-center px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            测试导出
          </button>
          <button
            onClick={handleSave}
            className="flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Save className="w-4 h-4 mr-2" />
            保存
          </button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* 工具栏 */}
        <Toolbar
          onAddNode={addNode}
          onDeleteSelected={deleteSelected}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />

        {/* 主编辑区域 */}
        <div className="flex-1 relative">
          <ReactFlowProvider>
            <ReactFlow
              nodes={nodes as any}
              edges={edges as any}
              onNodesChange={handleNodesChange}
              onEdgesChange={handleEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              fitView
              attributionPosition="bottom-left"
              className="bg-gray-50"
            >
              <Background color="#e5e7eb" gap={20} />
              <Controls />
              <MiniMap
                nodeColor={(node) => {
                  const nodeData = node.data as MindMapNode['data'];
                  return nodeData.color || '#94a3b8';
                }}
                className="bg-white border border-gray-200"
              />
            </ReactFlow>
          </ReactFlowProvider>
        </div>

        {/* 侧边栏 */}
        {isSidebarOpen && (
          <Sidebar
            selectedNode={nodes.find((node) => (node as any).selected)}
            onUpdateNode={updateNodeData}
            onClose={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
};