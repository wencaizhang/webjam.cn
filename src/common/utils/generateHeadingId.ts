/**
 * 生成标题的 ID，确保 TOC 和实际标题的 ID 一致
 * @param text 原始标题文本（可能是字符串或 React 元素）
 * @returns 生成的 ID
 */
export function generateHeadingId(text: any): string {
  // 提取纯文本内容
  let cleanText = extractTextFromReactElement(text);

  // 清理 markdown 格式（对于从 markdown 直接解析的情况）
  cleanText = cleanText
    .replace(/`([^`]+)`/g, '$1') // 代码块
    .replace(/\*\*([^*]+)\*\*/g, '$1') // 粗体
    .replace(/\*([^*]+)\*/g, '$1') // 斜体
    .replace(/~~([^~]+)~~/g, '$1') // 删除线
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'); // 链接

  // 生成 ID：保留数字、字母、中文字符，其他字符替换为连字符
  const id = cleanText
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, ''); // 移除开头和结尾的连字符

  return id;
}

/**
 * 专门用于从 markdown 文本生成 ID（用于 TOC）
 * @param markdownText markdown 格式的文本
 * @returns 生成的 ID
 */
export function generateHeadingIdFromMarkdown(markdownText: string): string {
  return generateHeadingId(markdownText);
}

/**
 * 从 React 元素中提取文本内容
 * @param element React 元素
 * @returns 提取的文本
 */
function extractTextFromReactElement(element: any): string {
  // 处理基本类型
  if (typeof element === 'string') {
    return element;
  }

  if (typeof element === 'number') {
    return String(element);
  }

  if (element === null || element === undefined) {
    return '';
  }

  // 处理数组
  if (Array.isArray(element)) {
    return element.map(extractTextFromReactElement).join('');
  }

  // 处理 React 元素
  if (element && typeof element === 'object') {
    // 特殊处理：如果是 React 元素且有 type 属性
    if (element.type && element.props) {
      // 对于链接元素，只提取文本内容，忽略 href
      if (element.type === 'a' && element.props.children) {
        return extractTextFromReactElement(element.props.children);
      }

      // 对于代码元素，提取代码内容
      if (element.type === 'code' && element.props.children) {
        return extractTextFromReactElement(element.props.children);
      }

      // 对于其他元素，提取 children
      if (element.props.children !== undefined) {
        return extractTextFromReactElement(element.props.children);
      }
    }

    // 处理 React 元素的 props.children
    if (element.props && element.props.children !== undefined) {
      return extractTextFromReactElement(element.props.children);
    }

    // 处理直接的 children 属性
    if (element.children !== undefined) {
      return extractTextFromReactElement(element.children);
    }

    // 如果是一个对象但没有 children，尝试转换为字符串
    if (element.toString && typeof element.toString === 'function') {
      const str = element.toString();
      // 避免返回 [object Object]
      if (str !== '[object Object]') {
        return str;
      }
    }
  }

  return '';
}
