import { StateGraph, END, START } from "@langchain/langgraph";
import { AgentState } from "./state";
import { createNodes } from "./nodes";
import { PaddleOcrClientInterface } from "../clients/paddleocr-client";
import { NotionClientInterface } from "../clients/notion-client";

export const createWorkflow = (
  ocrClient: PaddleOcrClientInterface,
  notionClient: NotionClientInterface
) => {
  const { ocrNode, generationNode, notionNode } = createNodes(ocrClient, notionClient);

  // Define the graph
  const workflow = new StateGraph<AgentState>({
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
    .addEdge(START, "ocr")
    .addEdge("ocr", "generate")
    .addEdge("generate", "notion")
    .addConditionalEdges("notion", (state) => {
      if (state.currentTaskIndex < state.tasks.length) {
        return "generate";
      }
      return END;
    });

  return workflow.compile();
};
