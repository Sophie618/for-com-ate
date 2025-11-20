"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotionMcpClient = void 0;
const index_js_1 = require("@modelcontextprotocol/sdk/client/index.js"); // 引入 MCP 客户端。
const streamableHttp_js_1 = require("@modelcontextprotocol/sdk/client/streamableHttp.js"); // 引入 HTTP 传输。
const stdio_js_1 = require("@modelcontextprotocol/sdk/client/stdio.js"); // 引入 Stdio 传输。
const types_js_1 = require("@modelcontextprotocol/sdk/types.js"); // 引入工具调用结果 schema。
const mcp_config_1 = require("../utils/mcp-config"); // 引入 MCP 配置加载器。
/**
 * NotionMcpClient 使用 Notion 官方 MCP，基于 Streamable HTTP 进行真实调用。
 */
class NotionMcpClient {
    constructor(authToken = process.env.NOTION_MCP_TOKEN) {
        this.authToken = authToken;
        this.client = null; // 缓存 MCP 客户端实例。
        this.transport = null; // 缓存传输层。
        this.connectPromise = null; // 防止重复连接。
        if (!this.authToken) { // 若缺少令牌则抛错，引导用户配置。
            throw new Error("缺少 NOTION_MCP_TOKEN，请参考 https://developers.notion.com/docs/get-started-with-mcp 配置集成令牌"); // 抛出明确错误。
        }
        if (!this.authToken.startsWith("secret_")) {
            console.warn("Warning: NOTION_MCP_TOKEN does not start with 'secret_'. You might be using a browser cookie (token_v2) instead of an API Integration Secret. Please check https://www.notion.so/my-integrations");
        }
    }
    /**
     * 创建页面：调用 API-post-page 工具。
     */
    async createPage(payload) {
        console.log("debugging: NotionMcpClient.createPage", payload.title);
        // 转换 markdownContent 为 Notion Blocks (简化版：只处理段落)
        const children = payload.markdownContent.split('\n').filter(line => line.trim()).map(line => {
            if (line.startsWith('# ')) {
                return {
                    object: "block",
                    type: "heading_1",
                    heading_1: { rich_text: [{ type: "text", text: { content: line.replace('# ', '') } }] }
                };
            }
            else if (line.startsWith('## ')) {
                return {
                    object: "block",
                    type: "heading_2",
                    heading_2: { rich_text: [{ type: "text", text: { content: line.replace('## ', '') } }] }
                };
            }
            else if (line.startsWith('- ')) {
                return {
                    object: "block",
                    type: "bulleted_list_item",
                    bulleted_list_item: { rich_text: [{ type: "text", text: { content: line.replace('- ', '') } }] }
                };
            }
            return {
                object: "block",
                type: "paragraph",
                paragraph: { rich_text: [{ type: "text", text: { content: line } }] }
            };
        });
        // 附加元数据到内容顶部
        const metaInfo = [
            `Priority: ${payload.properties.priority}`,
            `Type: ${payload.properties.type}`,
            `Due Date: ${payload.properties.dueDate}`
        ].join('\n');
        children.unshift({
            object: "block",
            type: "callout",
            callout: {
                rich_text: [{ type: "text", text: { content: metaInfo } }],
                icon: { emoji: "ℹ️" }
            }
        });
        const args = {
            parent: { page_id: payload.parentPageId },
            properties: {
                title: [
                    {
                        text: {
                            content: payload.title
                        }
                    }
                ]
            },
            children: children
        };
        const result = await this.callTool("API-post-page", args);
        // 尝试解析并打印页面 URL，方便用户直接打开
        try {
            for (const item of result.content) {
                if (item.type === 'text') {
                    const data = JSON.parse(item.text);
                    if (data.url) {
                        console.log(`\n✨ Notion 页面已创建！点击链接直接打开:\n👉 ${data.url}\n`);
                    }
                }
            }
        }
        catch (e) {
            // 忽略解析错误，不影响流程
        }
        return this.extractResourceIdentifier(result);
    }
    /**
     * 更新页面属性：调用 API-patch-page。
     */
    async updatePage(pageId, properties) {
        console.log("debugging: NotionMcpClient.updatePage", pageId);
        // 注意：API-patch-page 只能更新 properties，不能直接追加内容。
        // 这里我们只打印日志，因为更新 properties 需要知道具体的 property ID 或名称，且结构复杂。
        // 暂时跳过实际更新，避免报错。
        console.log("debugging: Skipping property update for now due to schema complexity", properties);
    }
    /**
     * 创建评论：调用 API-create-a-comment。
     */
    async createComment(pageId, commentText) {
        console.log("debugging: NotionMcpClient.createComment", pageId);
        try {
            await this.callTool("API-create-a-comment", {
                parent: { page_id: pageId },
                rich_text: [
                    {
                        text: {
                            content: commentText
                        }
                    }
                ]
            });
        }
        catch (error) {
            console.warn("debugging: Failed to create comment (likely permission issue), skipping.", error);
        }
    }
    /**
     * 搜索页面 ID。
     */
    async searchPage(query) {
        console.log("debugging: NotionMcpClient.searchPage", query);
        const args = {
            query,
            filter: {
                value: "page",
                property: "object"
            },
            page_size: 1
        };
        try {
            const result = await this.callTool("API-post-search", args);
            // 解析结果
            // 结果通常是一个 JSON 字符串或对象结构，取决于 MCP 的封装
            // 假设 result.content 包含 API 响应
            for (const item of result.content) {
                if (item.type === "text") {
                    try {
                        const data = JSON.parse(item.text);
                        if (data.results && data.results.length > 0) {
                            return data.results[0].id;
                        }
                    }
                    catch (e) {
                        // 尝试直接从文本中提取 ID（如果不是 JSON）
                        // 但通常 API-post-search 返回的是 JSON
                    }
                }
            }
            return null;
        }
        catch (error) {
            console.warn("debugging: searchPage failed", error);
            return null;
        }
    }
    /**
     * 统一工具调用入口，确保在调用前完成连接。
     */
    async callTool(name, args) {
        const client = await this.ensureConnected(); // 确保已连接。
        const request = {
            method: "tools/call", // 标准 MCP 方法。
            params: {
                name, // 工具名。
                arguments: args // 具体参数。
            }
        }; // 请求对象结束。
        const result = await client.request(request, types_js_1.CallToolResultSchema); // 发送请求并通过 schema 验证。
        console.log("debugging: NotionMcpClient.callTool result items", result.content.length); // 打印结果数量。
        return result; // 返回结果。
    }
    /**
     * 确保 MCP 客户端与传输只初始化一次。
     */
    async ensureConnected() {
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
     * 依据 mcp-config.jsonc 建立连接（支持 HTTP 或 Stdio）。
     */
    async initializeConnection() {
        const rawConfig = await (0, mcp_config_1.getMcpServerConfig)("notion"); // 加载配置。
        this.client = new index_js_1.Client({
            name: "learning-agent-notion-client", // 客户端名称。
            version: "0.1.0" // 版本号。
        }, {
            capabilities: {}
        }); // 客户端完成。
        this.client.onerror = (error) => {
            console.error("debugging: Notion MCP client error", error); // 输出错误。
        }; // 回调结束。
        if ("url" in rawConfig) { // HTTP 类型。
            const config = rawConfig; // 强制转换。
            const requestInitHeaders = {
                Authorization: `Bearer ${this.authToken}`, // 传递 Notion 集成令牌。
                "Notion-Version": process.env.NOTION_MCP_VERSION || "2022-06-28" // 指定版本。
            }; // 头部定义结束。
            this.transport = new streamableHttp_js_1.StreamableHTTPClientTransport(new URL(config.url), {
                requestInit: {
                    headers: requestInitHeaders // 设置头部。
                }
            }); // 传输实例化结束。
        }
        else if ("command" in rawConfig) { // Stdio 类型。
            const config = rawConfig;
            const env = {};
            // 传递当前环境变量
            for (const [key, value] of Object.entries(process.env)) {
                if (typeof value === "string") {
                    env[key] = value;
                }
            }
            // 传递配置中的环境变量（包括 NOTION_TOKEN）
            if (config.env) {
                Object.assign(env, config.env);
            }
            // 确保 NOTION_TOKEN 存在
            if (!env.NOTION_TOKEN && this.authToken) {
                env.NOTION_TOKEN = this.authToken;
            }
            this.transport = new stdio_js_1.StdioClientTransport({
                command: config.command,
                args: config.args,
                env,
                cwd: config.workingDirectory
            });
        }
        else {
            throw new Error("Notion MCP 配置无效：必须包含 url 或 command");
        }
        await this.client.connect(this.transport); // 执行连接。
        console.log("debugging: Notion MCP connected"); // 输出成功日志。
    }
    /**
     * 从工具结果中提取页面或资源标识符，便于上层追踪。
     */
    extractResourceIdentifier(result) {
        for (const item of result.content) { // 遍历内容数组。
            if (item.type === "resource_link" && item.uri) { // 若为资源链接。
                return item.uri; // 返回 URI。
            }
            if (item.type === "text" && item.text) { // 若为文本。
                // 尝试解析 JSON
                try {
                    const data = JSON.parse(item.text);
                    if (data.id) {
                        return data.id;
                    }
                }
                catch (e) {
                    // 忽略非 JSON 文本
                }
                const match = item.text.match(/page_id\s*[:：]\s*(\S+)/i); // 尝试匹配 page_id。
                if (match) { // 成功则返回。
                    return match[1]; // 返回匹配值。
                }
            }
        }
        return `notion-${Date.now()}`; // 若无可用内容，返回临时 ID。
    }
}
exports.NotionMcpClient = NotionMcpClient;
