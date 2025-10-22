/**
 * API测试页面组件
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Play,
  Database,
  Globe,
  FileText,
  Users,
  Settings,
  Upload,
  Download,
  Search,
  Trash2,
  Edit,
  Shield,
  Bell,
  Mail,
  Calendar,
  Image,
  Video,
  Music,
  Lock,
  Unlock,
  Heart,
  Star,
  MessageCircle,
  Share2,
  Bookmark,
  Clock,
  MapPin,
  Camera,
  Mic,
  Phone,
  Plus,
  X,
  Save,
  Palette,
  Code,
  Zap
} from 'lucide-react';

/**
 * API测试页面组件
 */
export const ApiTestPage: React.FC = () => {
  const navigate = useNavigate();

  /**
   * 返回导航页面
   */
  const handleGoBack = () => {
    navigate('/');
  };

  /**
   * 测试按钮配置
   */
  const testButtons = [
    {
      id: 'get-users',
      title: 'GET 用户列表',
      description: '获取所有用户信息',
      icon: Users,
      color: 'bg-blue-500 hover:bg-blue-600',
      method: 'GET'
    },
    {
      id: 'post-user',
      title: 'POST 创建用户',
      description: '创建新用户',
      icon: Users,
      color: 'bg-green-500 hover:bg-green-600',
      method: 'POST'
    },
    {
      id: 'get-data',
      title: 'GET 数据查询',
      description: '查询数据库数据',
      icon: Database,
      color: 'bg-purple-500 hover:bg-purple-600',
      method: 'GET'
    },
    {
      id: 'upload-file',
      title: 'POST 文件上传',
      description: '上传文件到服务器',
      icon: Upload,
      color: 'bg-orange-500 hover:bg-orange-600',
      method: 'POST'
    },
    {
      id: 'download-file',
      title: 'GET 文件下载',
      description: '从服务器下载文件',
      icon: Download,
      color: 'bg-teal-500 hover:bg-teal-600',
      method: 'GET'
    },
    {
      id: 'search-api',
      title: 'GET 搜索接口',
      description: '搜索相关内容',
      icon: Search,
      color: 'bg-indigo-500 hover:bg-indigo-600',
      method: 'GET'
    },
    {
      id: 'update-data',
      title: 'PUT 更新数据',
      description: '更新现有数据',
      icon: Edit,
      color: 'bg-yellow-500 hover:bg-yellow-600',
      method: 'PUT'
    },
    {
      id: 'delete-data',
      title: 'DELETE 删除数据',
      description: '删除指定数据',
      icon: Trash2,
      color: 'bg-red-500 hover:bg-red-600',
      method: 'DELETE'
    },
    {
      id: 'get-config',
      title: 'GET 配置信息',
      description: '获取系统配置',
      icon: Settings,
      color: 'bg-gray-500 hover:bg-gray-600',
      method: 'GET'
    },
    {
      id: 'external-api',
      title: 'GET 外部API',
      description: '调用第三方API',
      icon: Globe,
      color: 'bg-pink-500 hover:bg-pink-600',
      method: 'GET'
    },
    {
      id: 'generate-report',
      title: 'POST 生成报告',
      description: '生成数据报告',
      icon: FileText,
      color: 'bg-cyan-500 hover:bg-cyan-600',
      method: 'POST'
    },
    {
      id: 'batch-process',
      title: 'POST 批量处理',
      description: '批量处理数据',
      icon: Play,
      color: 'bg-emerald-500 hover:bg-emerald-600',
      method: 'POST'
    },
    {
      id: 'auth-login',
      title: 'POST 用户登录',
      description: '用户身份验证',
      icon: Lock,
      color: 'bg-blue-600 hover:bg-blue-700',
      method: 'POST'
    },
    {
      id: 'auth-logout',
      title: 'POST 用户登出',
      description: '退出用户会话',
      icon: Unlock,
      color: 'bg-gray-600 hover:bg-gray-700',
      method: 'POST'
    },
    {
      id: 'send-notification',
      title: 'POST 发送通知',
      description: '推送系统通知',
      icon: Bell,
      color: 'bg-amber-500 hover:bg-amber-600',
      method: 'POST'
    },
    {
      id: 'send-email',
      title: 'POST 发送邮件',
      description: '发送电子邮件',
      icon: Mail,
      color: 'bg-red-600 hover:bg-red-700',
      method: 'POST'
    },
    {
      id: 'get-calendar',
      title: 'GET 日历事件',
      description: '获取日程安排',
      icon: Calendar,
      color: 'bg-green-600 hover:bg-green-700',
      method: 'GET'
    },
    {
      id: 'upload-image',
      title: 'POST 图片上传',
      description: '上传图片文件',
      icon: Image,
      color: 'bg-purple-600 hover:bg-purple-700',
      method: 'POST'
    },
    {
      id: 'upload-video',
      title: 'POST 视频上传',
      description: '上传视频文件',
      icon: Video,
      color: 'bg-indigo-600 hover:bg-indigo-700',
      method: 'POST'
    },
    {
      id: 'upload-audio',
      title: 'POST 音频上传',
      description: '上传音频文件',
      icon: Music,
      color: 'bg-pink-600 hover:bg-pink-700',
      method: 'POST'
    },
    {
      id: 'security-check',
      title: 'GET 安全检查',
      description: '系统安全验证',
      icon: Shield,
      color: 'bg-teal-600 hover:bg-teal-700',
      method: 'GET'
    },
    {
      id: 'add-favorite',
      title: 'POST 添加收藏',
      description: '收藏内容项目',
      icon: Heart,
      color: 'bg-rose-500 hover:bg-rose-600',
      method: 'POST'
    },
    {
      id: 'add-rating',
      title: 'POST 评分评价',
      description: '提交用户评分',
      icon: Star,
      color: 'bg-yellow-600 hover:bg-yellow-700',
      method: 'POST'
    },
    {
      id: 'send-message',
      title: 'POST 发送消息',
      description: '发送聊天消息',
      icon: MessageCircle,
      color: 'bg-blue-500 hover:bg-blue-600',
      method: 'POST'
    },
    {
      id: 'share-content',
      title: 'POST 分享内容',
      description: '分享到社交平台',
      icon: Share2,
      color: 'bg-green-500 hover:bg-green-600',
      method: 'POST'
    },
    {
      id: 'add-bookmark',
      title: 'POST 添加书签',
      description: '保存页面书签',
      icon: Bookmark,
      color: 'bg-orange-600 hover:bg-orange-700',
      method: 'POST'
    },
    {
      id: 'get-history',
      title: 'GET 历史记录',
      description: '获取操作历史',
      icon: Clock,
      color: 'bg-slate-600 hover:bg-slate-700',
      method: 'GET'
    },
    {
      id: 'get-location',
      title: 'GET 位置信息',
      description: '获取地理位置',
      icon: MapPin,
      color: 'bg-emerald-600 hover:bg-emerald-700',
      method: 'GET'
    },
    {
      id: 'capture-photo',
      title: 'POST 拍照上传',
      description: '相机拍照上传',
      icon: Camera,
      color: 'bg-cyan-600 hover:bg-cyan-700',
      method: 'POST'
    },
    {
      id: 'record-audio',
      title: 'POST 录音上传',
      description: '录制音频上传',
      icon: Mic,
      color: 'bg-violet-600 hover:bg-violet-700',
      method: 'POST'
    },
    {
      id: 'make-call',
      title: 'POST 发起通话',
      description: '语音视频通话',
      icon: Phone,
      color: 'bg-lime-600 hover:bg-lime-700',
      method: 'POST'
    }
  ];

  // 可选的图标列表
  const availableIcons = [
    { name: 'Users', icon: Users },
    { name: 'Database', icon: Database },
    { name: 'Globe', icon: Globe },
    { name: 'FileText', icon: FileText },
    { name: 'Settings', icon: Settings },
    { name: 'Upload', icon: Upload },
    { name: 'Download', icon: Download },
    { name: 'Search', icon: Search },
    { name: 'Edit', icon: Edit },
    { name: 'Trash2', icon: Trash2 },
    { name: 'Shield', icon: Shield },
    { name: 'Bell', icon: Bell },
    { name: 'Mail', icon: Mail },
    { name: 'Calendar', icon: Calendar },
    { name: 'Image', icon: Image },
    { name: 'Video', icon: Video },
    { name: 'Music', icon: Music },
    { name: 'Lock', icon: Lock },
    { name: 'Heart', icon: Heart },
    { name: 'Star', icon: Star },
    { name: 'Play', icon: Play },
    { name: 'Code', icon: Code },
    { name: 'Zap', icon: Zap }
  ];

  // 可选的颜色列表
  const availableColors = [
    { name: '蓝色', value: 'bg-blue-500 hover:bg-blue-600' },
    { name: '绿色', value: 'bg-green-500 hover:bg-green-600' },
    { name: '红色', value: 'bg-red-500 hover:bg-red-600' },
    { name: '紫色', value: 'bg-purple-500 hover:bg-purple-600' },
    { name: '橙色', value: 'bg-orange-500 hover:bg-orange-600' },
    { name: '青色', value: 'bg-cyan-500 hover:bg-cyan-600' },
    { name: '粉色', value: 'bg-pink-500 hover:bg-pink-600' },
    { name: '黄色', value: 'bg-yellow-500 hover:bg-yellow-600' },
    { name: '灰色', value: 'bg-gray-500 hover:bg-gray-600' },
    { name: '靛蓝', value: 'bg-indigo-500 hover:bg-indigo-600' }
  ];

  // 状态管理
  const [customButtons, setCustomButtons] = useState<any[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newButton, setNewButton] = useState({
    title: '',
    description: '',
    icon: 'Users',
    color: 'bg-blue-500 hover:bg-blue-600',
    method: 'GET'
  });

  /**
   * 处理按钮点击（暂时为空，等待后续API实现）
   */
  const handleButtonClick = (buttonId: string, method: string) => {
    console.log(`测试按钮点击: ${buttonId}, 方法: ${method}`);
    // TODO: 在这里添加实际的API调用逻辑
  };

  /**
   * 创建新按钮
   */
  const handleCreateButton = () => {
    if (!newButton.title.trim() || !newButton.description.trim()) {
      alert('请填写完整的按钮信息');
      return;
    }

    const selectedIcon = availableIcons.find(icon => icon.name === newButton.icon);
    const buttonId = `custom-${Date.now()}`;
    
    const customButton = {
      id: buttonId,
      title: newButton.title,
      description: newButton.description,
      icon: selectedIcon?.icon || Users,
      color: newButton.color,
      method: newButton.method,
      isCustom: true
    };

    setCustomButtons(prev => [...prev, customButton]);
    setNewButton({
      title: '',
      description: '',
      icon: 'Users',
      color: 'bg-blue-500 hover:bg-blue-600',
      method: 'GET'
    });
    setShowCreateForm(false);
  };

  /**
   * 删除自定义按钮
   */
  const handleDeleteButton = (buttonId: string) => {
    setCustomButtons(prev => prev.filter(btn => btn.id !== buttonId));
  };

  // 合并预设按钮和自定义按钮
  const allButtons = [...testButtons, ...customButtons];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* 头部区域 */}
        <div className="flex items-center mb-8">
          <button
            onClick={handleGoBack}
            className="flex items-center px-4 py-2 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            返回导航
          </button>
        </div>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Play className="w-12 h-12 text-blue-500 mr-3" />
            <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100">
              API 测试中心
            </h1>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-6">
            用于测试各种API接口的功能页面，包含多种HTTP方法和常见API场景
          </p>
          
          {/* 新建按钮 */}
          <button
            onClick={() => setShowCreateForm(true)}
            className="inline-flex items-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5 mr-2" />
            新建自定义按钮
          </button>
        </div>

        {/* 新建按钮表单弹窗 */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                  新建自定义按钮
                </h3>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                {/* 按钮标题 */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    按钮标题
                  </label>
                  <input
                    type="text"
                    value={newButton.title}
                    onChange={(e) => setNewButton(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                    placeholder="例如：GET 获取数据"
                  />
                </div>
                
                {/* 按钮描述 */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    按钮描述
                  </label>
                  <input
                    type="text"
                    value={newButton.description}
                    onChange={(e) => setNewButton(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                    placeholder="例如：获取用户数据列表"
                  />
                </div>
                
                {/* HTTP方法 */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    HTTP方法
                  </label>
                  <select
                    value={newButton.method}
                    onChange={(e) => setNewButton(prev => ({ ...prev, method: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="PUT">PUT</option>
                    <option value="DELETE">DELETE</option>
                  </select>
                </div>
                
                {/* 图标选择 */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    图标
                  </label>
                  <select
                    value={newButton.icon}
                    onChange={(e) => setNewButton(prev => ({ ...prev, icon: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  >
                    {availableIcons.map((icon) => (
                      <option key={icon.name} value={icon.name}>
                        {icon.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* 颜色选择 */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    颜色
                  </label>
                  <select
                    value={newButton.color}
                    onChange={(e) => setNewButton(prev => ({ ...prev, color: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                  >
                    {availableColors.map((color) => (
                      <option key={color.value} value={color.value}>
                        {color.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleCreateButton}
                  className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition-colors duration-200"
                >
                  <Save className="w-4 h-4 mr-2" />
                  创建按钮
                </button>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 px-4 py-2 bg-slate-300 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-500 text-slate-700 dark:text-slate-200 font-medium rounded-md transition-colors duration-200"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 测试按钮网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {allButtons.map((button) => {
            const IconComponent = button.icon;
            return (
              <div
                key={button.id}
                onClick={() => handleButtonClick(button.id, button.method)}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              >
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-slate-200 dark:border-slate-700 h-full relative">
                  {/* 删除按钮（仅自定义按钮显示） */}
                  {button.isCustom && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteButton(button.id);
                      }}
                      className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors duration-200"
                      title="删除自定义按钮"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  
                  {/* 方法标签 */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full text-white ${button.color.split(' ')[0]}`}>
                      {button.method}
                    </span>
                    <div className={`${button.color} p-2 rounded-lg transition-colors duration-300 group-hover:scale-110 transform`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* 标题和描述 */}
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 mb-2">
                      {button.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {button.description}
                    </p>
                  </div>

                  {/* 底部状态 */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                    <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
                      <span>待测试</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 底部说明 */}
        <div className="text-center mt-16">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 max-w-2xl mx-auto border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
              使用说明
            </h3>
            <div className="text-sm text-slate-600 dark:text-slate-300 space-y-2">
              <p>• 点击任意按钮可以测试对应的API接口</p>
              <p>• 每个按钮代表不同的HTTP方法和API场景</p>
              <p>• 测试结果将在控制台中显示</p>
              <p>• 可以根据需要添加实际的API调用逻辑</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiTestPage;