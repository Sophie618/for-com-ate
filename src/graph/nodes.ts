import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { AgentState } from "./state";
import { PaddleOcrClientInterface } from "../clients/paddleocr-client";
import { NotionClientInterface } from "../clients/notion-client";
import { NotionWritePayload } from "../types";

// Default constants
const DEFAULT_BASE_URL = "https://aistudio.baidu.com/llm/lmapi/v3";
const DEFAULT_MODEL = "ernie-4.5-turbo-vl";

// Planning System Prompt
const PLANNING_SYSTEM_PROMPT = [
  "你是一名智能学习规划师。你的任务是根据用户的需求、OCR 识别的学习材料以及学习者画像，制定一份结构化的学习任务清单。",
  "请输出一个 JSON 数组，数组中的每个对象代表一个具体的学习任务。",
  "每个任务对象必须包含以下字段：",
  "- `taskId`: 任务ID (例如 T1, T2...)",
  "- `type`: 任务类型 (只能是 'annotation', 'analysis', 'organization', 'planning' 之一)",
  "- `description`: 简短的任务描述",
  "- `priority`: 优先级 (1-5，5最高)",
  "- `dueDate`: (可选) 建议的截止时间，ISO 格式",
  "",
  "请确保任务逻辑清晰，循序渐进。例如：先批注，再解析，最后整理或计划。",
  "只输出 JSON 数组，不要包含 Markdown 代码块标记或其他解释性文字。"
].join("\n");

// System Prompt
const SYSTEM_PROMPT = [
  "> ",
  "",
  "---",
  "",
  "### 1. 角色 & 任务",
  "你是一名专注 K12/高校学习辅导的“文心 4.5 学习智能体”，需根据 OCR 解析的教材/作业内容与 Notion 数据库中的学习画像，完成批注、解析、整理、学习计划等多任务生成，并保证输出可直接写入 Notion。",
  "",
  "### 2. 核心原则（不超过 3 条）",
  "1. 任何结论或建议都必须引用 OCR 内容或 Notion 数据字段，避免凭空创作。",
  "2. 同时满足“个性化”（结合学习者画像）与“结构化”（便于写入 Notion）的要求。",
  "3. 优先生成可执行的学习动作，必要时明确提问以确认缺失信息。",
  "",
  "### 3. 上下文处理",
  "- **OCR 多格式输入**：包括 plain text、markdown、表格数据、按行切片及位置信息。对题干、解答、批注、教材摘要分别提炼。",
  "- **学习者画像（Notion 数据库）**：包含 `competencyLevel`、`learningGoal`、`preferredStyle`、错题记录、复盘计划等。",
  "- **任务清单**：每个任务含 `taskId`、`type`（annotation/analysis/organization/planning）、`description`、`priority`、`dueDate`。",
  "- **上一轮反馈**：平均评分、典型评论、策略提示（例如“需要补充更多讲解细节并缩短反馈周期”）。",
  "- 处理方式：先解析 OCR→结合画像→按任务顺序依次生成，必要时引用反馈调整语气或深度。",
  "",
  "### 4. Chain of Thought（执行流程）",
  "1. **识别任务类型**：annotation / analysis / organization / planning。",
  "2. **抽取关键知识点**：结合 OCR spans，区分题干、解题过程、错误原因、知识点标签。",
  "3. **匹配学习画像**：根据 competencyLevel、learningGoal、preferredStyle 调整讲解深度、语言风格。",
  "4. **融合历史反馈**：若评分<4，则补充细节、增加问答或缩短复盘周期。",
  "5. **生成结构化输出**：对应任务类型输出批注/解析/整理/计划模块，包含标题、分点说明、下一步行动、复盘时间。",
  "6. **校验**：检查是否引用了明确证据、是否包含行动项与 Notion 属性，确认无遗漏。",
  "",
  "### 5. 输出规范",
  "- **格式要求**：输出标准的 Markdown 格式，确保层级清晰，适合直接写入 Notion 页面。",
  "- **结构自适应**：请根据任务类型灵活调整文档结构。",
  "  - 例如：`annotation` 任务可使用引用块或列表；`analysis` 任务可使用分步标题；`planning` 任务可使用复选框或时间轴。",
  "- **必需字段**：文档末尾必须包含一个 `## 关联属性` 章节，以列表形式列出需写入 Notion 数据库的属性（如 `priority`, `dueDate`, `knowledgePoint`）。",
  "- **严禁输出**：与任务无关的闲聊、未引用上下文的猜测。",
  "",
  "### 6. Few-Shot 示例",
  "**示例 1：annotation 任务**",
  "```",
  "输入概要：OCR 显示一次函数求解，学生未解释增长率；画像显示“偏好讲解+计划”；反馈提示“增加细节”。",
  "输出：",
  "### 题目批注",
  "> 引用题干：1+1=?",
  "",
  "- **批注**：学生步骤正确，但需解释斜率 2 代表函数每增加 1 个 x，y 增加 2。",
  "- **错因分析**：缺少对实际应用的描述，复盘时需补写。",
  "",
  "## 关联属性",
  "- priority: 5",
  "- dueDate: 2025-11-21",
  "- knowledgePoint: 一次函数斜率",
  "```",
  "",
  "**示例 2：planning 任务**",
  "```",
  "输入概要：OCR 提供一次函数练习；任务描述“制定 3 日复盘计划”；反馈提示“缩短反馈周期”。",
  "输出：",
  "### 3日复盘计划",
  "目标：聚焦一次函数与增长解释。",
  "",
  "- [ ] **Day 1**：重写解题步骤，突出列方程→消元→结论。",
  "- [ ] **Day 2**：将斜率意义整理成实际案例（速度/成本）。",
  "- [ ] **Day 3**：自测 2 道变式题，记录错因。",
  "",
  "💡 **提醒**：每天 20:00 自动评论提示。",
  "",
  "## 关联属性",
  "- priority: 4",
  "- dueDate: 2025-11-21",
  "- linkedMistake: M-10023",
  "```",
  ""
].join("\n");

export const createNodes = (
  ocrClient: PaddleOcrClientInterface,
  notionClient: NotionClientInterface
) => {

  // 1. OCR Node
  const ocrNode = async (state: AgentState): Promise<Partial<AgentState>> => {
    console.log("--- Node: OCR (Mocked) ---");
    
    // Mock OCR result to skip actual MCP call
    const mockResult = {
      originalPath: state.imagePath,
      plainText: "Mock OCR Text: 这是一个关于一次函数的数学题。已知 y = 2x + 1，求当 x=3 时的值。",
      markdownText: "# Mock OCR Markdown\n\n这是一个关于一次函数的数学题。\n\n已知 $y = 2x + 1$，求当 $x=3$ 时的值。",
      tableData: [],
      spans: [
        {
          lineId: "1",
          text: "这是一个关于一次函数的数学题。",
          confidence: 0.99,
          boundingBox: [0, 0, 100, 20],
          classification: "text",
          sourceMeta: {}
        },
        {
          lineId: "2",
          text: "已知 y = 2x + 1，求当 x=3 时的值。",
          confidence: 0.98,
          boundingBox: [0, 30, 100, 50],
          classification: "question",
          sourceMeta: {}
        }
      ]
    };
    
    return { ocrResult: mockResult };

    /* 
    // Original implementation
    if (state.ocrResult) {
      console.log("OCR result already exists, skipping.");
      return {};
    }
     resultconst = await ocrClient.runStructuredOcr(state.imagePath);
    return { ocrResult: result };
    */
  };

  // 1.5 Planning Node
  const planningNode = async (state: AgentState): Promise<Partial<AgentState>> => {
    console.log("--- Node: Planning ---");

    // Initialize Chat Model
    const apiKey = process.env.WENXIN_API_KEY;
    if (!apiKey) throw new Error("Missing WENXIN_API_KEY");
    
    const model = new ChatOpenAI({
      apiKey,
      configuration: {
        baseURL: process.env.WENXIN_BASE_URL ?? DEFAULT_BASE_URL,
      },
      modelName: process.env.WENXIN_MODEL ?? DEFAULT_MODEL,
      temperature: 0.1, // Lower temperature for structured output
      maxTokens: 2048,
    });

    const spanPreview = JSON.stringify(state.ocrResult!.spans.slice(0, 10));
    
    const planningInput = [
      `<learner>\nID: ${state.learnerProfile.learnerId}\n水平: ${state.learnerProfile.competencyLevel}\n目标: ${state.learnerProfile.learningGoal}\n偏好: ${state.learnerProfile.preferredStyle}\n</learner>`,
      state.userQuery ? `<user-query>\n${state.userQuery}\n</user-query>` : "",
      `<ocr-plain>\n${state.ocrResult!.plainText}\n</ocr-plain>`,
      `<ocr-spans>\n${spanPreview}\n</ocr-spans>`
    ].join("\n\n");

    const prompt = ChatPromptTemplate.fromMessages([
      ["system", PLANNING_SYSTEM_PROMPT],
      ["user", "{input}"]
    ]);

    const chain = prompt.pipe(model);
    const response = await chain.invoke({ input: planningInput });
    
    let content = typeof response.content === 'string' ? response.content : JSON.stringify(response.content);
    
    // Clean up potential markdown code blocks
    content = content.replace(/```json/g, "").replace(/```/g, "").trim();

    let tasks = [];
    try {
      tasks = JSON.parse(content);
      console.log("Generated Plan:", JSON.stringify(tasks, null, 2));
    } catch (e) {
      console.error("Failed to parse planning output:", content);
      // Fallback task if parsing fails
      tasks = [{ taskId: "T1", type: "analysis", description: "解析题目 (自动规划失败)", priority: 5 }];
    }

    return { tasks };
  };

  // 2. Generation Node
  const generationNode = async (state: AgentState): Promise<Partial<AgentState>> => {
    console.log(`--- Node: Generation (Task ${state.currentTaskIndex}) ---`);
    
    const task = state.tasks[state.currentTaskIndex];
    if (!task) {
      throw new Error("No task found for current index");
    }

    // Initialize Chat Model
    const apiKey = process.env.WENXIN_API_KEY;
    if (!apiKey) throw new Error("Missing WENXIN_API_KEY");
    
    const model = new ChatOpenAI({
      apiKey,
      configuration: {
        baseURL: process.env.WENXIN_BASE_URL ?? DEFAULT_BASE_URL,
      },
      modelName: process.env.WENXIN_MODEL ?? DEFAULT_MODEL,
      temperature: 0.35,
      maxTokens: 2048,
    });

    // Build Prompt
    const spanPreview = JSON.stringify(state.ocrResult!.spans.slice(0, 10));
    const tablePreview = JSON.stringify(state.ocrResult!.tableData.slice(0, 5));
    
    const userPromptContent = [
      `<task>\n类型: ${task.type}\n描述: ${task.description}\n优先级: ${task.priority}\n截止: ${task.dueDate ?? "未设定"}\n</task>`,
      `<learner>\nID: ${state.learnerProfile.learnerId}\n水平: ${state.learnerProfile.competencyLevel}\n目标: ${state.learnerProfile.learningGoal}\n偏好: ${state.learnerProfile.preferredStyle}\n</learner>`,
      state.userQuery ? `<user-query>\n${state.userQuery}\n</user-query>` : "",
      `<ocr-plain>\n${state.ocrResult!.plainText}\n</ocr-plain>`,
      `<ocr-markdown>\n${state.ocrResult!.markdownText}\n</ocr-markdown>`,
      `<ocr-table>\n${tablePreview}\n</ocr-table>`,
      `<ocr-spans>\n${spanPreview}\n</ocr-spans>`
    ].join("\n\n");

    const prompt = ChatPromptTemplate.fromMessages([
      ["system", SYSTEM_PROMPT],
      ["user", "{input}"]
    ]);

    const chain = prompt.pipe(model);
    const response = await chain.invoke({ input: userPromptContent });
    
    const content = typeof response.content === 'string' ? response.content : JSON.stringify(response.content);
    
    // Append to generatedContents
    const newGeneratedContents = [...state.generatedContents, content];
    
    return { generatedContents: newGeneratedContents };
  };

  // 3. Notion Node
  const notionNode = async (state: AgentState): Promise<Partial<AgentState>> => {
    console.log(`--- Node: Notion (Task ${state.currentTaskIndex}) ---`);
    
    const task = state.tasks[state.currentTaskIndex];
    const content = state.generatedContents[state.generatedContents.length - 1];
    
    const payload: NotionWritePayload = {
      parentPageId: state.learnerProfile.learnerId,
      title: `${task.type}-${task.taskId}`,
      markdownContent: content,
      properties: {
        priority: task.priority,
        type: task.type,
        dueDate: task.dueDate ?? "未设定"
      }
    };

    const { id: pageId } = await notionClient.createPage(payload);
    await notionClient.updatePage(pageId, { status: "generated" });
    await notionClient.createComment(pageId, `自动生成任务：${task.description}`);

    return {
      createdPageIds: [...state.createdPageIds, pageId],
      currentTaskIndex: state.currentTaskIndex + 1
    };
  };

  return { ocrNode, planningNode, generationNode, notionNode };
};
