/**
 * 工具項目的型別定義
 */

export type ToolCategory = "dev" | "text" | "life";

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: string;
  path: string;
  comingSoon?: boolean;
}

export interface ToolGroup {
  category: ToolCategory;
  categoryName: string;
  categoryEmoji: string;
  description: string;
  tools: Tool[];
}

export interface ToolState {
  history: Array<{ timestamp: Date; input: string; output: string }>;
}
