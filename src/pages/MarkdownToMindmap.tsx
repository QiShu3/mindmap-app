/**
 * Markdown 转思维导图页面组件
 * 使用 markmap 库将 Markdown 文档转换为交互式思维导图
 */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Transformer } from 'markmap-lib';
import { Markmap, loadCSS, loadJS } from 'markmap-view';
import { FileText, Download, Copy, RotateCcw, ArrowLeft, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * 默认示例 Markdown 内容
 */
const defaultMarkdown = `# 思维导图示例

## 学习计划
### 前端技术
- React
  - Hooks
  - Context
  - Router
- TypeScript
  - 类型系统
  - 泛型
  - 装饰器
- 构建工具
  - Vite
  - Webpack
  - Rollup

### 后端技术
- Node.js
  - Express
  - Koa
  - NestJS
- 数据库
  - MySQL
  - MongoDB
  - Redis

## 项目实践
### 个人项目
- 博客系统
- 电商平台
- 管理后台

### 开源贡献
- 提交 PR
- 修复 Bug
- 编写文档

## 职业发展
### 技能提升
- 算法与数据结构
- 系统设计
- 性能优化

### 软技能
- 沟通能力
- 团队协作
- 项目管理`;

/**
 * 本地存储键名
 */
const STORAGE_KEY = 'markmap-markdown-content';

/**
 * MarkdownToMindmap 页面组件
 */
const MarkdownToMindmap: React.FC = () => {
  const navigate = useNavigate();
  
  // 从 localStorage 读取保存的内容，如果没有则使用默认内容
  const [markdown, setMarkdown] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved || defaultMarkdown;
    } catch (error) {
      console.warn('读取本地存储失败:', error);
      return defaultMarkdown;
    }
  });
  
  const [error, setError] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const mmRef = useRef<Markmap | null>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * 渲染思维导图
   */
  const renderMindmap = async () => {
    if (!svgRef.current) return;

    try {
      setError(null);
      
      // 创建 transformer 实例
      const transformer = new Transformer();
      
      // 转换 Markdown 为思维导图数据
      const { root, features } = transformer.transform(markdown);
      
      // 加载必要的 CSS 和 JS
      const { styles, scripts } = transformer.getUsedAssets(features);
      if (styles) loadCSS(styles);
      if (scripts) loadJS(scripts, { getMarkmap: () => Markmap });

      // 创建或更新思维导图
      if (!mmRef.current) {
        mmRef.current = Markmap.create(svgRef.current);
      }
      
      mmRef.current.setData(root);
      mmRef.current.fit();
    } catch (err) {
      console.error('渲染思维导图失败:', err);
      setError(err instanceof Error ? err.message : '渲染失败');
    }
  };

  /**
   * 保存内容到本地存储（防抖处理）
   */
  const saveToLocalStorage = useCallback((content: string) => {
    // 清除之前的定时器
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    // 设置新的定时器，500ms 后保存
    saveTimeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, content);
      } catch (error) {
        console.warn('保存到本地存储失败:', error);
      }
    }, 500);
  }, []);

  /**
   * 处理 Markdown 内容变化
   */
  const handleMarkdownChange = (content: string) => {
    setMarkdown(content);
    saveToLocalStorage(content);
  };

  /**
   * 复制 Markdown 内容到剪贴板
   */
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      // 这里可以添加成功提示
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  /**
   * 重置为默认内容
   */
  const resetToDefault = () => {
    setMarkdown(defaultMarkdown);
    saveToLocalStorage(defaultMarkdown);
  };

  /**
   * 清除缓存内容
   */
  const clearCache = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setMarkdown(defaultMarkdown);
    } catch (error) {
      console.warn('清除缓存失败:', error);
    }
  };

  /**
   * 导出 SVG
   */
  const exportSVG = () => {
    if (!svgRef.current) return;
    
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'mindmap.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // 当 Markdown 内容变化时重新渲染
  useEffect(() => {
    const timer = setTimeout(() => {
      renderMindmap();
    }, 500); // 防抖处理

    return () => clearTimeout(timer);
  }, [markdown]);

  // 组件挂载时初始渲染
  useEffect(() => {
    renderMindmap();
  }, []);

  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex flex-col">
      {/* 头部工具栏 */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="返回首页"
            >
              <ArrowLeft className="w-4 h-4" />
              返回
            </button>
            <div className="flex items-center gap-2">
              <FileText className="w-6 h-6 text-purple-600" />
              <h1 className="text-xl font-semibold text-gray-800">
                Markdown 转思维导图
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              title="复制 Markdown"
            >
              <Copy className="w-4 h-4" />
              复制
            </button>
            
            <button
              onClick={resetToDefault}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              title="重置为默认内容"
            >
              <RotateCcw className="w-4 h-4" />
              重置
            </button>
            
            <button
              onClick={clearCache}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
              title="清除缓存"
            >
              <Trash2 className="w-4 h-4" />
              清除缓存
            </button>
            
            <button
              onClick={exportSVG}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              title="导出 SVG"
            >
              <Download className="w-4 h-4" />
              导出
            </button>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="flex-1 flex">
        {/* Markdown 输入区域 */}
        <div className="w-1/2 border-r border-gray-200 bg-white/50 backdrop-blur-sm">
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-700">
                Markdown 输入
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                在此输入 Markdown 内容，右侧将实时显示思维导图
              </p>
            </div>
            
            <div className="flex-1 p-4">
              <textarea
                value={markdown}
                onChange={(e) => handleMarkdownChange(e.target.value)}
                className="w-full h-full resize-none border border-gray-300 rounded-lg p-4 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="请输入 Markdown 内容..."
              />
            </div>
          </div>
        </div>

        {/* 思维导图预览区域 */}
        <div className="w-1/2 bg-white/50 backdrop-blur-sm">
          <div className="h-full flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-700">
                思维导图预览
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                交互式思维导图，支持缩放、拖拽和节点展开/折叠
              </p>
            </div>
            
            <div className="flex-1 p-4 relative">
              {error ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="text-red-500 text-lg mb-2">渲染错误</div>
                    <div className="text-gray-600 text-sm">{error}</div>
                  </div>
                </div>
              ) : (
                <svg
                  ref={svgRef}
                  className="w-full h-full border border-gray-200 rounded-lg bg-white"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkdownToMindmap;