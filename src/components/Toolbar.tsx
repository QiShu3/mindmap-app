/**
 * 编辑器工具栏组件
 */

import React from 'react';
import {
  Plus,
  Trash2,
  Download,
  Upload,
  Settings,
  PanelRightOpen,
  PanelRightClose,
  Circle,
  Square,
  Triangle,
} from 'lucide-react';

interface ToolbarProps {
  onAddNode: (type: 'root' | 'branch' | 'leaf') => void;
  onDeleteSelected: () => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

/**
 * 工具栏组件
 */
export const Toolbar: React.FC<ToolbarProps> = ({
  onAddNode,
  onDeleteSelected,
  onToggleSidebar,
  isSidebarOpen,
}) => {
  /**
   * 导出为 JSON
   */
  const handleExportJSON = () => {
    // 触发导出事件
    const event = new CustomEvent('exportMindMap', {
      detail: { format: 'json' }
    });
    window.dispatchEvent(event);
  };

  /**
   * 导出为 PNG
   */
  const handleExportPNG = () => {
    // 触发导出事件
    const event = new CustomEvent('exportMindMap', {
      detail: { format: 'png' }
    });
    window.dispatchEvent(event);
  };

  /**
   * 导入文件
   */
  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target?.result as string);
            // 触发导入事件
            const importEvent = new CustomEvent('importMindMap', {
              detail: { data }
            });
            window.dispatchEvent(importEvent);
          } catch (error) {
            alert('文件格式错误，请选择有效的 JSON 文件');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="w-20 bg-white/80 backdrop-blur-sm border-r border-gray-200/50 flex flex-col items-center py-6 space-y-3 shadow-sm">
      {/* 测试按钮 */}
      <button
        onClick={() => {
          console.debug('测试创建节点');
          onAddNode('branch');
        }}
        className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-200 group relative shadow-lg hover:shadow-xl transform hover:scale-105"
        title="测试创建节点"
      >
        <Plus className="w-5 h-5" />
        <div className="absolute left-16 bg-gray-900/90 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50">
          测试
        </div>
      </button>

      {/* 添加节点 */}
      <div className="space-y-2">
        <button
          onClick={() => onAddNode('root')}
          className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 group relative shadow-lg hover:shadow-xl transform hover:scale-105"
          title="添加根节点"
        >
          <Circle className="w-5 h-5" />
          <div className="absolute left-16 bg-gray-900/90 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50">
            根节点
          </div>
        </button>

        <button
          onClick={() => onAddNode('branch')}
          className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transition-all duration-200 group relative shadow-lg hover:shadow-xl transform hover:scale-105"
          title="添加分支节点"
        >
          <Square className="w-5 h-5" />
          <div className="absolute left-16 bg-gray-900/90 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50">
            分支节点
          </div>
        </button>

        <button
          onClick={() => onAddNode('leaf')}
          className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 group relative shadow-lg hover:shadow-xl transform hover:scale-105"
          title="添加叶子节点"
        >
          <Triangle className="w-5 h-5" />
          <div className="absolute left-16 bg-gray-900/90 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50">
            叶子节点
          </div>
        </button>
      </div>

      {/* 分隔线 */}
      <div className="w-10 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-4" />

      {/* 编辑操作 */}
      <button
        onClick={onDeleteSelected}
        className="w-12 h-12 flex items-center justify-center rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group relative shadow-sm hover:shadow-lg transform hover:scale-105"
        title="删除选中"
      >
        <Trash2 className="w-5 h-5" />
        <div className="absolute left-16 bg-gray-900/90 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50">
          删除选中
        </div>
      </button>

      {/* 分隔线 */}
      <div className="w-10 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-4" />

      {/* 导入导出 */}
      <button
        onClick={handleImport}
        className="w-12 h-12 flex items-center justify-center rounded-xl text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group relative shadow-sm hover:shadow-lg transform hover:scale-105"
        title="导入"
      >
        <Upload className="w-5 h-5" />
        <div className="absolute left-16 bg-gray-900/90 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50">
          导入 JSON
        </div>
      </button>

      <div className="relative group">
        <button
          className="w-12 h-12 flex items-center justify-center rounded-xl text-gray-600 hover:bg-green-50 hover:text-green-600 transition-all duration-200 shadow-sm hover:shadow-lg transform hover:scale-105"
          title="导出"
        >
          <Download className="w-5 h-5" />
        </button>
        
        {/* 导出下拉菜单 */}
        <div className="absolute left-16 top-0 bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50">
          <button
            onClick={handleExportJSON}
            className="block w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-blue-50 rounded-t-xl transition-colors duration-150"
          >
            导出 JSON
          </button>
          <button
            onClick={handleExportPNG}
            className="block w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-blue-50 rounded-b-xl transition-colors duration-150"
          >
            导出 PNG
          </button>
        </div>
      </div>

      {/* 分隔线 */}
      <div className="w-10 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-4" />

      {/* 侧边栏切换 */}
      <button
        onClick={onToggleSidebar}
        className="w-12 h-12 flex items-center justify-center rounded-xl text-gray-600 hover:bg-purple-50 hover:text-purple-600 transition-all duration-200 group relative shadow-sm hover:shadow-lg transform hover:scale-105"
        title={isSidebarOpen ? '关闭侧边栏' : '打开侧边栏'}
      >
        {isSidebarOpen ? (
          <PanelRightClose className="w-5 h-5" />
        ) : (
          <PanelRightOpen className="w-5 h-5" />
        )}
        <div className="absolute left-16 bg-gray-900/90 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50">
          {isSidebarOpen ? '关闭侧边栏' : '打开侧边栏'}
        </div>
      </button>

      {/* 设置 */}
      <div className="flex-1" />
      <button
        className="w-12 h-12 flex items-center justify-center rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-all duration-200 group relative shadow-sm hover:shadow-lg transform hover:scale-105"
        title="设置"
      >
        <Settings className="w-5 h-5" />
        <div className="absolute left-16 bg-gray-900/90 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50">
          设置
        </div>
      </button>
    </div>
  );
};