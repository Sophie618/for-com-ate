# SophieSync Frontend Documentation

本文档详细说明了 SophieSync 前端项目的目录结构、页面组成、组件功能以及它们之间的调用关系。

## 1. 核心目录结构

前端代码主要集中在 `src` 目录下：

```
src/
├── App.tsx             # 路由入口，决定访问哪个 URL 显示哪个页面
├── main.tsx            # 应用入口，挂载 React 到 HTML
├── components/         # 可复用的 UI 组件（积木块）
│   ├── Navbar.tsx      # 顶部导航栏
│   ├── Hero.tsx        # 首页首屏（大标题 + 3D 效果）
│   ├── Features.tsx    # 功能介绍区
│   ├── Testimonials.tsx# 用户评价区
│   ├── CTA.tsx         # 底部号召行动区
│   ├── Footer.tsx      # 页脚
│   ├── ProfileModal.tsx# 用户设置弹窗/向导
│   └── ThinkingSidebar.tsx # AI 思考过程侧边栏
└── pages/              # 完整的页面级组件
    ├── ChatPage.tsx    # 核心聊天/工作台页面
    └── temp_ChatPage.tsx # (临时备份文件)
```

## 2. 页面详细解析 (`src/pages/`)

目前主要有两个核心页面：**LandingPage (落地页)** 和 **ChatPage (聊天页)**。

### A. LandingPage (落地页)
*   **定义位置**: `App.tsx` 中直接定义的组件 `const LandingPage = ...`。
*   **路由**: `/` (根路径)。
*   **内容**: 这是一个典型的营销展示页面，由多个 `components` 拼装而成。
    *   `Navbar`: 顶部 Logo 和登录按钮。
    *   `Hero`: 视觉冲击区，包含 "Your AI Tutor" 标题和 "Start Learning" 按钮（点击跳转到 `/chat`）。
    *   `Features`: 介绍核心功能（如 OCR 识别、Notion 同步）。
    *   `Testimonials`: 展示用户好评。
    *   `CTA`: 底部再次引导用户开始使用。
    *   `Footer`: 版权和链接。

### B. ChatPage (`src/pages/ChatPage.tsx`)
*   **路由**: `/chat`。
*   **功能**: 这是应用的核心工作台，用户在这里与 AI (Sophie) 交互。
*   **主要状态 (State)**:
    *   `messages`: 聊天记录列表。
    *   `isProfileOpen`: 控制设置弹窗是否显示。
    *   `isThinkingOpen`: 控制思考过程侧边栏是否展开。
    *   `profile`: 存储用户的学习偏好。
*   **视图逻辑**:
    *   **空状态 (Empty State)**: 当 `messages` 为空时，显示“今天想学什么？”以及三个卡片（上传、粘贴、记录）。
    *   **聊天状态 (Chat State)**: 当有消息时，显示对话流。
*   **包含的子组件**:
    *   `ThinkingSidebar`: 点击“已思考 xs”按钮时从右侧滑出的面板。
    *   `ProfileModal`: 首次进入时的全屏向导，或点击设置图标时的弹窗。

## 3. 组件详细解析 (`src/components/`)

这些是构成页面的“积木”。

*   **`ProfileModal.tsx` (设置向导/弹窗)**
    *   **功能**: 让用户输入学习目标、水平和偏好。
    *   **双模式**:
        *   `mode="wizard"`: 全屏分步引导（首次进入时显示）。
        *   `mode="modal"`: 居中弹窗（点击设置图标时显示）。
    *   **关键逻辑**: 维护 `step` 状态（1/2/3），根据步骤渲染不同内容。

*   **`ThinkingSidebar.tsx` (思考侧边栏)**
    *   **功能**: 展示 AI 处理任务的详细步骤（如“识别题目”、“分析知识点”）。
    *   **UI**: 使用 `framer-motion` 实现从右侧平滑滑出的动画。
    *   **数据**: 接收 `steps` 数组，显示每个步骤的状态（完成/进行中）。

*   **`Hero.tsx` (首页首屏)**
    *   **功能**: 吸引用户注意。
    *   **特效**: 使用 `framer-motion` 实现了随滚动条移动的 3D 视差效果。
    *   **交互**: "Start Learning" 按钮通过 `useNavigate` 跳转到 `/chat`。

*   **`Navbar.tsx`**
    *   **功能**: 顶部导航。
    *   **内容**: 左侧是 "SophieSync" Logo，右侧是 "Sign In" 和 "Get Started" 按钮。

## 4. 文件调用关系图

```mermaid
App.tsx (路由中心)
├── 路由 "/" -> LandingPage (组合组件)
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── Testimonials.tsx
│   ├── CTA.tsx
│   └── Footer.tsx
│
└── 路由 "/chat" -> ChatPage.tsx (核心页面)
    ├── ThinkingSidebar.tsx (侧边栏)
    └── ProfileModal.tsx (设置弹窗)
```
