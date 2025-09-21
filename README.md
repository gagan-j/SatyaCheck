# SatyaCheck

![SatyaCheck](https://img.shields.io/badge/AI-Fact_Checker-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC)

**SatyaCheck** is an AI-powered fact-checking platform that verifies digital content authenticity through intelligent AI analysis and real-time web verification.

🔗 **[Live Demo](https://satyacheck.vercel.app/)**

## Features

- **Multi-Format Content Processing**: Analyze text, URLs, and YouTube videos
- **Real-Time Verification**: Cross-reference claims against current web sources
- **AI-Powered Analysis**: Advanced reasoning with context understanding
- **Structured Results**: Clear verdicts with expert explanations and source transparency
- **Modern Interface**: Responsive design with intuitive user experience

## Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/satyacheck.git
   cd satyacheck
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Add your API keys for Google Genkit and other services
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | React framework with App Router |
| **React 18** | UI library with Server Actions |
| **TypeScript** | Type-safe JavaScript |
| **ShadCN UI** | Modern component library |
| **Tailwind CSS** | Utility-first CSS framework |
| **Google Genkit** | AI framework and orchestration |
| **Gemini 1.5 Flash** | Advanced AI reasoning model |
| **Google Search** | Real-time verification tool |

## System Architecture

### Frontend Layer
- **Next.js 15** with App Router for optimized performance
- **ShadCN UI** components with **Tailwind CSS** styling
- Server Actions for seamless form handling
- Responsive design for all devices

### Backend Infrastructure
- **Next.js Server Actions** for analysis pipeline
- YouTube transcript extraction
- Comprehensive error handling
- Serverless deployment ready

### AI Engine
- **Core Flow**: `analyzeContentForMisinformation` - Expert fact-checker agent
- **Specialty Flow**: `extractYouTubeTranscript` - Video content processor
- **Model**: Gemini 1.5 Flash for advanced reasoning
- **Tools**: Integrated Google Search for verification

## Content Analysis Pipeline

1. **Input Processing** → Accept text, URLs, or YouTube links
2. **Content Extraction** → Retrieve transcripts for video content
3. **AI Analysis** → Understand claims and gather evidence
4. **Web Verification** → Cross-reference with authoritative sources
5. **Result Synthesis** → Deliver clear verdict with supporting evidence

## Result Structure

Every analysis provides:
- **Clear Verdict** — Assessment (Factual, Misinformation, Misleading)
- **Expert Explanation** — Reasoning behind the conclusion
- **Source Transparency** — Complete list of references

## Contributing

Contributions are welcome. Please follow these guidelines:

- Follow TypeScript best practices
- Maintain consistent code formatting
- Test AI workflows thoroughly
- Update documentation for new features
- Ensure responsive design

## License

This project is licensed under the MIT License.

## Acknowledgments

- Google Genkit for AI framework
- Gemini models for advanced reasoning
- Open source community for supporting libraries
