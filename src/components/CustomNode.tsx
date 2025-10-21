import React, { useState, useRef, useEffect } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { MindMapNode } from '../types';

/**
 * 自定义思维导图节点组件
 */
const CustomNode: React.FC<NodeProps<any> & { children?: React.ReactNode }> = ({ data, selected, id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState((data as any).label || '');
  const inputRef = useRef<HTMLInputElement>(null);

  // 当节点被选中时自动进入编辑模式
  useEffect(() => {
    if ((data as any).isEditing) {
      setIsEditing(true);
    }
  }, [(data as any).isEditing]);

  // 当节点数据更新时，同步本地状态
  useEffect(() => {
    setLabel((data as any).label || '');
  }, [(data as any).label]);

  // 当进入编辑模式时聚焦输入框
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  /**
   * 处理键盘事件
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  /**
   * 保存编辑
   */
  const handleSave = () => {
    setIsEditing(false);
    // 触发节点更新事件
    if (label !== (data as any).label) {
      const updateEvent = new CustomEvent('updateNode', {
        detail: {
          nodeId: id,
          data: { label }
        }
      });
      window.dispatchEvent(updateEvent);
    }
  };

  /**
   * 取消编辑
   */
  const handleCancel = () => {
    setIsEditing(false);
    setLabel((data as any).label || '');
  };

  /**
   * 双击进入编辑模式
   */
  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  // 根据节点类型设置样式
  const getNodeStyle = () => {
    const baseStyle = {
      padding: '8px 16px',
      borderRadius: '8px',
      border: selected ? '2px solid #3b82f6' : '1px solid #e5e7eb',
      backgroundColor: '#ffffff',
      fontSize: `${(data as any).fontSize || 14}px`,
      color: (data as any).color || '#374151',
      minWidth: '80px',
      textAlign: 'center' as const,
      cursor: 'pointer',
      boxShadow: selected ? '0 4px 12px rgba(59, 130, 246, 0.3)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
    };

    // 根据节点类型调整样式
    switch ((data as any).nodeType) {
      case 'root':
        return {
          ...baseStyle,
          backgroundColor: '#dbeafe',
          fontWeight: 'bold',
          fontSize: '18px',
        };
      case 'branch':
        return {
          ...baseStyle,
          backgroundColor: '#dcfce7',
          fontSize: '16px',
        };
      case 'leaf':
        return {
          ...baseStyle,
          backgroundColor: '#fef3c7',
          fontSize: '14px',
        };
      default:
        return baseStyle;
    }
  };

  return (
    <div style={getNodeStyle()} onDoubleClick={handleDoubleClick}>
      {/* 上方连接点 */}
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        style={{ background: '#3b82f6' }}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="top-source"
        style={{ background: '#3b82f6' }}
      />
      
      {/* 下方连接点 */}
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom"
        style={{ background: '#3b82f6' }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom-source"
        style={{ background: '#3b82f6' }}
      />
      
      {/* 左侧连接点 */}
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        style={{ background: '#3b82f6' }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left-source"
        style={{ background: '#3b82f6' }}
      />
      
      {/* 右侧连接点 */}
      <Handle
        type="target"
        position={Position.Right}
        id="right"
        style={{ background: '#3b82f6' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right-source"
        style={{ background: '#3b82f6' }}
      />
      
      {/* 节点内容 */}
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          style={{
            border: 'none',
            outline: 'none',
            background: 'transparent',
            textAlign: 'center',
            width: '100%',
            fontSize: 'inherit',
            color: 'inherit',
          }}
        />
      ) : (
        <span>{(data as any).label}</span>
      )}
    </div>
  );
};

export default CustomNode;