"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paddleocr_client_1 = require("./clients/paddleocr-client");
const notion_client_1 = require("./clients/notion-client");
const graph_1 = require("./graph");
const feedback_loop_1 = require("./utils/feedback-loop");
/**
 * main 函数串联样例：读取 demo 文档，执行四种任务，并输出结果。
 */
async function main() {
    console.log("debugging: main started");
    // Instantiate real clients
    const ocrClient = new paddleocr_client_1.PaddleOcrMcpClient();
    const notionClient = new notion_client_1.NotionMcpClient();
    // Search for a parent page to use as the root for new pages
    console.log("debugging: searching for parent page 'Learning Dashboard'...");
    let parentPageId = "";
    try {
        const dashboardId = await notionClient.searchPage("Learning Dashboard");
        if (dashboardId) {
            parentPageId = dashboardId;
            console.log(`debugging: found parent page ID (${parentPageId})`);
        }
        else {
            console.log("debugging: 'Learning Dashboard' not found, searching for any page...");
            const anyPageId = await notionClient.searchPage("");
            if (anyPageId) {
                parentPageId = anyPageId;
                console.log(`debugging: using fallback page ID (${parentPageId})`);
            }
        }
    }
    catch (error) {
        console.error("debugging: failed to search for parent page", error);
    }
    if (!parentPageId) {
        console.error("Error: Could not find any Notion page to use as a parent. Please ensure you have at least one page in your workspace.");
        process.exit(1);
    }
    // Create LangGraph workflow
    const app = (0, graph_1.createWorkflow)(ocrClient, notionClient);
    const feedbackManager = new feedback_loop_1.FeedbackLoopManager();
    const learnerProfile = {
        learnerId: parentPageId, // Use the found page ID as the learnerId/parentPageId
        competencyLevel: "中等",
        learningGoal: "巩固一次函数与应用题",
        preferredStyle: "讲解+计划"
    };
    const tasks = [
        { taskId: "T1", type: "annotation", description: "补充批注与错因分析", priority: 5 },
        { taskId: "T2", type: "analysis", description: "生成分步解析与知识点", priority: 4 },
        { taskId: "T3", type: "organization", description: "整理成 Markdown 笔记", priority: 3 },
        { taskId: "T4", type: "planning", description: "制定 3 日复盘计划", priority: 4, dueDate: new Date(Date.now() + 3 * 86400000).toISOString() }
    ];
    const demoImagePath = `${process.cwd()}/samples/demo1.jpg`;
    // Initial State
    const initialState = {
        imagePath: demoImagePath,
        learnerProfile,
        tasks,
        currentTaskIndex: 0,
        generatedContents: [],
        createdPageIds: []
    };
    console.log("debugging: invoking graph");
    const finalState = await app.invoke(initialState);
    const pageIds = finalState.createdPageIds;
    // Feedback loop
    tasks.forEach((task, index) => {
        feedbackManager.recordFeedback(task, 4.5 - index * 0.5, `示例反馈：${task.description}`);
    });
    const strategyNote = feedbackManager.getStrategyNote();
    console.log("debugging: strategy note", strategyNote);
    console.log("debugging: pipeline finished", pageIds);
}
// 调用 main 并捕获异常。
main().catch((error) => {
    console.error("debugging: pipeline failed", error);
    process.exitCode = 1;
});
