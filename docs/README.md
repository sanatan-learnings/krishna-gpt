# Documentation

Documentation for the Bhagavad Gita project.

## Structure

```
docs/
├── guides/          # How-to guides
└── reference/       # Technical reference
```

## Guides

- **[Local Development](guides/local-development.md)** - Setup and run locally (macOS)
- **[Content Generation](guides/content-generation.md)** - Generate verses with AI
- **[Parsing Source Text](guides/parsing-source-text.md)** - Parse canonical Sanskrit text
- **[Content Verification](guides/content-verification-guide.md)** - Verify AI content
- **[Cloudflare Worker](guides/cloudflare-worker-setup.md)** - Deploy API proxy

## Reference

- **[Tech Stack](reference/tech-stack.md)** - Architecture overview

## Quick Reference

**Generate content:**
```bash
verse-generate --collection bhagavad-gita --verse 9 --verse-id chapter-01-shloka-09
```

**Generate embeddings:**
```bash
verse-embeddings --multi-collection \
  --collections-file _data/collections.yml \
  --output-dir data/embeddings/providers/openai/collections
```

See [sanatan-verse-sdk](https://github.com/sanatan-learnings/sanatan-verse-sdk) for full documentation.
