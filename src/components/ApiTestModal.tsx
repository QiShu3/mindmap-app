import React, { useState } from 'react';
import { 
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

interface ApiTestModalProps {
  // 可以添加特定的props
}

/**
 * API测试模态框内容组件
 * 包含所有API测试功能，但去除了导航相关元素
 */
export const ApiTestModal: React.FC<ApiTestModalProps> = () => {
  // 可用图标列表
  const availableIcons = [
    { name: 'Play', component: Play },
    { name: 'Database', component: Database },
    { name: 'Globe', component: Globe },
    { name: 'FileText', component: FileText },
    { name: 'Users', component: Users },
    { name: 'Settings', component: Settings },
    { name: 'Upload', component: Upload },
    { name: 'Download', component: Download },
    { name: 'Search', component: Search },
    { name: 'Edit', component: Edit },
    { name: 'Shield', component: Shield },
    { name: 'Bell', component: Bell },
    { name: 'Mail', component: Mail },
    { name: 'Calendar', component: Calendar },
    { name: 'Image', component: Image },
    { name: 'Video', component: Video },
    { name: 'Music', component: Music },
    { name: 'Lock', component: Lock },
    { name: 'Unlock', component: Unlock },
    { name: 'Heart', component: Heart },
    { name: 'Star', component: Star },
    { name: 'MessageCircle', component: MessageCircle },
    { name: 'Share2', component: Share2 },
    { name: 'Bookmark', component: Bookmark },
    { name: 'Clock', component: Clock },
    { name: 'MapPin', component: MapPin },
    { name: 'Camera', component: Camera },
    { name: 'Mic', component: Mic },
    { name: 'Phone', component: Phone },
    { name: 'Code', component: Code },
    { name: 'Zap', component: Zap }
  ];

  // 可用颜色列表
  const availableColors = [
    { name: '蓝色', value: 'bg-blue-500 hover:bg-blue-600' },
    { name: '绿色', value: 'bg-green-500 hover:bg-green-600' },
    { name: '红色', value: 'bg-red-500 hover:bg-red-600' },
    { name: '紫色', value: 'bg-purple-500 hover:bg-purple-600' },
    { name: '橙色', value: 'bg-orange-500 hover:bg-orange-600' },
    { name: '青色', value: 'bg-cyan-500 hover:bg-cyan-600' },
    { name: '粉色', value: 'bg-pink-500 hover:bg-pink-600' },
    { name: '黄色', value: 'bg-yellow-500 hover:bg-yellow-600' }
  ];

  // 状态管理
  const [customButtons, setCustomButtons] = useState<any[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newButton, setNewButton] = useState({
    title: '',
    description: '',
    method: 'GET',
    icon: 'Play',
    color: 'bg-blue-500 hover:bg-blue-600'
  });

  // 预设测试按钮
  const testButtons = [
    {
      id: 'get-users',
      title: 'GET 用户列表',
      description: '获取系统中所有用户的基本信息',
      icon: 'Users',
      color: 'bg-blue-500 hover:bg-blue-600',
      method: 'GET'
    },
    {
      id: 'post-user',
      title: 'POST 创建用户',
      description: '在系统中创建一个新的用户账户',
      icon: 'Plus',
      color: 'bg-green-500 hover:bg-green-600',
      method: 'POST'
    },
    {
      id: 'get-data',
      title: 'GET 数据查询',
      description: '从数据库中查询特定的数据记录',
      icon: 'Database',
      color: 'bg-purple-500 hover:bg-purple-600',
      method: 'GET'
    },
    {
      id: 'put-update',
      title: 'PUT 更新资源',
      description: '更新现有资源的完整信息',
      icon: 'Edit',
      color: 'bg-orange-500 hover:bg-orange-600',
      method: 'PUT'
    },
    {
      id: 'delete-item',
      title: 'DELETE 删除项目',
      description: '从系统中永久删除指定项目',
      icon: 'Trash2',
      color: 'bg-red-500 hover:bg-red-600',
      method: 'DELETE'
    },
    {
      id: 'get-config',
      title: 'GET 系统配置',
      description: '获取当前系统的配置参数',
      icon: 'Settings',
      color: 'bg-gray-500 hover:bg-gray-600',
      method: 'GET'
    },
    {
      id: 'post-upload',
      title: 'POST 文件上传',
      description: '上传文件到服务器存储',
      icon: 'Upload',
      color: 'bg-indigo-500 hover:bg-indigo-600',
      method: 'POST'
    },
    {
      id: 'get-download',
      title: 'GET 文件下载',
      description: '从服务器下载指定文件',
      icon: 'Download',
      color: 'bg-teal-500 hover:bg-teal-600',
      method: 'GET'
    },
    {
      id: 'post-search',
      title: 'POST 高级搜索',
      description: '执行复杂的搜索查询操作',
      icon: 'Search',
      color: 'bg-yellow-500 hover:bg-yellow-600',
      method: 'POST'
    },
    {
      id: 'get-status',
      title: 'GET 服务状态',
      description: '检查各个服务的运行状态',
      icon: 'Shield',
      color: 'bg-emerald-500 hover:bg-emerald-600',
      method: 'GET'
    },
    {
      id: 'post-report',
      title: 'POST 生成报告',
      description: '生成详细的数据分析报告',
      icon: 'FileText',
      color: 'bg-rose-500 hover:bg-rose-600',
      method: 'POST'
    },
    {
      id: 'post-batch',
      title: 'POST 批量处理',
      description: '批量处理多个数据项目',
      icon: 'Globe',
      color: 'bg-violet-500 hover:bg-violet-600',
      method: 'POST'
    }
  ];

  // 处理按钮点击
  const handleButtonClick = (buttonId: string, title: string) => {
    console.log(`点击了按钮: ${title} (ID: ${buttonId})`);
    // 这里可以添加实际的API调用逻辑
  };

  // 创建新按钮
  const handleCreateButton = () => {
    if (!newButton.title.trim() || !newButton.description.trim()) {
      alert('请填写完整的按钮信息');
      return;
    }

    const customButton = {
      id: `custom-${Date.now()}`,
      ...newButton,
      isCustom: true
    };

    setCustomButtons([...customButtons, customButton]);
    setNewButton({
      title: '',
      description: '',
      method: 'GET',
      icon: 'Play',
      color: 'bg-blue-500 hover:bg-blue-600'
    });
    setShowCreateForm(false);
  };

  // 删除自定义按钮
  const handleDeleteButton = (buttonId: string) => {
    setCustomButtons(customButtons.filter(button => button.id !== buttonId));
  };

  // 合并所有按钮
  const allButtons = [...testButtons, ...customButtons];

  return (
    <div className="p-6">
      {/* 页面标题和新建按钮 */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            API 测试中心
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            测试各种API接口的功能和性能
          </p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          新建自定义按钮
        </button>
      </div>

      {/* 新建按钮表单 */}
      {showCreateForm && (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-8 border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
            创建自定义按钮
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                按钮标题
              </label>
              <input
                type="text"
                value={newButton.title}
                onChange={(e) => setNewButton({...newButton, title: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-slate-100"
                placeholder="输入按钮标题"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                HTTP方法
              </label>
              <select
                value={newButton.method}
                onChange={(e) => setNewButton({...newButton, method: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-slate-100"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              按钮描述
            </label>
            <textarea
              value={newButton.description}
              onChange={(e) => setNewButton({...newButton, description: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-slate-100"
              rows={3}
              placeholder="输入按钮功能描述"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                选择图标
              </label>
              <select
                value={newButton.icon}
                onChange={(e) => setNewButton({...newButton, icon: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-slate-100"
              >
                {availableIcons.map(icon => (
                  <option key={icon.name} value={icon.name}>{icon.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                选择颜色
              </label>
              <select
                value={newButton.color}
                onChange={(e) => setNewButton({...newButton, color: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-slate-100"
              >
                {availableColors.map(color => (
                  <option key={color.value} value={color.value}>{color.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleCreateButton}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200"
            >
              <Save className="w-4 h-4" />
              创建按钮
            </button>
            <button
              onClick={() => setShowCreateForm(false)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
            >
              <X className="w-4 h-4" />
              取消
            </button>
          </div>
        </div>
      )}

      {/* API测试按钮网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allButtons.map((button) => {
          const IconComponent = availableIcons.find(icon => icon.name === button.icon)?.component || Play;
          
          return (
            <div
              key={button.id}
              onClick={() => handleButtonClick(button.id, button.title)}
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
            <p>• 点击任意按钮开始API测试</p>
            <p>• 不同颜色代表不同的HTTP方法</p>
            <p>• 可以创建自定义测试按钮</p>
            <p>• 测试结果将显示在浏览器控制台</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiTestModal;