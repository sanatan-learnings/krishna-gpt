# Generating Content for New Shlokas

This guide shows the streamlined workflow for generating Bhagavad Gita shloka content using `verse-generate --next`.

## Prerequisites

1. **Activate virtual environment:**
   ```bash
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **API Keys**: Make sure your `.env` file contains:
   ```
   OPENAI_API_KEY=your_openai_key
   ELEVENLABS_API_KEY=your_elevenlabs_key
   ```

## Streamlined Workflow (Recommended) 🚀

The easiest way to generate shlokas is using the `--next` flag, which automatically detects and generates the next shloka in sequence.

**Note:** Canonical Devanagari text for all 701 verses is already available in `data/verses/bhagavad-gita.yaml` - no need to add it manually.

### Generate Everything Automatically

Run one command to generate complete shloka content:

```bash
verse-generate --collection bhagavad-gita --next
```

**What this does automatically:**
- ✅ Auto-detects the next shloka to generate
- ✅ Creates verse markdown file with AI-generated content:
  - Title (English & Hindi)
  - Transliteration
  - Word-by-word meanings
  - Literal translation
  - Interpretive meaning
  - Story and context
  - Practical application
- ✅ Generates AI scene description for the shloka
- ✅ Creates artwork from scene description (DALL-E 3)
- ✅ Generates audio pronunciation (ElevenLabs - full + slow speeds)
- ✅ Updates navigation links (previous/next shloka)
- ✅ Regenerates embeddings for search functionality

### Review and Commit

```bash
# Review AI-generated content
# Edit if needed for accuracy

# Commit changes
git add -A
git commit -m "Generate Chapter X, Shloka Y"
git push
```

**That's it!** Repeat for as many shlokas as you want.

## What Gets Generated

Each `verse-generate --next` command creates:

1. **Markdown File** (`_verses/bhagavad-gita/chapter-XX-shloka-YY.md`)
   - Complete YAML frontmatter with metadata
   - AI-generated translations and commentary
   - Navigation links to previous/next shlokas

2. **Image** (`images/bhagavad-gita/modern-minimalist/chapter-XX-shloka-YY.png`)
   - DALL-E 3 generated artwork
   - Portrait format (1024x1792)
   - Based on AI-generated scene description

3. **Audio Files** (`audio/bhagavad-gita/chapter-XX-shloka-YY-*.mp3`)
   - `*-full.mp3`: Normal speed pronunciation
   - `*-slow.mp3`: Slow speed for learning
   - ElevenLabs Sanskrit voice

4. **Updated Files**
   - `data/scenes/bhagavad-gita.yml`: New scene description added
   - `data/embeddings/providers/openai/collections/bhagavad-gita.json`: Regenerated embeddings (provider-scoped)
   - `data/embeddings/providers/openai/collections/index.json`: Manifest updated as needed
   - Previous shloka's markdown: Navigation link updated

## Alternative Methods

### Generate Specific Shloka by Chapter and Verse

If you need to regenerate or generate a specific shloka (not the next in sequence):

```bash
verse-generate --collection bhagavad-gita --chapter 1 --verse 5```

**Note:** Use `--chapter X --verse Y` to specify exact chapter and verse numbers (701 verses total across 18 chapters).

### Generate Only Specific Assets

Generate only images:
```bash
verse-generate --collection bhagavad-gita --chapter 1 --verse 5 --image
```

Generate only audio:
```bash
verse-generate --collection bhagavad-gita --chapter 1 --verse 5 --audio
```

Generate image and audio (default):
```bash
verse-generate --collection bhagavad-gita --chapter 1 --verse 5```

### Regenerate Verse Content

To regenerate the markdown file with new AI-generated translations:

```bash
verse-generate --collection bhagavad-gita --chapter 1 --verse 5 --regenerate-content
```

## Batch Generation

To generate multiple shlokas, use the range syntax:

```bash
# Generate shlokas 8-12 in Chapter 1
verse-generate --collection bhagavad-gita --chapter 1 --verse 8-12```

Or generate multiple chapters at once:
```bash
# Generate all shlokas in Chapter 1 (verses 1-47)
verse-generate --collection bhagavad-gita --chapter 1 --verse 1-47```

Alternatively, use `--next` repeatedly:
```bash
# Generate next 5 shlokas in sequence
for i in {1..5}; do
  verse-generate --collection bhagavad-gita --next
  git add -A
  git commit -m "Generate next shloka"
done
```

## After Generation

1. **Test Locally**:
   ```bash
   bundle exec jekyll serve
   # Navigate to http://localhost:4000/krishna-gpt/
   ```

2. **Review Content**:
   - Check translations for accuracy
   - Review AI-generated commentary
   - Verify image quality and relevance
   - Test audio pronunciation

3. **Edit if Needed**:
   - Markdown files: Edit content directly
   - Scene descriptions: Edit `data/scenes/bhagavad-gita.yml`
   - Regenerate assets if you change scene descriptions

4. **Commit and Push**:
   ```bash
   git add -A
   git commit -m "Generate Chapter X, Shloka Y with multimedia content"
   git push
   ```

## Troubleshooting

### "Error: OPENAI_API_KEY not set"
- Check `.env` file exists and contains valid API key
- Make sure to activate virtual environment before running

### "Error: No canonical Devanagari text found"
- Add the Sanskrit text to `data/verses/bhagavad-gita.yaml` first
- Ensure the format is: `devanagari: 'sanskrit text here'`

### "Error code: 400 - content_policy_violation" (Image Generation)
- Scene description may contain battle/violence imagery
- Edit `data/scenes/bhagavad-gita.yml` to emphasize spiritual/dharmic context
- Focus on noble qualities rather than weapons/conflict
- Regenerate image with updated scene

### Jekyll "No such file or directory" error for .temp.mp3
- Already fixed in `_config.yml` with `**/*.temp.mp3` exclusion
- Restart Jekyll server if error persists

## Tips

- **Review AI Content**: Always review and edit AI-generated translations and interpretations for accuracy. The Gita is sacred text - ensure authenticity.

- **Scene Descriptions**: More specific scene descriptions lead to better images. Emphasize spiritual context over battle imagery.

- **Sequential Generation**: Use `--next` to maintain proper ordering and navigation links.

- **Cost Optimization**:
  - Content generation: ~$0.11 per shloka (GPT-4)
  - Images: Free (included in OpenAI plan)
  - Audio: Free tier available (ElevenLabs)
  - Embeddings: ~$0.0002 per shloka (negligible)

## Full Documentation

For complete SDK documentation, see:
- [sanatan-verse-sdk Repository](https://github.com/sanatan-learnings/sanatan-verse-sdk)
- Run `verse-help` for comprehensive CLI documentation
- Run `verse-generate --help` for detailed command options
