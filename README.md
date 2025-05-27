# Code Fodd 🚀

## Live Demo - [Deployed Project Link](https://code-fodd.vercel.app/)

**Code Fodd** is a fun, AI-powered comic generator that transforms your code snippets, algorithms, or logic descriptions into hilarious or heartfelt comic strips. Whether you want to **praise**, **roast**, or **turn your code into a comic**, Code Fodd brings your dev stories to life with style!

---

## Snapshots
<p align="center">
  <img src="https://github.com/user-attachments/assets/c6f118fc-392d-4926-a051-9bfa8b777c9c" width="65%" />
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/a9618fb0-72e2-4b63-aa1c-1a7a7431564b" width="65%" />
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/675c9ae2-349e-4b8b-8ca2-5efc8aad1ae8" width="65%" />
</p>


## Features

- 🎨 Generate **3 to 6-panel comics** from code or logic descriptions  
- 🔥 Choose your vibe: from dramatic manga, playful cats, retro pixel art, meme mayhem, to cyberpunk and more  
- 😎 Switch between **Praise Mode** (wholesome feedback), **Roast Mode** (funny and savage burns), and **Comic Mode** (visual storytelling)  
- 🤖 Powered by GPT-4.1 (via GitHub AI Inference) for script generation  
- 🖼️ Image generation using Hugging Face models specialized for comic and anime styles  
- 🎉 Fun placeholders when APIs are unavailable to keep the vibe alive  
- 📥 Download your entire comic as a sleek PDF strip  
- ✨ Smooth UI with animated typing, spinners, and responsive design  

---

## Getting Started

### Prerequisites

- Node.js >= 16  
- Vercel account (for easy deployment)  
- API keys:  
  - `GITHUB_TOKEN` for GitHub AI Inference (GPT-4.1)  
  - `HUGGINGFACE_TOKEN` for image generation models  

### Installation

```bash
git clone https://github.com/anandpanda/code-fodd.git
cd code-fodd
npm install
```

### Environment Variables

Create a `.env` file in the root directory with the following content:

```env
GITHUB_TOKEN=your_github_ai_inference_token
HF_API_TOKEN=your_huggingface_api_token
```

### Running Locally

To run the app with backend API routes locally (which use Vercel Serverless Functions), use the Vercel CLI:

```bash
npm install -g vercel
vercel dev
```

### Important Notes

- This app requires **private API keys** to work properly (GitHub AI Inference & Hugging Face tokens).  
- **You must obtain your own API keys** by signing up on the respective platforms and set them in a `.env` file.  
- For easy deployment and serverless backend support, I recommend using [Vercel](https://vercel.com/), but you can adapt to other Node.js hosting if needed.  
- No API keys are stored in this repo for security reasons.
