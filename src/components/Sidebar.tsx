/**
 * 编辑器侧边栏组件
 */

import React, { useState } from 'react';
import { X, Palette, Type, Settings } from 'lucide-react';
import { Node } from '@xyflow/react';

interface SidebarProps {
  selectedNode?: Node;
  onUpdateNode: (nodeId: string, data: Partial<any>) => void;
  onClose: () => void;
}

/**
 * 侧边栏组件
 */
export const Sidebar: React.FC<SidebarProps> = ({
  selectedNode,
  onUpdateNode,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'style' | 'text' | 'settings'>('style');

  // 预定义颜色
  const colors = [
    '#3b82f6', // 蓝色
    '#10b981', // 绿色
    '#f59e0b', // 黄色
    '#ef4444', // 红色
    '#8b5cf6', // 紫色
    '#06b6d4', // 青色
    '#f97316', // 橙色
    '#84cc16', // 青绿色
    '#ec4899', // 粉色
    '#6b7280', // 灰色
  ];

  // 字体大小选项
  const fontSizes = [12, 14, 16, 18, 20, 24, 28, 32];

  /**
   * 更新节点颜色
   */
  const updateColor = (color: string) => {
    if (selectedNode) {
      onUpdateNode(selectedNode.id, { color });
    }
  };

  /**
   * 更新字体大小
   */
  const updateFontSize = (fontSize: number) => {
    if (selectedNode) {
      onUpdateNode(selectedNode.id, { fontSize });
    }
  };

  /**
   * 更新节点类型
   */
  const updateNodeType = (nodeType: 'root' | 'branch' | 'leaf') => {
    if (selectedNode) {
      const defaultColors = {
        root: '#3b82f6',
        branch: '#10b981',
        leaf: '#f59e0b',
      };
      const defaultFontSizes = {
        root: 18,
        branch: 16,
        leaf: 14,
      };
      
      onUpdateNode(selectedNode.id, {
        nodeType,
        color: defaultColors[nodeType],
        fontSize: defaultFontSizes[nodeType],
      });
    }
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      {/* 头部 */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">属性面板</h2>
        <button
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-gray-600 rounded"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* 标签页 */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('style')}
          className={`flex-1 flex items-center justify-center py-3 px-4 text-sm font-medium ${
            activeTab === 'style'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Palette className="w-4 h-4 mr-2" />
          样式
        </button>
        <button
          onClick={() => setActiveTab('text')}
          className={`flex-1 flex items-center justify-center py-3 px-4 text-sm font-medium ${
            activeTab === 'text'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Type className="w-4 h-4 mr-2" />
          文本
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex-1 flex items-center justify-center py-3 px-4 text-sm font-medium ${
            activeTab === 'settings'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Settings className="w-4 h-4 mr-2" />
          设置
        </button>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 p-4 overflow-y-auto">
        {!selectedNode ? (
          <div className="text-center text-gray-500 mt-8">
            <div className="text-lg mb-2">未选择节点</div>
            <div className="text-sm">请选择一个节点来编辑其属性</div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* 样式标签页 */}
            {activeTab === 'style' && (
              <>
                {/* 节点类型 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    节点类型
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => updateNodeType('root')}
                      className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                        selectedNode.data.nodeType === 'root'
                          ? 'bg-blue-50 border-blue-500 text-blue-700'
                          : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      根节点
                    </button>
                    <button
                      onClick={() => updateNodeType('branch')}
                      className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                        selectedNode.data.nodeType === 'branch'
                          ? 'bg-green-50 border-green-500 text-green-700'
                          : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      分支
                    </button>
                    <button
                      onClick={() => updateNodeType('leaf')}
                      className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                        selectedNode.data.nodeType === 'leaf'
                          ? 'bg-yellow-50 border-yellow-500 text-yellow-700'
                          : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      叶子
                    </button>
                  </div>
                </div>

                {/* 颜色选择 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    节点颜色
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => updateColor(color)}
                        className={`w-10 h-10 rounded-lg border-2 transition-all ${
                          selectedNode.data.color === color
                            ? 'border-gray-400 scale-110'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* 文本标签页 */}
            {activeTab === 'text' && (
              <>
                {/* 字体大小 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    字体大小
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {fontSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => updateFontSize(size)}
                        className={`p-2 rounded-lg border text-sm font-medium transition-colors ${
                          selectedNode.data.fontSize === size
                            ? 'bg-blue-50 border-blue-500 text-blue-700'
                            : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {size}px
                      </button>
                    ))}
                  </div>
                </div>

                {/* 文本内容 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    节点文本
                  </label>
                  <textarea
                    value={selectedNode.data.label as string}
                    onChange={(e) => onUpdateNode(selectedNode.id, { label: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={3}
                    placeholder="输入节点文本..."
                  />
                </div>
              </>
            )}

            {/* 设置标签页 */}
            {activeTab === 'settings' && (
              <>
                {/* 节点信息 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    节点信息
                  </label>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">节点 ID:</span>
                      <span className="font-mono text-xs">{selectedNode.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">位置:</span>
                      <span className="font-mono text-xs">
                        ({Math.round(selectedNode.position.x)}, {Math.round(selectedNode.position.y)})
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">类型:</span>
                      <span className="capitalize">{selectedNode.data.nodeType as string}</span>
                    </div>
                  </div>
                </div>

                {/* 操作按钮 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    节点操作
                  </label>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        // 触发复制节点事件
                        const event = new CustomEvent('duplicateNode', {
                          detail: { nodeId: selectedNode.id }
                        });
                        window.dispatchEvent(event);
                      }}
                      className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      复制节点
                    </button>
                    <button
                      onClick={() => {
                        // 触发删除节点事件
                        const event = new CustomEvent('deleteNode', {
                          detail: { nodeId: selectedNode.id }
                        });
                        window.dispatchEvent(event);
                      }}
                      className="w-full p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      删除节点
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};