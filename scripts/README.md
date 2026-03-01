# Bhagavad Gita Scripts

This directory contains project-specific scripts for the Bhagavad Gita site.

## Setup

Install the sanatan-verse-sdk which provides all common functionality:

```bash
pip install -r scripts/requirements.txt
```

This installs the SDK and provides command-line tools:
- `verse-generate` - Generate images and audio for verses
- `verse-embeddings` - Generate embeddings for semantic search
- `verse-validate` - Validate project structure
- `verse-init` - Initialize new collections
- `verse-help` - Comprehensive CLI documentation

## Content Generation

For detailed instructions on generating verse content, see **[GENERATING_CONTENT.md](../GENERATING_CONTENT.md)** in the project root.

### Quick Start

Generate everything for a verse:

```bash
verse-generate --collection bhagavad-gita --verse 5 --all
```

**Note:**
- Verse number is sequential position (1-700), not chapter/verse
- Position 5 = Chapter 1, Verse 5
- Commands are installed in the virtual environment's bin directory

## Other Tasks

### Generate Embeddings

```bash
# Generate embeddings for all collections
verse-embeddings --multi-collection \
  --collections-file _data/collections.yml \
  --output-dir data/embeddings/providers/openai/collections
```

Uses OpenAI embeddings by default (requires OPENAI_API_KEY in .env).

### Validate Project Structure

```bash
# Check project structure
verse-validate

# Auto-fix common issues
verse-validate --fix
```

## More Information

- SDK Repository: https://github.com/sanatan-learnings/sanatan-verse-sdk
- SDK provides shared functionality across all Sanatan Learnings projects
- Run `verse-help` for comprehensive documentation
