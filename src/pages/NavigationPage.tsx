/**
 * 导航页面组件
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FolderOpen, 
  FileText, 
  Lightbulb, 
  ArrowRight,
  Sparkles,
  Languages,
  Play
} from 'lucide-react';
import Modal from '../components/Modal';
import ApiTestModal from '../components/ApiTestModal';

/**
 * 导航页面组件
 */
export const NavigationPage: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string>('');

  /**
   * 导航项配置
   */
  const navigationItems = [
    {
      id: 'projects',
      title: '项目管理',
      description: '管理和创建思维导图项目',
      icon: FolderOpen,
      path: '/projects',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600'
    },
    {
      id: 'markmap',
      title: 'Markdown 思维导图',
      description: '将 Markdown 文本转换为交互式思维导图',
      icon: FileText,
      path: '/markmap',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600'
    },
    {
      id: 'pdftranslate',
      title: 'PDFTranslate',
      description: '将 PDF 文档翻译成另一个语言',
      icon: Languages,
      path: 'http://localhost:7860',
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      external: true
    },
    {
      id: 'api-test',
      title: 'API 测试中心',
      description: '测试各种API接口功能的专用页面',
      icon: Play,
      path: '/api-test',
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
      useModal: true
    }
  ];

  /**
   * 处理导航点击
   */
  const handleNavigate = (item: any) => {
    if (item.external) {
      window.open(item.path, '_blank');
    } else if (item.useModal) {
      setModalContent(item.id);
      setIsModalOpen(true);
    } else {
      navigate(item.path);
    }
  };

  /**
   * 渲染模态框内容
   */
  const renderModalContent = () => {
    switch (modalContent) {
      case 'api-test':
        return <ApiTestModal />;
      default:
        return <div>内容加载中...</div>;
    }
  };

  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: 'url(/background.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* 背景遮罩层，提供33%透明度效果 */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800"
        style={{ opacity: 0.33 }}
      ></div>
      
      {/* 内容层 */}
      <div className="relative z-10">
      {/* 头部区域 */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Lightbulb className="w-12 h-12 text-yellow-500 mr-3" />
            <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100">
              妙妙屋
            </h1>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            有好多的妙妙小工具
          </p>
        </div>

        {/* 导航卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => handleNavigate(item)}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              >
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-slate-200 dark:border-slate-700">
                  {/* 图标和标题 */}
                  <div className="flex items-center mb-4">
                    <div className={`${item.color} ${item.hoverColor} p-3 rounded-xl transition-colors duration-300 group-hover:scale-110 transform`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {item.title}
                      </h3>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
                  </div>

                  {/* 描述 */}
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>

                  {/* 底部装饰 */}
                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700">
                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                      <Sparkles className="w-4 h-4 mr-2" />
                      <span>点击进入</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>


      </div>
      </div>

      {/* 模态框 */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="API 测试中心"
        size="full"
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default NavigationPage;