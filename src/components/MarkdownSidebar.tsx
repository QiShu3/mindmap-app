/**
 * Markdown 文件侧拉栏组件
 * 用于显示、管理和切换存储的 Markdown 文件
 */
import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  FileText, 
  Plus, 
  Trash2, 
  Edit3, 
  Save,
  FolderOpen,
  Clock,
  Search
} from 'lucide-react';

/**
 * Markdown 文件接口
 */
interface MarkdownFile {
  id: string;
  name: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

/**
 * 侧拉栏组件属性
 */
interface MarkdownSidebarProps {
  /** 是否显示侧拉栏 */
  isOpen: boolean;
  /** 关闭侧拉栏回调 */
  onClose: () => void;
  /** 当前选中的文件内容 */
  currentContent: string;
  /** 文件选择回调 */
  onFileSelect: (content: string) => void;
  /** 文件保存回调 */
  onFileSave?: (file: MarkdownFile) => void;
}

/**
 * 本地存储键名
 */
const STORAGE_KEY = 'markmap-saved-files';

/**
 * MarkdownSidebar 组件
 */
const MarkdownSidebar: React.FC<MarkdownSidebarProps> = ({
  isOpen,
  onClose,
  currentContent,
  onFileSelect,
  onFileSave
}) => {
  const [files, setFiles] = useState<MarkdownFile[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [showNewFileForm, setShowNewFileForm] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  /**
   * 从本地存储加载文件列表
   */
  const loadFiles = () => {
    try {
      const savedFiles = localStorage.getItem(STORAGE_KEY);
      if (savedFiles) {
        const parsedFiles = JSON.parse(savedFiles);
        setFiles(parsedFiles);
      }
    } catch (error) {
      console.error('加载文件列表失败:', error);
    }
  };

  /**
   * 保存文件列表到本地存储
   */
  const saveFiles = (fileList: MarkdownFile[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fileList));
      setFiles(fileList);
    } catch (error) {
      console.error('保存文件列表失败:', error);
    }
  };

  /**
   * 创建新文件
   */
  const createNewFile = () => {
    if (!newFileName.trim()) return;

    const newFile: MarkdownFile = {
      id: Date.now().toString(),
      name: newFileName.trim(),
      content: currentContent,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    const updatedFiles = [...files, newFile];
    saveFiles(updatedFiles);
    setNewFileName('');
    setShowNewFileForm(false);
    onFileSave?.(newFile);
  };

  /**
   * 删除文件
   */
  const deleteFile = (id: string) => {
    const updatedFiles = files.filter(file => file.id !== id);
    saveFiles(updatedFiles);
  };

  /**
   * 开始编辑文件名
   */
  const startEditing = (file: MarkdownFile) => {
    setEditingId(file.id);
    setEditingName(file.name);
  };

  /**
   * 保存文件名编辑
   */
  const saveEditing = () => {
    if (!editingName.trim() || !editingId) return;

    const updatedFiles = files.map(file =>
      file.id === editingId
        ? { ...file, name: editingName.trim(), updatedAt: Date.now() }
        : file
    );
    saveFiles(updatedFiles);
    setEditingId(null);
    setEditingName('');
  };

  /**
   * 取消编辑
   */
  const cancelEditing = () => {
    setEditingId(null);
    setEditingName('');
  };

  /**
   * 选择文件
   */
  const selectFile = (file: MarkdownFile) => {
    onFileSelect(file.content);
    onClose();
  };

  /**
   * 更新现有文件内容
   */
  const updateFileContent = (id: string) => {
    const updatedFiles = files.map(file =>
      file.id === id
        ? { ...file, content: currentContent, updatedAt: Date.now() }
        : file
    );
    saveFiles(updatedFiles);
  };

  /**
   * 格式化时间
   */
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  /**
   * 过滤文件列表
   */
  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 组件挂载时加载文件列表
  useEffect(() => {
    loadFiles();
  }, []);

  return (
    <>
      {/* 遮罩层 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* 侧拉栏 */}
      <div
        className={`fixed top-0 left-0 h-full w-80 sm:w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* 头部 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-semibold text-gray-800">
              我的文件
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* 搜索框 */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜索文件名或内容..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />
          </div>
        </div>

        {/* 新建文件按钮 */}
        <div className="p-4 border-b border-gray-200">
          {!showNewFileForm ? (
            <button
              onClick={() => setShowNewFileForm(true)}
              className="w-full flex items-center gap-2 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              保存当前文件
            </button>
          ) : (
            <div className="space-y-2">
              <input
                type="text"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                placeholder="输入文件名..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') createNewFile();
                  if (e.key === 'Escape') {
                    setShowNewFileForm(false);
                    setNewFileName('');
                  }
                }}
              />
              <div className="flex gap-2">
                <button
                  onClick={createNewFile}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
                >
                  <Save className="w-4 h-4" />
                  保存
                </button>
                <button
                  onClick={() => {
                    setShowNewFileForm(false);
                    setNewFileName('');
                  }}
                  className="flex-1 px-3 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg transition-colors text-sm"
                >
                  取消
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 文件列表 */}
        <div className="flex-1 overflow-y-auto">
          {files.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-gray-500">
              <FileText className="w-8 h-8 mb-2" />
              <p className="text-sm">暂无保存的文件</p>
            </div>
          ) : filteredFiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-gray-500">
              <Search className="w-8 h-8 mb-2" />
              <p className="text-sm">未找到匹配的文件</p>
            </div>
          ) : (
            <div className="p-2">
              {filteredFiles
                .sort((a, b) => b.updatedAt - a.updatedAt)
                .map((file) => (
                  <div
                    key={file.id}
                    className="group p-3 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    {editingId === file.id ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveEditing();
                            if (e.key === 'Escape') cancelEditing();
                          }}
                        />
                        <div className="flex gap-1">
                          <button
                            onClick={saveEditing}
                            className="flex-1 px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs transition-colors"
                          >
                            保存
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="flex-1 px-2 py-1 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded text-xs transition-colors"
                          >
                            取消
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-start justify-between">
                          <div
                            className="flex-1 cursor-pointer"
                            onClick={() => selectFile(file)}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <FileText className="w-4 h-4 text-purple-600 flex-shrink-0" />
                              <h3 className="text-sm font-medium text-gray-800 truncate">
                                {file.name}
                              </h3>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              {formatTime(file.updatedAt)}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => updateFileContent(file.id)}
                              className="p-1 hover:bg-purple-100 text-purple-600 rounded transition-colors"
                              title="更新内容"
                            >
                              <Save className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => startEditing(file)}
                              className="p-1 hover:bg-blue-100 text-blue-600 rounded transition-colors"
                              title="重命名"
                            >
                              <Edit3 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => deleteFile(file.id)}
                              className="p-1 hover:bg-red-100 text-red-600 rounded transition-colors"
                              title="删除"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        
                        <div 
                          className="mt-2 text-xs text-gray-400 overflow-hidden"
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            lineHeight: '1.2em',
                            maxHeight: '2.4em'
                          }}
                        >
                          {file.content.substring(0, 100)}...
                        </div>
                      </>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MarkdownSidebar;