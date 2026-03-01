# Technology Stack

## Architecture Overview

The Bhagavad Gita project uses a **static site generation approach** combining Jekyll for build processes, GitHub Pages for hosting, and AI-powered embeddings for semantic search. The workflow flows from development through content management (YAML/Markdown) to automated deployment via GitHub Actions.

## Core Technologies

**Static Site Generation:**
- Jekyll v4.x serves as the Ruby-based site generator
- GitHub Pages provides free hosting with automatic builds via Actions
- Liquid templates power dynamic HTML rendering

**Frontend Stack:**
- HTML5 for semantic structure
- Custom CSS with responsive design and print-optimized layouts
- Vanilla JavaScript handles language switching, navigation, and RAG system without framework dependencies

**Content Organization:**
- YAML front matter structures all verse data (Devanagari, transliteration, translations, commentary)
- Each verse as separate markdown file in `_verses/` collection
- Multi-language support for English and Hindi with extensible architecture

## AI & Semantic Search

**Embeddings:**
Provider-scoped embeddings are stored per collection under `data/embeddings/providers/{provider}/collections/`. OpenAI (`text-embedding-3-small`) is the default, with optional Hugging Face and Bedrock Cohere support.

**Spiritual Guidance (RAG System):**
The guidance interface implements retrieval augmented generation combining semantic search via cosine similarity with GPT-4o for context-aware responses. Users query the Gita teachings, the system finds relevant verses through embedding similarity, then GPT-4o provides spiritual guidance grounded in actual scripture.

**API Architecture:**
Two deployment modes are available: (1) user-provided OpenAI API key stored locally in browser localStorage, or (2) Cloudflare Worker proxy handling chat + embeddings provider routes (OpenAI, Hugging Face, Bedrock) without exposing credentials. Semantic search ranking runs client-side in JavaScript.

## Development Workflow

**Content Generation:**
The [sanatan-verse-sdk](https://github.com/sanatan-learnings/sanatan-verse-sdk) provides unified commands for generating complete verses with text, images, and audio. GPT-4 generates verse content, DALL-E 3 creates artwork, ElevenLabs produces Sanskrit audio.

**Deployment:**
Version control through Git. Verses follow consistent YAML structure in `_verses/`. The `verse-embeddings` command regenerates semantic search data. Jekyll rebuilds site automatically. GitHub Actions deploys on push to main branch.

## Performance and Cost

Static site generation eliminates server overhead, achieving instant page loads via CDN. Pre-computed embeddings loaded once per session. GitHub Pages hosting remains perpetually free. OpenAI embedding generation costs ~$0.10 one-time, spiritual guidance queries cost ~$0.01 each. Cloudflare Workers free tier provides 100,000 requests daily.

## Technical Implementation Details

**Content Generation SDK:**
- [sanatan-verse-sdk](https://github.com/sanatan-learnings/sanatan-verse-sdk) - Python package for automated content generation
- Commands: `verse-generate`, `verse-images`, `verse-audio`, `verse-embeddings`, `verse-deploy`
- Dependencies: OpenAI API (GPT-4, DALL-E 3), ElevenLabs API (audio), HuggingFace (optional local embeddings)

**Ruby Dependencies:**
- `github-pages` gem ensures compatibility
- `jekyll-seo-tag` for optimization
- `webrick` for local development server

**Data Flow:**
1. **Content Creation:** `verse-generate` → GPT-4 verse content → DALL-E 3 images → ElevenLabs audio → Markdown file
2. **Search Index:** Verse files → `data/search.json` Liquid template → build-time search JSON
3. **User Query:** Question → Client-side semantic search over provider-scoped embeddings → GPT-4o guidance → Response with verse citations

## Current Features & Roadmap

**Implemented:**
- ✅ Automated verse generation (text, images, audio)
- ✅ Sanskrit audio narration via ElevenLabs (full + slow speeds)
- ✅ DALL-E 3 generated artwork with theme system
- ✅ Semantic search and RAG-powered spiritual guidance
- ✅ Bilingual interface (English/Hindi)

**Current Status:**
- 11 verses generated (690 remaining out of 701 total)
- All 701 verses available in canonical YAML format
- Parser script for extracting verses from source text

**Planned Enhancements:**
- More enabled Krishna collections
- Progressive web app capabilities
- Complete all 701 verses
- Hindi commentary narration
- Additional artwork themes
