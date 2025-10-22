/**
 * Markdown 文件存储管理工具
 * 提供文件的增删改查功能
 */

/**
 * Markdown 文件接口
 */
export interface MarkdownFile {
  id: string;
  name: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

/**
 * 存储键名
 */
const STORAGE_KEY = 'markmap-saved-files';

/**
 * Markdown 文件存储管理类
 */
export class MarkdownStorage {
  /**
   * 获取所有文件
   */
  static getFiles(): MarkdownFile[] {
    try {
      const savedFiles = localStorage.getItem(STORAGE_KEY);
      return savedFiles ? JSON.parse(savedFiles) : [];
    } catch (error) {
      console.error('获取文件列表失败:', error);
      return [];
    }
  }

  /**
   * 保存文件列表
   */
  static saveFiles(files: MarkdownFile[]): boolean {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
      return true;
    } catch (error) {
      console.error('保存文件列表失败:', error);
      return false;
    }
  }

  /**
   * 创建新文件
   */
  static createFile(name: string, content: string): MarkdownFile | null {
    try {
      const files = this.getFiles();
      
      // 检查文件名是否已存在
      if (files.some(file => file.name === name)) {
        throw new Error('文件名已存在');
      }

      const newFile: MarkdownFile = {
        id: Date.now().toString(),
        name: name.trim(),
        content,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };

      const updatedFiles = [...files, newFile];
      
      if (this.saveFiles(updatedFiles)) {
        return newFile;
      }
      return null;
    } catch (error) {
      console.error('创建文件失败:', error);
      return null;
    }
  }

  /**
   * 更新文件
   */
  static updateFile(id: string, updates: Partial<Omit<MarkdownFile, 'id' | 'createdAt'>>): boolean {
    try {
      const files = this.getFiles();
      const fileIndex = files.findIndex(file => file.id === id);
      
      if (fileIndex === -1) {
        throw new Error('文件不存在');
      }

      // 如果更新文件名，检查是否与其他文件重名
      if (updates.name && updates.name !== files[fileIndex].name) {
        if (files.some(file => file.id !== id && file.name === updates.name)) {
          throw new Error('文件名已存在');
        }
      }

      files[fileIndex] = {
        ...files[fileIndex],
        ...updates,
        updatedAt: Date.now()
      };

      return this.saveFiles(files);
    } catch (error) {
      console.error('更新文件失败:', error);
      return false;
    }
  }

  /**
   * 删除文件
   */
  static deleteFile(id: string): boolean {
    try {
      const files = this.getFiles();
      const updatedFiles = files.filter(file => file.id !== id);
      
      if (updatedFiles.length === files.length) {
        throw new Error('文件不存在');
      }

      return this.saveFiles(updatedFiles);
    } catch (error) {
      console.error('删除文件失败:', error);
      return false;
    }
  }

  /**
   * 根据ID获取文件
   */
  static getFileById(id: string): MarkdownFile | null {
    try {
      const files = this.getFiles();
      return files.find(file => file.id === id) || null;
    } catch (error) {
      console.error('获取文件失败:', error);
      return null;
    }
  }

  /**
   * 根据名称搜索文件
   */
  static searchFiles(query: string): MarkdownFile[] {
    try {
      const files = this.getFiles();
      const lowerQuery = query.toLowerCase();
      
      return files.filter(file => 
        file.name.toLowerCase().includes(lowerQuery) ||
        file.content.toLowerCase().includes(lowerQuery)
      );
    } catch (error) {
      console.error('搜索文件失败:', error);
      return [];
    }
  }

  /**
   * 导出文件为JSON
   */
  static exportFiles(): string {
    try {
      const files = this.getFiles();
      return JSON.stringify(files, null, 2);
    } catch (error) {
      console.error('导出文件失败:', error);
      return '[]';
    }
  }

  /**
   * 从JSON导入文件
   */
  static importFiles(jsonData: string): boolean {
    try {
      const importedFiles: MarkdownFile[] = JSON.parse(jsonData);
      
      // 验证数据格式
      if (!Array.isArray(importedFiles)) {
        throw new Error('无效的数据格式');
      }

      for (const file of importedFiles) {
        if (!file.id || !file.name || !file.content || !file.createdAt || !file.updatedAt) {
          throw new Error('文件数据不完整');
        }
      }

      const existingFiles = this.getFiles();
      const mergedFiles = [...existingFiles];

      // 合并文件，避免重复
      for (const importedFile of importedFiles) {
        const existingIndex = mergedFiles.findIndex(file => file.id === importedFile.id);
        if (existingIndex !== -1) {
          // 如果ID已存在，更新文件
          mergedFiles[existingIndex] = importedFile;
        } else {
          // 如果名称已存在，添加后缀
          let fileName = importedFile.name;
          let counter = 1;
          while (mergedFiles.some(file => file.name === fileName)) {
            fileName = `${importedFile.name} (${counter})`;
            counter++;
          }
          mergedFiles.push({
            ...importedFile,
            name: fileName
          });
        }
      }

      return this.saveFiles(mergedFiles);
    } catch (error) {
      console.error('导入文件失败:', error);
      return false;
    }
  }

  /**
   * 清空所有文件
   */
  static clearAll(): boolean {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('清空文件失败:', error);
      return false;
    }
  }

  /**
   * 获取存储使用情况
   */
  static getStorageInfo(): { used: number; total: number; percentage: number } {
    try {
      const files = this.getFiles();
      const dataSize = JSON.stringify(files).length;
      const totalSize = 5 * 1024 * 1024; // 假设 localStorage 限制为 5MB
      
      return {
        used: dataSize,
        total: totalSize,
        percentage: Math.round((dataSize / totalSize) * 100)
      };
    } catch (error) {
      console.error('获取存储信息失败:', error);
      return { used: 0, total: 0, percentage: 0 };
    }
  }
}