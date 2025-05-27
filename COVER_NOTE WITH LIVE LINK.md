# COVER NOTE

## Live Demo

[Deployed Project Link](https://code-fodd.vercel.app/)

## Snapshots
<p align="center">
  <img src="https://github.com/user-attachments/assets/c6f118fc-392d-4926-a051-9bfa8b777c9c" width="80%" />
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/a9618fb0-72e2-4b63-aa1c-1a7a7431564b" width="80%" />
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/675c9ae2-349e-4b8b-8ca2-5efc8aad1ae8" width="80%" />
</p>

> **Heads up! Comic Mode isn't previewed above to help save Hugging Face free credits. Please try out Comic Mode yourself for the full experience!**

## Project Overview

**Code Fodd** is an AI-powered comic generator that transforms code snippets, algorithms, or logic descriptions into engaging comic strips. The app offers three modes: Praise, Roast, and Comic, allowing users to receive wholesome feedback, funny burns, or visual storytelling based on their code. It leverages GPT-4.1 (via GitHub AI Inference) for script generation and Hugging Face models for comic-style image creation.

## Approach

- **Frontend**: Built with a modern React stack (Vite, TypeScript, Tailwind CSS) for a smooth, animated, and responsive user experience.

- **Backend/API**: Uses Vercel Serverless Functions to securely handle API requests and integrate with external AI services.

- **AI Integration**: 
  - Text generation is powered by GPT-4.1 through GitHub AI Inference.
  - Comic panel images are generated using Hugging Face models specialized for comic and anime styles.

- **User Experience**: Includes animated typing, spinners, and fun placeholders to keep the app lively even when APIs are unavailable. Comics can be downloaded as sleek PDF strips.

- **Security**: API keys are never stored in the repo. Users must provide their own keys via a `.env` file.

- **Deployment**: Optimized for Vercel for easy serverless deployment, but can be adapted to other Node.js hosts.


---

For setup instructions, prerequisites, and more details, see the `README.md` file.
