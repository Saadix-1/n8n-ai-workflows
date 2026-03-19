# 🤖 n8n AI Automation Workflows

> 5 production-ready AI automation workflows built with n8n, OpenAI GPT-4, and REST APIs.  
> Deployed and actively running — not just demos.

[![n8n](https://img.shields.io/badge/n8n-Workflow%20Automation-orange)](https://n8n.io)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-green)](https://openai.com)
[![Gmail](https://img.shields.io/badge/Gmail-API-red)](https://developers.google.com/gmail)
[![Status](https://img.shields.io/badge/Status-Production-brightgreen)]()

---

## 📋 Table of Contents

- [Overview](#overview)
- [Workflows](#workflows)
  - [1. AI Chatbot with Real-Time Web Search](#1-ai-chatbot-with-real-time-web-search)
  - [2. News Chatbot (BBC · TheVerge · HackerNews)](#2-news-chatbot-bbc--theverge--hackernews)
  - [3. Travel Assistant + Live Weather](#3-travel-assistant--live-weather)
  - [4. Automated Email Summarizer](#4-automated-email-summarizer)
  - [5. Weekly Gmail Digest](#5-weekly-gmail-digest)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [Key Concepts Demonstrated](#key-concepts-demonstrated)

---

## Overview

This repository contains 4 AI-powered automation workflows built from scratch using **n8n**, demonstrating real-world integration of Large Language Models with external APIs and event-driven automation pipelines.

Each workflow is **deployed in production** and handles live data.

---

## Workflows

### 1. AI Chatbot with Real-Time Web Search

**File:** `workflows/chatbot-websearch.json`

An AI conversational agent that autonomously decides when to search the web to answer questions with up-to-date information.

**Architecture:**
```
Chat Trigger → AI Agent (GPT-4o-mini) → SerpAPI Web Search Tool
                     ↓
              Window Buffer Memory (session context)
```

**Key features:**
- Autonomous tool-use decision making — the agent decides when to search
- Persistent session memory across conversation turns
- Real-time web search via SerpAPI
- Responds in the user's language automatically

**APIs used:** OpenAI GPT-4o-mini, SerpAPI
<img width="1503" height="815" alt="Screenshot 2026-03-19 at 13 54 07" src="https://github.com/user-attachments/assets/7c05805e-b35e-4a33-b2a8-7dc772ca051f" />


---

### 2. News Chatbot (BBC · TheVerge · HackerNews)

**File:** `workflows/chat-with-the-news.json`

A conversational AI agent that reads and answers questions about live news from 3 major sources simultaneously. The agent autonomously picks the right source(s) based on the topic.

**Architecture:**
```
Chat Trigger → AI Agent (GPT-4o-mini) → Tool: BBC News RSS
                                       → Tool: TheVerge RSS
                                       → Tool: HackerNews RSS
                     ↓
              Simple Memory (session context)
```

**Key features:**
- 3 live RSS feeds connected as independent tools
- Agent autonomously selects which source(s) to query per topic
- Tech news (TheVerge, HN) and general news (BBC) in one bot
- Cites its sources in every response

**APIs used:** OpenAI GPT-4o-mini, BBC RSS, TheVerge RSS, HackerNews RSS
<img width="1503" height="815" alt="Screenshot 2026-03-19 at 13 35 48" src="https://github.com/user-attachments/assets/ed7c56eb-0fac-46d0-a00d-51654924df84" />

---

### 3. Travel Assistant + Live Weather

**File:** `workflows/assistant-voyage-meteo.json`

A specialized travel advisor AI agent named "Marco" with two integrated tools: real-time web search for travel info and live weather data for any city worldwide.

**Architecture:**
```
Chat Trigger → AI Agent "Marco" → Tool 1: SerpAPI (travel info)
                                → Tool 2: wttr.in (live weather)
                     ↓
              Window Buffer Memory
```

**Key features:**
- Multi-tool AI agent (2 tools simultaneously available)
- Free weather API integration (no key required)
- Custom system prompt with persona, rules, and tool-use instructions
- Handles itinerary planning, visa info, budget advice, and weather

**APIs used:** OpenAI GPT-4o-mini, SerpAPI, wttr.in
<img width="1503" height="815" alt="Screenshot 2026-03-19 at 13 36 49" src="https://github.com/user-attachments/assets/48757aaa-1581-460e-8fcb-c52a8443b7f9" />

---

### 4. Automated Email Summarizer

**File:** `workflows/resume-emails-automatique.json`

An event-driven pipeline that automatically summarizes every incoming email using AI and sends a structured digest back to the inbox — in real time.

**Architecture:**
```
Gmail Trigger (new email) → JS Filter Node → OpenAI Summarizer
                                                    ↓
                             Gmail Send ← JS Formatter (priority + category)
```

**Key features:**
- Real-time event trigger on new Gmail messages
- JavaScript filtering to skip newsletters and automated emails
- AI-generated summary with priority level (High/Medium/Low) and category
- Structured output: Summary + Required Actions + Priority + Category
- Auto-reply pipeline with formatted email output

**APIs used:** Gmail API (OAuth2), OpenAI GPT-4o-mini
<img width="1503" height="572" alt="Screenshot 2026-03-19 at 13 33 52" src="https://github.com/user-attachments/assets/fcd0afa8-ddef-4dc2-b4e6-56cc64c2674d" />

---

### 5. Weekly Gmail Digest

**File:** `workflows/weekly-gmail-digest.json`

A scheduled automation that runs every Monday at 8AM, fetches the last 50 inbox emails, and delivers a structured weekly briefing generated by AI.

**Architecture:**
```
Schedule Trigger (Mon 8AM) → Gmail Fetch (50 emails) → JS Preprocessor
                                                              ↓
                              Gmail Send ← JS Formatter ← OpenAI Analyzer
```

**Key features:**
- Cron-based scheduling (every Monday 8:00 AM)
- Batch processing of up to 50 emails per run
- Filters out promotions, social, updates, and forum categories
- AI-generated weekly briefing with: statistics, urgent items, important items, action list, and weekly insight
- Unix timestamp conversion to human-readable dates

**APIs used:** Gmail API (OAuth2), OpenAI GPT-4o-mini
<img width="1503" height="572" alt="Screenshot 2026-03-19 at 13 34 19" src="https://github.com/user-attachments/assets/1f25665a-8997-4be6-ab90-b0a4732d8c7c" />

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| **n8n** | Workflow orchestration and automation engine |
| **OpenAI GPT-4o-mini** | LLM for summarization, analysis, and agent reasoning |
| **Gmail API (OAuth2)** | Email trigger, fetch, and send operations |
| **SerpAPI** | Real-time web search results |
| **wttr.in** | Free live weather data (no API key required) |
| **BBC / TheVerge / HackerNews RSS** | Live news feeds as agent tools |
| **JavaScript** | Data transformation, filtering, and formatting nodes |

---

## Setup

### Prerequisites
- n8n instance (cloud or self-hosted)
- OpenAI API key
- SerpAPI key (free tier: 100 searches/month)
- Gmail account connected via OAuth2 in n8n

### Import a workflow
1. Clone this repository
2. Open your n8n instance
3. Click **"New Workflow"** → menu **⋮** → **"Import from File"**
4. Select the desired `.json` file from the `workflows/` folder
5. Configure credentials (OpenAI, Gmail, SerpAPI)
6. Click **"Publish"** to activate

---

## Key Concepts Demonstrated

- **AI Agent architecture** — autonomous tool-use with LLMs (ReAct pattern)
- **Event-driven automation** — Gmail triggers, schedule triggers
- **Multi-step data pipelines** — 5-node chains with JS transformation
- **REST API integration** — HTTP Request nodes with dynamic parameters
- **Session memory management** — Window Buffer Memory for conversational context
- **`$fromAI()` expressions** — letting the model fill in API parameters dynamically
- **Cross-node data referencing** — `$('Node Name').item.json` pattern
- **Error handling** — optional chaining and fallback values in JS nodes

---

## Author

**Saad Mehamdi** — Software Engineering Student @ University of Ottawa  
🌐 [Portfolio](https://saadmehamdi.netlify.app) · 💼 [LinkedIn](https://linkedin.com/in/saad-mehamdi) · 🐙 [GitHub](https://github.com/Saadix-1)
