/**
 * 项目卡片组件
 */

import React from 'react';
import { MoreHorizontal, Calendar, Trash2, Copy, Edit3 } from 'lucide-react';
import { Project } from '../types';
import { generateThumbnail } from '../utils/storage';

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
  onDelete: (projectId: string) => void;
  onDuplicate: (project: Project) => void;
  onRename: (project: Project) => void;
}

/**
 * 项目卡片组件
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpen,
  onDelete,
  onDuplicate,
  onRename
}) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  // 点击外部关闭菜单
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  /**
   * 格式化日期
   */
  const formatDate = (date: Date): string => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return '今天';
    } else if (diffDays === 2) {
      return '昨天';
    } else if (diffDays <= 7) {
      return `${diffDays - 1} 天前`;
    } else {
      return date.toLocaleDateString('zh-CN');
    }
  };

  /**
   * 处理卡片点击
   */
  const handleCardClick = (e: React.MouseEvent) => {
    if (!showMenu) {
      onOpen(project);
    }
  };

  /**
   * 处理菜单操作
   */
  const handleMenuAction = (action: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(false);
    
    switch (action) {
      case 'rename':
        onRename(project);
        break;
      case 'duplicate':
        onDuplicate(project);
        break;
      case 'delete':
        onDelete(project.id);
        break;
    }
  };

  return (
    <div 
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 hover:shadow-xl hover:border-blue-200 transition-all duration-300 cursor-pointer group transform hover:scale-105"
      onClick={handleCardClick}
    >
      {/* 缩略图区域 */}
      <div className="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 rounded-t-2xl overflow-hidden relative">
        <img
          src={project.thumbnail || generateThumbnail(project)}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* 内容区域 */}
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors duration-200">
              {project.title}
            </h3>
            {project.description && (
              <p className="text-sm text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                {project.description}
              </p>
            )}
          </div>

          {/* 菜单按钮 */}
          <div className="relative ml-3" ref={menuRef}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className="p-2 rounded-xl hover:bg-gray-100/80 opacity-0 group-hover:opacity-100 transition-all duration-200 backdrop-blur-sm"
            >
              <MoreHorizontal className="w-4 h-4 text-gray-500" />
            </button>

            {/* 下拉菜单 */}
            {showMenu && (
              <div className="absolute right-0 top-10 w-48 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200/50 py-2 z-10">
                <button
                  onClick={(e) => handleMenuAction('rename', e)}
                  className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors duration-150"
                >
                  <Edit3 className="w-4 h-4 mr-3" />
                  重命名
                </button>
                <button
                  onClick={(e) => handleMenuAction('duplicate', e)}
                  className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors duration-150"
                >
                  <Copy className="w-4 h-4 mr-3" />
                  复制
                </button>
                <hr className="my-2 border-gray-200/50" />
                <button
                  onClick={(e) => handleMenuAction('delete', e)}
                  className="flex items-center w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                >
                  <Trash2 className="w-4 h-4 mr-3" />
                  删除
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 底部信息 */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100/50">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-2" />
            {formatDate(project.updatedAt)}
          </div>
          <div className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
            {project.nodes.length} 节点
          </div>
        </div>
      </div>
    </div>
  );
};