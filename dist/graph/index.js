"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWorkflow = void 0;
const langgraph_1 = require("@langchain/langgraph");
const nodes_1 = require("./nodes");
const createWorkflow = (ocrClient, notionClient) => {
    const { ocrNode, generationNode, notionNode } = (0, nodes_1.createNodes)(ocrClient, notionClient);
    // Define the graph
    const workflow = new langgraph_1.StateGraph({
        channels: {
            imagePath: null,
            learnerProfile: null,
            tasks: null,
            ocrResult: null,
            currentTaskIndex: null,
            generatedContents: null,
            createdPageIds: null
        }
    })
        .addNode("ocr", ocrNode)
        .addNode("generate", generationNode)
        .addNode("notion", notionNode)
        .addEdge(langgraph_1.START, "ocr")
        .addEdge("ocr", "generate")
        .addEdge("generate", "notion")
        .addConditionalEdges("notion", (state) => {
        if (state.currentTaskIndex < state.tasks.length) {
            return "generate";
        }
        return langgraph_1.END;
    });
    return workflow.compile();
};
exports.createWorkflow = createWorkflow;
