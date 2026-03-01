# Krishna GPT: Lessons from Sri Krishna

An interactive web-based guide to Sri Krishna's teachings across sacred texts, featuring shloka-by-shloka analysis, bilingual translations, and AI-powered spiritual guidance. The Bhagavad Gita is the first and most complete collection.

🌐 **[View Live Site](https://sanatan-learnings.github.io/krishna-gpt)**

## 🌟 Features

- **Comprehensive Shloka Analysis** (Bhagavad Gita collection):
  - Original Sanskrit (Devanagari script)
  - Roman transliteration
  - Word-by-word meanings
  - Literal translation (English & Hindi)
  - Interpretive meaning with spiritual context
  - Story and context from Mahabharata
  - Practical applications for modern life

- **Bilingual Support**: Full interface in English and Hindi with seamless language switching

- **AI-Powered Spiritual Guidance**: Ask questions about Krishna's teachings and receive contextual answers powered by:
  - OpenAI / AWS Bedrock Cohere / Hugging Face embeddings
  - Semantic search (Retrieval Augmented Generation)
  - GPT-4o for thoughtful spiritual responses
  - Cloudflare Worker for secure API management and provider routing

- **Full-Text Search**: Search across all shlokas, translations, and meanings

- **Responsive Design**: Mobile-friendly interface with keyboard navigation

- **Print-Friendly**: Generate custom books with selected chapters

## 📚 Current Status

**Primary Collection**: Bhagavad Gita (18 chapters, 701 shlokas)

**Content Status**:
- ✅ Complete project structure
- ✅ Full bilingual UI
- ✅ RAG system with embeddings
- ✅ **All 701 verses in canonical YAML format** with Devanagari text
- ✅ Complete source text in Sanskrit/Devanagari
- ✅ Python parser script for extracting verses from source text
- ⚠️ **8 sample shlokas generated** (693 shlokas need full content generation)

**Note**: The canonical Devanagari text for all 701 verses is available in `data/verses/bhagavad-gita.yaml`. Use the `verse-generate` command to create full content (translations, meanings, interpretations, images, audio) for each shloka following the format in `_verses/` directory. See **[Content Generation Guide](docs/guides/content-generation.md)** for details.

## 🚀 Quick Start

### Prerequisites

- Ruby 3.x or higher
- Git

### Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/sanatan-learnings/krishna-gpt.git
   cd krishna-gpt
   ```

2. **Install dependencies**
   ```bash
   gem install bundler
   bundle install
   ```

3. **Run Jekyll server**
   ```bash
   bundle exec jekyll serve
   ```

4. **View the site**
   Open http://localhost:4000/krishna-gpt in your browser

**To generate new shloka content:** See **[Content Generation Guide](docs/guides/content-generation.md)**

## 📖 Documentation

### Guides
- **[Local Development](docs/guides/local-development.md)** - Setup and running locally
- **[Content Generation](docs/guides/content-generation.md)** - Creating verses with AI
- **[Content Verification](docs/guides/content-verification-guide.md)** - Verifying AI-generated content
- **[Parsing Source Text](docs/guides/parsing-source-text.md)** - Parsing canonical Sanskrit text
- **[Cloudflare Worker](docs/guides/cloudflare-worker-setup.md)** - API proxy deployment

### Reference
- **[Tech Stack](docs/reference/tech-stack.md)** - Technical architecture
- **[Image Prompts](docs/reference/image-prompts.md)** - Scene descriptions

### SDK
- **[sanatan-verse-sdk](https://github.com/sanatan-learnings/sanatan-verse-sdk)** - Full SDK documentation

## 📁 Project Structure

```
krishna-gpt/
├── _verses/              # Shloka content files (YAML)
├── _layouts/             # HTML templates
├── _data/
│   ├── translations/     # UI strings (en.yml, hi.yml)
│   ├── collections.yml   # Collection metadata
│   ├── embeddings.yml    # Embeddings provider configuration
│   ├── chat.yml          # Chat provider configuration
│   └── themes.yml        # Image theme definitions
├── assets/
│   ├── css/             # Styling
│   └── js/              # Language, navigation, RAG system
├── data/
│   ├── verses/          # Canonical verse data
│   │   └── bhagavad-gita.yaml  # All 701 verses in Devanagari
│   ├── scenes/          # Scene descriptions for images
│   ├── themes/          # Theme configurations
│   ├── source-texts/    # Original source texts
│   │   └── bhagavad-gita-sanskrit-devanagari.txt
│   ├── embeddings/       # Provider-scoped embeddings
│   │   └── providers/openai/collections/
│   │       ├── index.json
│   │       └── bhagavad-gita.json
│   └── search.json       # Liquid template generated at build
├── scripts/
│   ├── parse_gita.py    # Parser for extracting verses from source
│   ├── README.md        # Scripts documentation
│   └── requirements.txt # Python dependencies
├── workers/
│   └── cloudflare-worker.js  # API proxy for spiritual guidance
├── docs/                # Documentation
│   ├── guides/          # User guides
│   └── guides/parsing-source-text.md  # Parser documentation
├── audio/               # Audio pronunciations
│   └── bhagavad-gita/
├── images/              # Generated artwork
│   └── bhagavad-gita/
├── index.html           # Home page
├── full-gita.html       # Full text view
├── guidance.html        # AI guidance interface
├── search.html          # Search interface
└── _config.yml          # Jekyll configuration
```

## 🤝 Contributing

Contributions are welcome! Areas where help is needed:

1. **Content**: Generating full content for all 18 chapters (693 shlokas remaining out of 701 total)
2. **Translations**: Improving Hindi translations
3. **Documentation**: Adding guides and explanations
4. **Verification**: Verifying AI-generated content for accuracy and authenticity

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the [Hanuman Chalisa project](https://github.com/sanatan-learnings/hanuman-chalisa)
- Built with Jekyll and hosted on GitHub Pages
- AI features powered by OpenAI, ElevenLabs, HuggingFace, and Cloudflare Workers
- Sanskrit transliterations follow IAST standards
- Canonical Sanskrit text from [sanskritdocuments.org](https://sanskritdocuments.org)

## 📞 Support

- [Report issues](https://github.com/sanatan-learnings/krishna-gpt/issues)
- [Ask questions](https://github.com/sanatan-learnings/krishna-gpt/discussions)

---

**Om Shanti Shanti Shanti** 🕉️
