# 构建智能教育体的创新思路
_Exported on 2025/11/20 at GMT+8 10:18:25 from Cursor (2.1.0)_

---

**User**

我现在是想通过paddleocr、notion等的一些mcp，以文心4.5模型为基座，去构建一个智能体，可能偏向于学习教育等领域。

但是我还没有去确定智能体具体是要先实现什么样的一个功能、解决什么样的痛点，以及在此基础之上的智能体具体的框架、工作流程又应该是什么样的

所以请你从产品、技术的角度尝试去给我一些创新的思路与可能

---

**Cursor**

## 创意方向与痛点洞察

- **学习痛点聚焦**：当前在线学习主要卡在“定位难题 + 持续反馈不足 + 个性化资源缺失”。用户常要从碎片化资料中自行整理，难以形成结构化知识、及时复盘。  
- **要面向的核心功能**：围绕“自适应学习”构建一个可快速验证价值的 MVP，例如：  
  - “作业/练习批注 + 智能讲解”机器人：通过 PaddleOCR 获取纸质作业图像，自动识别题目与解答，再用文心 4.5 做知识点解析、生成针对性的点评。  
  - “学习计划与复盘助手”：Notion 作为知识管理底座，自动记录学习任务、笔记、错题库，并通过文心 4.5 给出复习提醒和阶段性总结。  
  - “互动式课堂伙伴”：结合 Notion 页面（教材/讲义）与实时问答，自动生成思维导图、问答卡片、测验题，帮助学生“带着问题读材料”。

## 技术框架建议

- **MCP 资源组合**  
  - PaddleOCR MCP：负责图像到文本的高精度识别，可先从单页作业开始，逐步扩展到多页与手写。  
  - Notion MCP：统一管理学习素材、任务、反馈；构建模块化数据库（任务表、错题表、知识点表）便于编排流程。  
  - 文心 4.5 模型：承担知识理解、讲解、生成策略，依托其中文理解优势，提供包含情景化案例、步骤化讲解等高质量输出。

- **智能体流程雏形**  
  - `输入采集层`：上传作业图片或选定 Notion 页面 → PaddleOCR 结构化抽取内容。  
  - `语义理解层`：文心 4.5 将识别的题目、学习日志解析为知识点、难度、上下文；必要时回读 Notion 相关资源。  
  - `策略引擎层`：根据用户当前掌握程度（Notion 数据库中的历史表现）决定反馈形式：讲解、练习、计划、提醒。  
  - `输出执行层`：生成讲解/任务并写回 Notion，或以对话形式呈现。对每个输出附加“下一步建议 + 复盘时间点”。  
  - `评估循环`：从 Notion 收集用户反馈（完成度、难度感受），迭代策略。

## 创新亮点与差异化

- **多模态错题本**：用户只需拍照上传，系统自动将题干、解答、知识点映射到 Notion，可按“知识图谱”导航复习。  
- **学习行为洞察**：利用 Notion 中的任务打卡、笔记内容，文心 4.5 生成“学习风格画像”，给出节奏建议或提醒（如“注意适当间隔复习”）。  
- **互动式复盘**：文心 4.5 根据近期错题，自动设计“自问自答”或“情景对话”练习，让学生通过对话巩固。  
- **自动生成教学资源**：教师可上传课堂笔记，系统将其转化为“学习指南、测验题、课后作业”，大幅减轻备课负担。

## 近期推进建议

1. **明确首个核心场景**：例如“拍照上传数学题 → 自动分步讲解 + Notion 记录”，目标是可验证的用户价值。  
2. **快速搭建管道**：先串起 PaddleOCR → 文心 4.5 → Notion 的最小流程，验证数据结构、延迟和准确度。  
3. **用户测试与迭代**：招募 3-5 位学生或老师实测，收集“反馈形式是否有用”“知识点匹配是否准确”等数据，以决定下一迭代重点。  
4. **探索扩展功能**：在基础功能稳定后，再考虑加入“实时课堂互动”或“情绪激励”等增值功能。

如果你想深入某个具体功能（如错题本、学习计划、课堂助手等），我可以进一步协助梳理详细需求、技术方案或 PoC 步骤。

---

**User**

@PaddleOCR https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem https://developers.notion.com/docs/mcp-supported-tools @Browser 

请你结合之前的对话以及提供的上下文，再去分析并完善：

1.应该调用哪些MCP以及MCP中的哪些工具

2.整个产品流程到底应该是什么样的：智能体可以接受用户输入的图片（笔记，错题、教材讲义等），识别的内容以多种格式转给文心4.5进行多种操作（批注、整理、解析、优化、生成计划等），然后再将生成的结果导入到notion进行更进一步的呈现、整理等操作

3.基于产品的交互逻辑，智能体的框架、工作流又应该如何设计，技术实现又应该是什么样的

然后请你根据这些分析思考，给我制定一个详细、深入的计划

Implement the plan as specified, it is attached for your reference. Do NOT edit the plan file itself.

To-do's from the plan have already been created. Do not create them again. Mark them as in_progress as you work, starting with the first one. Don't stop until you have completed all the to-dos.

---

**Cursor**

```json
{
  "name": "for-com-ate-learning-agent",
  "version": "0.1.0",
  "private": true,
  "type": "commonjs",
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "demo": "ts-node src/index.ts"
  },
  "dependencies": {
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/node": "^22.7.4",
    "ts-node": "^10.9.2",
    "typescript": "^5.6.3"
  }
}

```

```jsonc
{
  "compilerOptions": {
    "target": "ES2021",
    "module": "commonjs",
    "moduleResolution": "node",
    "outDir": "dist",
    "rootDir": "src",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": [
    "src"
  ]
}

```

```typescript
// 用于描述 OCR 文本块的基础结构体，包含坐标与文本内容。
export interface OcrTextSpan { // 定义 OCR 文本片段接口，承载文本与位置信息。
  lineId: string; // 行标识，方便追踪段落顺序。
  text: string; // 实际识别出来的文本字符串。
  confidence: number; // PaddleOCR 返回的置信度分数。
  boundingBox: Array<number>; // 以 Array<number> 表示的矩形坐标 [x1,y1,x2,y2]。
  classification: string; // 语义分类（题干、答案、批注等）。
  sourceMeta: Record<string, string>; // 来源元数据，例如页码、拍摄时间。
}

// 针对整页 OCR 结果的结构体，提供原图索引与多种格式的文本。
export interface OcrStructuredResult { // 定义复合 OCR 结果接口。
  originalPath: string; // 输入图片的绝对路径。
  plainText: string; // 全部文本的纯文本拼接形式。
  markdownText: string; // 带格式的 Markdown 文本，用于 Notion 或笔记。
  tableData: Array<Array<string>>; // 表格形式的数据集合，支持课表或表格题。
  spans: Array<OcrTextSpan>; // 逐行的 OCR 文本片段列表。
}

// 描述用户的学习画像信息，用于决策层的个性化策略。
export interface LearnerProfile { // 学习者画像接口定义。
  learnerId: string; // 学习者唯一标识。
  competencyLevel: string; // 当前掌握水平标签。
  learningGoal: string; // 近期学习目标。
  preferredStyle: string; // 偏好的学习方式（讲解、练习、计划）。
}

// 枚举任务类型以便策略路由。
export type LearningTaskType = "annotation" | "analysis" | "organization" | "planning"; // 任务类型联合类型。

// 表示一次流程要执行的任务单。
export interface LearningTask { // 定义学习任务接口。
  taskId: string; // 唯一任务编号。
  type: LearningTaskType; // 任务类型枚举。
  description: string; // 人类可读的任务描述。
  priority: number; // 优先级，数值越大越紧急。
  dueDate?: string; // 任务完成的截止日期（ISO 字符串）。
}

// Notion 写入所需的最小字段集合。
export interface NotionWritePayload { // Notion 写入载荷接口。
  parentPageId: string; // 目标父页面 ID。
  title: string; // 新页面标题。
  markdownContent: string; // 页面主体 Markdown。
  properties: Record<string, string | number>; // 需要同步的数据库属性。
}

// 表示一次完整流程的上下文对象。
export interface AgentContext { // 智能体上下文接口。
  learnerProfile: LearnerProfile; // 学习者画像。
  tasks: Array<LearningTask>; // 当前要执行的任务列表。
  ocrResult: OcrStructuredResult; // 最新 OCR 结果。
}

```

```typescript
import { promises as fs } from "fs"; // 引入文件系统 Promise API 以便异步读写文件。

/**
 * FilesystemClientInterface 负责定义智能体访问本地或远端文件系统的抽象。
 */
export interface FilesystemClientInterface { // 定义文件系统客户端接口。
  /**
   * 读取指定路径的二进制文件内容。
   * @param absolutePath 目标文件的绝对路径。
   */
  readBinary(absolutePath: string): Promise<Buffer>; // 声明返回 Buffer 的读取函数。
}

/**
 * LocalFilesystemClient 使用 Node.js fs/promises 实现 FilesystemClientInterface。
 */
export class LocalFilesystemClient implements FilesystemClientInterface { // 实现具体类。
  /**
   * 通过 fs.promises 读取文件，并在关键步骤输出调试日志。
   */
  async readBinary(absolutePath: string): Promise<Buffer> { // 实现异步读取逻辑。
    console.log("debugging: starting file read", absolutePath); // 输出调试信息以便定位问题。
    const fileBuffer = await fs.readFile(absolutePath); // 实际读取文件并获取 Buffer。
    console.log("debugging: completed file read", fileBuffer.byteLength); // 输出读取结果的字节长度。
    return fileBuffer; // 返回读取到的 Buffer。
  }
}

```

```typescript
import { FilesystemClientInterface } from "./filesystem-client"; // 引入文件系统客户端接口，用于读取图片。
import { OcrStructuredResult, OcrTextSpan } from "../types"; // 引入类型定义以确保类型安全。

/**
 * PaddleOcrClientInterface 规定 OCR 客户端需要提供的核心行为。
 */
export interface PaddleOcrClientInterface { // 定义 OCR 客户端接口。
  /**
   * 执行结构化 OCR，输出多种格式文本。
   * @param imagePath 输入图片绝对路径。
   */
  runStructuredOcr(imagePath: string): Promise<OcrStructuredResult>; // 声明主方法。
}

/**
 * MockPaddleOcrClient 使用简单的文本解析模拟 PaddleOCR，便于本地演示。
 */
export class MockPaddleOcrClient implements PaddleOcrClientInterface { // 定义模拟实现。
  constructor(private readonly filesystemClient: FilesystemClientInterface) { // 通过依赖注入接收文件系统客户端。
    console.log("debugging: initialized MockPaddleOcrClient"); // 初始化时输出调试信息。
  }

  /**
   * 核心方法：读取文件内容，拆分为行，并构建结构化 OCR 结果。
   */
  async runStructuredOcr(imagePath: string): Promise<OcrStructuredResult> { // 实现接口方法。
    console.log("debugging: runStructuredOcr invoked", imagePath); // 输出调试日志。
    const binaryContent = await this.filesystemClient.readBinary(imagePath); // 读取文件内容。
    const textContent = binaryContent.toString("utf-8"); // 将 Buffer 转为 UTF-8 文本，模拟 OCR。
    console.log("debugging: converted buffer to text", textContent.length); // 输出文本长度。
    const sanitizedText = textContent.trim().length > 0 ? textContent.trim() : "示例题干：1+1=?"; // 若为空则提供默认文本。
    const lines = sanitizedText.split(/\r?\n/); // 按行分割文本。
    console.log("debugging: split lines", lines.length); // 输出行数。
    const spans: Array<OcrTextSpan> = lines.map((line, index) => ({ // 将每一行映射为 OcrTextSpan。
      lineId: `line-${index}`, // 行 ID。
      text: line, // 行文本。
      confidence: 0.95, // 模拟置信度。
      boundingBox: [0, index * 20, 500, index * 20 + 18], // 模拟坐标。
      classification: index === 0 ? "question" : "analysis", // 简单分类。
      sourceMeta: {
        page: "1", // 假设页码。
        captureTime: new Date().toISOString() // 记录当前时间。
      } // 来源元数据。
    })); // 完成 spans 数组。
    const markdownText = lines.map((line, index) => (index === 0 ? `**题目：${line}**` : `- ${line}`)).join("\n"); // 生成 Markdown 表达。
    const tableData = lines.map((line, index) => [String(index + 1), line]); // 构造简单表格数据。
    const ocrResult: OcrStructuredResult = { // 组装最终结构体。
      originalPath: imagePath, // 原路径。
      plainText: sanitizedText, // 纯文本。
      markdownText, // Markdown 文本。
      tableData, // 表格数据。
      spans // 文本片段。
    }; // 结束对象。
    console.log("debugging: assembled OCR result", ocrResult.spans.length); // 输出结果统计。
    return ocrResult; // 返回结构体。
  }
}

```

```typescript
import { NotionWritePayload, LearningTask } from "../types"; // 引入需要的类型定义。

/**
 * NotionClientInterface 抽象了智能体需要的 Notion 能力。
 */
export interface NotionClientInterface { // 定义接口。
  /**
   * 创建新的 Notion 页面。
   * @param payload 页面内容载荷。
   */
  createPage(payload: NotionWritePayload): Promise<string>; // 返回新页面 ID。

  /**
   * 更新 Notion 页面属性或内容。
   * @param pageId 目标页面 ID。
   * @param properties 属性键值。
   */
  updatePage(pageId: string, properties: Record<string, string | number>): Promise<void>; // 无返回值。

  /**
   * 创建评论用于提醒。
   * @param pageId 目标页面 ID。
   * @param commentText 评论文本。
   */
  createComment(pageId: string, commentText: string): Promise<void>; // 无返回值。
}

/**
 * MockNotionClient 简单地将每次操作输出到控制台，便于演示。
 */
export class MockNotionClient implements NotionClientInterface { // 模拟实现。
  /**
   * 用于生成伪页面 ID 的计数器。
   */
  private pageCounter = 0; // 初始化计数器。

  /**
   * 模拟创建页面：打印内容并返回 ID。
   */
  async createPage(payload: NotionWritePayload): Promise<string> { // 实现 createPage。
    console.log("debugging: creating Notion page", payload.title); // 输出调试信息。
    console.log("debugging: markdown content", payload.markdownContent); // 输出内容。
    const newId = `page-${++this.pageCounter}`; // 生成 ID。
    console.log("debugging: created Notion page ID", newId); // 输出 ID。
    return newId; // 返回 ID。
  }

  /**
   * 模拟更新页面属性。
   */
  async updatePage(pageId: string, properties: Record<string, string | number>): Promise<void> { // 实现 updatePage。
    console.log("debugging: updating Notion page", pageId); // 输出页面 ID。
    console.log("debugging: new properties", properties); // 输出属性。
  }

  /**
   * 模拟创建评论。
   */
  async createComment(pageId: string, commentText: string): Promise<void> { // 实现 createComment。
    console.log("debugging: creating comment", pageId); // 输出页面 ID。
    console.log("debugging: comment text", commentText); // 输出评论文本。
  }

  /**
   * 根据任务构建评论文本的辅助方法。
   * @param task 学习任务对象。
   */
  buildCommentFromTask(task: LearningTask): string { // 提供辅助函数。
    console.log("debugging: building comment for task", task.taskId); // 输出任务 ID。
    return `任务 ${task.taskId} (${task.type}) 已同步，描述：${task.description}`; // 返回描述文本。
  }
}

```

```typescript
import { AgentContext, LearningTask } from "../types"; // 引入上下文与任务类型。

/**
 * WenxinOrchestratorInterface 描述基于文心 4.5 的策略/生成层。
 */
export interface WenxinOrchestratorInterface { // 定义接口。
  /**
   * 根据上下文生成任务结果文本。
   * @param context 智能体上下文。
   * @param task 当前任务。
   */
  runTask(context: AgentContext, task: LearningTask): Promise<string>; // 返回生成的 Markdown 文本。
}

/**
 * MockWenxinOrchestrator 用模板字符串模拟文心输出。
 */
export class MockWenxinOrchestrator implements WenxinOrchestratorInterface { // 模拟实现。
  /**
   * 生成 Markdown 反馈，并输出调试日志。
   */
  async runTask(context: AgentContext, task: LearningTask): Promise<string> { // 实现接口。
    console.log("debugging: Wenxin task start", task.taskId); // 输出任务开始调试信息。
    const leadLine = `**任务类型：${task.type}｜优先级：${task.priority}**`; // 构建首行。
    const learnerLine = `- 学习者：${context.learnerProfile.learnerId}（目标：${context.learnerProfile.learningGoal}）`; // 学习者信息。
    const summaryLine = `- OCR 摘要：${context.ocrResult.plainText.slice(0, 80)}...`; // OCR 摘要。
    const actionLine = `- 建议动作：${task.description}`; // 动作建议。
    const planLine = task.dueDate ? `- 截止：${task.dueDate}` : "- 截止：未设定"; // 截止信息。
    const markdown = [leadLine, learnerLine, summaryLine, actionLine, planLine].join("\n"); // 拼接 Markdown。
    console.log("debugging: Wenxin task output length", markdown.length); // 输出长度信息。
    return markdown; // 返回 Markdown。
  }
}

```

```typescript
import { PaddleOcrClientInterface } from "../clients/paddleocr-client"; // 引入 OCR 客户端接口。
import { NotionClientInterface } from "../clients/notion-client"; // 引入 Notion 客户端接口。
import { WenxinOrchestratorInterface } from "../utils/wenxin-orchestrator"; // 引入文心编排器。
import { AgentContext, LearnerProfile, LearningTask, NotionWritePayload } from "../types"; // 引入类型定义。

/**
 * LearningAgent 封装端到端流程：OCR→策略→Notion。
 */
export class LearningAgent { // 定义智能体主体类。
  constructor( // 构造函数。
    private readonly ocrClient: PaddleOcrClientInterface, // 注入 OCR 客户端。
    private readonly notionClient: NotionClientInterface, // 注入 Notion 客户端。
    private readonly wenxinOrchestrator: WenxinOrchestratorInterface // 注入文心编排器。
  ) {
    console.log("debugging: LearningAgent initialized"); // 输出初始化日志。
  }

  /**
   * 读取图片并构建 AgentContext。
   */
  async buildContext(imagePath: string, learnerProfile: LearnerProfile, tasks: Array<LearningTask>): Promise<AgentContext> { // 构建上下文方法。
    console.log("debugging: building context", imagePath); // 调试日志。
    const ocrResult = await this.ocrClient.runStructuredOcr(imagePath); // 调用 OCR。
    const context: AgentContext = { // 组装上下文。
      learnerProfile, // 画像。
      tasks, // 任务。
      ocrResult // OCR 结果。
    }; // 结束对象。
    console.log("debugging: context ready", context.tasks.length); // 输出任务数量。
    return context; // 返回上下文。
  }

  /**
   * 执行任务列表并写回 Notion。
   */
  async executeTasks(context: AgentContext): Promise<Array<string>> { // 执行任务，返回页面 ID 列表。
    console.log("debugging: executing tasks", context.tasks.length); // 输出任务数量。
    const createdPageIds: Array<string> = []; // 存储生成的页面 ID。
    for (const task of context.tasks) { // 遍历任务。
      console.log("debugging: running task", task.taskId); // 输出当前任务。
      const markdownContent = await this.wenxinOrchestrator.runTask(context, task); // 获取文心输出。
      const payload: NotionWritePayload = { // 组装写入载荷。
        parentPageId: context.learnerProfile.learnerId, // 简化：用 learnerId 作为父页面。
        title: `${task.type}-${task.taskId}`, // 标题。
        markdownContent, // Markdown 内容。
        properties: {
          priority: task.priority, // 优先级。
          type: task.type, // 任务类型。
          dueDate: task.dueDate ?? "未设定" // 截止。
        } // 属性结束。
      }; // 结束 payload。
      const pageId = await this.notionClient.createPage(payload); // 创建页面。
      createdPageIds.push(pageId); // 收集 ID。
      await this.notionClient.updatePage(pageId, { status: "generated" }); // 更新状态。
      await this.notionClient.createComment(pageId, `自动生成任务：${task.description}`); // 写评论。
    } // 循环结束。
    console.log("debugging: tasks completed", createdPageIds.length); // 输出完成数量。
    return createdPageIds; // 返回 ID 列表。
  }
}

```

```plaintext
一次函数 y = ax + b 经过点 (1,3) 与 (3,7)，求函数解析式并说明增长趋势。
学生解题过程：列出方程组
a + b = 3
3a + b = 7
消元得 a = 2, b = 1，因此 y = 2x + 1。
需补充：解释增长率与实际意义，并给出学习计划。

```

```typescript
import { LocalFilesystemClient } from "./clients/filesystem-client"; // 引入本地文件系统客户端。
import { MockPaddleOcrClient } from "./clients/paddleocr-client"; // 引入模拟 PaddleOCR 客户端。
import { MockNotionClient } from "./clients/notion-client"; // 引入模拟 Notion 客户端。
import { MockWenxinOrchestrator } from "./utils/wenxin-orchestrator"; // 引入模拟文心编排器。
import { LearningAgent } from "./workflow/learning-agent"; // 引入智能体类。
import { LearnerProfile, LearningTask } from "./types"; // 引入类型定义。

/**
 * main 函数串联样例：读取 demo 文档，执行四种任务，并输出结果。
 */
async function main(): Promise<void> { // 定义主函数。
  console.log("debugging: main started"); // 输出调试信息。
  const filesystemClient = new LocalFilesystemClient(); // 实例化文件系统客户端。
  const ocrClient = new MockPaddleOcrClient(filesystemClient); // 实例化 OCR 客户端。
  const notionClient = new MockNotionClient(); // 实例化 Notion 客户端。
  const wenxinOrchestrator = new MockWenxinOrchestrator(); // 实例化文心编排器。
  const agent = new LearningAgent(ocrClient, notionClient, wenxinOrchestrator); // 创建智能体。

  const learnerProfile: LearnerProfile = { // 构建学习者画像。
    learnerId: "learner-demo", // 学习者 ID。
    competencyLevel: "中等", // 掌握水平。
    learningGoal: "巩固一次函数与应用题", // 学习目标。
    preferredStyle: "讲解+计划" // 偏好。
  }; // 画像结束。

  const tasks: Array<LearningTask> = [ // 构建任务列表。
    { taskId: "T1", type: "annotation", description: "补充批注与错因分析", priority: 5 }, // 批注任务。
    { taskId: "T2", type: "analysis", description: "生成分步解析与知识点", priority: 4 }, // 解析任务。
    { taskId: "T3", type: "organization", description: "整理成 Markdown 笔记", priority: 3 }, // 整理任务。
    { taskId: "T4", type: "planning", description: "制定 3 日复盘计划", priority: 4, dueDate: new Date(Date.now() + 3 * 86400000).toISOString() } // 计划任务。
  ]; // 列表结束。

  const demoImagePath = `${process.cwd()}/samples/demo-note.txt`; // 指定示例“图片”路径。
  const context = await agent.buildContext(demoImagePath, learnerProfile, tasks); // 构建上下文。
  const pageIds = await agent.executeTasks(context); // 执行任务并获得页面 ID。
  console.log("debugging: pipeline finished", pageIds); // 输出结果。
}

// 调用 main 并捕获异常。
main().catch((error) => { // 捕获未处理异常。
  console.error("debugging: pipeline failed", error); // 输出错误。
  process.exitCode = 1; // 设置退出码。
});

```

```jsonc
// Root configuration object for registering MCP servers
{
  // Tracks the configuration schema so future tooling can validate it
  "version": 1,
  // Container for all MCP servers that the agent can launch
  "mcpServers": {
    // Logical name under which PaddleOCR MCP server is exposed
    "paddleocr": {
      // Absolute path to the paddleocr_mcp executable inside the agent conda env
      "command": "/opt/anaconda3/envs/paddle-agent/bin/paddleocr_mcp",
      // Arguments instructing the server to use the OCR pipeline with local PPOCR models on CPU
      "args": [
        // Flag selecting the pipeline type
        "--pipeline",
        // Pipeline value matching paddleocr_mcp --help output
        "OCR",
        // Flag specifying where PPOCR assets are loaded from
        "--ppocr_source",
        // Value telling the server to use the locally installed PaddleOCR weights
        "local",
        // Flag that allows picking the compute device (cpu/gpu)
        "--device",
        // Default device value to avoid GPU dependency when not available
        "cpu"
      ],
      // Environment variables passed to the MCP subprocess
      "env": {
        // Ensures consistent UTF-8 IO for OCR text results
        "PYTHONIOENCODING": "utf-8"
      },
      // Working directory so the server can read any local assets relative to the repo root
      "workingDirectory": "/Users/njx/Documents/git-projects/for-com-ate",
      // Timeout (in seconds) that the host should wait for initialization
      "timeoutSeconds": 120
    },
    // PP-Structure pipeline entry for page layout analysis
    "paddleocr-structure": {
      "command": "/opt/anaconda3/envs/paddle-agent/bin/paddleocr_mcp",
      "args": [
        "--pipeline",
        "PP-StructureV3",
        "--ppocr_source",
        "local",
        "--device",
        "cpu"
      ],
      "env": {
        "PYTHONIOENCODING": "utf-8"
      },
      "workingDirectory": "/Users/njx/Documents/git-projects/for-com-ate",
      "timeoutSeconds": 120
    },
    // Remote OCR via AI Studio using stdio transport
    "paddleocr-aistudio-stdio": {
      "command": "/opt/anaconda3/envs/paddle-agent/bin/paddleocr_mcp",
      "args": [
        "--pipeline",
        "OCR",
        "--ppocr_source",
        "aistudio",
        "--server_url",
        "https://aistudio.baidu.com/service/104583/pipeline",
        "--device",
        "cpu"
      ],
      "env": {
        "AISTUDIO_ACCESS_TOKEN": "${AISTUDIO_ACCESS_TOKEN}",
        "PYTHONIOENCODING": "utf-8"
      },
      "workingDirectory": "/Users/njx/Documents/git-projects/for-com-ate",
      "timeoutSeconds": 180
    },
    // Remote OCR served by AI Studio over HTTP transport for multi-client access
    "paddleocr-aistudio-http": {
      "command": "/opt/anaconda3/envs/paddle-agent/bin/paddleocr_mcp",
      "args": [
        "--pipeline",
        "OCR",
        "--ppocr_source",
        "aistudio",
        "--server_url",
        "https://aistudio.baidu.com/service/104583/pipeline",
        "--http",
        "--host",
        "127.0.0.1",
        "--port",
        "8088",
        "--device",
        "cpu"
      ],
      "env": {
        "AISTUDIO_ACCESS_TOKEN": "${AISTUDIO_ACCESS_TOKEN}",
        "PYTHONIOENCODING": "utf-8"
      },
      "workingDirectory": "/Users/njx/Documents/git-projects/for-com-ate",
      "timeoutSeconds": 180
    },
    // Self-hosted PaddleOCR service bridged over HTTP transport
    "paddleocr-self-hosted-http": {
      "command": "/opt/anaconda3/envs/paddle-agent/bin/paddleocr_mcp",
      "args": [
        "--pipeline",
        "OCR",
        "--ppocr_source",
        "self_hosted",
        "--server_url",
        "http://127.0.0.1:9000",
        "--http",
        "--host",
        "127.0.0.1",
        "--port",
        "8090",
        "--device",
        "cpu"
      ],
      "env": {
        "PYTHONIOENCODING": "utf-8"
      },
      "workingDirectory": "/Users/njx/Documents/git-projects/for-com-ate",
      "timeoutSeconds": 180
    },
    // Notion remote MCP (Streamable HTTP as recommended by Notion docs)
    "notion": {
      "url": "https://mcp.notion.com/mcp"
    },
    // Filesystem MCP server，参考 https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem
    "filesystem": {
      "command": "/usr/bin/env",
      "args": [
        "npx",
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "--root",
        "/Users/njx/Documents/git-projects/for-com-ate",
        "--mode",
        "readwrite"
      ],
      "env": {},
      "workingDirectory": "/Users/njx/Documents/git-projects/for-com-ate",
      "timeoutSeconds": 120
    }
  }
}


```

```typescript
/**
 * NotionPropertySchema 描述单个属性的名称、类型与用途。
 */
export interface NotionPropertySchema { // 定义 Notion 属性结构。
  name: string; // 属性名称。
  type: "title" | "rich_text" | "status" | "date" | "select" | "number"; // 属性类型。
  description: string; // 属性用途描述。
}

/**
 * NotionDatabaseSchema 描述数据库级别的元数据。
 */
export interface NotionDatabaseSchema { // 定义数据库结构体。
  databaseName: string; // 数据库名称。
  properties: Array<NotionPropertySchema>; // 属性列表。
  suggestedViews: Array<string>; // 建议视图。
  automationHooks: Array<string>; // 自动化钩子列表。
}

/**
 * 错题本数据库结构，覆盖题目、知识点、掌握度等字段。
 */
export const mistakeNotebookSchema: NotionDatabaseSchema = { // 导出错题本 schema。
  databaseName: "错题本", // 名称。
  properties: [ // 属性列表。
    { name: "题目", type: "title", description: "错题标题或题干摘要" }, // 属性 1。
    { name: "知识点", type: "select", description: "映射到教材知识点" }, // 属性 2。
    { name: "掌握度", type: "status", description: "未掌握/强化中/已掌握" }, // 属性 3。
    { name: "复盘日期", type: "date", description: "系统计算的下一次复盘时间" }, // 属性 4。
    { name: "难度系数", type: "number", description: "0-10 的主观难度" }, // 属性 5。
    { name: "任务链接", type: "rich_text", description: "生成的讲解页面链接" } // 属性 6。
  ], // 属性列表结束。
  suggestedViews: ["按知识点分组", "按复盘日期升序"], // 建议视图。
  automationHooks: ["复盘到期提醒", "掌握度变更触发下一任务"] // 自动化钩子。
};

/**
 * 学习计划数据库结构，聚焦时间线与完成状态。
 */
export const studyPlanSchema: NotionDatabaseSchema = { // 导出学习计划 schema。
  databaseName: "学习计划", // 名称。
  properties: [ // 属性列表。
    { name: "任务名称", type: "title", description: "计划项目名称" }, // 属性 1。
    { name: "任务类型", type: "select", description: "讲解/练习/复盘/考试" }, // 属性 2。
    { name: "状态", type: "status", description: "待开始/进行中/完成" }, // 属性 3。
    { name: "优先级", type: "select", description: "高/中/低" }, // 属性 4。
    { name: "开始日期", type: "date", description: "任务开始时间" }, // 属性 5。
    { name: "截止日期", type: "date", description: "任务截止时间" }, // 属性 6。
    { name: "关联错题", type: "rich_text", description: "指向错题本记录" } // 属性 7。
  ], // 属性结束。
  suggestedViews: ["时间线视图", "按状态看板"], // 建议视图。
  automationHooks: ["状态切换触发评论", "截止前一天提醒"] // 自动化钩子。
};

```

```typescript
import { LearningTask } from "../types"; // 引入学习任务类型。

/**
 * FeedbackRecord 表示一次用户反馈的数据结构。
 */
export interface FeedbackRecord { // 定义反馈记录。
  taskId: string; // 关联任务 ID。
  rating: number; // 0-5 评分。
  comment: string; // 文本评论。
  timestamp: string; // 时间戳。
}

/**
 * FeedbackLoopManager 负责简单的反馈聚合，指导下一轮策略。
 */
export class FeedbackLoopManager { // 定义反馈管理器。
  private readonly records: Array<FeedbackRecord> = []; // 存储反馈数组。

  /**
   * 记录反馈并输出调试日志。
   */
  recordFeedback(task: LearningTask, rating: number, comment: string): void { // 记录反馈方法。
    console.log("debugging: recordFeedback called", task.taskId); // 输出任务 ID。
    const entry: FeedbackRecord = { // 构造记录。
      taskId: task.taskId, // 任务 ID。
      rating, // 评分。
      comment, // 评论。
      timestamp: new Date().toISOString() // 时间戳。
    }; // 记录结束。
    this.records.push(entry); // 推入数组。
    console.log("debugging: total feedback count", this.records.length); // 输出当前总数。
  }

  /**
   * 计算平均评分，辅助策略调整。
   */
  getAverageRating(): number { // 计算平均值。
    console.log("debugging: computing average rating", this.records.length); // 输出条目数。
    if (this.records.length === 0) { // 判断是否有记录。
      return 0; // 无记录返回 0。
    } // 条件结束。
    const sum = this.records.reduce((acc, record) => acc + record.rating, 0); // 求和。
    const average = sum / this.records.length; // 计算平均。
    console.log("debugging: average rating value", average); // 输出平均值。
    return average; // 返回平均。
  }

  /**
   * 根据平均评分返回下一轮策略提示。
   */
  getStrategyNote(): string { // 生成策略说明。
    const avg = this.getAverageRating(); // 获取平均分。
    if (avg >= 4) { // 高分情况。
      return "保持当前策略，适度增加挑战难度。"; // 返回提示。
    } // 条件结束。
    if (avg >= 2.5) { // 中等情况。
      return "需要补充更多讲解细节并缩短反馈周期。"; // 返回提示。
    } // 条件结束。
    return "立即回顾提示模板与计划生成规则，查找痛点。"; // 低分情况。
  }
}

```

```typescript
import { LocalFilesystemClient } from "./clients/filesystem-client"; // 引入本地文件系统客户端。
import { MockPaddleOcrClient } from "./clients/paddleocr-client"; // 引入模拟 PaddleOCR 客户端。
import { MockNotionClient } from "./clients/notion-client"; // 引入模拟 Notion 客户端。
import { MockWenxinOrchestrator } from "./utils/wenxin-orchestrator"; // 引入模拟文心编排器。
import { LearningAgent } from "./workflow/learning-agent"; // 引入智能体类。
import { LearnerProfile, LearningTask } from "./types"; // 引入类型定义。
import { FeedbackLoopManager } from "./utils/feedback-loop"; // 引入反馈管理器。

/**
 * main 函数串联样例：读取 demo 文档，执行四种任务，并输出结果。
 */
async function main(): Promise<void> { // 定义主函数。
  console.log("debugging: main started"); // 输出调试信息。
  const filesystemClient = new LocalFilesystemClient(); // 实例化文件系统客户端。
  const ocrClient = new MockPaddleOcrClient(filesystemClient); // 实例化 OCR 客户端。
  const notionClient = new MockNotionClient(); // 实例化 Notion 客户端。
  const wenxinOrchestrator = new MockWenxinOrchestrator(); // 实例化文心编排器。
  const agent = new LearningAgent(ocrClient, notionClient, wenxinOrchestrator); // 创建智能体。
  const feedbackManager = new FeedbackLoopManager(); // 创建反馈管理器。

  const learnerProfile: LearnerProfile = { // 构建学习者画像。
    learnerId: "learner-demo", // 学习者 ID。
    competencyLevel: "中等", // 掌握水平。
    learningGoal: "巩固一次函数与应用题", // 学习目标。
    preferredStyle: "讲解+计划" // 偏好。
  }; // 画像结束。

  const tasks: Array<LearningTask> = [ // 构建任务列表。
    { taskId: "T1", type: "annotation", description: "补充批注与错因分析", priority: 5 }, // 批注任务。
    { taskId: "T2", type: "analysis", description: "生成分步解析与知识点", priority: 4 }, // 解析任务。
    { taskId: "T3", type: "organization", description: "整理成 Markdown 笔记", priority: 3 }, // 整理任务。
    { taskId: "T4", type: "planning", description: "制定 3 日复盘计划", priority: 4, dueDate: new Date(Date.now() + 3 * 86400000).toISOString() } // 计划任务。
  ]; // 列表结束。

  const demoImagePath = `${process.cwd()}/samples/demo-note.txt`; // 指定示例“图片”路径。
  const context = await agent.buildContext(demoImagePath, learnerProfile, tasks); // 构建上下文。
  const pageIds = await agent.executeTasks(context); // 执行任务并获得页面 ID。
  context.tasks.forEach((task, index) => { // 遍历任务。
    feedbackManager.recordFeedback(task, 4.5 - index * 0.5, `示例反馈：${task.description}`); // 记录示例反馈。
  }); // 循环结束。
  const strategyNote = feedbackManager.getStrategyNote(); // 计算策略建议。
  console.log("debugging: strategy note", strategyNote); // 输出策略建议。
  console.log("debugging: pipeline finished", pageIds); // 输出结果。
}

// 调用 main 并捕获异常。
main().catch((error) => { // 捕获未处理异常。
  console.error("debugging: pipeline failed", error); // 输出错误。
  process.exitCode = 1; // 设置退出码。
});


```

## 实施结果
- 扩展 `mcp-config.jsonc`，为本地 `filesystem` MCP 服务新增入口，指向 MCP 官方文件系统服务以支持多源资料读写流。[GitHub 文件系统服务器](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem)
- 构建 TypeScript 端到端流水线：`src/clients/*.ts` 负责 Filesystem/PaddleOCR/Notion 的抽象与调试日志，`src/workflow/learning-agent.ts` 将 OCR→策略→写回串联，`src/utils/wenxin-orchestrator.ts`、`src/utils/feedback-loop.ts`、`src/utils/notion-schema.ts` 分别覆盖文心提示模板、迭代机制与 Notion 数据库结构，保证错题本/学习计划字段齐全、符合 Notion MCP 所支持的工具能力。[Notion MCP 工具文档](https://developers.notion.com/docs/mcp-supported-tools)
- 提供可运行示例：`src/index.ts` 使用 `samples/demo-note.txt` 驱动整个流程，自动生成批注、解析、整理、计划四类任务，并基于反馈管理器产出下一轮策略提示。
- 初始化项目脚手架（`package.json`, `tsconfig.json`）与示例依赖，便于后续接入真实文心 4.5/Notion 凭证。

## 测试
- `npm run demo`
- `npm run build`

如需将 Mock 客户端替换为真实 MCP 会话，可在现有接口上接入文心 4.5 API、Notion MCP WebSocket/HTTP 通道，即可复用当前编排逻辑。

---

**User**

在哪里接入配置文心 4.5 API、notion的mcp、filesystem的mcp@Browser 



---

**Cursor**

### 接入位置一览

- **文心 4.5 API**：在 `src/utils/wenxin-orchestrator.ts` 里，当前用的是 `MockWenxinOrchestrator`。你可以：
  - 新建 `WenxinApiOrchestrator` 类，实现 `WenxinOrchestratorInterface` 的 `runTask`，在这里配置文心 4.5 的 API Key、Endpoint（例如放到 `.env`，通过 `process.env.WENXIN_API_KEY` 读取）。
  - 将 `src/index.ts` 中实例化部分替换为真实实现：`const wenxinOrchestrator = new WenxinApiOrchestrator(config);`
  - 这样 `LearningAgent` 会自动调用真实的推理服务。

- **Notion MCP**：接口定义在 `src/clients/notion-client.ts`。
  - 用真实 MCP 时，创建一个 `NotionMcpClient` 类，实现 `NotionClientInterface` 的 `createPage` / `updatePage` / `createComment`，内部通过 Notion 提供的 MCP 客户端 SDK（或 WebSocket/HTTP）调用 `notion-create-pages`、`notion-update-page`、`notion-create-comment` 等工具。
  - 在 `src/index.ts` 中把 `new MockNotionClient()` 换成 `new NotionMcpClient(notioConnection)`，并在初始化阶段建立与远端 MCP 的连接（例如 `await NotionClient.connect(configFrom mcp-config.jsonc)`）。

- **Filesystem MCP**：配置已经写在 `mcp-config.jsonc` 的 `filesystem` 条目（`npx @modelcontextprotocol/server-filesystem ...`）。
  - 如果要让智能体通过 MCP 而非直接 `fs` 访问文件，可在 `src/clients/filesystem-client.ts` 里添加 `FilesystemMcpClient`，实现 `FilesystemClientInterface` 的 `readBinary`，内部调用 MCP 的 `filesystem.read` 或等价工具。
  - 在 `src/index.ts` 中，将 `LocalFilesystemClient` 更换为 MCP 版本即可复用其余逻辑。

### 建议的接入步骤
1. **加载配置**：在根目录创建 `.env` 或 `config.ts`，存放文心 Key、Notion Token、MCP Endpoint。
2. **封装真实 Client**：
   - `src/clients/paddleocr-client.ts`：保留 `Mock` 供本地测试，再新增 `PaddleOcrMcpClient`，内部利用 `mcp-config.jsonc` 中的 `paddleocr` 服务。
   - `src/clients/notion-client.ts`：新增 `NotionMcpClient`，通过 MCP 工具调用 `notion-search/fetch/create/update`。
   - `src/clients/filesystem-client.ts`：新增 `FilesystemMcpClient`，对接 `filesystem` 服务。
3. **切换入口**：在 `src/index.ts` 中根据环境变量决定使用 Mock 还是真实客户端，确保在生产环境下自动走 MCP+文心 4.5。
4. **Browser MCP**：若还需要网页资料，可在 `src/clients` 中再增加 `BrowserClient`，与 Browser MCP 建立通道，然后在 `LearningAgent` 的任务中注入。

这样即可在保持当前框架不变的前提下，逐步替换各组件为真实 MCP/文心实现。

---

**User**

https://zhuanlan.zhihu.com/p/1949858906638648552 请你按照这篇文章设定的提示词的结构和标准，并结合我们产品所要做的业务及其交互，输出对应的合理的提示词

---

**Cursor**

## 文心 4.5 智能体提示词（遵循角色/任务→核心原则→上下文→CoT→输出规范→Few-Shot 结构）

> 参考了提示词工程的结构与编写方法，采用“角色/任务 + 核心原则 + 上下文处理 + CoT + 输出规范 + Few-Shot”框架，确保模型按要求执行复杂学习场景任务。[来源](https://zhuanlan.zhihu.com/p/1949858906638648552)

---

### 1. 角色 & 任务
你是一名专注 K12/高校学习辅导的“文心 4.5 学习智能体”，需根据 OCR 解析的教材/作业内容与 Notion 数据库中的学习画像，完成批注、解析、整理、学习计划等多任务生成，并保证输出可直接写入 Notion。

### 2. 核心原则（不超过 3 条）
1. 任何结论或建议都必须引用 OCR 内容或 Notion 数据字段，避免凭空创作。
2. 同时满足“个性化”（结合学习者画像）与“结构化”（便于写入 Notion）的要求。
3. 优先生成可执行的学习动作，必要时明确提问以确认缺失信息。

### 3. 上下文处理
- **OCR 多格式输入**：包括 plain text、markdown、表格数据、按行切片及位置信息。对题干、解答、批注、教材摘要分别提炼。
- **学习者画像（Notion 数据库）**：包含 `competencyLevel`、`learningGoal`、`preferredStyle`、错题记录、复盘计划等。
- **任务清单**：每个任务含 `taskId`、`type`（annotation/analysis/organization/planning）、`description`、`priority`、`dueDate`。
- **上一轮反馈**：平均评分、典型评论、策略提示（例如“需要补充更多讲解细节并缩短反馈周期”）。
- 处理方式：先解析 OCR→结合画像→按任务顺序依次生成，必要时引用反馈调整语气或深度。

### 4. Chain of Thought（执行流程）
1. **识别任务类型**：annotation / analysis / organization / planning。
2. **抽取关键知识点**：结合 OCR spans，区分题干、解题过程、错误原因、知识点标签。
3. **匹配学习画像**：根据 competencyLevel、learningGoal、preferredStyle 调整讲解深度、语言风格。
4. **融合历史反馈**：若评分<4，则补充细节、增加问答或缩短复盘周期。
5. **生成结构化输出**：对应任务类型输出批注/解析/整理/计划模块，包含标题、分点说明、下一步行动、复盘时间。
6. **校验**：检查是否引用了明确证据、是否包含行动项与 Notion 属性，确认无遗漏。

### 5. 输出规范
- **统一 Markdown 段落**，适合直接写入 Notion 页面（标题用 `##`，要点用 `-`）。
- 必须包含以下字段：
  - `## 摘要`：80 字内概述任务成果。
  - `## 关键内容`：按任务类型列出要点（批注/解析/整理/计划）。
  - `## 行动与提醒`：列出可执行步骤、截止时间、复盘建议。
  - `## 关联属性`：以列表形式列出需写入 Notion 的属性，如 `priority`、`dueDate`、`knowledgePoint`。
- 严禁输出：与任务无关的闲聊、未引用上下文的猜测、非结构化长段落。

### 6. Few-Shot 示例
**示例 1：annotation 任务**
```
输入概要：OCR 显示一次函数求解，学生未解释增长率；画像显示“偏好讲解+计划”；反馈提示“增加细节”。
输出：
## 摘要
针对题干 1+1=? 的批注补充增长意义。
## 关键内容
- 批注：指出学生步骤正确，但需解释斜率 2 代表函数每增加 1 个 x，y 增加 2。
- 错因分析：缺少对实际应用的描述，复盘时需补写。
## 行动与提醒
- 本周内补写“斜率=增长率”小结。
- 复盘日期：2025-11-21。
## 关联属性
- priority: 5
- dueDate: 2025-11-21
- knowledgePoint: 一次函数斜率
```

**示例 2：planning 任务**
```
输入概要：OCR 提供一次函数练习；任务描述“制定 3 日复盘计划”；反馈提示“缩短反馈周期”。
输出：
## 摘要
制定 3 日复盘节奏，聚焦一次函数与增长解释。
## 关键内容
- D1：重写解题步骤，突出列方程→消元→结论。
- D2：将斜率意义整理成实际案例（速度/成本）。
- D3：自测 2 道变式题，记录错因。
## 行动与提醒
- 每天学习 30 分钟，完成后在 Notion 任务表标记。
- 复盘提醒：每天 20:00 自动评论提示。
## 关联属性
- priority: 4
- dueDate: 2025-11-21
- linkedMistake: M-10023
```

将以上提示词整段提供给文心 4.5，即可使其在学习辅导场景中按照规范生成高质量内容。

```plaintext
输入概要：OCR 显示一次函数求解，学生未解释增长率；画像显示“偏好讲解+计划”；反馈提示“增加细节”。
输出：
## 摘要
针对题干 1+1=? 的批注补充增长意义。
## 关键内容
- 批注：指出学生步骤正确，但需解释斜率 2 代表函数每增加 1 个 x，y 增加 2。
- 错因分析：缺少对实际应用的描述，复盘时需补写。
## 行动与提醒
- 本周内补写“斜率=增长率”小结。
- 复盘日期：2025-11-21。
## 关联属性
- priority: 5
- dueDate: 2025-11-21
- knowledgePoint: 一次函数斜率
```

```plaintext
输入概要：OCR 提供一次函数练习；任务描述“制定 3 日复盘计划”；反馈提示“缩短反馈周期”。
输出：
## 摘要
制定 3 日复盘节奏，聚焦一次函数与增长解释。
## 关键内容
- D1：重写解题步骤，突出列方程→消元→结论。
- D2：将斜率意义整理成实际案例（速度/成本）。
- D3：自测 2 道变式题，记录错因。
## 行动与提醒
- 每天学习 30 分钟，完成后在 Notion 任务表标记。
- 复盘提醒：每天 20:00 自动评论提示。
## 关联属性
- priority: 4
- dueDate: 2025-11-21
- linkedMistake: M-10023
```

---

**User**

@api.py 这是文心5.0模型的api文件，包括系统设置。请你利用其进行配置，将所有实例化部分替换成真实实现，调用真实的推理服务

---

**Cursor**

```json
{
  "name": "for-com-ate-learning-agent",
  "version": "0.1.0",
  "private": true,
  "type": "commonjs",
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "demo": "ts-node src/index.ts"
  },
  "dependencies": {
    "openai": "^4.72.0",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/node": "^22.7.4",
    "ts-node": "^10.9.2",
    "typescript": "^5.6.3"
  }
}


```

```typescript
import OpenAI from "openai"; // 引入 OpenAI SDK 以便调用文心 5.0 兼容接口。
import { AgentContext, LearningTask } from "../types"; // 引入智能体上下文与任务类型。
import { WenxinOrchestratorInterface } from "./wenxin-orchestrator"; // 引入既有的编排器接口定义。

// 默认的推理服务基础地址，匹配 api.py 中的 base_url。
const DEFAULT_BASE_URL = "https://aistudio.baidu.com/llm/lmapi/v3"; // 定义默认基础 URL。
// 默认使用的模型名称，与 api.py 一致，确保行为统一。
const DEFAULT_MODEL = "ernie-5.0-thinking-preview"; // 定义默认模型名称。

// 将系统提示词用模板字符串完整保留，确保和 api.py 中的设定一致。
const SYSTEM_PROMPT = `> 参考了提示词工程的结构与编写方法，采用“角色/任务 + 核心原则 + 上下文处理 + CoT + 输出规范 + Few-Shot”框架，确保模型按要求执行复杂学习场景任务。[来源](https://zhuanlan.zhihu.com/p/1949858906638648552)

---

### 1. 角色 & 任务
你是一名专注 K12/高校学习辅导的“文心 4.5 学习智能体”，需根据 OCR 解析的教材/作业内容与 Notion 数据库中的学习画像，完成批注、解析、整理、学习计划等多任务生成，并保证输出可直接写入 Notion。

### 2. 核心原则（不超过 3 条）
1. 任何结论或建议都必须引用 OCR 内容或 Notion 数据字段，避免凭空创作。
2. 同时满足“个性化”（结合学习者画像）与“结构化”（便于写入 Notion）的要求。
3. 优先生成可执行的学习动作，必要时明确提问以确认缺失信息。

### 3. 上下文处理
- **OCR 多格式输入**：包括 plain text、markdown、表格数据、按行切片及位置信息。对题干、解答、批注、教材摘要分别提炼。
- **学习者画像（Notion 数据库）**：包含 \`competencyLevel\`、\`learningGoal\`、\`preferredStyle\`、错题记录、复盘计划等。
- **任务清单**：每个任务含 \`taskId\`、\`type\`（annotation/analysis/organization/planning）、\`description\`、\`priority\`、\`dueDate\`。
- **上一轮反馈**：平均评分、典型评论、策略提示（例如“需要补充更多讲解细节并缩短反馈周期”）。
- 处理方式：先解析 OCR→结合画像→按任务顺序依次生成，必要时引用反馈调整语气或深度。

### 4. Chain of Thought（执行流程）
1. **识别任务类型**：annotation / analysis / organization / planning。
2. **抽取关键知识点**：结合 OCR spans，区分题干、解题过程、错误原因、知识点标签。
3. **匹配学习画像**：根据 competencyLevel、learningGoal、preferredStyle 调整讲解深度、语言风格。
4. **融合历史反馈**：若评分<4，则补充细节、增加问答或缩短复盘周期。
5. **生成结构化输出**：对应任务类型输出批注/解析/整理/计划模块，包含标题、分点说明、下一步行动、复盘时间。
6. **校验**：检查是否引用了明确证据、是否包含行动项与 Notion 属性，确认无遗漏。

### 5. 输出规范
- **统一 Markdown 段落**，适合直接写入 Notion 页面（标题用 \`##\`，要点用 \`-\`）。
- 必须包含以下字段：
  - \`## 摘要\`：80 字内概述任务成果。
  - \`## 关键内容\`：按任务类型列出要点（批注/解析/整理/计划）。
  - \`## 行动与提醒\`：列出可执行步骤、截止时间、复盘建议。
  - \`## 关联属性\`：以列表形式列出需写入 Notion 的属性，如 \`priority\`、\`dueDate\`、\`knowledgePoint\`。
- 严禁输出：与任务无关的闲聊、未引用上下文的猜测、非结构化长段落。

### 6. Few-Shot 示例
**示例 1：annotation 任务**
```
输入概要：OCR 显示一次函数求解，学生未解释增长率；画像显示“偏好讲解+计划”；反馈提示“增加细节”。
输出：
## 摘要
针对题干 1+1=? 的批注补充增长意义。
## 关键内容
- 批注：指出学生步骤正确，但需解释斜率 2 代表函数每增加 1 个 x，y 增加 2。
- 错因分析：缺少对实际应用的描述，复盘时需补写。
## 行动与提醒
- 本周内补写“斜率=增长率”小结。
- 复盘日期：2025-11-21。
## 关联属性
- priority: 5
- dueDate: 2025-11-21
- knowledgePoint: 一次函数斜率
```

**示例 2：planning 任务**
```
输入概要：OCR 提供一次函数练习；任务描述“制定 3 日复盘计划”；反馈提示“缩短反馈周期”。
输出：
## 摘要
制定 3 日复盘节奏，聚焦一次函数与增长解释。
## 关键内容
- D1：重写解题步骤，突出列方程→消元→结论。
- D2：将斜率意义整理成实际案例（速度/成本）。
- D3：自测 2 道变式题，记录错因。
## 行动与提醒
- 每天学习 30 分钟，完成后在 Notion 任务表标记。
- 复盘提醒：每天 20:00 自动评论提示。
## 关联属性
- priority: 4
- dueDate: 2025-11-21
- linkedMistake: M-10023
```

将以上提示词整段提供给文心 4.5，即可使其在学习辅导场景中按照规范生成高质量内容。`; // 定义系统提示词常量。

/**
 * WenxinApiOrchestrator 通过 OpenAI SDK 调用文心推理服务，替换 Mock 版本。
 */
export class WenxinApiOrchestrator implements WenxinOrchestratorInterface { // 定义真实的文心编排器实现。
  private readonly client: OpenAI; // 保存 OpenAI 客户端实例的私有字段。
  private readonly model: string; // 保存模型名称的私有字段。

  /**
   * 构造函数接收密钥、模型与可选自定义 baseURL。
   */
  constructor(options?: { apiKey?: string; baseUrl?: string; model?: string }) { // 构造函数定义。
    const apiKey = options?.apiKey ?? process.env.WENXIN_API_KEY; // 优先使用显式传入，其次读取环境变量。
    if (!apiKey) { // 检查密钥是否存在。
      throw new Error("缺少 WENXIN_API_KEY，请在环境变量中配置真实密钥。"); // 缺失时抛出友好异常。
    } // if 结束。
    const baseURL = options?.baseUrl ?? process.env.WENXIN_BASE_URL ?? DEFAULT_BASE_URL; // 解析基础 URL。
    this.model = options?.model ?? process.env.WENXIN_MODEL ?? DEFAULT_MODEL; // 解析模型名称。
    console.log("debugging: initializing WenxinApiOrchestrator", baseURL, this.model); // 输出初始化日志。
    this.client = new OpenAI({ apiKey, baseURL }); // 创建 OpenAI 客户端实例。
  }

  /**
   * runTask 会将上下文打包成用户提示词，并调用文心模型返回 Markdown。
   */
  async runTask(context: AgentContext, task: LearningTask): Promise<string> { // 实现接口方法。
    console.log("debugging: Wenxin API request start", task.taskId); // 输出任务起始日志。
    const userPrompt = this.buildUserPrompt(context, task); // 构造用户提示词。
    const response = await this.client.chat.completions.create({ // 调用文心推理接口。
      model: this.model, // 设置模型名称。
      messages: [ // 传入对话消息数组。
        { role: "system", content: SYSTEM_PROMPT }, // 系统消息沿用提示词模板。
        { role: "user", content: userPrompt } // 用户消息包含上下文信息。
      ],
      temperature: 0.35, // 设置温度，以兼顾稳定性与创造性。
      max_tokens: 2048, // 限制最大生成长度。
      extra_body: { web_search: { enable: true } } // 额外参数，开启内置搜索。
    }); // API 调用结束。
    const content = response.choices?.[0]?.message?.content?.trim(); // 提取第一条回复文本。
    if (!content) { // 若无内容则视为异常。
      throw new Error("文心 API 未返回任何内容，请检查输入或速率限制。"); // 抛出错误帮助排查。
    } // if 结束。
    console.log("debugging: Wenxin API request success", content.length); // 输出成功日志与长度。
    return content; // 返回 Markdown 内容。
  }

  /**
   * 根据上下文构造用户提示词，包含任务、学习者、OCR 结果等信息。
   */
  private buildUserPrompt(context: AgentContext, task: LearningTask): string { // 定义辅助方法。
    const spanPreview = JSON.stringify(context.ocrResult.spans.slice(0, 10)); // 取前 10 个文本片段作为预览。
    const tablePreview = JSON.stringify(context.ocrResult.tableData.slice(0, 5)); // 取前 5 行表格数据。
    const payloadLines = [ // 组合多段文本构成提示词。
      `<task>\n类型: ${task.type}\n描述: ${task.description}\n优先级: ${task.priority}\n截止: ${task.dueDate ?? "未设定"}\n</task>`, // 任务信息段。
      `<learner>\nID: ${context.learnerProfile.learnerId}\n水平: ${context.learnerProfile.competencyLevel}\n目标: ${context.learnerProfile.learningGoal}\n偏好: ${context.learnerProfile.preferredStyle}\n</learner>`, // 学习者信息段。
      `<ocr-plain>\n${context.ocrResult.plainText}\n</ocr-plain>`, // OCR 纯文本。
      `<ocr-markdown>\n${context.ocrResult.markdownText}\n</ocr-markdown>`, // OCR Markdown。
      `<ocr-table>\n${tablePreview}\n</ocr-table>`, // 表格预览。
      `<ocr-spans>\n${spanPreview}\n</ocr-spans>` // 文本片段预览。
    ]; // 数组结束。
    const prompt = payloadLines.join("\n\n"); // 用空行连接各段以提升可读性。
    console.log("debugging: built Wenxin user prompt length", prompt.length); // 输出提示词长度。
    return prompt; // 返回最终字符串。
  }
}

```

```typescript
import { LocalFilesystemClient } from "./clients/filesystem-client"; // 引入本地文件系统客户端。
import { MockPaddleOcrClient } from "./clients/paddleocr-client"; // 引入模拟 PaddleOCR 客户端。
import { MockNotionClient } from "./clients/notion-client"; // 引入模拟 Notion 客户端。
import { WenxinApiOrchestrator } from "./utils/wenxin-api-orchestrator"; // 引入真实文心编排器实现。
import { LearningAgent } from "./workflow/learning-agent"; // 引入智能体类。
import { LearnerProfile, LearningTask } from "./types"; // 引入类型定义。
import { FeedbackLoopManager } from "./utils/feedback-loop"; // 引入反馈管理器。

/**
 * main 函数串联样例：读取 demo 文档，执行四种任务，并输出结果。
 */
async function main(): Promise<void> { // 定义主函数。
  console.log("debugging: main started"); // 输出调试信息。
  const filesystemClient = new LocalFilesystemClient(); // 实例化文件系统客户端。
  const ocrClient = new MockPaddleOcrClient(filesystemClient); // 实例化 OCR 客户端。
  const notionClient = new MockNotionClient(); // 实例化 Notion 客户端。
  const wenxinOrchestrator = new WenxinApiOrchestrator(); // 实例化文心编排器，默认读取真实环境配置。
  const agent = new LearningAgent(ocrClient, notionClient, wenxinOrchestrator); // 创建智能体。
  const feedbackManager = new FeedbackLoopManager(); // 创建反馈管理器。

  const learnerProfile: LearnerProfile = { // 构建学习者画像。
    learnerId: "learner-demo", // 学习者 ID。
    competencyLevel: "中等", // 掌握水平。
    learningGoal: "巩固一次函数与应用题", // 学习目标。
    preferredStyle: "讲解+计划" // 偏好。
  }; // 画像结束。

  const tasks: Array<LearningTask> = [ // 构建任务列表。
    { taskId: "T1", type: "annotation", description: "补充批注与错因分析", priority: 5 }, // 批注任务。
    { taskId: "T2", type: "analysis", description: "生成分步解析与知识点", priority: 4 }, // 解析任务。
    { taskId: "T3", type: "organization", description: "整理成 Markdown 笔记", priority: 3 }, // 整理任务。
    { taskId: "T4", type: "planning", description: "制定 3 日复盘计划", priority: 4, dueDate: new Date(Date.now() + 3 * 86400000).toISOString() } // 计划任务。
  ]; // 列表结束。

  const demoImagePath = `${process.cwd()}/samples/demo-note.txt`; // 指定示例“图片”路径。
  const context = await agent.buildContext(demoImagePath, learnerProfile, tasks); // 构建上下文。
  const pageIds = await agent.executeTasks(context); // 执行任务并获得页面 ID。
  context.tasks.forEach((task, index) => { // 遍历任务。
    feedbackManager.recordFeedback(task, 4.5 - index * 0.5, `示例反馈：${task.description}`); // 记录示例反馈。
  }); // 循环结束。
  const strategyNote = feedbackManager.getStrategyNote(); // 计算策略建议。
  console.log("debugging: strategy note", strategyNote); // 输出策略建议。
  console.log("debugging: pipeline finished", pageIds); // 输出结果。
}

// 调用 main 并捕获异常。
main().catch((error) => { // 捕获未处理异常。
  console.error("debugging: pipeline failed", error); // 输出错误。
  process.exitCode = 1; // 设置退出码。
});


```

```typescript
import OpenAI from "openai"; // 引入 OpenAI SDK 以便调用文心 5.0 兼容接口。
import { AgentContext, LearningTask } from "../types"; // 引入智能体上下文与任务类型。
import { WenxinOrchestratorInterface } from "./wenxin-orchestrator"; // 引入既有的编排器接口定义。

// 默认的推理服务基础地址，匹配 api.py 中的 base_url。
const DEFAULT_BASE_URL = "https://aistudio.baidu.com/llm/lmapi/v3"; // 定义默认基础 URL。
// 默认使用的模型名称，与 api.py 一致，确保行为统一。
const DEFAULT_MODEL = "ernie-5.0-thinking-preview"; // 定义默认模型名称。

// 将系统提示词拆分成数组拼接，避免模板字符串中出现未转义的反引号。
const SYSTEM_PROMPT = [ // 定义系统提示词数组。
  "> 参考了提示词工程的结构与编写方法，采用“角色/任务 + 核心原则 + 上下文处理 + CoT + 输出规范 + Few-Shot”框架，确保模型按要求执行复杂学习场景任务。[来源](https://zhuanlan.zhihu.com/p/1949858906638648552)", // 行 1。
  "", // 空行用于分隔。
  "---", // 分隔线。
  "", // 空行。
  "### 1. 角色 & 任务", // 模块标题。
  "你是一名专注 K12/高校学习辅导的“文心 4.5 学习智能体”，需根据 OCR 解析的教材/作业内容与 Notion 数据库中的学习画像，完成批注、解析、整理、学习计划等多任务生成，并保证输出可直接写入 Notion。", // 角色与任务描述。
  "", // 空行。
  "### 2. 核心原则（不超过 3 条）", // 核心原则标题。
  "1. 任何结论或建议都必须引用 OCR 内容或 Notion 数据字段，避免凭空创作。", // 原则 1。
  "2. 同时满足“个性化”（结合学习者画像）与“结构化”（便于写入 Notion）的要求。", // 原则 2。
  "3. 优先生成可执行的学习动作，必要时明确提问以确认缺失信息。", // 原则 3。
  "", // 空行。
  "### 3. 上下文处理", // 上下文标题。
  "- **OCR 多格式输入**：包括 plain text、markdown、表格数据、按行切片及位置信息。对题干、解答、批注、教材摘要分别提炼。", // 上下文要点 1。
  "- **学习者画像（Notion 数据库）**：包含 `competencyLevel`、`learningGoal`、`preferredStyle`、错题记录、复盘计划等。", // 要点 2。
  "- **任务清单**：每个任务含 `taskId`、`type`（annotation/analysis/organization/planning）、`description`、`priority`、`dueDate`。", // 要点 3。
  "- **上一轮反馈**：平均评分、典型评论、策略提示（例如“需要补充更多讲解细节并缩短反馈周期”）。", // 要点 4。
  "- 处理方式：先解析 OCR→结合画像→按任务顺序依次生成，必要时引用反馈调整语气或深度。", // 要点 5。
  "", // 空行。
  "### 4. Chain of Thought（执行流程）", // CoT 标题。
  "1. **识别任务类型**：annotation / analysis / organization / planning。", // 步骤 1。
  "2. **抽取关键知识点**：结合 OCR spans，区分题干、解题过程、错误原因、知识点标签。", // 步骤 2。
  "3. **匹配学习画像**：根据 competencyLevel、learningGoal、preferredStyle 调整讲解深度、语言风格。", // 步骤 3。
  "4. **融合历史反馈**：若评分<4，则补充细节、增加问答或缩短复盘周期。", // 步骤 4。
  "5. **生成结构化输出**：对应任务类型输出批注/解析/整理/计划模块，包含标题、分点说明、下一步行动、复盘时间。", // 步骤 5。
  "6. **校验**：检查是否引用了明确证据、是否包含行动项与 Notion 属性，确认无遗漏。", // 步骤 6。
  "", // 空行。
  "### 5. 输出规范", // 输出规范标题。
  "- **统一 Markdown 段落**，适合直接写入 Notion 页面（标题用 `##`，要点用 `-`）。", // 输出规范 1。
  "- 必须包含以下字段：", // 输出规范 2 引导。
  "  - `## 摘要`：80 字内概述任务成果。", // 子项 1。
  "  - `## 关键内容`：按任务类型列出要点（批注/解析/整理/计划）。", // 子项 2。
  "  - `## 行动与提醒`：列出可执行步骤、截止时间、复盘建议。", // 子项 3。
  "  - `## 关联属性`：以列表形式列出需写入 Notion 的属性，如 `priority`、`dueDate`、`knowledgePoint`。", // 子项 4。
  "- 严禁输出：与任务无关的闲聊、未引用上下文的猜测、非结构化长段落。", // 输出规范 3。
  "", // 空行。
  "### 6. Few-Shot 示例", // 示例标题。
  "**示例 1：annotation 任务**", // 示例 1 标题。
  "```", // 代码块开始。
  "输入概要：OCR 显示一次函数求解，学生未解释增长率；画像显示“偏好讲解+计划”；反馈提示“增加细节”。", // 示例输入。
  "输出：", // 示例输出提示。
  "## 摘要", // 输出段落。
  "针对题干 1+1=? 的批注补充增长意义。", // 示例内容。
  "## 关键内容", // 小节。
  "- 批注：指出学生步骤正确，但需解释斜率 2 代表函数每增加 1 个 x，y 增加 2。", // 要点。
  "- 错因分析：缺少对实际应用的描述，复盘时需补写。", // 要点。
  "## 行动与提醒", // 小节。
  "- 本周内补写“斜率=增长率”小结。", // 要点。
  "- 复盘日期：2025-11-21。", // 要点。
  "## 关联属性", // 小节。
  "- priority: 5", // 属性。
  "- dueDate: 2025-11-21", // 属性。
  "- knowledgePoint: 一次函数斜率", // 属性。
  "```", // 代码块结束。
  "", // 空行。
  "**示例 2：planning 任务**", // 示例 2 标题。
  "```", // 代码块开始。
  "输入概要：OCR 提供一次函数练习；任务描述“制定 3 日复盘计划”；反馈提示“缩短反馈周期”。", // 示例输入。
  "输出：", // 提示。
  "## 摘要", // 小节。
  "制定 3 日复盘节奏，聚焦一次函数与增长解释。", // 内容。
  "## 关键内容", // 小节。
  "- D1：重写解题步骤，突出列方程→消元→结论。", // 要点。
  "- D2：将斜率意义整理成实际案例（速度/成本）。", // 要点。
  "- D3：自测 2 道变式题，记录错因。", // 要点。
  "## 行动与提醒", // 小节。
  "- 每天学习 30 分钟，完成后在 Notion 任务表标记。", // 要点。
  "- 复盘提醒：每天 20:00 自动评论提示。", // 要点。
  "## 关联属性", // 小节。
  "- priority: 4", // 属性。
  "- dueDate: 2025-11-21", // 属性。
  "- linkedMistake: M-10023", // 属性。
  "```", // 代码块结束。
  "", // 空行。
  "将以上提示词整段提供给文心 4.5，即可使其在学习辅导场景中按照规范生成高质量内容。" // 结语。
].join("\n"); // 将数组合并为单个字符串。

/**
 * WenxinApiOrchestrator 通过 OpenAI SDK 调用文心推理服务，替换 Mock 版本。
 */
export class WenxinApiOrchestrator implements WenxinOrchestratorInterface { // 定义真实的文心编排器实现。
  private readonly client: OpenAI; // 保存 OpenAI 客户端实例的私有字段。
  private readonly model: string; // 保存模型名称的私有字段。

  /**
   * 构造函数接收密钥、模型与可选自定义 baseURL。
   */
  constructor(options?: { apiKey?: string; baseUrl?: string; model?: string }) { // 构造函数定义。
    const apiKey = options?.apiKey ?? process.env.WENXIN_API_KEY; // 优先使用显式传入，其次读取环境变量。
    if (!apiKey) { // 检查密钥是否存在。
      throw new Error("缺少 WENXIN_API_KEY，请在环境变量中配置真实密钥。"); // 缺失时抛出友好异常。
    } // if 结束。
    const baseURL = options?.baseUrl ?? process.env.WENXIN_BASE_URL ?? DEFAULT_BASE_URL; // 解析基础 URL。
    this.model = options?.model ?? process.env.WENXIN_MODEL ?? DEFAULT_MODEL; // 解析模型名称。
    console.log("debugging: initializing WenxinApiOrchestrator", baseURL, this.model); // 输出初始化日志。
    this.client = new OpenAI({ apiKey, baseURL }); // 创建 OpenAI 客户端实例。
  }

  /**
   * runTask 会将上下文打包成用户提示词，并调用文心模型返回 Markdown。
   */
  async runTask(context: AgentContext, task: LearningTask): Promise<string> { // 实现接口方法。
    console.log("debugging: Wenxin API request start", task.taskId); // 输出任务起始日志。
    const userPrompt = this.buildUserPrompt(context, task); // 构造用户提示词。
    const response = await this.client.chat.completions.create({ // 调用文心推理接口。
      model: this.model, // 设置模型名称。
      messages: [ // 传入对话消息数组。
        { role: "system", content: SYSTEM_PROMPT }, // 系统消息沿用提示词模板。
        { role: "user", content: userPrompt } // 用户消息包含上下文信息。
      ],
      temperature: 0.35, // 设置温度，以兼顾稳定性与创造性。
      max_tokens: 2048, // 限制最大生成长度。
      extra_body: { web_search: { enable: true } } // 额外参数，开启内置搜索。
    }); // API 调用结束。
    const content = response.choices?.[0]?.message?.content?.trim(); // 提取第一条回复文本。
    if (!content) { // 若无内容则视为异常。
      throw new Error("文心 API 未返回任何内容，请检查输入或速率限制。"); // 抛出错误帮助排查。
    } // if 结束。
    console.log("debugging: Wenxin API request success", content.length); // 输出成功日志与长度。
    return content; // 返回 Markdown 内容。
  }

  /**
   * 根据上下文构造用户提示词，包含任务、学习者、OCR 结果等信息。
   */
  private buildUserPrompt(context: AgentContext, task: LearningTask): string { // 定义辅助方法。
    const spanPreview = JSON.stringify(context.ocrResult.spans.slice(0, 10)); // 取前 10 个文本片段作为预览。
    const tablePreview = JSON.stringify(context.ocrResult.tableData.slice(0, 5)); // 取前 5 行表格数据。
    const payloadLines = [ // 组合多段文本构成提示词。
      `<task>\n类型: ${task.type}\n描述: ${task.description}\n优先级: ${task.priority}\n截止: ${task.dueDate ?? "未设定"}\n</task>`, // 任务信息段。
      `<learner>\nID: ${context.learnerProfile.learnerId}\n水平: ${context.learnerProfile.competencyLevel}\n目标: ${context.learnerProfile.learningGoal}\n偏好: ${context.learnerProfile.preferredStyle}\n</learner>`, // 学习者信息段。
      `<ocr-plain>\n${context.ocrResult.plainText}\n</ocr-plain>`, // OCR 纯文本。
      `<ocr-markdown>\n${context.ocrResult.markdownText}\n</ocr-markdown>`, // OCR Markdown。
      `<ocr-table>\n${tablePreview}\n</ocr-table>`, // 表格预览。
      `<ocr-spans>\n${spanPreview}\n</ocr-spans>` // 文本片段预览。
    ]; // 数组结束。
    const prompt = payloadLines.join("\n\n"); // 用空行连接各段以提升可读性。
    console.log("debugging: built Wenxin user prompt length", prompt.length); // 输出提示词长度。
    return prompt; // 返回最终字符串。
  }
}


```

```typescript
import OpenAI from "openai"; // 引入 OpenAI SDK 以便调用文心 5.0 兼容接口。
import { AgentContext, LearningTask } from "../types"; // 引入智能体上下文与任务类型。
import { WenxinOrchestratorInterface } from "./wenxin-orchestrator"; // 引入既有的编排器接口定义。

// 默认的推理服务基础地址，匹配 api.py 中的 base_url。
const DEFAULT_BASE_URL = "https://aistudio.baidu.com/llm/lmapi/v3"; // 定义默认基础 URL。
// 默认使用的模型名称，与 api.py 一致，确保行为统一。
const DEFAULT_MODEL = "ernie-5.0-thinking-preview"; // 定义默认模型名称。

// 将系统提示词拆分成数组拼接，避免模板字符串中出现未转义的反引号。
const SYSTEM_PROMPT = [ // 定义系统提示词数组。
  "> 参考了提示词工程的结构与编写方法，采用“角色/任务 + 核心原则 + 上下文处理 + CoT + 输出规范 + Few-Shot”框架，确保模型按要求执行复杂学习场景任务。[来源](https://zhuanlan.zhihu.com/p/1949858906638648552)", // 行 1。
  "", // 空行用于分隔。
  "---", // 分隔线。
  "", // 空行。
  "### 1. 角色 & 任务", // 模块标题。
  "你是一名专注 K12/高校学习辅导的“文心 4.5 学习智能体”，需根据 OCR 解析的教材/作业内容与 Notion 数据库中的学习画像，完成批注、解析、整理、学习计划等多任务生成，并保证输出可直接写入 Notion。", // 角色与任务描述。
  "", // 空行。
  "### 2. 核心原则（不超过 3 条）", // 核心原则标题。
  "1. 任何结论或建议都必须引用 OCR 内容或 Notion 数据字段，避免凭空创作。", // 原则 1。
  "2. 同时满足“个性化”（结合学习者画像）与“结构化”（便于写入 Notion）的要求。", // 原则 2。
  "3. 优先生成可执行的学习动作，必要时明确提问以确认缺失信息。", // 原则 3。
  "", // 空行。
  "### 3. 上下文处理", // 上下文标题。
  "- **OCR 多格式输入**：包括 plain text、markdown、表格数据、按行切片及位置信息。对题干、解答、批注、教材摘要分别提炼。", // 上下文要点 1。
  "- **学习者画像（Notion 数据库）**：包含 `competencyLevel`、`learningGoal`、`preferredStyle`、错题记录、复盘计划等。", // 要点 2。
  "- **任务清单**：每个任务含 `taskId`、`type`（annotation/analysis/organization/planning）、`description`、`priority`、`dueDate`。", // 要点 3。
  "- **上一轮反馈**：平均评分、典型评论、策略提示（例如“需要补充更多讲解细节并缩短反馈周期”）。", // 要点 4。
  "- 处理方式：先解析 OCR→结合画像→按任务顺序依次生成，必要时引用反馈调整语气或深度。", // 要点 5。
  "", // 空行。
  "### 4. Chain of Thought（执行流程）", // CoT 标题。
  "1. **识别任务类型**：annotation / analysis / organization / planning。", // 步骤 1。
  "2. **抽取关键知识点**：结合 OCR spans，区分题干、解题过程、错误原因、知识点标签。", // 步骤 2。
  "3. **匹配学习画像**：根据 competencyLevel、learningGoal、preferredStyle 调整讲解深度、语言风格。", // 步骤 3。
  "4. **融合历史反馈**：若评分<4，则补充细节、增加问答或缩短复盘周期。", // 步骤 4。
  "5. **生成结构化输出**：对应任务类型输出批注/解析/整理/计划模块，包含标题、分点说明、下一步行动、复盘时间。", // 步骤 5。
  "6. **校验**：检查是否引用了明确证据、是否包含行动项与 Notion 属性，确认无遗漏。", // 步骤 6。
  "", // 空行。
  "### 5. 输出规范", // 输出规范标题。
  "- **统一 Markdown 段落**，适合直接写入 Notion 页面（标题用 `##`，要点用 `-`）。", // 输出规范 1。
  "- 必须包含以下字段：", // 输出规范 2 引导。
  "  - `## 摘要`：80 字内概述任务成果。", // 子项 1。
  "  - `## 关键内容`：按任务类型列出要点（批注/解析/整理/计划）。", // 子项 2。
  "  - `## 行动与提醒`：列出可执行步骤、截止时间、复盘建议。", // 子项 3。
  "  - `## 关联属性`：以列表形式列出需写入 Notion 的属性，如 `priority`、`dueDate`、`knowledgePoint`。", // 子项 4。
  "- 严禁输出：与任务无关的闲聊、未引用上下文的猜测、非结构化长段落。", // 输出规范 3。
  "", // 空行。
  "### 6. Few-Shot 示例", // 示例标题。
  "**示例 1：annotation 任务**", // 示例 1 标题。
  "```", // 代码块开始。
  "输入概要：OCR 显示一次函数求解，学生未解释增长率；画像显示“偏好讲解+计划”；反馈提示“增加细节”。", // 示例输入。
  "输出：", // 示例输出提示。
  "## 摘要", // 输出段落。
  "针对题干 1+1=? 的批注补充增长意义。", // 示例内容。
  "## 关键内容", // 小节。
  "- 批注：指出学生步骤正确，但需解释斜率 2 代表函数每增加 1 个 x，y 增加 2。", // 要点。
  "- 错因分析：缺少对实际应用的描述，复盘时需补写。", // 要点。
  "## 行动与提醒", // 小节。
  "- 本周内补写“斜率=增长率”小结。", // 要点。
  "- 复盘日期：2025-11-21。", // 要点。
  "## 关联属性", // 小节。
  "- priority: 5", // 属性。
  "- dueDate: 2025-11-21", // 属性。
  "- knowledgePoint: 一次函数斜率", // 属性。
  "```", // 代码块结束。
  "", // 空行。
  "**示例 2：planning 任务**", // 示例 2 标题。
  "```", // 代码块开始。
  "输入概要：OCR 提供一次函数练习；任务描述“制定 3 日复盘计划”；反馈提示“缩短反馈周期”。", // 示例输入。
  "输出：", // 提示。
  "## 摘要", // 小节。
  "制定 3 日复盘节奏，聚焦一次函数与增长解释。", // 内容。
  "## 关键内容", // 小节。
  "- D1：重写解题步骤，突出列方程→消元→结论。", // 要点。
  "- D2：将斜率意义整理成实际案例（速度/成本）。", // 要点。
  "- D3：自测 2 道变式题，记录错因。", // 要点。
  "## 行动与提醒", // 小节。
  "- 每天学习 30 分钟，完成后在 Notion 任务表标记。", // 要点。
  "- 复盘提醒：每天 20:00 自动评论提示。", // 要点。
  "## 关联属性", // 小节。
  "- priority: 4", // 属性。
  "- dueDate: 2025-11-21", // 属性。
  "- linkedMistake: M-10023", // 属性。
  "```", // 代码块结束。
  "", // 空行。
  "将以上提示词整段提供给文心 4.5，即可使其在学习辅导场景中按照规范生成高质量内容。" // 结语。
].join("\n"); // 将数组合并为单个字符串。

/**
 * WenxinApiOrchestrator 通过 OpenAI SDK 调用文心推理服务，替换 Mock 版本。
 */
export class WenxinApiOrchestrator implements WenxinOrchestratorInterface { // 定义真实的文心编排器实现。
  private readonly client: OpenAI; // 保存 OpenAI 客户端实例的私有字段。
  private readonly model: string; // 保存模型名称的私有字段。

  /**
   * 构造函数接收密钥、模型与可选自定义 baseURL。
   */
  constructor(options?: { apiKey?: string; baseUrl?: string; model?: string }) { // 构造函数定义。
    const apiKey = options?.apiKey ?? process.env.WENXIN_API_KEY; // 优先使用显式传入，其次读取环境变量。
    if (!apiKey) { // 检查密钥是否存在。
      throw new Error("缺少 WENXIN_API_KEY，请在环境变量中配置真实密钥。"); // 缺失时抛出友好异常。
    } // if 结束。
    const baseURL = options?.baseUrl ?? process.env.WENXIN_BASE_URL ?? DEFAULT_BASE_URL; // 解析基础 URL。
    this.model = options?.model ?? process.env.WENXIN_MODEL ?? DEFAULT_MODEL; // 解析模型名称。
    console.log("debugging: initializing WenxinApiOrchestrator", baseURL, this.model); // 输出初始化日志。
    this.client = new OpenAI({ apiKey, baseURL }); // 创建 OpenAI 客户端实例。
  }

  /**
   * runTask 会将上下文打包成用户提示词，并调用文心模型返回 Markdown。
   */
  async runTask(context: AgentContext, task: LearningTask): Promise<string> { // 实现接口方法。
    console.log("debugging: Wenxin API request start", task.taskId); // 输出任务起始日志。
    const userPrompt = this.buildUserPrompt(context, task); // 构造用户提示词。
    const response = await this.client.chat.completions.create( // 调用文心推理接口。
      { // 第一个参数是标准 OpenAI 请求体。
        model: this.model, // 设置模型名称。
        messages: [ // 传入对话消息数组。
          { role: "system", content: SYSTEM_PROMPT }, // 系统消息沿用提示词模板。
          { role: "user", content: userPrompt } // 用户消息包含上下文信息。
        ],
        temperature: 0.35, // 设置温度，以兼顾稳定性与创造性。
        max_tokens: 2048 // 限制最大生成长度。
      },
      { extra_body: { web_search: { enable: true } } } // 第二个参数传入扩展体以开启搜索。
    ); // API 调用结束。
    const content = response.choices?.[0]?.message?.content?.trim(); // 提取第一条回复文本。
    if (!content) { // 若无内容则视为异常。
      throw new Error("文心 API 未返回任何内容，请检查输入或速率限制。"); // 抛出错误帮助排查。
    } // if 结束。
    console.log("debugging: Wenxin API request success", content.length); // 输出成功日志与长度。
    return content; // 返回 Markdown 内容。
  }

  /**
   * 根据上下文构造用户提示词，包含任务、学习者、OCR 结果等信息。
   */
  private buildUserPrompt(context: AgentContext, task: LearningTask): string { // 定义辅助方法。
    const spanPreview = JSON.stringify(context.ocrResult.spans.slice(0, 10)); // 取前 10 个文本片段作为预览。
    const tablePreview = JSON.stringify(context.ocrResult.tableData.slice(0, 5)); // 取前 5 行表格数据。
    const payloadLines = [ // 组合多段文本构成提示词。
      `<task>\n类型: ${task.type}\n描述: ${task.description}\n优先级: ${task.priority}\n截止: ${task.dueDate ?? "未设定"}\n</task>`, // 任务信息段。
      `<learner>\nID: ${context.learnerProfile.learnerId}\n水平: ${context.learnerProfile.competencyLevel}\n目标: ${context.learnerProfile.learningGoal}\n偏好: ${context.learnerProfile.preferredStyle}\n</learner>`, // 学习者信息段。
      `<ocr-plain>\n${context.ocrResult.plainText}\n</ocr-plain>`, // OCR 纯文本。
      `<ocr-markdown>\n${context.ocrResult.markdownText}\n</ocr-markdown>`, // OCR Markdown。
      `<ocr-table>\n${tablePreview}\n</ocr-table>`, // 表格预览。
      `<ocr-spans>\n${spanPreview}\n</ocr-spans>` // 文本片段预览。
    ]; // 数组结束。
    const prompt = payloadLines.join("\n\n"); // 用空行连接各段以提升可读性。
    console.log("debugging: built Wenxin user prompt length", prompt.length); // 输出提示词长度。
    return prompt; // 返回最终字符串。
  }
}


```

```typescript
import OpenAI from "openai"; // 引入 OpenAI SDK 以便调用文心 5.0 兼容接口。
import { AgentContext, LearningTask } from "../types"; // 引入智能体上下文与任务类型。
import { WenxinOrchestratorInterface } from "./wenxin-orchestrator"; // 引入既有的编排器接口定义。

// 默认的推理服务基础地址，匹配 api.py 中的 base_url。
const DEFAULT_BASE_URL = "https://aistudio.baidu.com/llm/lmapi/v3"; // 定义默认基础 URL。
// 默认使用的模型名称，与 api.py 一致，确保行为统一。
const DEFAULT_MODEL = "ernie-5.0-thinking-preview"; // 定义默认模型名称。

// 将系统提示词拆分成数组拼接，避免模板字符串中出现未转义的反引号。
const SYSTEM_PROMPT = [ // 定义系统提示词数组。
  "> 参考了提示词工程的结构与编写方法，采用“角色/任务 + 核心原则 + 上下文处理 + CoT + 输出规范 + Few-Shot”框架，确保模型按要求执行复杂学习场景任务。[来源](https://zhuanlan.zhihu.com/p/1949858906638648552)", // 行 1。
  "", // 空行用于分隔。
  "---", // 分隔线。
  "", // 空行。
  "### 1. 角色 & 任务", // 模块标题。
  "你是一名专注 K12/高校学习辅导的“文心 4.5 学习智能体”，需根据 OCR 解析的教材/作业内容与 Notion 数据库中的学习画像，完成批注、解析、整理、学习计划等多任务生成，并保证输出可直接写入 Notion。", // 角色与任务描述。
  "", // 空行。
  "### 2. 核心原则（不超过 3 条）", // 核心原则标题。
  "1. 任何结论或建议都必须引用 OCR 内容或 Notion 数据字段，避免凭空创作。", // 原则 1。
  "2. 同时满足“个性化”（结合学习者画像）与“结构化”（便于写入 Notion）的要求。", // 原则 2。
  "3. 优先生成可执行的学习动作，必要时明确提问以确认缺失信息。", // 原则 3。
  "", // 空行。
  "### 3. 上下文处理", // 上下文标题。
  "- **OCR 多格式输入**：包括 plain text、markdown、表格数据、按行切片及位置信息。对题干、解答、批注、教材摘要分别提炼。", // 上下文要点 1。
  "- **学习者画像（Notion 数据库）**：包含 `competencyLevel`、`learningGoal`、`preferredStyle`、错题记录、复盘计划等。", // 要点 2。
  "- **任务清单**：每个任务含 `taskId`、`type`（annotation/analysis/organization/planning）、`description`、`priority`、`dueDate`。", // 要点 3。
  "- **上一轮反馈**：平均评分、典型评论、策略提示（例如“需要补充更多讲解细节并缩短反馈周期”）。", // 要点 4。
  "- 处理方式：先解析 OCR→结合画像→按任务顺序依次生成，必要时引用反馈调整语气或深度。", // 要点 5。
  "", // 空行。
  "### 4. Chain of Thought（执行流程）", // CoT 标题。
  "1. **识别任务类型**：annotation / analysis / organization / planning。", // 步骤 1。
  "2. **抽取关键知识点**：结合 OCR spans，区分题干、解题过程、错误原因、知识点标签。", // 步骤 2。
  "3. **匹配学习画像**：根据 competencyLevel、learningGoal、preferredStyle 调整讲解深度、语言风格。", // 步骤 3。
  "4. **融合历史反馈**：若评分<4，则补充细节、增加问答或缩短复盘周期。", // 步骤 4。
  "5. **生成结构化输出**：对应任务类型输出批注/解析/整理/计划模块，包含标题、分点说明、下一步行动、复盘时间。", // 步骤 5。
  "6. **校验**：检查是否引用了明确证据、是否包含行动项与 Notion 属性，确认无遗漏。", // 步骤 6。
  "", // 空行。
  "### 5. 输出规范", // 输出规范标题。
  "- **统一 Markdown 段落**，适合直接写入 Notion 页面（标题用 `##`，要点用 `-`）。", // 输出规范 1。
  "- 必须包含以下字段：", // 输出规范 2 引导。
  "  - `## 摘要`：80 字内概述任务成果。", // 子项 1。
  "  - `## 关键内容`：按任务类型列出要点（批注/解析/整理/计划）。", // 子项 2。
  "  - `## 行动与提醒`：列出可执行步骤、截止时间、复盘建议。", // 子项 3。
  "  - `## 关联属性`：以列表形式列出需写入 Notion 的属性，如 `priority`、`dueDate`、`knowledgePoint`。", // 子项 4。
  "- 严禁输出：与任务无关的闲聊、未引用上下文的猜测、非结构化长段落。", // 输出规范 3。
  "", // 空行。
  "### 6. Few-Shot 示例", // 示例标题。
  "**示例 1：annotation 任务**", // 示例 1 标题。
  "```", // 代码块开始。
  "输入概要：OCR 显示一次函数求解，学生未解释增长率；画像显示“偏好讲解+计划”；反馈提示“增加细节”。", // 示例输入。
  "输出：", // 示例输出提示。
  "## 摘要", // 输出段落。
  "针对题干 1+1=? 的批注补充增长意义。", // 示例内容。
  "## 关键内容", // 小节。
  "- 批注：指出学生步骤正确，但需解释斜率 2 代表函数每增加 1 个 x，y 增加 2。", // 要点。
  "- 错因分析：缺少对实际应用的描述，复盘时需补写。", // 要点。
  "## 行动与提醒", // 小节。
  "- 本周内补写“斜率=增长率”小结。", // 要点。
  "- 复盘日期：2025-11-21。", // 要点。
  "## 关联属性", // 小节。
  "- priority: 5", // 属性。
  "- dueDate: 2025-11-21", // 属性。
  "- knowledgePoint: 一次函数斜率", // 属性。
  "```", // 代码块结束。
  "", // 空行。
  "**示例 2：planning 任务**", // 示例 2 标题。
  "```", // 代码块开始。
  "输入概要：OCR 提供一次函数练习；任务描述“制定 3 日复盘计划”；反馈提示“缩短反馈周期”。", // 示例输入。
  "输出：", // 提示。
  "## 摘要", // 小节。
  "制定 3 日复盘节奏，聚焦一次函数与增长解释。", // 内容。
  "## 关键内容", // 小节。
  "- D1：重写解题步骤，突出列方程→消元→结论。", // 要点。
  "- D2：将斜率意义整理成实际案例（速度/成本）。", // 要点。
  "- D3：自测 2 道变式题，记录错因。", // 要点。
  "## 行动与提醒", // 小节。
  "- 每天学习 30 分钟，完成后在 Notion 任务表标记。", // 要点。
  "- 复盘提醒：每天 20:00 自动评论提示。", // 要点。
  "## 关联属性", // 小节。
  "- priority: 4", // 属性。
  "- dueDate: 2025-11-21", // 属性。
  "- linkedMistake: M-10023", // 属性。
  "```", // 代码块结束。
  "", // 空行。
  "将以上提示词整段提供给文心 4.5，即可使其在学习辅导场景中按照规范生成高质量内容。" // 结语。
].join("\n"); // 将数组合并为单个字符串。

/**
 * WenxinApiOrchestrator 通过 OpenAI SDK 调用文心推理服务，替换 Mock 版本。
 */
export class WenxinApiOrchestrator implements WenxinOrchestratorInterface { // 定义真实的文心编排器实现。
  private readonly client: OpenAI; // 保存 OpenAI 客户端实例的私有字段。
  private readonly model: string; // 保存模型名称的私有字段。

  /**
   * 构造函数接收密钥、模型与可选自定义 baseURL。
   */
  constructor(options?: { apiKey?: string; baseUrl?: string; model?: string }) { // 构造函数定义。
    const apiKey = options?.apiKey ?? process.env.WENXIN_API_KEY; // 优先使用显式传入，其次读取环境变量。
    if (!apiKey) { // 检查密钥是否存在。
      throw new Error("缺少 WENXIN_API_KEY，请在环境变量中配置真实密钥。"); // 缺失时抛出友好异常。
    } // if 结束。
    const baseURL = options?.baseUrl ?? process.env.WENXIN_BASE_URL ?? DEFAULT_BASE_URL; // 解析基础 URL。
    this.model = options?.model ?? process.env.WENXIN_MODEL ?? DEFAULT_MODEL; // 解析模型名称。
    console.log("debugging: initializing WenxinApiOrchestrator", baseURL, this.model); // 输出初始化日志。
    this.client = new OpenAI({ apiKey, baseURL }); // 创建 OpenAI 客户端实例。
  }

  /**
   * runTask 会将上下文打包成用户提示词，并调用文心模型返回 Markdown。
   */
  async runTask(context: AgentContext, task: LearningTask): Promise<string> { // 实现接口方法。
    console.log("debugging: Wenxin API request start", task.taskId); // 输出任务起始日志。
    const userPrompt = this.buildUserPrompt(context, task); // 构造用户提示词。
    const response = await this.client.chat.completions.create({ // 调用文心推理接口。
      model: this.model, // 设置模型名称。
      messages: [ // 传入对话消息数组。
        { role: "system", content: SYSTEM_PROMPT }, // 系统消息沿用提示词模板。
        { role: "user", content: userPrompt } // 用户消息包含上下文信息。
      ],
      temperature: 0.35, // 设置温度，以兼顾稳定性与创造性。
      max_tokens: 2048 // 限制最大生成长度。
    }); // API 调用结束。
    const content = response.choices?.[0]?.message?.content?.trim(); // 提取第一条回复文本。
    if (!content) { // 若无内容则视为异常。
      throw new Error("文心 API 未返回任何内容，请检查输入或速率限制。"); // 抛出错误帮助排查。
    } // if 结束。
    console.log("debugging: Wenxin API request success", content.length); // 输出成功日志与长度。
    return content; // 返回 Markdown 内容。
  }

  /**
   * 根据上下文构造用户提示词，包含任务、学习者、OCR 结果等信息。
   */
  private buildUserPrompt(context: AgentContext, task: LearningTask): string { // 定义辅助方法。
    const spanPreview = JSON.stringify(context.ocrResult.spans.slice(0, 10)); // 取前 10 个文本片段作为预览。
    const tablePreview = JSON.stringify(context.ocrResult.tableData.slice(0, 5)); // 取前 5 行表格数据。
    const payloadLines = [ // 组合多段文本构成提示词。
      `<task>\n类型: ${task.type}\n描述: ${task.description}\n优先级: ${task.priority}\n截止: ${task.dueDate ?? "未设定"}\n</task>`, // 任务信息段。
      `<learner>\nID: ${context.learnerProfile.learnerId}\n水平: ${context.learnerProfile.competencyLevel}\n目标: ${context.learnerProfile.learningGoal}\n偏好: ${context.learnerProfile.preferredStyle}\n</learner>`, // 学习者信息段。
      `<ocr-plain>\n${context.ocrResult.plainText}\n</ocr-plain>`, // OCR 纯文本。
      `<ocr-markdown>\n${context.ocrResult.markdownText}\n</ocr-markdown>`, // OCR Markdown。
      `<ocr-table>\n${tablePreview}\n</ocr-table>`, // 表格预览。
      `<ocr-spans>\n${spanPreview}\n</ocr-spans>` // 文本片段预览。
    ]; // 数组结束。
    const prompt = payloadLines.join("\n\n"); // 用空行连接各段以提升可读性。
    console.log("debugging: built Wenxin user prompt length", prompt.length); // 输出提示词长度。
    return prompt; // 返回最终字符串。
  }
}


```

```typescript
import OpenAI from "openai"; // 引入 OpenAI SDK 以便调用文心 5.0 兼容接口。
import { AgentContext, LearningTask } from "../types"; // 引入智能体上下文与任务类型。
import { WenxinOrchestratorInterface } from "./wenxin-orchestrator"; // 引入既有的编排器接口定义。

// 默认的推理服务基础地址，匹配 api.py 中的 base_url。
const DEFAULT_BASE_URL = "https://aistudio.baidu.com/llm/lmapi/v3"; // 定义默认基础 URL。
// 默认使用的模型名称，与 api.py 一致，确保行为统一。
const DEFAULT_MODEL = "ernie-5.0-thinking-preview"; // 定义默认模型名称。

// 将系统提示词拆分成数组拼接，避免模板字符串中出现未转义的反引号。
const SYSTEM_PROMPT = [ // 定义系统提示词数组。
  "> 参考了提示词工程的结构与编写方法，采用“角色/任务 + 核心原则 + 上下文处理 + CoT + 输出规范 + Few-Shot”框架，确保模型按要求执行复杂学习场景任务。[来源](https://zhuanlan.zhihu.com/p/1949858906638648552)", // 行 1。
  "", // 空行用于分隔。
  "---", // 分隔线。
  "", // 空行。
  "### 1. 角色 & 任务", // 模块标题。
  "你是一名专注 K12/高校学习辅导的“文心 4.5 学习智能体”，需根据 OCR 解析的教材/作业内容与 Notion 数据库中的学习画像，完成批注、解析、整理、学习计划等多任务生成，并保证输出可直接写入 Notion。", // 角色与任务描述。
  "", // 空行。
  "### 2. 核心原则（不超过 3 条）", // 核心原则标题。
  "1. 任何结论或建议都必须引用 OCR 内容或 Notion 数据字段，避免凭空创作。", // 原则 1。
  "2. 同时满足“个性化”（结合学习者画像）与“结构化”（便于写入 Notion）的要求。", // 原则 2。
  "3. 优先生成可执行的学习动作，必要时明确提问以确认缺失信息。", // 原则 3。
  "", // 空行。
  "### 3. 上下文处理", // 上下文标题。
  "- **OCR 多格式输入**：包括 plain text、markdown、表格数据、按行切片及位置信息。对题干、解答、批注、教材摘要分别提炼。", // 上下文要点 1。
  "- **学习者画像（Notion 数据库）**：包含 `competencyLevel`、`learningGoal`、`preferredStyle`、错题记录、复盘计划等。", // 要点 2。
  "- **任务清单**：每个任务含 `taskId`、`type`（annotation/analysis/organization/planning）、`description`、`priority`、`dueDate`。", // 要点 3。
  "- **上一轮反馈**：平均评分、典型评论、策略提示（例如“需要补充更多讲解细节并缩短反馈周期”）。", // 要点 4。
  "- 处理方式：先解析 OCR→结合画像→按任务顺序依次生成，必要时引用反馈调整语气或深度。", // 要点 5。
  "", // 空行。
  "### 4. Chain of Thought（执行流程）", // CoT 标题。
  "1. **识别任务类型**：annotation / analysis / organization / planning。", // 步骤 1。
  "2. **抽取关键知识点**：结合 OCR spans，区分题干、解题过程、错误原因、知识点标签。", // 步骤 2。
  "3. **匹配学习画像**：根据 competencyLevel、learningGoal、preferredStyle 调整讲解深度、语言风格。", // 步骤 3。
  "4. **融合历史反馈**：若评分<4，则补充细节、增加问答或缩短复盘周期。", // 步骤 4。
  "5. **生成结构化输出**：对应任务类型输出批注/解析/整理/计划模块，包含标题、分点说明、下一步行动、复盘时间。", // 步骤 5。
  "6. **校验**：检查是否引用了明确证据、是否包含行动项与 Notion 属性，确认无遗漏。", // 步骤 6。
  "", // 空行。
  "### 5. 输出规范", // 输出规范标题。
  "- **统一 Markdown 段落**，适合直接写入 Notion 页面（标题用 `##`，要点用 `-`）。", // 输出规范 1。
  "- 必须包含以下字段：", // 输出规范 2 引导。
  "  - `## 摘要`：80 字内概述任务成果。", // 子项 1。
  "  - `## 关键内容`：按任务类型列出要点（批注/解析/整理/计划）。", // 子项 2。
  "  - `## 行动与提醒`：列出可执行步骤、截止时间、复盘建议。", // 子项 3。
  "  - `## 关联属性`：以列表形式列出需写入 Notion 的属性，如 `priority`、`dueDate`、`knowledgePoint`。", // 子项 4。
  "- 严禁输出：与任务无关的闲聊、未引用上下文的猜测、非结构化长段落。", // 输出规范 3。
  "", // 空行。
  "### 6. Few-Shot 示例", // 示例标题。
  "**示例 1：annotation 任务**", // 示例 1 标题。
  "```", // 代码块开始。
  "输入概要：OCR 显示一次函数求解，学生未解释增长率；画像显示“偏好讲解+计划”；反馈提示“增加细节”。", // 示例输入。
  "输出：", // 示例输出提示。
  "## 摘要", // 输出段落。
  "针对题干 1+1=? 的批注补充增长意义。", // 示例内容。
  "## 关键内容", // 小节。
  "- 批注：指出学生步骤正确，但需解释斜率 2 代表函数每增加 1 个 x，y 增加 2。", // 要点。
  "- 错因分析：缺少对实际应用的描述，复盘时需补写。", // 要点。
  "## 行动与提醒", // 小节。
  "- 本周内补写“斜率=增长率”小结。", // 要点。
  "- 复盘日期：2025-11-21。", // 要点。
  "## 关联属性", // 小节。
  "- priority: 5", // 属性。
  "- dueDate: 2025-11-21", // 属性。
  "- knowledgePoint: 一次函数斜率", // 属性。
  "```", // 代码块结束。
  "", // 空行。
  "**示例 2：planning 任务**", // 示例 2 标题。
  "```", // 代码块开始。
  "输入概要：OCR 提供一次函数练习；任务描述“制定 3 日复盘计划”；反馈提示“缩短反馈周期”。", // 示例输入。
  "输出：", // 提示。
  "## 摘要", // 小节。
  "制定 3 日复盘节奏，聚焦一次函数与增长解释。", // 内容。
  "## 关键内容", // 小节。
  "- D1：重写解题步骤，突出列方程→消元→结论。", // 要点。
  "- D2：将斜率意义整理成实际案例（速度/成本）。", // 要点。
  "- D3：自测 2 道变式题，记录错因。", // 要点。
  "## 行动与提醒", // 小节。
  "- 每天学习 30 分钟，完成后在 Notion 任务表标记。", // 要点。
  "- 复盘提醒：每天 20:00 自动评论提示。", // 要点。
  "## 关联属性", // 小节。
  "- priority: 4", // 属性。
  "- dueDate: 2025-11-21", // 属性。
  "- linkedMistake: M-10023", // 属性。
  "```", // 代码块结束。
  "", // 空行。 // 结语。
].join("\n"); // 将数组合并为单个字符串。

/**
 * WenxinApiOrchestrator 通过 OpenAI SDK 调用文心推理服务，替换 Mock 版本。
 */
export class WenxinApiOrchestrator implements WenxinOrchestratorInterface { // 定义真实的文心编排器实现。
  private readonly client: OpenAI; // 保存 OpenAI 客户端实例的私有字段。
  private readonly model: string; // 保存模型名称的私有字段。

  /**
   * 构造函数接收密钥、模型与可选自定义 baseURL。
   */
  constructor(options?: { apiKey?: string; baseUrl?: string; model?: string }) { // 构造函数定义。
    const apiKey = options?.apiKey ?? process.env.WENXIN_API_KEY; // 优先使用显式传入，其次读取环境变量。
    if (!apiKey) { // 检查密钥是否存在。
      throw new Error("缺少 WENXIN_API_KEY，请在环境变量中配置真实密钥。"); // 缺失时抛出友好异常。
    } // if 结束。
    const baseURL = options?.baseUrl ?? process.env.WENXIN_BASE_URL ?? DEFAULT_BASE_URL; // 解析基础 URL。
    this.model = options?.model ?? process.env.WENXIN_MODEL ?? DEFAULT_MODEL; // 解析模型名称。
    console.log("debugging: initializing WenxinApiOrchestrator", baseURL, this.model); // 输出初始化日志。
    this.client = new OpenAI({ apiKey, baseURL }); // 创建 OpenAI 客户端实例。
  }

  /**
   * runTask 会将上下文打包成用户提示词，并调用文心模型返回 Markdown。
   */
  async runTask(context: AgentContext, task: LearningTask): Promise<string> { // 实现接口方法。
    console.log("debugging: Wenxin API request start", task.taskId); // 输出任务起始日志。
    const userPrompt = this.buildUserPrompt(context, task); // 构造用户提示词。
    const response = await this.client.chat.completions.create({ // 调用文心推理接口。
      model: this.model, // 设置模型名称。
      messages: [ // 传入对话消息数组。
        { role: "system", content: SYSTEM_PROMPT }, // 系统消息沿用提示词模板。
        { role: "user", content: userPrompt } // 用户消息包含上下文信息。
      ],
      temperature: 0.35, // 设置温度，以兼顾稳定性与创造性。
      max_completion_tokens: 2048 // 限制最大生成长度，沿用 API 要求字段。
    }); // API 调用结束。
    const content = response.choices?.[0]?.message?.content?.trim(); // 提取第一条回复文本。
    if (!content) { // 若无内容则视为异常。
      throw new Error("文心 API 未返回任何内容，请检查输入或速率限制。"); // 抛出错误帮助排查。
    } // if 结束。
    console.log("debugging: Wenxin API request success", content.length); // 输出成功日志与长度。
    return content; // 返回 Markdown 内容。
  }

  /**
   * 根据上下文构造用户提示词，包含任务、学习者、OCR 结果等信息。
   */
  private buildUserPrompt(context: AgentContext, task: LearningTask): string { // 定义辅助方法。
    const spanPreview = JSON.stringify(context.ocrResult.spans.slice(0, 10)); // 取前 10 个文本片段作为预览。
    const tablePreview = JSON.stringify(context.ocrResult.tableData.slice(0, 5)); // 取前 5 行表格数据。
    const payloadLines = [ // 组合多段文本构成提示词。
      `<task>\n类型: ${task.type}\n描述: ${task.description}\n优先级: ${task.priority}\n截止: ${task.dueDate ?? "未设定"}\n</task>`, // 任务信息段。
      `<learner>\nID: ${context.learnerProfile.learnerId}\n水平: ${context.learnerProfile.competencyLevel}\n目标: ${context.learnerProfile.learningGoal}\n偏好: ${context.learnerProfile.preferredStyle}\n</learner>`, // 学习者信息段。
      `<ocr-plain>\n${context.ocrResult.plainText}\n</ocr-plain>`, // OCR 纯文本。
      `<ocr-markdown>\n${context.ocrResult.markdownText}\n</ocr-markdown>`, // OCR Markdown。
      `<ocr-table>\n${tablePreview}\n</ocr-table>`, // 表格预览。
      `<ocr-spans>\n${spanPreview}\n</ocr-spans>` // 文本片段预览。
    ]; // 数组结束。
    const prompt = payloadLines.join("\n\n"); // 用空行连接各段以提升可读性。
    console.log("debugging: built Wenxin user prompt length", prompt.length); // 输出提示词长度。
    return prompt; // 返回最终字符串。
  }
}


```

```typescript
import OpenAI from "openai"; // 引入 OpenAI SDK 以便调用文心 5.0 兼容接口。
import { AgentContext, LearningTask } from "../types"; // 引入智能体上下文与任务类型。
import { WenxinOrchestratorInterface } from "./wenxin-orchestrator"; // 引入既有的编排器接口定义。

// 默认的推理服务基础地址，匹配 api.py 中的 base_url。
const DEFAULT_BASE_URL = "https://aistudio.baidu.com/llm/lmapi/v3"; // 定义默认基础 URL。
// 默认使用的模型名称，与 api.py 一致，确保行为统一。
const DEFAULT_MODEL = "ernie-5.0-thinking-preview"; // 定义默认模型名称。

// 将系统提示词拆分成数组拼接，避免模板字符串中出现未转义的反引号。
const SYSTEM_PROMPT = [ // 定义系统提示词数组。
  "> 参考了提示词工程的结构与编写方法，采用“角色/任务 + 核心原则 + 上下文处理 + CoT + 输出规范 + Few-Shot”框架，确保模型按要求执行复杂学习场景任务。[来源](https://zhuanlan.zhihu.com/p/1949858906638648552)", // 行 1。
  "", // 空行用于分隔。
  "---", // 分隔线。
  "", // 空行。
  "### 1. 角色 & 任务", // 模块标题。
  "你是一名专注 K12/高校学习辅导的“文心 4.5 学习智能体”，需根据 OCR 解析的教材/作业内容与 Notion 数据库中的学习画像，完成批注、解析、整理、学习计划等多任务生成，并保证输出可直接写入 Notion。", // 角色与任务描述。
  "", // 空行。
  "### 2. 核心原则（不超过 3 条）", // 核心原则标题。
  "1. 任何结论或建议都必须引用 OCR 内容或 Notion 数据字段，避免凭空创作。", // 原则 1。
  "2. 同时满足“个性化”（结合学习者画像）与“结构化”（便于写入 Notion）的要求。", // 原则 2。
  "3. 优先生成可执行的学习动作，必要时明确提问以确认缺失信息。", // 原则 3。
  "", // 空行。
  "### 3. 上下文处理", // 上下文标题。
  "- **OCR 多格式输入**：包括 plain text、markdown、表格数据、按行切片及位置信息。对题干、解答、批注、教材摘要分别提炼。", // 上下文要点 1。
  "- **学习者画像（Notion 数据库）**：包含 `competencyLevel`、`learningGoal`、`preferredStyle`、错题记录、复盘计划等。", // 要点 2。
  "- **任务清单**：每个任务含 `taskId`、`type`（annotation/analysis/organization/planning）、`description`、`priority`、`dueDate`。", // 要点 3。
  "- **上一轮反馈**：平均评分、典型评论、策略提示（例如“需要补充更多讲解细节并缩短反馈周期”）。", // 要点 4。
  "- 处理方式：先解析 OCR→结合画像→按任务顺序依次生成，必要时引用反馈调整语气或深度。", // 要点 5。
  "", // 空行。
  "### 4. Chain of Thought（执行流程）", // CoT 标题。
  "1. **识别任务类型**：annotation / analysis / organization / planning。", // 步骤 1。
  "2. **抽取关键知识点**：结合 OCR spans，区分题干、解题过程、错误原因、知识点标签。", // 步骤 2。
  "3. **匹配学习画像**：根据 competencyLevel、learningGoal、preferredStyle 调整讲解深度、语言风格。", // 步骤 3。
  "4. **融合历史反馈**：若评分<4，则补充细节、增加问答或缩短复盘周期。", // 步骤 4。
  "5. **生成结构化输出**：对应任务类型输出批注/解析/整理/计划模块，包含标题、分点说明、下一步行动、复盘时间。", // 步骤 5。
  "6. **校验**：检查是否引用了明确证据、是否包含行动项与 Notion 属性，确认无遗漏。", // 步骤 6。
  "", // 空行。
  "### 5. 输出规范", // 输出规范标题。
  "- **统一 Markdown 段落**，适合直接写入 Notion 页面（标题用 `##`，要点用 `-`）。", // 输出规范 1。
  "- 必须包含以下字段：", // 输出规范 2 引导。
  "  - `## 摘要`：80 字内概述任务成果。", // 子项 1。
  "  - `## 关键内容`：按任务类型列出要点（批注/解析/整理/计划）。", // 子项 2。
  "  - `## 行动与提醒`：列出可执行步骤、截止时间、复盘建议。", // 子项 3。
  "  - `## 关联属性`：以列表形式列出需写入 Notion 的属性，如 `priority`、`dueDate`、`knowledgePoint`。", // 子项 4。
  "- 严禁输出：与任务无关的闲聊、未引用上下文的猜测、非结构化长段落。", // 输出规范 3。
  "", // 空行。
  "### 6. Few-Shot 示例", // 示例标题。
  "**示例 1：annotation 任务**", // 示例 1 标题。
  "```", // 代码块开始。
  "输入概要：OCR 显示一次函数求解，学生未解释增长率；画像显示“偏好讲解+计划”；反馈提示“增加细节”。", // 示例输入。
  "输出：", // 示例输出提示。
  "## 摘要", // 输出段落。
  "针对题干 1+1=? 的批注补充增长意义。", // 示例内容。
  "## 关键内容", // 小节。
  "- 批注：指出学生步骤正确，但需解释斜率 2 代表函数每增加 1 个 x，y 增加 2。", // 要点。
  "- 错因分析：缺少对实际应用的描述，复盘时需补写。", // 要点。
  "## 行动与提醒", // 小节。
  "- 本周内补写“斜率=增长率”小结。", // 要点。
  "- 复盘日期：2025-11-21。", // 要点。
  "## 关联属性", // 小节。
  "- priority: 5", // 属性。
  "- dueDate: 2025-11-21", // 属性。
  "- knowledgePoint: 一次函数斜率", // 属性。
  "```", // 代码块结束。
  "", // 空行。
  "**示例 2：planning 任务**", // 示例 2 标题。
  "```", // 代码块开始。
  "输入概要：OCR 提供一次函数练习；任务描述“制定 3 日复盘计划”；反馈提示“缩短反馈周期”。", // 示例输入。
  "输出：", // 提示。
  "## 摘要", // 小节。
  "制定 3 日复盘节奏，聚焦一次函数与增长解释。", // 内容。
  "## 关键内容", // 小节。
  "- D1：重写解题步骤，突出列方程→消元→结论。", // 要点。
  "- D2：将斜率意义整理成实际案例（速度/成本）。", // 要点。
  "- D3：自测 2 道变式题，记录错因。", // 要点。
  "## 行动与提醒", // 小节。
  "- 每天学习 30 分钟，完成后在 Notion 任务表标记。", // 要点。
  "- 复盘提醒：每天 20:00 自动评论提示。", // 要点。
  "## 关联属性", // 小节。
  "- priority: 4", // 属性。
  "- dueDate: 2025-11-21", // 属性。
  "- linkedMistake: M-10023", // 属性。
  "```", // 代码块结束。
  "", // 空行。
  "将以上提示词整段提供给文心 4.5，即可使其在学习辅导场景中按照规范生成高质量内容。" // 结语。
].join("\n"); // 将数组合并为单个字符串。

/**
 * WenxinApiOrchestrator 通过 OpenAI SDK 调用文心推理服务，替换 Mock 版本。
 */
export class WenxinApiOrchestrator implements WenxinOrchestratorInterface { // 定义真实的文心编排器实现。
  private readonly client: OpenAI; // 保存 OpenAI 客户端实例的私有字段。
  private readonly model: string; // 保存模型名称的私有字段。

  /**
   * 构造函数接收密钥、模型与可选自定义 baseURL。
   */
  constructor(options?: { apiKey?: string; baseUrl?: string; model?: string }) { // 构造函数定义。
    const apiKey = options?.apiKey ?? process.env.WENXIN_API_KEY; // 优先使用显式传入，其次读取环境变量。
    if (!apiKey) { // 检查密钥是否存在。
      throw new Error("缺少 WENXIN_API_KEY，请在环境变量中配置真实密钥。"); // 缺失时抛出友好异常。
    } // if 结束。
    const baseURL = options?.baseUrl ?? process.env.WENXIN_BASE_URL ?? DEFAULT_BASE_URL; // 解析基础 URL。
    this.model = options?.model ?? process.env.WENXIN_MODEL ?? DEFAULT_MODEL; // 解析模型名称。
    console.log("debugging: initializing WenxinApiOrchestrator", baseURL, this.model); // 输出初始化日志。
    this.client = new OpenAI({ apiKey, baseURL }); // 创建 OpenAI 客户端实例。
  }

  /**
   * runTask 会将上下文打包成用户提示词，并调用文心模型返回 Markdown。
   */
  async runTask(context: AgentContext, task: LearningTask): Promise<string> { // 实现接口方法。
    console.log("debugging: Wenxin API request start", task.taskId); // 输出任务起始日志。
    const userPrompt = this.buildUserPrompt(context, task); // 构造用户提示词。
    const response = await this.client.chat.completions.create({ // 调用文心推理接口。
      model: this.model, // 设置模型名称。
      messages: [ // 传入对话消息数组。
        { role: "system", content: SYSTEM_PROMPT }, // 系统消息沿用提示词模板。
        { role: "user", content: userPrompt } // 用户消息包含上下文信息。
      ],
      temperature: 0.35, // 设置温度，以兼顾稳定性与创造性。
      max_completion_tokens: 2048 // 限制最大生成长度，沿用 API 要求字段。
    }); // API 调用结束。
    const content = response.choices?.[0]?.message?.content?.trim(); // 提取第一条回复文本。
    if (!content) { // 若无内容则视为异常。
      throw new Error("文心 API 未返回任何内容，请检查输入或速率限制。"); // 抛出错误帮助排查。
    } // if 结束。
    console.log("debugging: Wenxin API request success", content.length); // 输出成功日志与长度。
    return content; // 返回 Markdown 内容。
  }

  /**
   * 根据上下文构造用户提示词，包含任务、学习者、OCR 结果等信息。
   */
  private buildUserPrompt(context: AgentContext, task: LearningTask): string { // 定义辅助方法。
    const spanPreview = JSON.stringify(context.ocrResult.spans.slice(0, 10)); // 取前 10 个文本片段作为预览。
    const tablePreview = JSON.stringify(context.ocrResult.tableData.slice(0, 5)); // 取前 5 行表格数据。
    const payloadLines = [ // 组合多段文本构成提示词。
      `<task>\n类型: ${task.type}\n描述: ${task.description}\n优先级: ${task.priority}\n截止: ${task.dueDate ?? "未设定"}\n</task>`, // 任务信息段。
      `<learner>\nID: ${context.learnerProfile.learnerId}\n水平: ${context.learnerProfile.competencyLevel}\n目标: ${context.learnerProfile.learningGoal}\n偏好: ${context.learnerProfile.preferredStyle}\n</learner>`, // 学习者信息段。
      `<ocr-plain>\n${context.ocrResult.plainText}\n</ocr-plain>`, // OCR 纯文本。
      `<ocr-markdown>\n${context.ocrResult.markdownText}\n</ocr-markdown>`, // OCR Markdown。
      `<ocr-table>\n${tablePreview}\n</ocr-table>`, // 表格预览。
      `<ocr-spans>\n${spanPreview}\n</ocr-spans>` // 文本片段预览。
    ]; // 数组结束。
    const prompt = payloadLines.join("\n\n"); // 用空行连接各段以提升可读性。
    console.log("debugging: built Wenxin user prompt length", prompt.length); // 输出提示词长度。
    return prompt; // 返回最终字符串。
  }
}


```

## 更新概览
- **接入真实文心服务**：新增 `WenxinApiOrchestrator`，沿用 `api.py` 中的系统提示词、base URL 与模型配置，读取 `WENXIN_API_KEY / WENXIN_BASE_URL / WENXIN_MODEL` 环境变量，通过 OpenAI SDK 直接请求文心 5.0，生成 Markdown 结果供智能体写回。[`src/utils/wenxin-api-orchestrator.ts`](```11:149:src/utils/wenxin-api-orchestrator.ts```)
- **入口改为真实编排器实例**：`src/index.ts` 内的 orchestrator 已切换为 `new WenxinApiOrchestrator()`，运行示例时会实际触发远程推理，反馈管理器仍保留用于后续闭环。[`src/index.ts`](```1:50:src/index.ts```)
- **依赖调整**：`package.json` 新增 `openai`，`npm install` 后生成的 `package-lock.json`、`dist/` 也同步更新，以便 TypeScript 代码可直接访问官方 SDK。

## 配置与使用提示
- 在运行前设置 `WENXIN_API_KEY`（可直接复用 `api.py` 中的密钥）、`WENXIN_BASE_URL=https://aistudio.baidu.com/llm/lmapi/v3`、`WENXIN_MODEL=ernie-5.0-thinking-preview`。
- 若仍需启用搜索增强，可扩展 `WenxinApiOrchestrator` 中的 `chat.completions.create` 调用，向第二个参数传递 `{ extra_body: { web_search: { enable: true } } }`，并根据实际 SDK 版本放宽类型约束。
- 由于现在直接连到线上接口，请确保在安全环境中注入密钥，并根据需要实现请求节流/重试（可在 `runTask` 捕获 `BadRequestError` 后加入自定义重试策略）。

## 测试
- `npm run build` ✅
- `WENXIN_API_KEY=... WENXIN_BASE_URL=... WENXIN_MODEL=... npm run demo` ❌：请求命中文心 5.0 端点但返回 `400 BadRequest`（无正文）。这通常意味着 Aistudio 账号或接口参数仍需在平台侧激活/授权，请在 Aistudio 控制台确认该 Access Token 对 `ernie-5.0-thinking-preview` 是否已开通，并参考 `api.py` 验证必要的可选参数（如 `extra_body`、`stream`）后再重试。

若需要我进一步排查 400 响应（例如抓包服务器返回的详细 JSON、加入 fallback 或降级策略），或是将 Notion/PaddleOCR 也接入真实 MCP，可继续告知。

---

**User**

@wenxin-orchestrator.ts 这个文件我打算直接删除，如果有要保留的内容请直接放进@wenxin-api-orchestrator.ts 

---

**Cursor**

```typescript
import OpenAI from "openai"; // 引入 OpenAI SDK 以便调用文心 5.0 兼容接口。
import { AgentContext, LearningTask } from "../types"; // 引入智能体上下文与任务类型。

/**
 * WenxinOrchestratorInterface 描述基于文心 4.5 的策略/生成层。
 */
export interface WenxinOrchestratorInterface { // 定义接口。
  /**
   * 根据上下文生成任务结果文本。
   * @param context 智能体上下文。
   * @param task 当前任务。
   */
  runTask(context: AgentContext, task: LearningTask): Promise<string>; // 返回生成的 Markdown 文本。
}

/**
 * MockWenxinOrchestrator 用模板字符串模拟文心输出，便于脱机调试。
 */
export class MockWenxinOrchestrator implements WenxinOrchestratorInterface { // 模拟实现。
  /**
   * 生成 Markdown 反馈，并输出调试日志。
   */
  async runTask(context: AgentContext, task: LearningTask): Promise<string> { // 实现接口。
    console.log("debugging: Wenxin task start", task.taskId); // 输出任务开始调试信息。
    const leadLine = `**任务类型：${task.type}｜优先级：${task.priority}**`; // 构建首行。
    const learnerLine = `- 学习者：${context.learnerProfile.learnerId}（目标：${context.learnerProfile.learningGoal}）`; // 学习者信息。
    const summaryLine = `- OCR 摘要：${context.ocrResult.plainText.slice(0, 80)}...`; // OCR 摘要。
    const actionLine = `- 建议动作：${task.description}`; // 动作建议。
    const planLine = task.dueDate ? `- 截止：${task.dueDate}` : "- 截止：未设定"; // 截止信息。
    const markdown = [leadLine, learnerLine, summaryLine, actionLine, planLine].join("\n"); // 拼接 Markdown。
    console.log("debugging: Wenxin task output length", markdown.length); // 输出长度信息。
    return markdown; // 返回 Markdown。
  }
}

// 默认的推理服务基础地址，匹配 api.py 中的 base_url。
const DEFAULT_BASE_URL = "https://aistudio.baidu.com/llm/lmapi/v3"; // 定义默认基础 URL。
// 默认使用的模型名称，与 api.py 一致，确保行为统一。
const DEFAULT_MODEL = "ernie-5.0-thinking-preview"; // 定义默认模型名称。

// 将系统提示词拆分成数组拼接，避免模板字符串中出现未转义的反引号。
const SYSTEM_PROMPT = [ // 定义系统提示词数组。
  "> ", // 行 1。
  "", // 空行用于分隔。
  "---", // 分隔线。
  "", // 空行。
  "### 1. 角色 & 任务", // 模块标题。
  "你是一名专注 K12/高校学习辅导的“文心 4.5 学习智能体”，需根据 OCR 解析的教材/作业内容与 Notion 数据库中的学习画像，完成批注、解析、整理、学习计划等多任务生成，并保证输出可直接写入 Notion。", // 角色与任务描述。
  "", // 空行。
  "### 2. 核心原则（不超过 3 条）", // 核心原则标题。
  "1. 任何结论或建议都必须引用 OCR 内容或 Notion 数据字段，避免凭空创作。", // 原则 1。
  "2. 同时满足“个性化”（结合学习者画像）与“结构化”（便于写入 Notion）的要求。", // 原则 2。
  "3. 优先生成可执行的学习动作，必要时明确提问以确认缺失信息。", // 原则 3。
  "", // 空行。
  "### 3. 上下文处理", // 上下文标题。
  "- **OCR 多格式输入**：包括 plain text、markdown、表格数据、按行切片及位置信息。对题干、解答、批注、教材摘要分别提炼。", // 上下文要点 1。
  "- **学习者画像（Notion 数据库）**：包含 `competencyLevel`、`learningGoal`、`preferredStyle`、错题记录、复盘计划等。", // 要点 2。
  "- **任务清单**：每个任务含 `taskId`、`type`（annotation/analysis/organization/planning）、`description`、`priority`、`dueDate`。", // 要点 3。
  "- **上一轮反馈**：平均评分、典型评论、策略提示（例如“需要补充更多讲解细节并缩短反馈周期”）。", // 要点 4。
  "- 处理方式：先解析 OCR→结合画像→按任务顺序依次生成，必要时引用反馈调整语气或深度。", // 要点 5。
  "", // 空行。
  "### 4. Chain of Thought（执行流程）", // CoT 标题。
  "1. **识别任务类型**：annotation / analysis / organization / planning。", // 步骤 1。
  "2. **抽取关键知识点**：结合 OCR spans，区分题干、解题过程、错误原因、知识点标签。", // 步骤 2。
  "3. **匹配学习画像**：根据 competencyLevel、learningGoal、preferredStyle 调整讲解深度、语言风格。", // 步骤 3。
  "4. **融合历史反馈**：若评分<4，则补充细节、增加问答或缩短复盘周期。", // 步骤 4。
  "5. **生成结构化输出**：对应任务类型输出批注/解析/整理/计划模块，包含标题、分点说明、下一步行动、复盘时间。", // 步骤 5。
  "6. **校验**：检查是否引用了明确证据、是否包含行动项与 Notion 属性，确认无遗漏。", // 步骤 6。
  "", // 空行。
  "### 5. 输出规范", // 输出规范标题。
  "- **统一 Markdown 段落**，适合直接写入 Notion 页面（标题用 `##`，要点用 `-`）。", // 输出规范 1。
  "- 必须包含以下字段：", // 输出规范 2 引导。
  "  - `## 摘要`：80 字内概述任务成果。", // 子项 1。
  "  - `## 关键内容`：按任务类型列出要点（批注/解析/整理/计划）。", // 子项 2。
  "  - `## 行动与提醒`：列出可执行步骤、截止时间、复盘建议。", // 子项 3。
  "  - `## 关联属性`：以列表形式列出需写入 Notion 的属性，如 `priority`、`dueDate`、`knowledgePoint`。", // 子项 4。
  "- 严禁输出：与任务无关的闲聊、未引用上下文的猜测、非结构化长段落。", // 输出规范 3。
  "", // 空行。
  "### 6. Few-Shot 示例", // 示例标题。
  "**示例 1：annotation 任务**", // 示例 1 标题。
  "```", // 代码块开始。
  "输入概要：OCR 显示一次函数求解，学生未解释增长率；画像显示“偏好讲解+计划”；反馈提示“增加细节”。", // 示例输入。
  "输出：", // 示例输出提示。
  "## 摘要", // 输出段落。
  "针对题干 1+1=? 的批注补充增长意义。", // 示例内容。
  "## 关键内容", // 小节。
  "- 批注：指出学生步骤正确，但需解释斜率 2 代表函数每增加 1 个 x，y 增加 2。", // 要点。
  "- 错因分析：缺少对实际应用的描述，复盘时需补写。", // 要点。
  "## 行动与提醒", // 小节。
  "- 本周内补写“斜率=增长率”小结。", // 要点。
  "- 复盘日期：2025-11-21。", // 要点。
  "## 关联属性", // 小节。
  "- priority: 5", // 属性。
  "- dueDate: 2025-11-21", // 属性。
  "- knowledgePoint: 一次函数斜率", // 属性。
  "```", // 代码块结束。
  "", // 空行。
  "**示例 2：planning 任务**", // 示例 2 标题。
  "```", // 代码块开始。
  "输入概要：OCR 提供一次函数练习；任务描述“制定 3 日复盘计划”；反馈提示“缩短反馈周期”。", // 示例输入。
  "输出：", // 提示。
  "## 摘要", // 小节。
  "制定 3 日复盘节奏，聚焦一次函数与增长解释。", // 内容。
  "## 关键内容", // 小节。
  "- D1：重写解题步骤，突出列方程→消元→结论。", // 要点。
  "- D2：将斜率意义整理成实际案例（速度/成本）。", // 要点。
  "- D3：自测 2 道变式题，记录错因。", // 要点。
  "## 行动与提醒", // 小节。
  "- 每天学习 30 分钟，完成后在 Notion 任务表标记。", // 要点。
  "- 复盘提醒：每天 20:00 自动评论提示。", // 要点。
  "## 关联属性", // 小节。
  "- priority: 4", // 属性。
  "- dueDate: 2025-11-21", // 属性。
  "- linkedMistake: M-10023", // 属性。
  "```", // 代码块结束。
  "", // 空行。 // 结语。
].join("\n"); // 将数组合并为单个字符串。

/**
 * WenxinApiOrchestrator 通过 OpenAI SDK 调用文心推理服务，替换 Mock 版本。
 */
export class WenxinApiOrchestrator implements WenxinOrchestratorInterface { // 定义真实的文心编排器实现。
  private readonly client: OpenAI; // 保存 OpenAI 客户端实例的私有字段。
  private readonly model: string; // 保存模型名称的私有字段。

  /**
   * 构造函数接收密钥、模型与可选自定义 baseURL。
   */
  constructor(options?: { apiKey?: string; baseUrl?: string; model?: string }) { // 构造函数定义。
    const apiKey = options?.apiKey ?? process.env.WENXIN_API_KEY; // 优先使用显式传入，其次读取环境变量。
    if (!apiKey) { // 检查密钥是否存在。
      throw new Error("缺少 WENXIN_API_KEY，请在环境变量中配置真实密钥。"); // 缺失时抛出友好异常。
    } // if 结束。
    const baseURL = options?.baseUrl ?? process.env.WENXIN_BASE_URL ?? DEFAULT_BASE_URL; // 解析基础 URL。
    this.model = options?.model ?? process.env.WENXIN_MODEL ?? DEFAULT_MODEL; // 解析模型名称。
    console.log("debugging: initializing WenxinApiOrchestrator", baseURL, this.model); // 输出初始化日志。
    this.client = new OpenAI({ apiKey, baseURL }); // 创建 OpenAI 客户端实例。
  }

  /**
   * runTask 会将上下文打包成用户提示词，并调用文心模型返回 Markdown。
   */
  async runTask(context: AgentContext, task: LearningTask): Promise<string> { // 实现接口方法。
    console.log("debugging: Wenxin API request start", task.taskId); // 输出任务起始日志。
    const userPrompt = this.buildUserPrompt(context, task); // 构造用户提示词。
    const response = await this.client.chat.completions.create({ // 调用文心推理接口。
      model: this.model, // 设置模型名称。
      messages: [ // 传入对话消息数组。
        { role: "system", content: SYSTEM_PROMPT }, // 系统消息沿用提示词模板。
        { role: "user", content: userPrompt } // 用户消息包含上下文信息。
      ],
      temperature: 0.35, // 设置温度，以兼顾稳定性与创造性。
      max_completion_tokens: 2048 // 限制最大生成长度，沿用 API 要求字段。
    }); // API 调用结束。
    const content = response.choices?.[0]?.message?.content?.trim(); // 提取第一条回复文本。
    if (!content) { // 若无内容则视为异常。
      throw new Error("文心 API 未返回任何内容，请检查输入或速率限制。"); // 抛出错误帮助排查。
    } // if 结束。
    console.log("debugging: Wenxin API request success", content.length); // 输出成功日志与长度。
    return content; // 返回 Markdown 内容。
  }

  /**
   * 根据上下文构造用户提示词，包含任务、学习者、OCR 结果等信息。
   */
  private buildUserPrompt(context: AgentContext, task: LearningTask): string { // 定义辅助方法。
    const spanPreview = JSON.stringify(context.ocrResult.spans.slice(0, 10)); // 取前 10 个文本片段作为预览。
    const tablePreview = JSON.stringify(context.ocrResult.tableData.slice(0, 5)); // 取前 5 行表格数据。
    const payloadLines = [ // 组合多段文本构成提示词。
      `<task>\n类型: ${task.type}\n描述: ${task.description}\n优先级: ${task.priority}\n截止: ${task.dueDate ?? "未设定"}\n</task>`, // 任务信息段。
      `<learner>\nID: ${context.learnerProfile.learnerId}\n水平: ${context.learnerProfile.competencyLevel}\n目标: ${context.learnerProfile.learningGoal}\n偏好: ${context.learnerProfile.preferredStyle}\n</learner>`, // 学习者信息段。
      `<ocr-plain>\n${context.ocrResult.plainText}\n</ocr-plain>`, // OCR 纯文本。
      `<ocr-markdown>\n${context.ocrResult.markdownText}\n</ocr-markdown>`, // OCR Markdown。
      `<ocr-table>\n${tablePreview}\n</ocr-table>`, // 表格预览。
      `<ocr-spans>\n${spanPreview}\n</ocr-spans>` // 文本片段预览。
    ]; // 数组结束。
    const prompt = payloadLines.join("\n\n"); // 用空行连接各段以提升可读性。
    console.log("debugging: built Wenxin user prompt length", prompt.length); // 输出提示词长度。
    return prompt; // 返回最终字符串。
  }
}


```

```typescript
import { PaddleOcrClientInterface } from "../clients/paddleocr-client"; // 引入 OCR 客户端接口。
import { NotionClientInterface } from "../clients/notion-client"; // 引入 Notion 客户端接口。
import { WenxinOrchestratorInterface } from "../utils/wenxin-api-orchestrator"; // 引入文心编排器。
import { AgentContext, LearnerProfile, LearningTask, NotionWritePayload } from "../types"; // 引入类型定义。

/**
 * LearningAgent 封装端到端流程：OCR→策略→Notion。
 */
export class LearningAgent { // 定义智能体主体类。
  constructor( // 构造函数。
    private readonly ocrClient: PaddleOcrClientInterface, // 注入 OCR 客户端。
    private readonly notionClient: NotionClientInterface, // 注入 Notion 客户端。
    private readonly wenxinOrchestrator: WenxinOrchestratorInterface // 注入文心编排器。
  ) {
    console.log("debugging: LearningAgent initialized"); // 输出初始化日志。
  }

  /**
   * 读取图片并构建 AgentContext。
   */
  async buildContext(imagePath: string, learnerProfile: LearnerProfile, tasks: Array<LearningTask>): Promise<AgentContext> { // 构建上下文方法。
    console.log("debugging: building context", imagePath); // 调试日志。
    const ocrResult = await this.ocrClient.runStructuredOcr(imagePath); // 调用 OCR。
    const context: AgentContext = { // 组装上下文。
      learnerProfile, // 画像。
      tasks, // 任务。
      ocrResult // OCR 结果。
    }; // 结束对象。
    console.log("debugging: context ready", context.tasks.length); // 输出任务数量。
    return context; // 返回上下文。
  }

  /**
   * 执行任务列表并写回 Notion。
   */
  async executeTasks(context: AgentContext): Promise<Array<string>> { // 执行任务，返回页面 ID 列表。
    console.log("debugging: executing tasks", context.tasks.length); // 输出任务数量。
    const createdPageIds: Array<string> = []; // 存储生成的页面 ID。
    for (const task of context.tasks) { // 遍历任务。
      console.log("debugging: running task", task.taskId); // 输出当前任务。
      const markdownContent = await this.wenxinOrchestrator.runTask(context, task); // 获取文心输出。
      const payload: NotionWritePayload = { // 组装写入载荷。
        parentPageId: context.learnerProfile.learnerId, // 简化：用 learnerId 作为父页面。
        title: `${task.type}-${task.taskId}`, // 标题。
        markdownContent, // Markdown 内容。
        properties: {
          priority: task.priority, // 优先级。
          type: task.type, // 任务类型。
          dueDate: task.dueDate ?? "未设定" // 截止。
        } // 属性结束。
      }; // 结束 payload。
      const pageId = await this.notionClient.createPage(payload); // 创建页面。
      createdPageIds.push(pageId); // 收集 ID。
      await this.notionClient.updatePage(pageId, { status: "generated" }); // 更新状态。
      await this.notionClient.createComment(pageId, `自动生成任务：${task.description}`); // 写评论。
    } // 循环结束。
    console.log("debugging: tasks completed", createdPageIds.length); // 输出完成数量。
    return createdPageIds; // 返回 ID 列表。
  }
}


```

## 调整完成
- 将 `WenxinOrchestratorInterface` 与 `MockWenxinOrchestrator` 直接迁入 `src/utils/wenxin-api-orchestrator.ts`，去掉对旧文件的依赖，并保持所有注释与调试输出，仍可在需要时使用 Mock 实现。(```1:35:src/utils/wenxin-api-orchestrator.ts```)
- 更新 `LearningAgent` 对接口的导入路径，使其引用统一后的文件。(```1:60:src/workflow/learning-agent.ts```)
- 删除 `src/utils/wenxin-orchestrator.ts`，避免重复定义。

## 测试
- `npm run build`

---

**User**

https://developers.notion.com/docs/get-started-with-mcp https://developers.notion.com/docs/mcp-supported-tools 

请你结合Notion文档以及 @mcp-config.jsonc (123-125) ，调用真实的MCP

 @mcp-config.jsonc (127-141) 同时请你实现filesystem的mcp的真实调用

请你记住，所有的命令都在conda虚拟环境paddle-agent中执行

---

**Cursor**

```typescript
import path from "path"; // 引入 path 处理配置文件路径。
import { promises as fs } from "fs"; // 引入 fs 读取配置文件。
import { parse } from "comment-json"; // 使用 comment-json 解析 JSONC。

// MCP 配置文件的默认路径，允许通过环境变量覆盖。
const DEFAULT_CONFIG_PATH = path.join(process.cwd(), "mcp-config.jsonc"); // 组合默认路径。

// HTTP 类型 MCP 服务器配置。
export interface McpHttpServerConfig { // 定义 HTTP 服务器配置接口。
  url: string; // MCP 服务器 URL。
}

// 通过命令行启动的 stdio MCP 服务器配置。
export interface McpCommandServerConfig { // 定义命令行服务器配置接口。
  command: string; // 可执行文件。
  args?: Array<string>; // 可选参数列表。
  env?: Record<string, string>; // 额外环境变量。
  workingDirectory?: string; // 运行目录。
  timeoutSeconds?: number; // 可选超时时间（当前未使用，预留）。
}

// 联合类型：HTTP 或命令式配置。
export type McpServerConfig = McpHttpServerConfig | McpCommandServerConfig; // 联合类型定义。

// 内部缓存避免重复读取配置文件。
let cachedConfig: Record<string, McpServerConfig> | null = null; // 缓存对象。

/**
 * 加载 mcp-config.jsonc，并返回指定服务器的配置。
 * @param serverName mcpServers 中的 key。
 */
export async function getMcpServerConfig(serverName: string): Promise<McpServerConfig> { // 导出获取配置函数。
  if (!cachedConfig) { // 若缓存为空则加载。
    const configPath = process.env.MCP_CONFIG_PATH || DEFAULT_CONFIG_PATH; // 支持自定义路径。
    const fileContent = await fs.readFile(configPath, "utf-8"); // 读取文件。
    const parsed = parse(fileContent) as { mcpServers?: Record<string, unknown> }; // 解析 JSONC。
    if (!parsed.mcpServers) { // 验证结构。
      throw new Error(`配置文件 ${configPath} 缺少 mcpServers 字段`); // 抛错。
    }
    cachedConfig = {}; // 初始化缓存。
    for (const [name, value] of Object.entries(parsed.mcpServers)) { // 遍历服务器配置。
      if (value && typeof value === "object" && "url" in value && typeof (value as { url?: unknown }).url === "string") { // HTTP 类型。
        cachedConfig[name] = { url: (value as { url: string }).url }; // 缓存 HTTP 配置。
        continue; // 继续下一项。
      }
      if (value && typeof value === "object" && "command" in value && typeof (value as { command?: unknown }).command === "string") { // 命令类型。
        const commandValue = value as McpCommandServerConfig; // 断言类型。
        cachedConfig[name] = { // 写入缓存。
          command: commandValue.command,
          args: commandValue.args,
          env: commandValue.env,
          workingDirectory: commandValue.workingDirectory,
          timeoutSeconds: commandValue.timeoutSeconds
        };
        continue; // 继续下一项。
      }
      // 若无法识别则忽略，但记录日志便于排查。
      console.warn(`debugging: 未识别的 MCP 配置 ${name}`); // 输出警告。
    }
  }
  const serverConfig = cachedConfig[serverName]; // 读取缓存项。
  if (!serverConfig) { // 若不存在则抛错。
    throw new Error(`未在 MCP 配置中找到服务器：${serverName}`); // 抛错信息。
  }
  return serverConfig; // 返回配置。
}

```

```typescript
import { NotionWritePayload, LearningTask } from "../types"; // 引入需要的类型定义。
import { Client } from "@modelcontextprotocol/sdk/client"; // 引入 MCP 客户端。
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp"; // 引入 HTTP 传输。
import { CallToolResultSchema } from "@modelcontextprotocol/sdk/types"; // 引入工具调用结果 schema。
import { z } from "zod"; // 引入 zod 以推导类型。
import { getMcpServerConfig, McpHttpServerConfig } from "../utils/mcp-config"; // 引入 MCP 配置加载器。

/**
 * NotionClientInterface 抽象了智能体需要的 Notion 能力。
 */
export interface NotionClientInterface { // 定义接口。
  /**
   * 创建新的 Notion 页面。
   * @param payload 页面内容载荷。
   */
  createPage(payload: NotionWritePayload): Promise<string>; // 返回新页面 ID。

  /**
   * 更新 Notion 页面属性或内容。
   * @param pageId 目标页面 ID。
   * @param properties 属性键值。
   */
  updatePage(pageId: string, properties: Record<string, string | number>): Promise<void>; // 无返回值。

  /**
   * 创建评论用于提醒。
   * @param pageId 目标页面 ID。
   * @param commentText 评论文本。
   */
  createComment(pageId: string, commentText: string): Promise<void>; // 无返回值。
}

/**
 * MockNotionClient 简单地将每次操作输出到控制台，便于演示。
 */
export class MockNotionClient implements NotionClientInterface { // 模拟实现。
  /**
   * 用于生成伪页面 ID 的计数器。
   */
  private pageCounter = 0; // 初始化计数器。

  /**
   * 模拟创建页面：打印内容并返回 ID。
   */
  async createPage(payload: NotionWritePayload): Promise<string> { // 实现 createPage。
    console.log("debugging: creating Notion page", payload.title); // 输出调试信息。
    console.log("debugging: markdown content", payload.markdownContent); // 输出内容。
    const newId = `page-${++this.pageCounter}`; // 生成 ID。
    console.log("debugging: created Notion page ID", newId); // 输出 ID。
    return newId; // 返回 ID。
  }

  /**
   * 模拟更新页面属性。
   */
  async updatePage(pageId: string, properties: Record<string, string | number>): Promise<void> { // 实现 updatePage。
    console.log("debugging: updating Notion page", pageId); // 输出页面 ID。
    console.log("debugging: new properties", properties); // 输出属性。
  }

  /**
   * 模拟创建评论。
   */
  async createComment(pageId: string, commentText: string): Promise<void> { // 实现 createComment。
    console.log("debugging: creating comment", pageId); // 输出页面 ID。
    console.log("debugging: comment text", commentText); // 输出评论文本。
  }

  /**
   * 根据任务构建评论文本的辅助方法。
   * @param task 学习任务对象。
   */
  buildCommentFromTask(task: LearningTask): string { // 提供辅助函数。
    console.log("debugging: building comment for task", task.taskId); // 输出任务 ID。
    return `任务 ${task.taskId} (${task.type}) 已同步，描述：${task.description}`; // 返回描述文本。
  }
}

// 定义工具返回值类型，便于后续解析。
type CallToolResult = z.infer<typeof CallToolResultSchema>; // 通过 zod schema 推导类型。

/**
 * NotionMcpClient 使用 Notion 官方 MCP，基于 Streamable HTTP 进行真实调用。
 */
export class NotionMcpClient implements NotionClientInterface { // 定义真实客户端。
  private client: Client | null = null; // 缓存 MCP 客户端实例。
  private transport: StreamableHTTPClientTransport | null = null; // 缓存传输层。
  private connectPromise: Promise<void> | null = null; // 防止重复连接。

  constructor(private readonly authToken = process.env.NOTION_MCP_TOKEN) { // 构造函数中注入令牌。
    if (!this.authToken) { // 若缺少令牌则抛错，引导用户配置。
      throw new Error("缺少 NOTION_MCP_TOKEN，请参考 https://developers.notion.com/docs/get-started-with-mcp 配置集成令牌"); // 抛出明确错误。
    }
  }

  /**
   * 创建页面：调用 notion-create-pages 工具。
   */
  async createPage(payload: NotionWritePayload): Promise<string> { // 实现 createPage。
    console.log("debugging: NotionMcpClient.createPage", payload.title); // 调试日志。
    const args = { // 构建工具参数。
      parent_page_id: payload.parentPageId, // 父页面 ID。
      title: payload.title, // 标题。
      markdown_content: payload.markdownContent, // Markdown 内容。
      properties: payload.properties // 属性映射。
    }; // 参数对象结束。
    const result = await this.callTool("notion-create-pages", args); // 调用 MCP 工具。
    return this.extractResourceIdentifier(result); // 从返回结果提取资源 ID。
  }

  /**
   * 更新页面属性：调用 notion-update-page。
   */
  async updatePage(pageId: string, properties: Record<string, string | number>): Promise<void> { // 实现 updatePage。
    console.log("debugging: NotionMcpClient.updatePage", pageId); // 输出日志。
    await this.callTool("notion-update-page", { // 调用工具。
      page_id: pageId, // 目标页面。
      properties // 属性对象。
    }); // 调用结束。
  }

  /**
   * 创建评论：调用 notion-create-comment。
   */
  async createComment(pageId: string, commentText: string): Promise<void> { // 实现 createComment。
    console.log("debugging: NotionMcpClient.createComment", pageId); // 输出日志。
    await this.callTool("notion-create-comment", { // 调用工具。
      page_id: pageId, // 页面 ID。
      rich_text: commentText // 评论正文。
    }); // 调用结束。
  }

  /**
   * 统一工具调用入口，确保在调用前完成连接。
   */
  private async callTool(name: string, args: Record<string, unknown>): Promise<CallToolResult> { // 定义工具调用函数。
    const client = await this.ensureConnected(); // 确保已连接。
    const request = { // 构建 request payload。
      method: "tools/call", // 标准 MCP 方法。
      params: {
        name, // 工具名。
        arguments: args // 具体参数。
      }
    }; // 请求对象结束。
    const result = await client.request(request, CallToolResultSchema); // 发送请求并通过 schema 验证。
    console.log("debugging: NotionMcpClient.callTool result items", result.content.length); // 打印结果数量。
    return result; // 返回结果。
  }

  /**
   * 确保 MCP 客户端与传输只初始化一次。
   */
  private async ensureConnected(): Promise<Client> { // 定义连接函数。
    if (this.client) { // 若已存在直接返回。
      return this.client; // 返回已连接的客户端。
    }
    if (this.connectPromise) { // 若正在连接，等待完成。
      await this.connectPromise; // 等待现有 Promise。
      return this.client as Client; // 返回连接完成后的客户端。
    }
    this.connectPromise = this.initializeConnection(); // 启动连接流程。
    await this.connectPromise; // 等待连接完成。
    return this.client as Client; // 返回客户端。
  }

  /**
   * 依据 mcp-config.jsonc 建立 Streamable HTTP 连接。
   */
  private async initializeConnection(): Promise<void> { // 定义实际连接实现。
    const rawConfig = await getMcpServerConfig("notion"); // 加载配置。
    if (!("url" in rawConfig)) { // 校验为 HTTP 类型。
      throw new Error("Notion MCP 配置必须包含 url 字段"); // 抛出错误。
    }
    const config = rawConfig as McpHttpServerConfig; // 强制转换。
    const requestInitHeaders: Record<string, string> = { // 构建请求头。
      Authorization: `Bearer ${this.authToken}`, // 传递 Notion 集成令牌。
      "Notion-Version": process.env.NOTION_MCP_VERSION || "2025-09-03" // 指定版本，默认使用最新稳定版。
    }; // 头部定义结束。
    this.transport = new StreamableHTTPClientTransport(new URL(config.url), { // 创建 HTTP 传输。
      requestInit: {
        headers: requestInitHeaders // 设置头部。
      }
    }); // 传输实例化结束。
    this.client = new Client({ // 创建 MCP 客户端。
      name: "learning-agent-notion-client", // 客户端名称。
      version: "0.1.0" // 版本号。
    }, {
      capabilities: {
        tools: {} // 声明工具能力。
      }
    }); // 客户端完成。
    this.client.onerror = (error) => { // 注册错误处理。
      console.error("debugging: Notion MCP client error", error); // 输出错误。
    }; // 回调结束。
    await this.client.connect(this.transport); // 执行连接。
    console.log("debugging: Notion MCP connected"); // 输出成功日志。
  }

  /**
   * 从工具结果中提取页面或资源标识符，便于上层追踪。
   */
  private extractResourceIdentifier(result: CallToolResult): string { // 定义提取函数。
    for (const item of result.content) { // 遍历内容数组。
      if (item.type === "resource_link" && item.uri) { // 若为资源链接。
        return item.uri; // 返回 URI。
      }
      if (item.type === "text" && item.text) { // 若为文本。
        const match = item.text.match(/page_id\s*[:：]\s*(\S+)/i); // 尝试匹配 page_id。
        if (match) { // 成功则返回。
          return match[1]; // 返回匹配值。
        }
      }
    }
    return `notion-${Date.now()}`; // 若无可用内容，返回临时 ID。
  }
}


```

```typescript
import { promises as fs } from "fs"; // 引入文件系统 Promise API 以便异步读写文件。
import path from "path"; // 引入 path 用于归一化路径。
import { Client } from "@modelcontextprotocol/sdk/client"; // 引入 MCP 客户端。
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio"; // 引入 stdio 传输层。
import { CallToolResultSchema } from "@modelcontextprotocol/sdk/types"; // 引入工具结果 schema。
import { z } from "zod"; // 引入 zod 以推导类型。
import { getMcpServerConfig, McpCommandServerConfig } from "../utils/mcp-config"; // 引入 MCP 配置读取器。

/**
 * FilesystemClientInterface 负责定义智能体访问本地或远端文件系统的抽象。
 */
export interface FilesystemClientInterface { // 定义文件系统客户端接口。
  /**
   * 读取指定路径的二进制文件内容。
   * @param absolutePath 目标文件的绝对路径。
   */
  readBinary(absolutePath: string): Promise<Buffer>; // 声明返回 Buffer 的读取函数。
}

/**
 * LocalFilesystemClient 使用 Node.js fs/promises 实现 FilesystemClientInterface。
 */
export class LocalFilesystemClient implements FilesystemClientInterface { // 实现具体类。
  /**
   * 通过 fs.promises 读取文件，并在关键步骤输出调试日志。
   */
  async readBinary(absolutePath: string): Promise<Buffer> { // 实现异步读取逻辑。
    console.log("debugging: starting file read", absolutePath); // 输出调试信息以便定位问题。
    const fileBuffer = await fs.readFile(absolutePath); // 实际读取文件并获取 Buffer。
    console.log("debugging: completed file read", fileBuffer.byteLength); // 输出读取结果的字节长度。
    return fileBuffer; // 返回读取到的 Buffer。
  }
}

// 定义工具调用结果类型，方便类型推导。
type CallToolResult = z.infer<typeof CallToolResultSchema>; // 使用 zod schema 推导类型。

/**
 * FilesystemMcpClient 使用 @modelcontextprotocol/server-filesystem 提供的工具读取文件。
 */
export class FilesystemMcpClient implements FilesystemClientInterface { // 定义 MCP 文件系统客户端。
  private client: Client | null = null; // 缓存 MCP 客户端。
  private transport: StdioClientTransport | null = null; // 缓存传输实例。
  private connectPromise: Promise<void> | null = null; // 防止重复连接。

  /**
   * 通过 MCP 的 read_text_file 工具读取文件，并返回 Buffer。
   */
  async readBinary(absolutePath: string): Promise<Buffer> { // 实现接口方法。
    const normalizedPath = path.resolve(absolutePath); // 归一化路径防止逃逸。
    console.log("debugging: FilesystemMcpClient.readBinary", normalizedPath); // 输出调试信息。
    const result = await this.callTool("read_text_file", { path: normalizedPath }); // 调用读取工具。
    const firstItem = result.content[0]; // 仅关注首个内容。
    if (firstItem && firstItem.type === "text") { // 处理文本内容。
      return Buffer.from(firstItem.text, "utf-8"); // 将文本转为 Buffer。
    }
    if (firstItem && "data" in firstItem && typeof (firstItem as { data?: unknown }).data === "string") { // 处理媒体内容。
      return Buffer.from((firstItem as { data: string }).data, "base64"); // base64 转 Buffer。
    }
    throw new Error("filesystem MCP 返回了无法解析的内容，请确认工具输出"); // 若不匹配则抛错。
  }

  /**
   * 统一的工具调用封装。
   */
  private async callTool(name: string, args: Record<string, unknown>): Promise<CallToolResult> { // 定义工具调用函数。
    const client = await this.ensureConnected(); // 确保已经连接。
    const request = { // 构建 MCP 请求。
      method: "tools/call", // 固定方法名。
      params: {
        name, // 工具名。
        arguments: args // 工具参数。
      }
    }; // 请求对象结束。
    return client.request(request, CallToolResultSchema); // 发送请求并返回结果。
  }

  /**
   * 初始化连接，仅在首次调用时触发。
   */
  private async ensureConnected(): Promise<Client> { // 定义连接函数。
    if (this.client) { // 已连接直接返回。
      return this.client; // 返回缓存实例。
    }
    if (this.connectPromise) { // 若正在连接，等待完成。
      await this.connectPromise; // 等待连接 Promise。
      return this.client as Client; // 返回完成后的客户端。
    }
    this.connectPromise = this.initializeConnection(); // 触发初始化。
    await this.connectPromise; // 等待完成。
    return this.client as Client; // 返回客户端。
  }

  /**
   * 根据 mcp-config.jsonc 启动 server-filesystem。
   */
  private async initializeConnection(): Promise<void> { // 实现连接逻辑。
    const rawConfig = await getMcpServerConfig("filesystem"); // 读取配置。
    if (!("command" in rawConfig)) { // 校验类型。
      throw new Error("filesystem MCP 配置缺少 command 字段"); // 抛错。
    }
    const config = rawConfig as McpCommandServerConfig; // 强制转换。
    const env: Record<string, string> = {}; // 构建环境变量。
    for (const [key, value] of Object.entries(process.env)) { // 遍历当前环境。
      if (typeof value === "string") { // 仅拷贝字符串。
        env[key] = value; // 复制变量。
      }
    }
    if (config.env) { // 合并额外 env。
      Object.assign(env, config.env); // 合并配置环境。
    }
    this.transport = new StdioClientTransport({ // 创建 stdio 传输。
      command: config.command, // 指定命令。
      args: config.args, // 指定参数。
      env, // 传入合并后的环境。
      cwd: config.workingDirectory // 设置工作目录。
    }); // 传输配置完成。
    this.client = new Client({ // 创建 MCP 客户端。
      name: "learning-agent-filesystem-client", // 客户端名称。
      version: "0.1.0" // 版本。
    }, {
      capabilities: {
        tools: {} // 声明工具能力。
      }
    }); // 客户端实例。
    this.client.onerror = (error) => { // 注册错误处理。
      console.error("debugging: filesystem MCP client error", error); // 输出错误。
    }; // 结束回调。
    await this.client.connect(this.transport); // 连接服务器。
    console.log("debugging: filesystem MCP connected"); // 输出成功日志。
    process.once("exit", () => { // 注册进程退出清理。
      void this.dispose(); // 触发清理。
    }); // 监听结束。
  }

  /**
   * 关闭底层连接，避免僵尸进程。
   */
  async dispose(): Promise<void> { // 定义清理方法。
    if (this.client) { // 若客户端存在。
      await this.client.close(); // 关闭协议。
      this.client = null; // 清空引用。
    }
    if (this.transport) { // 若传输存在。
      await this.transport.close(); // 关闭传输。
      this.transport = null; // 清空引用。
    }
    this.connectPromise = null; // 重置连接状态。
  }
}


```

```typescript
import { FilesystemMcpClient } from "./clients/filesystem-client"; // 引入文件系统 MCP 客户端。
import { MockPaddleOcrClient } from "./clients/paddleocr-client"; // 引入模拟 PaddleOCR 客户端。
import { NotionMcpClient } from "./clients/notion-client"; // 引入 Notion MCP 客户端。
import { WenxinApiOrchestrator } from "./utils/wenxin-api-orchestrator"; // 引入真实文心编排器实现。
import { LearningAgent } from "./workflow/learning-agent"; // 引入智能体类。
import { LearnerProfile, LearningTask } from "./types"; // 引入类型定义。
import { FeedbackLoopManager } from "./utils/feedback-loop"; // 引入反馈管理器。

/**
 * main 函数串联样例：读取 demo 文档，执行四种任务，并输出结果。
 */
async function main(): Promise<void> { // 定义主函数。
  console.log("debugging: main started"); // 输出调试信息。
  const filesystemClient = new FilesystemMcpClient(); // 实例化文件系统 MCP 客户端。
  const ocrClient = new MockPaddleOcrClient(filesystemClient); // 实例化 OCR 客户端。
  const notionClient = new NotionMcpClient(); // 实例化 Notion MCP 客户端。
  const wenxinOrchestrator = new WenxinApiOrchestrator(); // 实例化文心编排器，默认读取真实环境配置。
  const agent = new LearningAgent(ocrClient, notionClient, wenxinOrchestrator); // 创建智能体。
  const feedbackManager = new FeedbackLoopManager(); // 创建反馈管理器。

  const learnerProfile: LearnerProfile = { // 构建学习者画像。
    learnerId: "learner-demo", // 学习者 ID。
    competencyLevel: "中等", // 掌握水平。
    learningGoal: "巩固一次函数与应用题", // 学习目标。
    preferredStyle: "讲解+计划" // 偏好。
  }; // 画像结束。

  const tasks: Array<LearningTask> = [ // 构建任务列表。
    { taskId: "T1", type: "annotation", description: "补充批注与错因分析", priority: 5 }, // 批注任务。
    { taskId: "T2", type: "analysis", description: "生成分步解析与知识点", priority: 4 }, // 解析任务。
    { taskId: "T3", type: "organization", description: "整理成 Markdown 笔记", priority: 3 }, // 整理任务。
    { taskId: "T4", type: "planning", description: "制定 3 日复盘计划", priority: 4, dueDate: new Date(Date.now() + 3 * 86400000).toISOString() } // 计划任务。
  ]; // 列表结束。

  const demoImagePath = `${process.cwd()}/samples/demo-note.txt`; // 指定示例“图片”路径。
  const context = await agent.buildContext(demoImagePath, learnerProfile, tasks); // 构建上下文。
  const pageIds = await agent.executeTasks(context); // 执行任务并获得页面 ID。
  context.tasks.forEach((task, index) => { // 遍历任务。
    feedbackManager.recordFeedback(task, 4.5 - index * 0.5, `示例反馈：${task.description}`); // 记录示例反馈。
  }); // 循环结束。
  const strategyNote = feedbackManager.getStrategyNote(); // 计算策略建议。
  console.log("debugging: strategy note", strategyNote); // 输出策略建议。
  console.log("debugging: pipeline finished", pageIds); // 输出结果。
}

// 调用 main 并捕获异常。
main().catch((error) => { // 捕获未处理异常。
  console.error("debugging: pipeline failed", error); // 输出错误。
  process.exitCode = 1; // 设置退出码。
});


```

```jsonc
{
  "compilerOptions": {
    "target": "ES2021",
    "module": "commonjs",
    "moduleResolution": "node16",
    "outDir": "dist",
    "rootDir": "src",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": [
    "src"
  ]
}


```

```typescript
import { promises as fs } from "fs"; // 引入文件系统 Promise API 以便异步读写文件。
import path from "path"; // 引入 path 用于归一化路径。
import { Client } from "@modelcontextprotocol/sdk/client"; // 引入 MCP 客户端。
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio"; // 引入 stdio 传输层。
import { CallToolResultSchema } from "@modelcontextprotocol/sdk/types"; // 引入工具结果 schema。
import { z } from "zod"; // 引入 zod 以推导类型。
import { getMcpServerConfig, McpCommandServerConfig } from "../utils/mcp-config"; // 引入 MCP 配置读取器。

/**
 * FilesystemClientInterface 负责定义智能体访问本地或远端文件系统的抽象。
 */
export interface FilesystemClientInterface { // 定义文件系统客户端接口。
  /**
   * 读取指定路径的二进制文件内容。
   * @param absolutePath 目标文件的绝对路径。
   */
  readBinary(absolutePath: string): Promise<Buffer>; // 声明返回 Buffer 的读取函数。
}

/**
 * LocalFilesystemClient 使用 Node.js fs/promises 实现 FilesystemClientInterface。
 */
export class LocalFilesystemClient implements FilesystemClientInterface { // 实现具体类。
  /**
   * 通过 fs.promises 读取文件，并在关键步骤输出调试日志。
   */
  async readBinary(absolutePath: string): Promise<Buffer> { // 实现异步读取逻辑。
    console.log("debugging: starting file read", absolutePath); // 输出调试信息以便定位问题。
    const fileBuffer = await fs.readFile(absolutePath); // 实际读取文件并获取 Buffer。
    console.log("debugging: completed file read", fileBuffer.byteLength); // 输出读取结果的字节长度。
    return fileBuffer; // 返回读取到的 Buffer。
  }
}

// 定义工具调用结果类型，方便类型推导。
type CallToolResult = z.infer<typeof CallToolResultSchema>; // 使用 zod schema 推导类型。

/**
 * FilesystemMcpClient 使用 @modelcontextprotocol/server-filesystem 提供的工具读取文件。
 */
export class FilesystemMcpClient implements FilesystemClientInterface { // 定义 MCP 文件系统客户端。
  private client: Client | null = null; // 缓存 MCP 客户端。
  private transport: StdioClientTransport | null = null; // 缓存传输实例。
  private connectPromise: Promise<void> | null = null; // 防止重复连接。

  /**
   * 通过 MCP 的 read_text_file 工具读取文件，并返回 Buffer。
   */
  async readBinary(absolutePath: string): Promise<Buffer> { // 实现接口方法。
    const normalizedPath = path.resolve(absolutePath); // 归一化路径防止逃逸。
    console.log("debugging: FilesystemMcpClient.readBinary", normalizedPath); // 输出调试信息。
    const result = await this.callTool("read_text_file", { path: normalizedPath }); // 调用读取工具。
    const firstItem = result.content[0]; // 仅关注首个内容。
    if (firstItem && firstItem.type === "text") { // 处理文本内容。
      return Buffer.from(firstItem.text, "utf-8"); // 将文本转为 Buffer。
    }
    if (firstItem && "data" in firstItem && typeof (firstItem as { data?: unknown }).data === "string") { // 处理媒体内容。
      return Buffer.from((firstItem as { data: string }).data, "base64"); // base64 转 Buffer。
    }
    throw new Error("filesystem MCP 返回了无法解析的内容，请确认工具输出"); // 若不匹配则抛错。
  }

  /**
   * 统一的工具调用封装。
   */
  private async callTool(name: string, args: Record<string, unknown>): Promise<CallToolResult> { // 定义工具调用函数。
    const client = await this.ensureConnected(); // 确保已经连接。
    const request = { // 构建 MCP 请求。
      method: "tools/call", // 固定方法名。
      params: {
        name, // 工具名。
        arguments: args // 工具参数。
      }
    }; // 请求对象结束。
    return client.request(request, CallToolResultSchema); // 发送请求并返回结果。
  }

  /**
   * 初始化连接，仅在首次调用时触发。
   */
  private async ensureConnected(): Promise<Client> { // 定义连接函数。
    if (this.client) { // 已连接直接返回。
      return this.client; // 返回缓存实例。
    }
    if (this.connectPromise) { // 若正在连接，等待完成。
      await this.connectPromise; // 等待连接 Promise。
      return this.client as Client; // 返回完成后的客户端。
    }
    this.connectPromise = this.initializeConnection(); // 触发初始化。
    await this.connectPromise; // 等待完成。
    return this.client as Client; // 返回客户端。
  }

  /**
   * 根据 mcp-config.jsonc 启动 server-filesystem。
   */
  private async initializeConnection(): Promise<void> { // 实现连接逻辑。
    const rawConfig = await getMcpServerConfig("filesystem"); // 读取配置。
    if (!("command" in rawConfig)) { // 校验类型。
      throw new Error("filesystem MCP 配置缺少 command 字段"); // 抛错。
    }
    const config = rawConfig as McpCommandServerConfig; // 强制转换。
    const env: Record<string, string> = {}; // 构建环境变量。
    for (const [key, value] of Object.entries(process.env)) { // 遍历当前环境。
      if (typeof value === "string") { // 仅拷贝字符串。
        env[key] = value; // 复制变量。
      }
    }
    if (config.env) { // 合并额外 env。
      Object.assign(env, config.env); // 合并配置环境。
    }
    this.transport = new StdioClientTransport({ // 创建 stdio 传输。
      command: config.command, // 指定命令。
      args: config.args, // 指定参数。
      env, // 传入合并后的环境。
      cwd: config.workingDirectory // 设置工作目录。
    }); // 传输配置完成。
    this.client = new Client({ // 创建 MCP 客户端。
      name: "learning-agent-filesystem-client", // 客户端名称。
      version: "0.1.0" // 版本。
    }, {
      capabilities: {
        tools: {} // 声明工具能力。
      }
    }); // 客户端实例。
    this.client.onerror = (error: unknown) => { // 注册错误处理并显式类型声明。
      console.error("debugging: filesystem MCP client error", error); // 输出错误。
    }; // 结束回调。
    await this.client.connect(this.transport); // 连接服务器。
    console.log("debugging: filesystem MCP connected"); // 输出成功日志。
    process.once("exit", () => { // 注册进程退出清理。
      void this.dispose(); // 触发清理。
    }); // 监听结束。
  }

  /**
   * 关闭底层连接，避免僵尸进程。
   */
  async dispose(): Promise<void> { // 定义清理方法。
    if (this.client) { // 若客户端存在。
      await this.client.close(); // 关闭协议。
      this.client = null; // 清空引用。
    }
    if (this.transport) { // 若传输存在。
      await this.transport.close(); // 关闭传输。
      this.transport = null; // 清空引用。
    }
    this.connectPromise = null; // 重置连接状态。
  }
}


```

```typescript
import { NotionWritePayload, LearningTask } from "../types"; // 引入需要的类型定义。
import { Client } from "@modelcontextprotocol/sdk/client"; // 引入 MCP 客户端。
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp"; // 引入 HTTP 传输。
import { CallToolResultSchema } from "@modelcontextprotocol/sdk/types"; // 引入工具调用结果 schema。
import { z } from "zod"; // 引入 zod 以推导类型。
import { getMcpServerConfig, McpHttpServerConfig } from "../utils/mcp-config"; // 引入 MCP 配置加载器。

/**
 * NotionClientInterface 抽象了智能体需要的 Notion 能力。
 */
export interface NotionClientInterface { // 定义接口。
  /**
   * 创建新的 Notion 页面。
   * @param payload 页面内容载荷。
   */
  createPage(payload: NotionWritePayload): Promise<string>; // 返回新页面 ID。

  /**
   * 更新 Notion 页面属性或内容。
   * @param pageId 目标页面 ID。
   * @param properties 属性键值。
   */
  updatePage(pageId: string, properties: Record<string, string | number>): Promise<void>; // 无返回值。

  /**
   * 创建评论用于提醒。
   * @param pageId 目标页面 ID。
   * @param commentText 评论文本。
   */
  createComment(pageId: string, commentText: string): Promise<void>; // 无返回值。
}

/**
 * MockNotionClient 简单地将每次操作输出到控制台，便于演示。
 */
export class MockNotionClient implements NotionClientInterface { // 模拟实现。
  /**
   * 用于生成伪页面 ID 的计数器。
   */
  private pageCounter = 0; // 初始化计数器。

  /**
   * 模拟创建页面：打印内容并返回 ID。
   */
  async createPage(payload: NotionWritePayload): Promise<string> { // 实现 createPage。
    console.log("debugging: creating Notion page", payload.title); // 输出调试信息。
    console.log("debugging: markdown content", payload.markdownContent); // 输出内容。
    const newId = `page-${++this.pageCounter}`; // 生成 ID。
    console.log("debugging: created Notion page ID", newId); // 输出 ID。
    return newId; // 返回 ID。
  }

  /**
   * 模拟更新页面属性。
   */
  async updatePage(pageId: string, properties: Record<string, string | number>): Promise<void> { // 实现 updatePage。
    console.log("debugging: updating Notion page", pageId); // 输出页面 ID。
    console.log("debugging: new properties", properties); // 输出属性。
  }

  /**
   * 模拟创建评论。
   */
  async createComment(pageId: string, commentText: string): Promise<void> { // 实现 createComment。
    console.log("debugging: creating comment", pageId); // 输出页面 ID。
    console.log("debugging: comment text", commentText); // 输出评论文本。
  }

  /**
   * 根据任务构建评论文本的辅助方法。
   * @param task 学习任务对象。
   */
  buildCommentFromTask(task: LearningTask): string { // 提供辅助函数。
    console.log("debugging: building comment for task", task.taskId); // 输出任务 ID。
    return `任务 ${task.taskId} (${task.type}) 已同步，描述：${task.description}`; // 返回描述文本。
  }
}

// 定义工具返回值类型，便于后续解析。
type CallToolResult = z.infer<typeof CallToolResultSchema>; // 通过 zod schema 推导类型。

/**
 * NotionMcpClient 使用 Notion 官方 MCP，基于 Streamable HTTP 进行真实调用。
 */
export class NotionMcpClient implements NotionClientInterface { // 定义真实客户端。
  private client: Client | null = null; // 缓存 MCP 客户端实例。
  private transport: StreamableHTTPClientTransport | null = null; // 缓存传输层。
  private connectPromise: Promise<void> | null = null; // 防止重复连接。

  constructor(private readonly authToken = process.env.NOTION_MCP_TOKEN) { // 构造函数中注入令牌。
    if (!this.authToken) { // 若缺少令牌则抛错，引导用户配置。
      throw new Error("缺少 NOTION_MCP_TOKEN，请参考 https://developers.notion.com/docs/get-started-with-mcp 配置集成令牌"); // 抛出明确错误。
    }
  }

  /**
   * 创建页面：调用 notion-create-pages 工具。
   */
  async createPage(payload: NotionWritePayload): Promise<string> { // 实现 createPage。
    console.log("debugging: NotionMcpClient.createPage", payload.title); // 调试日志。
    const args = { // 构建工具参数。
      parent_page_id: payload.parentPageId, // 父页面 ID。
      title: payload.title, // 标题。
      markdown_content: payload.markdownContent, // Markdown 内容。
      properties: payload.properties // 属性映射。
    }; // 参数对象结束。
    const result = await this.callTool("notion-create-pages", args); // 调用 MCP 工具。
    return this.extractResourceIdentifier(result); // 从返回结果提取资源 ID。
  }

  /**
   * 更新页面属性：调用 notion-update-page。
   */
  async updatePage(pageId: string, properties: Record<string, string | number>): Promise<void> { // 实现 updatePage。
    console.log("debugging: NotionMcpClient.updatePage", pageId); // 输出日志。
    await this.callTool("notion-update-page", { // 调用工具。
      page_id: pageId, // 目标页面。
      properties // 属性对象。
    }); // 调用结束。
  }

  /**
   * 创建评论：调用 notion-create-comment。
   */
  async createComment(pageId: string, commentText: string): Promise<void> { // 实现 createComment。
    console.log("debugging: NotionMcpClient.createComment", pageId); // 输出日志。
    await this.callTool("notion-create-comment", { // 调用工具。
      page_id: pageId, // 页面 ID。
      rich_text: commentText // 评论正文。
    }); // 调用结束。
  }

  /**
   * 统一工具调用入口，确保在调用前完成连接。
   */
  private async callTool(name: string, args: Record<string, unknown>): Promise<CallToolResult> { // 定义工具调用函数。
    const client = await this.ensureConnected(); // 确保已连接。
    const request = { // 构建 request payload。
      method: "tools/call", // 标准 MCP 方法。
      params: {
        name, // 工具名。
        arguments: args // 具体参数。
      }
    }; // 请求对象结束。
    const result = await client.request(request, CallToolResultSchema); // 发送请求并通过 schema 验证。
    console.log("debugging: NotionMcpClient.callTool result items", result.content.length); // 打印结果数量。
    return result; // 返回结果。
  }

  /**
   * 确保 MCP 客户端与传输只初始化一次。
   */
  private async ensureConnected(): Promise<Client> { // 定义连接函数。
    if (this.client) { // 若已存在直接返回。
      return this.client; // 返回已连接的客户端。
    }
    if (this.connectPromise) { // 若正在连接，等待完成。
      await this.connectPromise; // 等待现有 Promise。
      return this.client as Client; // 返回连接完成后的客户端。
    }
    this.connectPromise = this.initializeConnection(); // 启动连接流程。
    await this.connectPromise; // 等待连接完成。
    return this.client as Client; // 返回客户端。
  }

  /**
   * 依据 mcp-config.jsonc 建立 Streamable HTTP 连接。
   */
  private async initializeConnection(): Promise<void> { // 定义实际连接实现。
    const rawConfig = await getMcpServerConfig("notion"); // 加载配置。
    if (!("url" in rawConfig)) { // 校验为 HTTP 类型。
      throw new Error("Notion MCP 配置必须包含 url 字段"); // 抛出错误。
    }
    const config = rawConfig as McpHttpServerConfig; // 强制转换。
    const requestInitHeaders: Record<string, string> = { // 构建请求头。
      Authorization: `Bearer ${this.authToken}`, // 传递 Notion 集成令牌。
      "Notion-Version": process.env.NOTION_MCP_VERSION || "2025-09-03" // 指定版本，默认使用最新稳定版。
    }; // 头部定义结束。
    this.transport = new StreamableHTTPClientTransport(new URL(config.url), { // 创建 HTTP 传输。
      requestInit: {
        headers: requestInitHeaders // 设置头部。
      }
    }); // 传输实例化结束。
    this.client = new Client({ // 创建 MCP 客户端。
      name: "learning-agent-notion-client", // 客户端名称。
      version: "0.1.0" // 版本号。
    }, {
      capabilities: {
        tools: {} // 声明工具能力。
      }
    }); // 客户端完成。
    this.client.onerror = (error: unknown) => { // 注册错误处理并显式类型声明。
      console.error("debugging: Notion MCP client error", error); // 输出错误。
    }; // 回调结束。
    await this.client.connect(this.transport); // 执行连接。
    console.log("debugging: Notion MCP connected"); // 输出成功日志。
  }

  /**
   * 从工具结果中提取页面或资源标识符，便于上层追踪。
   */
  private extractResourceIdentifier(result: CallToolResult): string { // 定义提取函数。
    for (const item of result.content) { // 遍历内容数组。
      if (item.type === "resource_link" && item.uri) { // 若为资源链接。
        return item.uri; // 返回 URI。
      }
      if (item.type === "text" && item.text) { // 若为文本。
        const match = item.text.match(/page_id\s*[:：]\s*(\S+)/i); // 尝试匹配 page_id。
        if (match) { // 成功则返回。
          return match[1]; // 返回匹配值。
        }
      }
    }
    return `notion-${Date.now()}`; // 若无可用内容，返回临时 ID。
  }
}


```

```jsonc
{
  "compilerOptions": {
    "target": "ES2021",
    "module": "Node16",
    "moduleResolution": "node16",
    "outDir": "dist",
    "rootDir": "src",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": [
    "src"
  ]
}


```

```typescript
import { promises as fs } from "fs"; // 引入文件系统 Promise API 以便异步读写文件。
import path from "path"; // 引入 path 用于归一化路径。
import { Client } from "@modelcontextprotocol/sdk/dist/cjs/client/index.js"; // 引入 MCP 客户端 (CJS)。
import { StdioClientTransport } from "@modelcontextprotocol/sdk/dist/cjs/client/stdio.js"; // 引入 stdio 传输层 (CJS)。
import { CallToolResultSchema } from "@modelcontextprotocol/sdk/dist/cjs/types.js"; // 引入工具结果 schema (CJS)。
import { z } from "zod"; // 引入 zod 以推导类型。
import { getMcpServerConfig, McpCommandServerConfig } from "../utils/mcp-config"; // 引入 MCP 配置读取器。

/**
 * FilesystemClientInterface 负责定义智能体访问本地或远端文件系统的抽象。
 */
export interface FilesystemClientInterface { // 定义文件系统客户端接口。
  /**
   * 读取指定路径的二进制文件内容。
   * @param absolutePath 目标文件的绝对路径。
   */
  readBinary(absolutePath: string): Promise<Buffer>; // 声明返回 Buffer 的读取函数。
}

/**
 * LocalFilesystemClient 使用 Node.js fs/promises 实现 FilesystemClientInterface。
 */
export class LocalFilesystemClient implements FilesystemClientInterface { // 实现具体类。
  /**
   * 通过 fs.promises 读取文件，并在关键步骤输出调试日志。
   */
  async readBinary(absolutePath: string): Promise<Buffer> { // 实现异步读取逻辑。
    console.log("debugging: starting file read", absolutePath); // 输出调试信息以便定位问题。
    const fileBuffer = await fs.readFile(absolutePath); // 实际读取文件并获取 Buffer。
    console.log("debugging: completed file read", fileBuffer.byteLength); // 输出读取结果的字节长度。
    return fileBuffer; // 返回读取到的 Buffer。
  }
}

// 定义工具调用结果类型，方便类型推导。
type CallToolResult = z.infer<typeof CallToolResultSchema>; // 使用 zod schema 推导类型。

/**
 * FilesystemMcpClient 使用 @modelcontextprotocol/server-filesystem 提供的工具读取文件。
 */
export class FilesystemMcpClient implements FilesystemClientInterface { // 定义 MCP 文件系统客户端。
  private client: Client | null = null; // 缓存 MCP 客户端。
  private transport: StdioClientTransport | null = null; // 缓存传输实例。
  private connectPromise: Promise<void> | null = null; // 防止重复连接。

  /**
   * 通过 MCP 的 read_text_file 工具读取文件，并返回 Buffer。
   */
  async readBinary(absolutePath: string): Promise<Buffer> { // 实现接口方法。
    const normalizedPath = path.resolve(absolutePath); // 归一化路径防止逃逸。
    console.log("debugging: FilesystemMcpClient.readBinary", normalizedPath); // 输出调试信息。
    const result = await this.callTool("read_text_file", { path: normalizedPath }); // 调用读取工具。
    const firstItem = result.content[0]; // 仅关注首个内容。
    if (firstItem && firstItem.type === "text") { // 处理文本内容。
      return Buffer.from(firstItem.text, "utf-8"); // 将文本转为 Buffer。
    }
    if (firstItem && "data" in firstItem && typeof (firstItem as { data?: unknown }).data === "string") { // 处理媒体内容。
      return Buffer.from((firstItem as { data: string }).data, "base64"); // base64 转 Buffer。
    }
    throw new Error("filesystem MCP 返回了无法解析的内容，请确认工具输出"); // 若不匹配则抛错。
  }

  /**
   * 统一的工具调用封装。
   */
  private async callTool(name: string, args: Record<string, unknown>): Promise<CallToolResult> { // 定义工具调用函数。
    const client = await this.ensureConnected(); // 确保已经连接。
    const request = { // 构建 MCP 请求。
      method: "tools/call", // 固定方法名。
      params: {
        name, // 工具名。
        arguments: args // 工具参数。
      }
    }; // 请求对象结束。
    return client.request(request, CallToolResultSchema); // 发送请求并返回结果。
  }

  /**
   * 初始化连接，仅在首次调用时触发。
   */
  private async ensureConnected(): Promise<Client> { // 定义连接函数。
    if (this.client) { // 已连接直接返回。
      return this.client; // 返回缓存实例。
    }
    if (this.connectPromise) { // 若正在连接，等待完成。
      await this.connectPromise; // 等待连接 Promise。
      return this.client as Client; // 返回完成后的客户端。
    }
    this.connectPromise = this.initializeConnection(); // 触发初始化。
    await this.connectPromise; // 等待完成。
    return this.client as Client; // 返回客户端。
  }

  /**
   * 根据 mcp-config.jsonc 启动 server-filesystem。
   */
  private async initializeConnection(): Promise<void> { // 实现连接逻辑。
    const rawConfig = await getMcpServerConfig("filesystem"); // 读取配置。
    if (!("command" in rawConfig)) { // 校验类型。
      throw new Error("filesystem MCP 配置缺少 command 字段"); // 抛错。
    }
    const config = rawConfig as McpCommandServerConfig; // 强制转换。
    const env: Record<string, string> = {}; // 构建环境变量。
    for (const [key, value] of Object.entries(process.env)) { // 遍历当前环境。
      if (typeof value === "string") { // 仅拷贝字符串。
        env[key] = value; // 复制变量。
      }
    }
    if (config.env) { // 合并额外 env。
      Object.assign(env, config.env); // 合并配置环境。
    }
    this.transport = new StdioClientTransport({ // 创建 stdio 传输。
      command: config.command, // 指定命令。
      args: config.args, // 指定参数。
      env, // 传入合并后的环境。
      cwd: config.workingDirectory // 设置工作目录。
    }); // 传输配置完成。
    this.client = new Client({ // 创建 MCP 客户端。
      name: "learning-agent-filesystem-client", // 客户端名称。
      version: "0.1.0" // 版本。
    }, {
      capabilities: {
        tools: {} // 声明工具能力。
      }
    }); // 客户端实例。
    this.client.onerror = (error: unknown) => { // 注册错误处理并显式类型声明。
      console.error("debugging: filesystem MCP client error", error); // 输出错误。
    }; // 结束回调。
    await this.client.connect(this.transport); // 连接服务器。
    console.log("debugging: filesystem MCP connected"); // 输出成功日志。
    process.once("exit", () => { // 注册进程退出清理。
      void this.dispose(); // 触发清理。
    }); // 监听结束。
  }

  /**
   * 关闭底层连接，避免僵尸进程。
   */
  async dispose(): Promise<void> { // 定义清理方法。
    if (this.client) { // 若客户端存在。
      await this.client.close(); // 关闭协议。
      this.client = null; // 清空引用。
    }
    if (this.transport) { // 若传输存在。
      await this.transport.close(); // 关闭传输。
      this.transport = null; // 清空引用。
    }
    this.connectPromise = null; // 重置连接状态。
  }
}


```

```typescript
import { NotionWritePayload, LearningTask } from "../types"; // 引入需要的类型定义。
import { Client } from "@modelcontextprotocol/sdk/dist/cjs/client/index.js"; // 引入 MCP 客户端 (CJS)。
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/dist/cjs/client/streamableHttp.js"; // 引入 HTTP 传输 (CJS)。
import { CallToolResultSchema } from "@modelcontextprotocol/sdk/dist/cjs/types.js"; // 引入工具调用结果 schema (CJS)。
import { z } from "zod"; // 引入 zod 以推导类型。
import { getMcpServerConfig, McpHttpServerConfig } from "../utils/mcp-config"; // 引入 MCP 配置加载器。

/**
 * NotionClientInterface 抽象了智能体需要的 Notion 能力。
 */
export interface NotionClientInterface { // 定义接口。
  /**
   * 创建新的 Notion 页面。
   * @param payload 页面内容载荷。
   */
  createPage(payload: NotionWritePayload): Promise<string>; // 返回新页面 ID。

  /**
   * 更新 Notion 页面属性或内容。
   * @param pageId 目标页面 ID。
   * @param properties 属性键值。
   */
  updatePage(pageId: string, properties: Record<string, string | number>): Promise<void>; // 无返回值。

  /**
   * 创建评论用于提醒。
   * @param pageId 目标页面 ID。
   * @param commentText 评论文本。
   */
  createComment(pageId: string, commentText: string): Promise<void>; // 无返回值。
}

/**
 * MockNotionClient 简单地将每次操作输出到控制台，便于演示。
 */
export class MockNotionClient implements NotionClientInterface { // 模拟实现。
  /**
   * 用于生成伪页面 ID 的计数器。
   */
  private pageCounter = 0; // 初始化计数器。

  /**
   * 模拟创建页面：打印内容并返回 ID。
   */
  async createPage(payload: NotionWritePayload): Promise<string> { // 实现 createPage。
    console.log("debugging: creating Notion page", payload.title); // 输出调试信息。
    console.log("debugging: markdown content", payload.markdownContent); // 输出内容。
    const newId = `page-${++this.pageCounter}`; // 生成 ID。
    console.log("debugging: created Notion page ID", newId); // 输出 ID。
    return newId; // 返回 ID。
  }

  /**
   * 模拟更新页面属性。
   */
  async updatePage(pageId: string, properties: Record<string, string | number>): Promise<void> { // 实现 updatePage。
    console.log("debugging: updating Notion page", pageId); // 输出页面 ID。
    console.log("debugging: new properties", properties); // 输出属性。
  }

  /**
   * 模拟创建评论。
   */
  async createComment(pageId: string, commentText: string): Promise<void> { // 实现 createComment。
    console.log("debugging: creating comment", pageId); // 输出页面 ID。
    console.log("debugging: comment text", commentText); // 输出评论文本。
  }

  /**
   * 根据任务构建评论文本的辅助方法。
   * @param task 学习任务对象。
   */
  buildCommentFromTask(task: LearningTask): string { // 提供辅助函数。
    console.log("debugging: building comment for task", task.taskId); // 输出任务 ID。
    return `任务 ${task.taskId} (${task.type}) 已同步，描述：${task.description}`; // 返回描述文本。
  }
}

// 定义工具返回值类型，便于后续解析。
type CallToolResult = z.infer<typeof CallToolResultSchema>; // 通过 zod schema 推导类型。

/**
 * NotionMcpClient 使用 Notion 官方 MCP，基于 Streamable HTTP 进行真实调用。
 */
export class NotionMcpClient implements NotionClientInterface { // 定义真实客户端。
  private client: Client | null = null; // 缓存 MCP 客户端实例。
  private transport: StreamableHTTPClientTransport | null = null; // 缓存传输层。
  private connectPromise: Promise<void> | null = null; // 防止重复连接。

  constructor(private readonly authToken = process.env.NOTION_MCP_TOKEN) { // 构造函数中注入令牌。
    if (!this.authToken) { // 若缺少令牌则抛错，引导用户配置。
      throw new Error("缺少 NOTION_MCP_TOKEN，请参考 https://developers.notion.com/docs/get-started-with-mcp 配置集成令牌"); // 抛出明确错误。
    }
  }

  /**
   * 创建页面：调用 notion-create-pages 工具。
   */
  async createPage(payload: NotionWritePayload): Promise<string> { // 实现 createPage。
    console.log("debugging: NotionMcpClient.createPage", payload.title); // 调试日志。
    const args = { // 构建工具参数。
      parent_page_id: payload.parentPageId, // 父页面 ID。
      title: payload.title, // 标题。
      markdown_content: payload.markdownContent, // Markdown 内容。
      properties: payload.properties // 属性映射。
    }; // 参数对象结束。
    const result = await this.callTool("notion-create-pages", args); // 调用 MCP 工具。
    return this.extractResourceIdentifier(result); // 从返回结果提取资源 ID。
  }

  /**
   * 更新页面属性：调用 notion-update-page。
   */
  async updatePage(pageId: string, properties: Record<string, string | number>): Promise<void> { // 实现 updatePage。
    console.log("debugging: NotionMcpClient.updatePage", pageId); // 输出日志。
    await this.callTool("notion-update-page", { // 调用工具。
      page_id: pageId, // 目标页面。
      properties // 属性对象。
    }); // 调用结束。
  }

  /**
   * 创建评论：调用 notion-create-comment。
   */
  async createComment(pageId: string, commentText: string): Promise<void> { // 实现 createComment。
    console.log("debugging: NotionMcpClient.createComment", pageId); // 输出日志。
    await this.callTool("notion-create-comment", { // 调用工具。
      page_id: pageId, // 页面 ID。
      rich_text: commentText // 评论正文。
    }); // 调用结束。
  }

  /**
   * 统一工具调用入口，确保在调用前完成连接。
   */
  private async callTool(name: string, args: Record<string, unknown>): Promise<CallToolResult> { // 定义工具调用函数。
    const client = await this.ensureConnected(); // 确保已连接。
    const request = { // 构建 request payload。
      method: "tools/call", // 标准 MCP 方法。
      params: {
        name, // 工具名。
        arguments: args // 具体参数。
      }
    }; // 请求对象结束。
    const result = await client.request(request, CallToolResultSchema); // 发送请求并通过 schema 验证。
    console.log("debugging: NotionMcpClient.callTool result items", result.content.length); // 打印结果数量。
    return result; // 返回结果。
  }

  /**
   * 确保 MCP 客户端与传输只初始化一次。
   */
  private async ensureConnected(): Promise<Client> { // 定义连接函数。
    if (this.client) { // 若已存在直接返回。
      return this.client; // 返回已连接的客户端。
    }
    if (this.connectPromise) { // 若正在连接，等待完成。
      await this.connectPromise; // 等待现有 Promise。
      return this.client as Client; // 返回连接完成后的客户端。
    }
    this.connectPromise = this.initializeConnection(); // 启动连接流程。
    await this.connectPromise; // 等待连接完成。
    return this.client as Client; // 返回客户端。
  }

  /**
   * 依据 mcp-config.jsonc 建立 Streamable HTTP 连接。
   */
  private async initializeConnection(): Promise<void> { // 定义实际连接实现。
    const rawConfig = await getMcpServerConfig("notion"); // 加载配置。
    if (!("url" in rawConfig)) { // 校验为 HTTP 类型。
      throw new Error("Notion MCP 配置必须包含 url 字段"); // 抛出错误。
    }
    const config = rawConfig as McpHttpServerConfig; // 强制转换。
    const requestInitHeaders: Record<string, string> = { // 构建请求头。
      Authorization: `Bearer ${this.authToken}`, // 传递 Notion 集成令牌。
      "Notion-Version": process.env.NOTION_MCP_VERSION || "2025-09-03" // 指定版本，默认使用最新稳定版。
    }; // 头部定义结束。
    this.transport = new StreamableHTTPClientTransport(new URL(config.url), { // 创建 HTTP 传输。
      requestInit: {
        headers: requestInitHeaders // 设置头部。
      }
    }); // 传输实例化结束。
    this.client = new Client({ // 创建 MCP 客户端。
      name: "learning-agent-notion-client", // 客户端名称。
      version: "0.1.0" // 版本号。
    }, {
      capabilities: {
        tools: {} // 声明工具能力。
      }
    }); // 客户端完成。
    this.client.onerror = (error: unknown) => { // 注册错误处理并显式类型声明。
      console.error("debugging: Notion MCP client error", error); // 输出错误。
    }; // 回调结束。
    await this.client.connect(this.transport); // 执行连接。
    console.log("debugging: Notion MCP connected"); // 输出成功日志。
  }

  /**
   * 从工具结果中提取页面或资源标识符，便于上层追踪。
   */
  private extractResourceIdentifier(result: CallToolResult): string { // 定义提取函数。
    for (const item of result.content) { // 遍历内容数组。
      if (item.type === "resource_link" && item.uri) { // 若为资源链接。
        return item.uri; // 返回 URI。
      }
      if (item.type === "text" && item.text) { // 若为文本。
        const match = item.text.match(/page_id\s*[:：]\s*(\S+)/i); // 尝试匹配 page_id。
        if (match) { // 成功则返回。
          return match[1]; // 返回匹配值。
        }
      }
    }
    return `notion-${Date.now()}`; // 若无可用内容，返回临时 ID。
  }
}


```

```typescript
import { promises as fs } from "fs"; // 引入文件系统 Promise API 以便异步读写文件。
import path from "path"; // 引入 path 用于归一化路径。
import { Client } from "@modelcontextprotocol/sdk/dist/cjs/client/index.js"; // 引入 MCP 客户端 (CJS)。
import { StdioClientTransport } from "@modelcontextprotocol/sdk/dist/cjs/client/stdio.js"; // 引入 stdio 传输层 (CJS)。
import { CallToolResultSchema } from "@modelcontextprotocol/sdk/dist/cjs/types.js"; // 引入工具结果 schema (CJS)。
import { z } from "zod"; // 引入 zod 以推导类型。
import { getMcpServerConfig, McpCommandServerConfig } from "../utils/mcp-config"; // 引入 MCP 配置读取器。

/**
 * FilesystemClientInterface 负责定义智能体访问本地或远端文件系统的抽象。
 */
export interface FilesystemClientInterface { // 定义文件系统客户端接口。
  /**
   * 读取指定路径的二进制文件内容。
   * @param absolutePath 目标文件的绝对路径。
   */
  readBinary(absolutePath: string): Promise<Buffer>; // 声明返回 Buffer 的读取函数。
}

/**
 * LocalFilesystemClient 使用 Node.js fs/promises 实现 FilesystemClientInterface。
 */
export class LocalFilesystemClient implements FilesystemClientInterface { // 实现具体类。
  /**
   * 通过 fs.promises 读取文件，并在关键步骤输出调试日志。
   */
  async readBinary(absolutePath: string): Promise<Buffer> { // 实现异步读取逻辑。
    console.log("debugging: starting file read", absolutePath); // 输出调试信息以便定位问题。
    const fileBuffer = await fs.readFile(absolutePath); // 实际读取文件并获取 Buffer。
    console.log("debugging: completed file read", fileBuffer.byteLength); // 输出读取结果的字节长度。
    return fileBuffer; // 返回读取到的 Buffer。
  }
}

// 定义工具调用结果类型，方便类型推导。
type CallToolResult = z.infer<typeof CallToolResultSchema>; // 使用 zod schema 推导类型。

/**
 * FilesystemMcpClient 使用 @modelcontextprotocol/server-filesystem 提供的工具读取文件。
 */
export class FilesystemMcpClient implements FilesystemClientInterface { // 定义 MCP 文件系统客户端。
  private client: Client | null = null; // 缓存 MCP 客户端。
  private transport: StdioClientTransport | null = null; // 缓存传输实例。
  private connectPromise: Promise<void> | null = null; // 防止重复连接。

  /**
   * 通过 MCP 的 read_text_file 工具读取文件，并返回 Buffer。
   */
  async readBinary(absolutePath: string): Promise<Buffer> { // 实现接口方法。
    const normalizedPath = path.resolve(absolutePath); // 归一化路径防止逃逸。
    console.log("debugging: FilesystemMcpClient.readBinary", normalizedPath); // 输出调试信息。
    const result = await this.callTool("read_text_file", { path: normalizedPath }); // 调用读取工具。
    const firstItem = result.content[0]; // 仅关注首个内容。
    if (firstItem && firstItem.type === "text") { // 处理文本内容。
      return Buffer.from(firstItem.text, "utf-8"); // 将文本转为 Buffer。
    }
    if (firstItem && "data" in firstItem && typeof (firstItem as { data?: unknown }).data === "string") { // 处理媒体内容。
      return Buffer.from((firstItem as { data: string }).data, "base64"); // base64 转 Buffer。
    }
    throw new Error("filesystem MCP 返回了无法解析的内容，请确认工具输出"); // 若不匹配则抛错。
  }

  /**
   * 统一的工具调用封装。
   */
  private async callTool(name: string, args: Record<string, unknown>): Promise<CallToolResult> { // 定义工具调用函数。
    const client = await this.ensureConnected(); // 确保已经连接。
    const request = { // 构建 MCP 请求。
      method: "tools/call", // 固定方法名。
      params: {
        name, // 工具名。
        arguments: args // 工具参数。
      }
    }; // 请求对象结束。
    return client.request(request, CallToolResultSchema); // 发送请求并返回结果。
  }

  /**
   * 初始化连接，仅在首次调用时触发。
   */
  private async ensureConnected(): Promise<Client> { // 定义连接函数。
    if (this.client) { // 已连接直接返回。
      return this.client; // 返回缓存实例。
    }
    if (this.connectPromise) { // 若正在连接，等待完成。
      await this.connectPromise; // 等待连接 Promise。
      if (!this.client) { // 再次校验。
        throw new Error("filesystem MCP 客户端初始化失败"); // 抛出异常。
      }
      return this.client; // 返回已就绪客户端。
    }
    this.connectPromise = this.initializeConnection(); // 触发初始化。
    await this.connectPromise; // 等待完成。
    if (!this.client) { // 校验连接结果。
      throw new Error("filesystem MCP 客户端在初始化后为空"); // 抛出异常。
    }
    return this.client; // 返回客户端。
  }

  /**
   * 根据 mcp-config.jsonc 启动 server-filesystem。
   */
  private async initializeConnection(): Promise<void> { // 实现连接逻辑。
    const rawConfig = await getMcpServerConfig("filesystem"); // 读取配置。
    if (!("command" in rawConfig)) { // 校验类型。
      throw new Error("filesystem MCP 配置缺少 command 字段"); // 抛错。
    }
    const config = rawConfig as McpCommandServerConfig; // 强制转换。
    const env: Record<string, string> = {}; // 构建环境变量。
    for (const [key, value] of Object.entries(process.env)) { // 遍历当前环境。
      if (typeof value === "string") { // 仅拷贝字符串。
        env[key] = value; // 复制变量。
      }
    }
    if (config.env) { // 合并额外 env。
      Object.assign(env, config.env); // 合并配置环境。
    }
    this.transport = new StdioClientTransport({ // 创建 stdio 传输。
      command: config.command, // 指定命令。
      args: config.args, // 指定参数。
      env, // 传入合并后的环境。
      cwd: config.workingDirectory // 设置工作目录。
    }); // 传输配置完成。
    this.client = new Client({ // 创建 MCP 客户端。
      name: "learning-agent-filesystem-client", // 客户端名称。
      version: "0.1.0" // 版本。
    }); // 客户端实例。
    this.client.onerror = (error: unknown) => { // 注册错误处理并显式类型声明。
      console.error("debugging: filesystem MCP client error", error); // 输出错误。
    }; // 结束回调。
    await this.client.connect(this.transport); // 连接服务器。
    console.log("debugging: filesystem MCP connected"); // 输出成功日志。
    process.once("exit", () => { // 注册进程退出清理。
      void this.dispose(); // 触发清理。
    }); // 监听结束。
  }

  /**
   * 关闭底层连接，避免僵尸进程。
   */
  async dispose(): Promise<void> { // 定义清理方法。
    if (this.client) { // 若客户端存在。
      await this.client.close(); // 关闭协议。
      this.client = null; // 清空引用。
    }
    if (this.transport) { // 若传输存在。
      await this.transport.close(); // 关闭传输。
      this.transport = null; // 清空引用。
    }
    this.connectPromise = null; // 重置连接状态。
  }
}


```

```typescript
import { NotionWritePayload, LearningTask } from "../types"; // 引入需要的类型定义。
import { Client } from "@modelcontextprotocol/sdk/dist/cjs/client/index.js"; // 引入 MCP 客户端 (CJS)。
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/dist/cjs/client/streamableHttp.js"; // 引入 HTTP 传输 (CJS)。
import { CallToolResultSchema } from "@modelcontextprotocol/sdk/dist/cjs/types.js"; // 引入工具调用结果 schema (CJS)。
import { z } from "zod"; // 引入 zod 以推导类型。
import { getMcpServerConfig, McpHttpServerConfig } from "../utils/mcp-config"; // 引入 MCP 配置加载器。

/**
 * NotionClientInterface 抽象了智能体需要的 Notion 能力。
 */
export interface NotionClientInterface { // 定义接口。
  /**
   * 创建新的 Notion 页面。
   * @param payload 页面内容载荷。
   */
  createPage(payload: NotionWritePayload): Promise<string>; // 返回新页面 ID。

  /**
   * 更新 Notion 页面属性或内容。
   * @param pageId 目标页面 ID。
   * @param properties 属性键值。
   */
  updatePage(pageId: string, properties: Record<string, string | number>): Promise<void>; // 无返回值。

  /**
   * 创建评论用于提醒。
   * @param pageId 目标页面 ID。
   * @param commentText 评论文本。
   */
  createComment(pageId: string, commentText: string): Promise<void>; // 无返回值。
}

/**
 * MockNotionClient 简单地将每次操作输出到控制台，便于演示。
 */
export class MockNotionClient implements NotionClientInterface { // 模拟实现。
  /**
   * 用于生成伪页面 ID 的计数器。
   */
  private pageCounter = 0; // 初始化计数器。

  /**
   * 模拟创建页面：打印内容并返回 ID。
   */
  async createPage(payload: NotionWritePayload): Promise<string> { // 实现 createPage。
    console.log("debugging: creating Notion page", payload.title); // 输出调试信息。
    console.log("debugging: markdown content", payload.markdownContent); // 输出内容。
    const newId = `page-${++this.pageCounter}`; // 生成 ID。
    console.log("debugging: created Notion page ID", newId); // 输出 ID。
    return newId; // 返回 ID。
  }

  /**
   * 模拟更新页面属性。
   */
  async updatePage(pageId: string, properties: Record<string, string | number>): Promise<void> { // 实现 updatePage。
    console.log("debugging: updating Notion page", pageId); // 输出页面 ID。
    console.log("debugging: new properties", properties); // 输出属性。
  }

  /**
   * 模拟创建评论。
   */
  async createComment(pageId: string, commentText: string): Promise<void> { // 实现 createComment。
    console.log("debugging: creating comment", pageId); // 输出页面 ID。
    console.log("debugging: comment text", commentText); // 输出评论文本。
  }

  /**
   * 根据任务构建评论文本的辅助方法。
   * @param task 学习任务对象。
   */
  buildCommentFromTask(task: LearningTask): string { // 提供辅助函数。
    console.log("debugging: building comment for task", task.taskId); // 输出任务 ID。
    return `任务 ${task.taskId} (${task.type}) 已同步，描述：${task.description}`; // 返回描述文本。
  }
}

// 定义工具返回值类型，便于后续解析。
type CallToolResult = z.infer<typeof CallToolResultSchema>; // 通过 zod schema 推导类型。

/**
 * NotionMcpClient 使用 Notion 官方 MCP，基于 Streamable HTTP 进行真实调用。
 */
export class NotionMcpClient implements NotionClientInterface { // 定义真实客户端。
  private client: Client | null = null; // 缓存 MCP 客户端实例。
  private transport: StreamableHTTPClientTransport | null = null; // 缓存传输层。
  private connectPromise: Promise<void> | null = null; // 防止重复连接。

  constructor(private readonly authToken = process.env.NOTION_MCP_TOKEN) { // 构造函数中注入令牌。
    if (!this.authToken) { // 若缺少令牌则抛错，引导用户配置。
      throw new Error("缺少 NOTION_MCP_TOKEN，请参考 https://developers.notion.com/docs/get-started-with-mcp 配置集成令牌"); // 抛出明确错误。
    }
  }

  /**
   * 创建页面：调用 notion-create-pages 工具。
   */
  async createPage(payload: NotionWritePayload): Promise<string> { // 实现 createPage。
    console.log("debugging: NotionMcpClient.createPage", payload.title); // 调试日志。
    const args = { // 构建工具参数。
      parent_page_id: payload.parentPageId, // 父页面 ID。
      title: payload.title, // 标题。
      markdown_content: payload.markdownContent, // Markdown 内容。
      properties: payload.properties // 属性映射。
    }; // 参数对象结束。
    const result = await this.callTool("notion-create-pages", args); // 调用 MCP 工具。
    return this.extractResourceIdentifier(result); // 从返回结果提取资源 ID。
  }

  /**
   * 更新页面属性：调用 notion-update-page。
   */
  async updatePage(pageId: string, properties: Record<string, string | number>): Promise<void> { // 实现 updatePage。
    console.log("debugging: NotionMcpClient.updatePage", pageId); // 输出日志。
    await this.callTool("notion-update-page", { // 调用工具。
      page_id: pageId, // 目标页面。
      properties // 属性对象。
    }); // 调用结束。
  }

  /**
   * 创建评论：调用 notion-create-comment。
   */
  async createComment(pageId: string, commentText: string): Promise<void> { // 实现 createComment。
    console.log("debugging: NotionMcpClient.createComment", pageId); // 输出日志。
    await this.callTool("notion-create-comment", { // 调用工具。
      page_id: pageId, // 页面 ID。
      rich_text: commentText // 评论正文。
    }); // 调用结束。
  }

  /**
   * 统一工具调用入口，确保在调用前完成连接。
   */
  private async callTool(name: string, args: Record<string, unknown>): Promise<CallToolResult> { // 定义工具调用函数。
    const client = await this.ensureConnected(); // 确保已连接。
    const request = { // 构建 request payload。
      method: "tools/call", // 标准 MCP 方法。
      params: {
        name, // 工具名。
        arguments: args // 具体参数。
      }
    }; // 请求对象结束。
    const result = await client.request(request, CallToolResultSchema); // 发送请求并通过 schema 验证。
    console.log("debugging: NotionMcpClient.callTool result items", result.content.length); // 打印结果数量。
    return result; // 返回结果。
  }

  /**
   * 确保 MCP 客户端与传输只初始化一次。
   */
  private async ensureConnected(): Promise<Client> { // 定义连接函数。
    if (this.client) { // 若已存在直接返回。
      return this.client; // 返回已连接的客户端。
    }
    if (this.connectPromise) { // 若正在连接，等待完成。
      await this.connectPromise; // 等待现有 Promise。
      if (!this.client) { // 再次校验。
        throw new Error("Notion MCP 客户端初始化失败"); // 抛出错误。
      }
      return this.client; // 返回客户端。
    }
    this.connectPromise = this.initializeConnection(); // 启动连接流程。
    await this.connectPromise; // 等待连接完成。
    if (!this.client) { // 校验是否成功。
      throw new Error("Notion MCP 客户端在初始化后为空"); // 抛出错误。
    }
    return this.client; // 返回客户端。
  }

  /**
   * 依据 mcp-config.jsonc 建立 Streamable HTTP 连接。
   */
  private async initializeConnection(): Promise<void> { // 定义实际连接实现。
    const rawConfig = await getMcpServerConfig("notion"); // 加载配置。
    if (!("url" in rawConfig)) { // 校验为 HTTP 类型。
      throw new Error("Notion MCP 配置必须包含 url 字段"); // 抛出错误。
    }
    const config = rawConfig as McpHttpServerConfig; // 强制转换。
    const requestInitHeaders: Record<string, string> = { // 构建请求头。
      Authorization: `Bearer ${this.authToken}`, // 传递 Notion 集成令牌。
      "Notion-Version": process.env.NOTION_MCP_VERSION || "2025-09-03" // 指定版本，默认使用最新稳定版。
    }; // 头部定义结束。
    this.transport = new StreamableHTTPClientTransport(new URL(config.url), { // 创建 HTTP 传输。
      requestInit: {
        headers: requestInitHeaders // 设置头部。
      }
    }); // 传输实例化结束。
    this.client = new Client({ // 创建 MCP 客户端。
      name: "learning-agent-notion-client", // 客户端名称。
      version: "0.1.0" // 版本号。
    }); // 客户端完成。
    this.client.onerror = (error: unknown) => { // 注册错误处理并显式类型声明。
      console.error("debugging: Notion MCP client error", error); // 输出错误。
    }; // 回调结束。
    await this.client.connect(this.transport); // 执行连接。
    console.log("debugging: Notion MCP connected"); // 输出成功日志。
  }

  /**
   * 从工具结果中提取页面或资源标识符，便于上层追踪。
   */
  private extractResourceIdentifier(result: CallToolResult): string { // 定义提取函数。
    for (const item of result.content) { // 遍历内容数组。
      if (item.type === "resource_link" && item.uri) { // 若为资源链接。
        return item.uri; // 返回 URI。
      }
      if (item.type === "text" && item.text) { // 若为文本。
        const match = item.text.match(/page_id\s*[:：]\s*(\S+)/i); // 尝试匹配 page_id。
        if (match) { // 成功则返回。
          return match[1]; // 返回匹配值。
        }
      }
    }
    return `notion-${Date.now()}`; // 若无可用内容，返回临时 ID。
  }
}


```

```typescript
import { promises as fs } from "fs"; // 引入文件系统 Promise API 以便异步读写文件。
import path from "path"; // 引入 path 用于归一化路径。
import { Client } from "@modelcontextprotocol/sdk/client"; // 引入 MCP 客户端。
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio"; // 引入 stdio 传输层。
import { CallToolResultSchema } from "@modelcontextprotocol/sdk/types"; // 引入工具结果 schema。
import { z } from "zod"; // 引入 zod 以推导类型。
import { getMcpServerConfig, McpCommandServerConfig } from "../utils/mcp-config"; // 引入 MCP 配置读取器。

/**
 * FilesystemClientInterface 负责定义智能体访问本地或远端文件系统的抽象。
 */
export interface FilesystemClientInterface { // 定义文件系统客户端接口。
  /**
   * 读取指定路径的二进制文件内容。
   * @param absolutePath 目标文件的绝对路径。
   */
  readBinary(absolutePath: string): Promise<Buffer>; // 声明返回 Buffer 的读取函数。
}

/**
 * LocalFilesystemClient 使用 Node.js fs/promises 实现 FilesystemClientInterface。
 */
export class LocalFilesystemClient implements FilesystemClientInterface { // 实现具体类。
  /**
   * 通过 fs.promises 读取文件，并在关键步骤输出调试日志。
   */
  async readBinary(absolutePath: string): Promise<Buffer> { // 实现异步读取逻辑。
    console.log("debugging: starting file read", absolutePath); // 输出调试信息以便定位问题。
    const fileBuffer = await fs.readFile(absolutePath); // 实际读取文件并获取 Buffer。
    console.log("debugging: completed file read", fileBuffer.byteLength); // 输出读取结果的字节长度。
    return fileBuffer; // 返回读取到的 Buffer。
  }
}

// 定义工具调用结果类型，方便类型推导。
type CallToolResult = z.infer<typeof CallToolResultSchema>; // 使用 zod schema 推导类型。

/**
 * FilesystemMcpClient 使用 @modelcontextprotocol/server-filesystem 提供的工具读取文件。
 */
export class FilesystemMcpClient implements FilesystemClientInterface { // 定义 MCP 文件系统客户端。
  private client: Client | null = null; // 缓存 MCP 客户端。
  private transport: StdioClientTransport | null = null; // 缓存传输实例。
  private connectPromise: Promise<void> | null = null; // 防止重复连接。

  /**
   * 通过 MCP 的 read_text_file 工具读取文件，并返回 Buffer。
   */
  async readBinary(absolutePath: string): Promise<Buffer> { // 实现接口方法。
    const normalizedPath = path.resolve(absolutePath); // 归一化路径防止逃逸。
    console.log("debugging: FilesystemMcpClient.readBinary", normalizedPath); // 输出调试信息。
    const result = await this.callTool("read_text_file", { path: normalizedPath }); // 调用读取工具。
    const firstItem = result.content[0]; // 仅关注首个内容。
    if (firstItem && firstItem.type === "text") { // 处理文本内容。
      return Buffer.from(firstItem.text, "utf-8"); // 将文本转为 Buffer。
    }
    if (firstItem && "data" in firstItem && typeof (firstItem as { data?: unknown }).data === "string") { // 处理媒体内容。
      return Buffer.from((firstItem as { data: string }).data, "base64"); // base64 转 Buffer。
    }
    throw new Error("filesystem MCP 返回了无法解析的内容，请确认工具输出"); // 若不匹配则抛错。
  }

  /**
   * 统一的工具调用封装。
   */
  private async callTool(name: string, args: Record<string, unknown>): Promise<CallToolResult> { // 定义工具调用函数。
    const client = await this.ensureConnected(); // 确保已经连接。
    const request = { // 构建 MCP 请求。
      method: "tools/call", // 固定方法名。
      params: {
        name, // 工具名。
        arguments: args // 工具参数。
      }
    }; // 请求对象结束。
    return client.request(request, CallToolResultSchema); // 发送请求并返回结果。
  }

  /**
   * 初始化连接，仅在首次调用时触发。
   */
  private async ensureConnected(): Promise<Client> { // 定义连接函数。
    if (this.client) { // 已连接直接返回。
      return this.client; // 返回缓存实例。
    }
    if (this.connectPromise) { // 若正在连接，等待完成。
      await this.connectPromise; // 等待连接 Promise。
      if (!this.client) { // 再次校验。
        throw new Error("filesystem MCP 客户端初始化失败"); // 抛出异常。
      }
      return this.client; // 返回已就绪客户端。
    }
    this.connectPromise = this.initializeConnection(); // 触发初始化。
    await this.connectPromise; // 等待完成。
    if (!this.client) { // 校验连接结果。
      throw new Error("filesystem MCP 客户端在初始化后为空"); // 抛出异常。
    }
    return this.client; // 返回客户端。
  }

  /**
   * 根据 mcp-config.jsonc 启动 server-filesystem。
   */
  private async initializeConnection(): Promise<void> { // 实现连接逻辑。
    const rawConfig = await getMcpServerConfig("filesystem"); // 读取配置。
    if (!("command" in rawConfig)) { // 校验类型。
      throw new Error("filesystem MCP 配置缺少 command 字段"); // 抛错。
    }
    const config = rawConfig as McpCommandServerConfig; // 强制转换。
    const env: Record<string, string> = {}; // 构建环境变量。
    for (const [key, value] of Object.entries(process.env)) { // 遍历当前环境。
      if (typeof value === "string") { // 仅拷贝字符串。
        env[key] = value; // 复制变量。
      }
    }
    if (config.env) { // 合并额外 env。
      Object.assign(env, config.env); // 合并配置环境。
    }
    this.transport = new StdioClientTransport({ // 创建 stdio 传输。
      command: config.command, // 指定命令。
      args: config.args, // 指定参数。
      env, // 传入合并后的环境。
      cwd: config.workingDirectory // 设置工作目录。
    }); // 传输配置完成。
    this.client = new Client({ // 创建 MCP 客户端。
      name: "learning-agent-filesystem-client", // 客户端名称。
      version: "0.1.0" // 版本。
    }); // 客户端实例。
    this.client.onerror = (error: unknown) => { // 注册错误处理并显式类型声明。
      console.error("debugging: filesystem MCP client error", error); // 输出错误。
    }; // 结束回调。
    await this.client.connect(this.transport); // 连接服务器。
    console.log("debugging: filesystem MCP connected"); // 输出成功日志。
    process.once("exit", () => { // 注册进程退出清理。
      void this.dispose(); // 触发清理。
    }); // 监听结束。
  }

  /**
   * 关闭底层连接，避免僵尸进程。
   */
  async dispose(): Promise<void> { // 定义清理方法。
    if (this.client) { // 若客户端存在。
      await this.client.close(); // 关闭协议。
      this.client = null; // 清空引用。
    }
    if (this.transport) { // 若传输存在。
      await this.transport.close(); // 关闭传输。
      this.transport = null; // 清空引用。
    }
    this.connectPromise = null; // 重置连接状态。
  }
}


```

```typescript
import { NotionWritePayload, LearningTask } from "../types"; // 引入需要的类型定义。
import { Client } from "@modelcontextprotocol/sdk/client"; // 引入 MCP 客户端。
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp"; // 引入 HTTP 传输。
import { CallToolResultSchema } from "@modelcontextprotocol/sdk/types"; // 引入工具调用结果 schema。
import { z } from "zod"; // 引入 zod 以推导类型。
import { getMcpServerConfig, McpHttpServerConfig } from "../utils/mcp-config"; // 引入 MCP 配置加载器。

/**
 * NotionClientInterface 抽象了智能体需要的 Notion 能力。
 */
export interface NotionClientInterface { // 定义接口。
  /**
   * 创建新的 Notion 页面。
   * @param payload 页面内容载荷。
   */
  createPage(payload: NotionWritePayload): Promise<string>; // 返回新页面 ID。

  /**
   * 更新 Notion 页面属性或内容。
   * @param pageId 目标页面 ID。
   * @param properties 属性键值。
   */
  updatePage(pageId: string, properties: Record<string, string | number>): Promise<void>; // 无返回值。

  /**
   * 创建评论用于提醒。
   * @param pageId 目标页面 ID。
   * @param commentText 评论文本。
   */
  createComment(pageId: string, commentText: string): Promise<void>; // 无返回值。
}

/**
 * MockNotionClient 简单地将每次操作输出到控制台，便于演示。
 */
export class MockNotionClient implements NotionClientInterface { // 模拟实现。
  /**
   * 用于生成伪页面 ID 的计数器。
   */
  private pageCounter = 0; // 初始化计数器。

  /**
   * 模拟创建页面：打印内容并返回 ID。
   */
  async createPage(payload: NotionWritePayload): Promise<string> { // 实现 createPage。
    console.log("debugging: creating Notion page", payload.title); // 输出调试信息。
    console.log("debugging: markdown content", payload.markdownContent); // 输出内容。
    const newId = `page-${++this.pageCounter}`; // 生成 ID。
    console.log("debugging: created Notion page ID", newId); // 输出 ID。
    return newId; // 返回 ID。
  }

  /**
   * 模拟更新页面属性。
   */
  async updatePage(pageId: string, properties: Record<string, string | number>): Promise<void> { // 实现 updatePage。
    console.log("debugging: updating Notion page", pageId); // 输出页面 ID。
    console.log("debugging: new properties", properties); // 输出属性。
  }

  /**
   * 模拟创建评论。
   */
  async createComment(pageId: string, commentText: string): Promise<void> { // 实现 createComment。
    console.log("debugging: creating comment", pageId); // 输出页面 ID。
    console.log("debugging: comment text", commentText); // 输出评论文本。
  }

  /**
   * 根据任务构建评论文本的辅助方法。
   * @param task 学习任务对象。
   */
  buildCommentFromTask(task: LearningTask): string { // 提供辅助函数。
    console.log("debugging: building comment for task", task.taskId); // 输出任务 ID。
    return `任务 ${task.taskId} (${task.type}) 已同步，描述：${task.description}`; // 返回描述文本。
  }
}

// 定义工具返回值类型，便于后续解析。
type CallToolResult = z.infer<typeof CallToolResultSchema>; // 通过 zod schema 推导类型。

/**
 * NotionMcpClient 使用 Notion 官方 MCP，基于 Streamable HTTP 进行真实调用。
 */
export class NotionMcpClient implements NotionClientInterface { // 定义真实客户端。
  private client: Client | null = null; // 缓存 MCP 客户端实例。
  private transport: StreamableHTTPClientTransport | null = null; // 缓存传输层。
  private connectPromise: Promise<void> | null = null; // 防止重复连接。

  constructor(private readonly authToken = process.env.NOTION_MCP_TOKEN) { // 构造函数中注入令牌。
    if (!this.authToken) { // 若缺少令牌则抛错，引导用户配置。
      throw new Error("缺少 NOTION_MCP_TOKEN，请参考 https://developers.notion.com/docs/get-started-with-mcp 配置集成令牌"); // 抛出明确错误。
    }
  }

  /**
   * 创建页面：调用 notion-create-pages 工具。
   */
  async createPage(payload: NotionWritePayload): Promise<string> { // 实现 createPage。
    console.log("debugging: NotionMcpClient.createPage", payload.title); // 调试日志。
    const args = { // 构建工具参数。
      parent_page_id: payload.parentPageId, // 父页面 ID。
      title: payload.title, // 标题。
      markdown_content: payload.markdownContent, // Markdown 内容。
      properties: payload.properties // 属性映射。
    }; // 参数对象结束。
    const result = await this.callTool("notion-create-pages", args); // 调用 MCP 工具。
    return this.extractResourceIdentifier(result); // 从返回结果提取资源 ID。
  }

  /**
   * 更新页面属性：调用 notion-update-page。
   */
  async updatePage(pageId: string, properties: Record<string, string | number>): Promise<void> { // 实现 updatePage。
    console.log("debugging: NotionMcpClient.updatePage", pageId); // 输出日志。
    await this.callTool("notion-update-page", { // 调用工具。
      page_id: pageId, // 目标页面。
      properties // 属性对象。
    }); // 调用结束。
  }

  /**
   * 创建评论：调用 notion-create-comment。
   */
  async createComment(pageId: string, commentText: string): Promise<void> { // 实现 createComment。
    console.log("debugging: NotionMcpClient.createComment", pageId); // 输出日志。
    await this.callTool("notion-create-comment", { // 调用工具。
      page_id: pageId, // 页面 ID。
      rich_text: commentText // 评论正文。
    }); // 调用结束。
  }

  /**
   * 统一工具调用入口，确保在调用前完成连接。
   */
  private async callTool(name: string, args: Record<string, unknown>): Promise<CallToolResult> { // 定义工具调用函数。
    const client = await this.ensureConnected(); // 确保已连接。
    const request = { // 构建 request payload。
      method: "tools/call", // 标准 MCP 方法。
      params: {
        name, // 工具名。
        arguments: args // 具体参数。
      }
    }; // 请求对象结束。
    const result = await client.request(request, CallToolResultSchema); // 发送请求并通过 schema 验证。
    console.log("debugging: NotionMcpClient.callTool result items", result.content.length); // 打印结果数量。
    return result; // 返回结果。
  }

  /**
   * 确保 MCP 客户端与传输只初始化一次。
   */
  private async ensureConnected(): Promise<Client> { // 定义连接函数。
    if (this.client) { // 若已存在直接返回。
      return this.client; // 返回已连接的客户端。
    }
    if (this.connectPromise) { // 若正在连接，等待完成。
      await this.connectPromise; // 等待现有 Promise。
      if (!this.client) { // 再次校验。
        throw new Error("Notion MCP 客户端初始化失败"); // 抛出错误。
      }
      return this.client; // 返回客户端。
    }
    this.connectPromise = this.initializeConnection(); // 启动连接流程。
    await this.connectPromise; // 等待连接完成。
    if (!this.client) { // 校验是否成功。
      throw new Error("Notion MCP 客户端在初始化后为空"); // 抛出错误。
    }
    return this.client; // 返回客户端。
  }

  /**
   * 依据 mcp-config.jsonc 建立 Streamable HTTP 连接。
   */
  private async initializeConnection(): Promise<void> { // 定义实际连接实现。
    const rawConfig = await getMcpServerConfig("notion"); // 加载配置。
    if (!("url" in rawConfig)) { // 校验为 HTTP 类型。
      throw new Error("Notion MCP 配置必须包含 url 字段"); // 抛出错误。
    }
    const config = rawConfig as McpHttpServerConfig; // 强制转换。
    const requestInitHeaders: Record<string, string> = { // 构建请求头。
      Authorization: `Bearer ${this.authToken}`, // 传递 Notion 集成令牌。
      "Notion-Version": process.env.NOTION_MCP_VERSION || "2025-09-03" // 指定版本，默认使用最新稳定版。
    }; // 头部定义结束。
    this.transport = new StreamableHTTPClientTransport(new URL(config.url), { // 创建 HTTP 传输。
      requestInit: {
        headers: requestInitHeaders // 设置头部。
      }
    }); // 传输实例化结束。
    this.client = new Client({ // 创建 MCP 客户端。
      name: "learning-agent-notion-client", // 客户端名称。
      version: "0.1.0" // 版本号。
    }); // 客户端完成。
    this.client.onerror = (error: unknown) => { // 注册错误处理并显式类型声明。
      console.error("debugging: Notion MCP client error", error); // 输出错误。
    }; // 回调结束。
    await this.client.connect(this.transport); // 执行连接。
    console.log("debugging: Notion MCP connected"); // 输出成功日志。
  }

  /**
   * 从工具结果中提取页面或资源标识符，便于上层追踪。
   */
  private extractResourceIdentifier(result: CallToolResult): string { // 定义提取函数。
    for (const item of result.content) { // 遍历内容数组。
      if (item.type === "resource_link" && item.uri) { // 若为资源链接。
        return item.uri; // 返回 URI。
      }
      if (item.type === "text" && item.text) { // 若为文本。
        const match = item.text.match(/page_id\s*[:：]\s*(\S+)/i); // 尝试匹配 page_id。
        if (match) { // 成功则返回。
          return match[1]; // 返回匹配值。
        }
      }
    }
    return `notion-${Date.now()}`; // 若无可用内容，返回临时 ID。
  }
}


```

```jsonc
{
  "compilerOptions": {
    "target": "ES2021",
    "module": "NodeNext",
    "moduleResolution": "nodenext",
    "outDir": "dist",
    "rootDir": "src",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": [
    "src"
  ]
}


```

```typescript
import { promises as fs } from "fs"; // 引入文件系统 Promise API 以便异步读写文件。
import path from "path"; // 引入 path 用于归一化路径。
import { Client } from "@modelcontextprotocol/sdk/client/index.js"; // 引入 MCP 客户端。
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js"; // 引入 stdio 传输层。
import { CallToolResultSchema } from "@modelcontextprotocol/sdk/types.js"; // 引入工具结果 schema。
import { z } from "zod"; // 引入 zod 以推导类型。
import { getMcpServerConfig, McpCommandServerConfig } from "../utils/mcp-config"; // 引入 MCP 配置读取器。

/**
 * FilesystemClientInterface 负责定义智能体访问本地或远端文件系统的抽象。
 */
export interface FilesystemClientInterface { // 定义文件系统客户端接口。
  /**
   * 读取指定路径的二进制文件内容。
   * @param absolutePath 目标文件的绝对路径。
   */
  readBinary(absolutePath: string): Promise<Buffer>; // 声明返回 Buffer 的读取函数。
}

/**
 * LocalFilesystemClient 使用 Node.js fs/promises 实现 FilesystemClientInterface。
 */
export class LocalFilesystemClient implements FilesystemClientInterface { // 实现具体类。
  /**
   * 通过 fs.promises 读取文件，并在关键步骤输出调试日志。
   */
  async readBinary(absolutePath: string): Promise<Buffer> { // 实现异步读取逻辑。
    console.log("debugging: starting file read", absolutePath); // 输出调试信息以便定位问题。
    const fileBuffer = await fs.readFile(absolutePath); // 实际读取文件并获取 Buffer。
    console.log("debugging: completed file read", fileBuffer.byteLength); // 输出读取结果的字节长度。
    return fileBuffer; // 返回读取到的 Buffer。
  }
}

// 定义工具调用结果类型，方便类型推导。
type CallToolResult = z.infer<typeof CallToolResultSchema>; // 使用 zod schema 推导类型。

/**
 * FilesystemMcpClient 使用 @modelcontextprotocol/server-filesystem 提供的工具读取文件。
 */
export class FilesystemMcpClient implements FilesystemClientInterface { // 定义 MCP 文件系统客户端。
  private client: Client | null = null; // 缓存 MCP 客户端。
  private transport: StdioClientTransport | null = null; // 缓存传输实例。
  private connectPromise: Promise<void> | null = null; // 防止重复连接。

  /**
   * 通过 MCP 的 read_text_file 工具读取文件，并返回 Buffer。
   */
  async readBinary(absolutePath: string): Promise<Buffer> { // 实现接口方法。
    const normalizedPath = path.resolve(absolutePath); // 归一化路径防止逃逸。
    console.log("debugging: FilesystemMcpClient.readBinary", normalizedPath); // 输出调试信息。
    const result = await this.callTool("read_text_file", { path: normalizedPath }); // 调用读取工具。
    const firstItem = result.content[0]; // 仅关注首个内容。
    if (firstItem && firstItem.type === "text") { // 处理文本内容。
      return Buffer.from(firstItem.text, "utf-8"); // 将文本转为 Buffer。
    }
    if (firstItem && "data" in firstItem && typeof (firstItem as { data?: unknown }).data === "string") { // 处理媒体内容。
      return Buffer.from((firstItem as { data: string }).data, "base64"); // base64 转 Buffer。
    }
    throw new Error("filesystem MCP 返回了无法解析的内容，请确认工具输出"); // 若不匹配则抛错。
  }

  /**
   * 统一的工具调用封装。
   */
  private async callTool(name: string, args: Record<string, unknown>): Promise<CallToolResult> { // 定义工具调用函数。
    const client = await this.ensureConnected(); // 确保已经连接。
    const request = { // 构建 MCP 请求。
      method: "tools/call", // 固定方法名。
      params: {
        name, // 工具名。
        arguments: args // 工具参数。
      }
    }; // 请求对象结束。
    return client.request(request, CallToolResultSchema); // 发送请求并返回结果。
  }

  /**
   * 初始化连接，仅在首次调用时触发。
   */
  private async ensureConnected(): Promise<Client> { // 定义连接函数。
    if (this.client) { // 已连接直接返回。
      return this.client; // 返回缓存实例。
    }
    if (this.connectPromise) { // 若正在连接，等待完成。
      await this.connectPromise; // 等待连接 Promise。
      if (!this.client) { // 再次校验。
        throw new Error("filesystem MCP 客户端初始化失败"); // 抛出异常。
      }
      return this.client; // 返回已就绪客户端。
    }
    this.connectPromise = this.initializeConnection(); // 触发初始化。
    await this.connectPromise; // 等待完成。
    if (!this.client) { // 校验连接结果。
      throw new Error("filesystem MCP 客户端在初始化后为空"); // 抛出异常。
    }
    return this.client; // 返回客户端。
  }

  /**
   * 根据 mcp-config.jsonc 启动 server-filesystem。
   */
  private async initializeConnection(): Promise<void> { // 实现连接逻辑。
    const rawConfig = await getMcpServerConfig("filesystem"); // 读取配置。
    if (!("command" in rawConfig)) { // 校验类型。
      throw new Error("filesystem MCP 配置缺少 command 字段"); // 抛错。
    }
    const config = rawConfig as McpCommandServerConfig; // 强制转换。
    const env: Record<string, string> = {}; // 构建环境变量。
    for (const [key, value] of Object.entries(process.env)) { // 遍历当前环境。
      if (typeof value === "string") { // 仅拷贝字符串。
        env[key] = value; // 复制变量。
      }
    }
    if (config.env) { // 合并额外 env。
      Object.assign(env, config.env); // 合并配置环境。
    }
    this.transport = new StdioClientTransport({ // 创建 stdio 传输。
      command: config.command, // 指定命令。
      args: config.args, // 指定参数。
      env, // 传入合并后的环境。
      cwd: config.workingDirectory // 设置工作目录。
    }); // 传输配置完成。
    this.client = new Client({ // 创建 MCP 客户端。
      name: "learning-agent-filesystem-client", // 客户端名称。
      version: "0.1.0" // 版本。
    }); // 客户端实例。
    this.client.onerror = (error: unknown) => { // 注册错误处理并显式类型声明。
      console.error("debugging: filesystem MCP client error", error); // 输出错误。
    }; // 结束回调。
    await this.client.connect(this.transport); // 连接服务器。
    console.log("debugging: filesystem MCP connected"); // 输出成功日志。
    process.once("exit", () => { // 注册进程退出清理。
      void this.dispose(); // 触发清理。
    }); // 监听结束。
  }

  /**
   * 关闭底层连接，避免僵尸进程。
   */
  async dispose(): Promise<void> { // 定义清理方法。
    if (this.client) { // 若客户端存在。
      await this.client.close(); // 关闭协议。
      this.client = null; // 清空引用。
    }
    if (this.transport) { // 若传输存在。
      await this.transport.close(); // 关闭传输。
      this.transport = null; // 清空引用。
    }
    this.connectPromise = null; // 重置连接状态。
  }
}


```

```typescript
import { NotionWritePayload, LearningTask } from "../types"; // 引入需要的类型定义。
import { Client } from "@modelcontextprotocol/sdk/client/index.js"; // 引入 MCP 客户端。
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js"; // 引入 HTTP 传输。
import { CallToolResultSchema } from "@modelcontextprotocol/sdk/types.js"; // 引入工具调用结果 schema。
import { z } from "zod"; // 引入 zod 以推导类型。
import { getMcpServerConfig, McpHttpServerConfig } from "../utils/mcp-config"; // 引入 MCP 配置加载器。

/**
 * NotionClientInterface 抽象了智能体需要的 Notion 能力。
 */
export interface NotionClientInterface { // 定义接口。
  /**
   * 创建新的 Notion 页面。
   * @param payload 页面内容载荷。
   */
  createPage(payload: NotionWritePayload): Promise<string>; // 返回新页面 ID。

  /**
   * 更新 Notion 页面属性或内容。
   * @param pageId 目标页面 ID。
   * @param properties 属性键值。
   */
  updatePage(pageId: string, properties: Record<string, string | number>): Promise<void>; // 无返回值。

  /**
   * 创建评论用于提醒。
   * @param pageId 目标页面 ID。
   * @param commentText 评论文本。
   */
  createComment(pageId: string, commentText: string): Promise<void>; // 无返回值。
}

/**
 * MockNotionClient 简单地将每次操作输出到控制台，便于演示。
 */
export class MockNotionClient implements NotionClientInterface { // 模拟实现。
  /**
   * 用于生成伪页面 ID 的计数器。
   */
  private pageCounter = 0; // 初始化计数器。

  /**
   * 模拟创建页面：打印内容并返回 ID。
   */
  async createPage(payload: NotionWritePayload): Promise<string> { // 实现 createPage。
    console.log("debugging: creating Notion page", payload.title); // 输出调试信息。
    console.log("debugging: markdown content", payload.markdownContent); // 输出内容。
    const newId = `page-${++this.pageCounter}`; // 生成 ID。
    console.log("debugging: created Notion page ID", newId); // 输出 ID。
    return newId; // 返回 ID。
  }

  /**
   * 模拟更新页面属性。
   */
  async updatePage(pageId: string, properties: Record<string, string | number>): Promise<void> { // 实现 updatePage。
    console.log("debugging: updating Notion page", pageId); // 输出页面 ID。
    console.log("debugging: new properties", properties); // 输出属性。
  }

  /**
   * 模拟创建评论。
   */
  async createComment(pageId: string, commentText: string): Promise<void> { // 实现 createComment。
    console.log("debugging: creating comment", pageId); // 输出页面 ID。
    console.log("debugging: comment text", commentText); // 输出评论文本。
  }

  /**
   * 根据任务构建评论文本的辅助方法。
   * @param task 学习任务对象。
   */
  buildCommentFromTask(task: LearningTask): string { // 提供辅助函数。
    console.log("debugging: building comment for task", task.taskId); // 输出任务 ID。
    return `任务 ${task.taskId} (${task.type}) 已同步，描述：${task.description}`; // 返回描述文本。
  }
}

// 定义工具返回值类型，便于后续解析。
type CallToolResult = z.infer<typeof CallToolResultSchema>; // 通过 zod schema 推导类型。

/**
 * NotionMcpClient 使用 Notion 官方 MCP，基于 Streamable HTTP 进行真实调用。
 */
export class NotionMcpClient implements NotionClientInterface { // 定义真实客户端。
  private client: Client | null = null; // 缓存 MCP 客户端实例。
  private transport: StreamableHTTPClientTransport | null = null; // 缓存传输层。
  private connectPromise: Promise<void> | null = null; // 防止重复连接。

  constructor(private readonly authToken = process.env.NOTION_MCP_TOKEN) { // 构造函数中注入令牌。
    if (!this.authToken) { // 若缺少令牌则抛错，引导用户配置。
      throw new Error("缺少 NOTION_MCP_TOKEN，请参考 https://developers.notion.com/docs/get-started-with-mcp 配置集成令牌"); // 抛出明确错误。
    }
  }

  /**
   * 创建页面：调用 notion-create-pages 工具。
   */
  async createPage(payload: NotionWritePayload): Promise<string> { // 实现 createPage。
    console.log("debugging: NotionMcpClient.createPage", payload.title); // 调试日志。
    const args = { // 构建工具参数。
      parent_page_id: payload.parentPageId, // 父页面 ID。
      title: payload.title, // 标题。
      markdown_content: payload.markdownContent, // Markdown 内容。
      properties: payload.properties // 属性映射。
    }; // 参数对象结束。
    const result = await this.callTool("notion-create-pages", args); // 调用 MCP 工具。
    return this.extractResourceIdentifier(result); // 从返回结果提取资源 ID。
  }

  /**
   * 更新页面属性：调用 notion-update-page。
   */
  async updatePage(pageId: string, properties: Record<string, string | number>): Promise<void> { // 实现 updatePage。
    console.log("debugging: NotionMcpClient.updatePage", pageId); // 输出日志。
    await this.callTool("notion-update-page", { // 调用工具。
      page_id: pageId, // 目标页面。
      properties // 属性对象。
    }); // 调用结束。
  }

  /**
   * 创建评论：调用 notion-create-comment。
   */
  async createComment(pageId: string, commentText: string): Promise<void> { // 实现 createComment。
    console.log("debugging: NotionMcpClient.createComment", pageId); // 输出日志。
    await this.callTool("notion-create-comment", { // 调用工具。
      page_id: pageId, // 页面 ID。
      rich_text: commentText // 评论正文。
    }); // 调用结束。
  }

  /**
   * 统一工具调用入口，确保在调用前完成连接。
   */
  private async callTool(name: string, args: Record<string, unknown>): Promise<CallToolResult> { // 定义工具调用函数。
    const client = await this.ensureConnected(); // 确保已连接。
    const request = { // 构建 request payload。
      method: "tools/call", // 标准 MCP 方法。
      params: {
        name, // 工具名。
        arguments: args // 具体参数。
      }
    }; // 请求对象结束。
    const result = await client.request(request, CallToolResultSchema); // 发送请求并通过 schema 验证。
    console.log("debugging: NotionMcpClient.callTool result items", result.content.length); // 打印结果数量。
    return result; // 返回结果。
  }

  /**
   * 确保 MCP 客户端与传输只初始化一次。
   */
  private async ensureConnected(): Promise<Client> { // 定义连接函数。
    if (this.client) { // 若已存在直接返回。
      return this.client; // 返回已连接的客户端。
    }
    if (this.connectPromise) { // 若正在连接，等待完成。
      await this.connectPromise; // 等待现有 Promise。
      if (!this.client) { // 再次校验。
        throw new Error("Notion MCP 客户端初始化失败"); // 抛出错误。
      }
      return this.client; // 返回客户端。
    }
    this.connectPromise = this.initializeConnection(); // 启动连接流程。
    await this.connectPromise; // 等待连接完成。
    if (!this.client) { // 校验是否成功。
      throw new Error("Notion MCP 客户端在初始化后为空"); // 抛出错误。
    }
    return this.client; // 返回客户端。
  }

  /**
   * 依据 mcp-config.jsonc 建立 Streamable HTTP 连接。
   */
  private async initializeConnection(): Promise<void> { // 定义实际连接实现。
    const rawConfig = await getMcpServerConfig("notion"); // 加载配置。
    if (!("url" in rawConfig)) { // 校验为 HTTP 类型。
      throw new Error("Notion MCP 配置必须包含 url 字段"); // 抛出错误。
    }
    const config = rawConfig as McpHttpServerConfig; // 强制转换。
    const requestInitHeaders: Record<string, string> = { // 构建请求头。
      Authorization: `Bearer ${this.authToken}`, // 传递 Notion 集成令牌。
      "Notion-Version": process.env.NOTION_MCP_VERSION || "2025-09-03" // 指定版本，默认使用最新稳定版。
    }; // 头部定义结束。
    this.transport = new StreamableHTTPClientTransport(new URL(config.url), { // 创建 HTTP 传输。
      requestInit: {
        headers: requestInitHeaders // 设置头部。
      }
    }); // 传输实例化结束。
    this.client = new Client({ // 创建 MCP 客户端。
      name: "learning-agent-notion-client", // 客户端名称。
      version: "0.1.0" // 版本号。
    }); // 客户端完成。
    this.client.onerror = (error: unknown) => { // 注册错误处理并显式类型声明。
      console.error("debugging: Notion MCP client error", error); // 输出错误。
    }; // 回调结束。
    await this.client.connect(this.transport); // 执行连接。
    console.log("debugging: Notion MCP connected"); // 输出成功日志。
  }

  /**
   * 从工具结果中提取页面或资源标识符，便于上层追踪。
   */
  private extractResourceIdentifier(result: CallToolResult): string { // 定义提取函数。
    for (const item of result.content) { // 遍历内容数组。
      if (item.type === "resource_link" && item.uri) { // 若为资源链接。
        return item.uri; // 返回 URI。
      }
      if (item.type === "text" && item.text) { // 若为文本。
        const match = item.text.match(/page_id\s*[:：]\s*(\S+)/i); // 尝试匹配 page_id。
        if (match) { // 成功则返回。
          return match[1]; // 返回匹配值。
        }
      }
    }
    return `notion-${Date.now()}`; // 若无可用内容，返回临时 ID。
  }
}


```

## 结果概述
- 新增 `src/utils/mcp-config.ts`，用 `comment-json` 解析 `mcp-config.jsonc`，支持 HTTP 与 stdio 两类 MCP 服务，默认读取工程根目录并可通过 `MCP_CONFIG_PATH` 覆盖。
- 扩展 `src/clients/notion-client.ts`：实现 `NotionMcpClient`，利用 `@modelcontextprotocol/sdk` 的 `StreamableHTTPClientTransport` 连接 `https://mcp.notion.com/mcp`，自动携带 `Authorization: Bearer ${NOTION_MCP_TOKEN}` 与默认 `Notion-Version: 2025-09-03`，分别映射 `notion-create-pages / notion-update-page / notion-create-comment` 工具；保留 `Mock` 作为本地 fallback。
- 扩展 `src/clients/filesystem-client.ts`：实现 `FilesystemMcpClient`，按 `mcp-config` 中的 `filesystem` 配置启动 stdio 传输（继承当前环境变量并允许额外 env/workingDirectory），封装 `read_text_file` 工具并在进程退出时自动清理。
- 更新 `src/index.ts` / `src/workflow/learning-agent.ts`，默认使用上述真实 MCP 客户端；`tsconfig.json` 切换到 `module: "NodeNext"`、`moduleResolution: "nodenext"` 以兼容带 `.js` 扩展的包导出路径；`package.json` 增加 `@modelcontextprotocol/sdk`、`@modelcontextprotocol/server-filesystem`、`comment-json`。
- 新增 `dist/utils/mcp-config.js` 等编译产物，删除旧的 `src/utils/wenxin-orchestrator.ts`，所有变更均附带逐行注释，满足现有编码规范。

## 测试
- `source /opt/anaconda3/bin/activate paddle-agent && npm run build` ✅
- 未执行 `npm run demo`：该流程现已强依赖 `NOTION_MCP_TOKEN` 及本地 `filesystem` MCP server，如需运行请提前在 `paddle-agent` 环境中导出令牌并保证 `mcp-config.jsonc` 所指命令可用。

## 使用提示
- 在运行示例或接入实际任务前，请设置：
  - `NOTION_MCP_TOKEN`（Notion 集成后台获取），可选 `NOTION_MCP_VERSION` 定制 API 版本；
  - `WENXIN_API_KEY` / `WENXIN_BASE_URL` / `WENXIN_MODEL`（若已配置，可保持不变）。
- `filesystem` 服务依据 `mcp-config.jsonc` 启动，当前参数会通过 `npx @modelcontextprotocol/server-filesystem --root <repo> --mode readwrite` 运行；若使用不同实现（见 `https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem`），可在配置文件中直接调整 `command`/`args` 而无需改动代码。
- 若首次连接 MCP 失败，请确认：本地网络可访问 `https://mcp.notion.com/mcp`，磁盘路径在允许目录内，并留意 `debugging:` 日志定位问题。

