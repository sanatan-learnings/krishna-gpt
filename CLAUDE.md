# Claude Instructions for Bhagavad Gita Project

## Virtual Environment

**CRITICAL**: Always use the virtual environment for Python commands.

Before running any Python commands or scripts:
```bash
source venv/bin/activate
```

This applies to:
- Installing packages (`pip install`)
- Running CLI tools (`sanatan-verse-sdk` commands)
- Running Python scripts
- Generating embeddings
- Any Python-related tasks

## Project Overview

This is a Jekyll-based static site for the Bhagavad Gita with:
- Verse content in `_verses/` directory (YAML frontmatter)
- Jekyll for static site generation (Ruby)
- Python for content generation and AI features
- GitHub Pages for hosting

## Technology Stack

- **Frontend**: Jekyll (Ruby), HTML, CSS, JavaScript
- **Content Generation**: Python with sanatan-verse-sdk
- **AI Features**: OpenAI API, HuggingFace embeddings
- **Hosting**: GitHub Pages
- **API Proxy**: Cloudflare Workers

## Key Commands

### Development
```bash
# Start Jekyll server (Ruby - no venv needed)
bundle exec jekyll serve

# Python commands (require venv activation first)
source venv/bin/activate
verse-generate --chapter X --verse Y --all
verse-embeddings --verses-dir _verses --output data/embeddings.json
```

### Testing
```bash
# Test locally after changes
bundle exec jekyll serve
# Visit http://localhost:4000/krishna-gpt
```

## File Structure

- `_verses/krishna-gpt/` - Shloka YAML files (chapter-XX-shloka-YY.md)
- `_layouts/` - Jekyll templates
- `_data/` - UI translations (en.yml, hi.yml) and collections.yml
- `assets/` - CSS, JS, static assets
- `audio/krishna-gpt/` - Audio pronunciation files (dash-separated)
- `images/krishna-gpt/theme/` - Generated artwork by theme
- `data/` - Canonical verses, scenes, themes, embeddings
  - `verses/bhagavad-gita.yaml` - Canonical Devanagari text
  - `scenes/krishna-gpt.yml` - Scene descriptions for images
  - `themes/krishna-gpt/` - Theme configurations
  - `embeddings.json` - RAG embeddings for AI guidance
- `scripts/` - Python utilities
- `docs/` - Documentation
- `workers/` - Cloudflare Worker for API proxy

## Content Generation Guidelines

1. Always activate venv first
2. Use sanatan-verse-sdk CLI tools for generating content
3. Review AI-generated content before committing
4. Follow existing verse file format in `_verses/`
5. Regenerate embeddings after adding new verses

## Git Workflow

- Main branch: `main`
- Commits should be descriptive
- Include co-author attribution as configured
- Test locally before pushing

## Dependencies

- **Ruby**: Jekyll and GitHub Pages gems
- **Python**: sanatan-verse-sdk from PyPi (not the old verse-content-sdk from GitHub)
- **Node**: Only for Cloudflare Workers (wrangler)

## API Keys

Required in `.env` file:
- `OPENAI_API_KEY` - For content generation and embeddings
- `ELEVENLABS_API_KEY` - For audio pronunciation

## Important Notes

- The project uses sanatan-verse-sdk (collection-based structure)
- Shloka files are in `_verses/krishna-gpt/` subdirectory
- File naming: use dashes (chapter-01-shloka-03.md), not underscores
- Assets are organized by collection: `images/krishna-gpt/`, `audio/krishna-gpt/`
- Navigation permalinks: `/verses/chapter-01-shloka-03/` (dash-separated)
- Always test Jekyll locally after content changes
- Embeddings must be regenerated after adding verses
- Collection structure follows sanatan-verse-sdk conventions
