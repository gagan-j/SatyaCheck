# SatyaCheck: AI-Powered Fact-Checking Prototype

**SatyaCheck** is an advanced, AI-powered fact-checking tool designed to combat misinformation. It provides users with a seamless platform to verify the authenticity of digital content by cross-referencing claims against trusted sources on the web in real-time.

## Key Features

- **Multi-Format Input**: Accepts content in various forms, including plain text, article URLs, and YouTube video links, making it a versatile tool for modern media consumption.
- **Real-Time Web Verification**: Leverages the power of Google Search to find and analyze up-to-date information from multiple sources, ensuring that fact-checking is based on current data.
- **AI-Powered Analysis**: Utilizes a sophisticated generative AI model to understand the core claim of the content, evaluate the evidence found online, and synthesize a clear, actionable conclusion.
- **Structured, Actionable Insights**: Delivers a concise and easy-to-understand analysis for every query, which includes:
    - A **Verdict**: A clear judgment (e.g., "Likely Factual," "Likely Misinformation," "Potentially Misleading").
    - An **Explanation**: A brief, AI-generated summary that explains the reasoning behind the verdict.
    - **Sources**: A list of the URLs consulted during the analysis, allowing for transparency and further investigation.

## How It Works: System Architecture

SatyaCheck is built on a modern, serverless architecture that integrates a reactive frontend with a powerful AI backend.

### 1. Frontend (Client-Side)

- **Framework**: **Next.js** with **React** provides a fast, server-rendered user interface. The UI is built using the **Next.js App Router**.
- **UI Components**: The interface is composed of reusable components from **ShadCN UI**, styled with **Tailwind CSS** for a clean, responsive, and modern aesthetic.
- **User Interaction**: Users submit content through a simple textarea. The form submission is handled by a Next.js Server Action, which communicates directly with the AI backend without requiring a separate API layer.

### 2. Backend (Server-Side)

- **Server Actions**: A Next.js Server Action (`performAnalysis`) serves as the entry point for all analysis requests. It orchestrates the entire fact-checking process.
- **YouTube URL Handling**: If the input is identified as a YouTube link, the action first calls a dedicated AI flow to extract the video's transcript. This text is then used for the analysis.
- **Error Handling**: The action includes robust error handling to manage issues like missing API keys, failed transcript extractions, or model failures, providing clear feedback to the user.

### 3. AI Core (Genkit)

The AI functionality is powered by **Google's Genkit**, an open-source framework for building production-ready generative AI applications.

- **`genkit.ts`**: This file initializes and configures the `googleAI` plugin, making Google's generative models and tools available to the application. It specifically exports the `googleSearch` tool for use in other parts of the app.
- **`analyzeContentForMisinformation` Flow**: This is the core AI agent. It takes content as input and uses a powerful LLM (Gemini 1.5 Flash) instructed to act as an expert fact-checker. It uses the `googleSearch` tool to find relevant information and then generates the verdict, explanation, and sources based on its findings.
- **`extractYouTubeTranscript` Flow**: This specialized flow leverages a model's ability to process external URLs to fetch the full transcript of a YouTube video, which is then passed back to the server action for analysis.

## Technology Stack

- **Framework**: Next.js 15
- **UI**: React 18, ShadCN UI, Tailwind CSS
- **AI Framework**: Genkit
- **AI Models & Tools**: Google AI (Gemini 1.5 Flash, Google Search Tool)
- **Language**: TypeScript
- **Deployment**: Designed for serverless platforms like Vercel or Firebase App Hosting.

By integrating these technologies, SatyaCheck serves as a powerful demonstration of how generative AI can be applied to promote digital literacy and critical thinking in an increasingly complex information landscape.
