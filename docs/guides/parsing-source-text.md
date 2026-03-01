# Parsing Complete Bhagavad Gita Text

## Overview

The `parse_gita.py` script extracts verses from a canonical Devanagari text file and generates properly formatted YAML output for `data/verses/bhagavad-gita.yaml`.

## Prerequisites

- Complete Bhagavad Gita text in Devanagari with verse markers (॥ X-Y ॥)
- Python 3.x
- Input text format should have verses marked like: `॥ १-१॥`, `॥ १-२॥`, etc.

## Expected Input Format

```
अथ प्रथमोऽध्यायः । अर्जुनविषादयोगः

        धृतराष्ट्र उवाच ।

धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः ।
मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ॥ १-१॥

        सञ्जय उवाच ।

दृष्ट्वा तु पाण्डवानीकं व्यूढं दुर्योधनस्तदा ।
आचार्यमुपसङ्गम्य राजा वचनमब्रवीत् ॥ १-२॥
```

**Key Points:**
- Verses end with markers like `॥ १-१॥` (chapter-verse in Devanagari numerals)
- **Verse markers are preserved** in the output text
- Multi-line verses are supported
- Chapter headers (अथ...ध्यायः) extract chapter names but are excluded from verse text
- Speaker declarations (like "धृतराष्ट्र उवाच।") are **included** in the verse text
- Chapter colophons ending with `॥ १॥` are captured separately as `chapter_XX_colophon`
- Parenthetical variants like `(सौमदत्तिर्जयद्रथः)` after verse markers are automatically removed
- Preamble text before the first chapter is automatically skipped

## Usage

### Option 1: From File
```bash
python scripts/parse_gita.py gita_complete_text.txt > data/verses/krishna-gpt-new.yaml
```

### Option 2: From Stdin
```bash
cat gita_complete_text.txt | python scripts/parse_gita.py > data/verses/krishna-gpt-new.yaml
```

### Option 3: Test with Sample
```bash
# Create a test file with a few verses
cat > test_input.txt << 'EOF'
अथ प्रथमोऽध्यायः ।

        धृतराष्ट्र उवाच ।

धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः ।
मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ॥ १-१॥

        सञ्जय उवाच ।

दृष्ट्वा तु पाण्डवानीकं व्यूढं दुर्योधनस्तदा ।
आचार्यमुपसङ्गम्य राजा वचनमब्रवीत् ॥ १-२॥
EOF

python scripts/parse_gita.py test_input.txt
```

## Parser Behavior & Nuances

### What Gets Included in Verse Text

✅ **Included:**
- Speaker declarations: `धृतराष्ट्र उवाच।`, `सञ्जय उवाच।`, `अर्जुन उवाच।`, `श्रीभगवानुवाच।`
- **Verse markers with numbers**: `॥ १-१॥`, `॥ १८-७८॥` (preserved in verse text)
- **Colophon markers**: `॥ १॥`, `॥ १८॥` (preserved in colophon text)
- Multi-line verse text (automatically combined)
- All Sanskrit text between verses

❌ **Excluded (from verse text):**
- Preamble text before first chapter (titles, invocations, URLs, etc.)
- Chapter headers: `अथ प्रथमोऽध्यायः । अर्जुनविषादयोगः` (but chapter names are extracted)
- Parenthetical variants after markers: `(सौमदत्तिर्जयद्रथः)` → removed
- Chapter colophons (captured separately as `chapter_XX_colophon`)

### Chapter Name Extraction

The parser automatically extracts Sanskrit chapter names from headers:
```
अथ प्रथमोऽध्यायः ।   अर्जुनविषादयोगः
                    ⬇️
           "अर्जुनविषादयोगः"
```

These names are included in the YAML output as comments:
```yaml
# Chapter 1: अर्जुनविषादयोगः
# Total shlokas in chapter: 47
```

### Unicode Handling

- Handles Devanagari numerals: `०-९` → `0-9`
- Handles avagraha character: `ऽध्यायः` (not `अध्यायः`)
- Preserves all diacritical marks and conjunct characters

### Text Cleaning

- Removes extra spaces: `word1  word2` → `word1 word2`
- Normalizes punctuation: ` ।` → `।`
- Strips leading/trailing whitespace
- Removes parenthetical content only when it appears after verse markers

### Multi-line Verse Handling

Verses that span multiple lines are automatically combined:
```
धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः ।
मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ॥ १-१॥
```
Becomes:
```yaml
devanagari: 'धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः। मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ॥ १-१॥'
```

**Note**: The verse marker `॥ १-१॥` is **preserved** in the output.

### Edge Cases Handled

1. **Standalone speaker declarations** (between verses):
   ```
           सञ्जय उवाच ।

   दृष्ट्वा तु पाण्डवानीकं...
   ```
   The speaker line is included in the following verse.

2. **Variants in parentheses**:
   ```
   सौमदत्तिस्तथैव च ॥ १-८॥ (सौमदत्तिर्जयद्रथः)
   ```
   Output becomes:
   ```
   सौमदत्तिस्तथैव च ॥ १-८॥
   ```
   The parenthetical `(सौमदत्तिर्जयद्रथः)` is removed, but the verse marker `॥ १-८॥` is preserved.

3. **Preamble text**:
   ```
   श्रीमद्भगवद्गीता
   ॥ ॐ श्री परमात्मने नमः ॥
   ```
   Everything before `अथ प्रथमोऽध्यायः` is skipped.

4. **Chapter colophons**:
   ```
   ...last verse of chapter...

   ॐ तत्सदिति श्रीमद्भगवद्गीतासूपनिषत्सु
   ब्रह्मविद्यायां योगशास्त्रे श्रीकृष्णार्जुनसंवादे
   अर्जुनविषादयोगो नाम प्रथमोऽध्यायः ॥ १॥
   ```
   Colophons are captured as `chapter_01_colophon` with the marker `॥ १॥` preserved.

5. **Chapter transitions**:
   ```
   ...end of previous chapter...

   अथ द्वितीयोऽध्यायः ।   साङ्ख्ययोगः

   ...next verse...
   ```
   Chapter headers are detected and chapter names extracted, but headers don't appear in verse text.

## Output Format

The script generates YAML with `_meta` structure:

```yaml
# Bhagavad Gita - Canonical Devanagari Text
# Format: chapter-XX-shloka-YY

_meta:
  collection: bhagavad-gita
  source: Bhagavad Gita from sanskritdocuments.org
  description: Complete Bhagavad Gita with 701 shlokas across 18 chapters in canonical Devanagari text
  sequence:
  - chapter-01-shloka-01
  - chapter-01-shloka-02
  # ... all 701 verses in flat list

# Verse Data

chapter-01-shloka-01:
  devanagari: धृतराष्ट्र उवाच। धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः। मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ॥ १-१॥

chapter-01-shloka-02:
  devanagari: सञ्जय उवाच। दृष्ट्वा तु पाण्डवानीकं व्यूढं दुर्योधनस्तदा। आचार्यमुपसङ्गम्य राजा वचनमब्रवीत् ॥ १-२॥

# ... verses 3-47 ...

chapter_01_name: 'अर्जुनविषादयोगः'

chapter_01_colophon: 'ॐ तत्सदिति श्रीमद्भगवद्गीतासूपनिषत्सु ब्रह्मविद्यायां योगशास्त्रे श्रीकृष्णार्जुनसंवादे अर्जुनविषादयोगो नाम प्रथमोऽध्यायः ॥ १॥'

# Chapter 2: साङ्ख्ययोगः
# Total shlokas in chapter: 72
```

**Chapter Structure:**

Each chapter section is organized as:

1. **Comment headers**: Human-readable chapter info
   ```yaml
   # Chapter 1: अर्जुनविषादयोगः
   # Total shlokas in chapter: 47
   ```

2. **`chapter_XX_name`**: Sanskrit chapter name (first field)
   - Extracted from chapter headers in source text
   - Placed at the **beginning** of each chapter
   - Can be used programmatically for display, navigation, and search
   - Example: `chapter_01_name: 'अर्जुनविषादयोगः'`

3. **Verse entries**: All shlokas for the chapter
   ```yaml
   chapter-01-shloka-01:
     devanagari: '...'
   ```

4. **`chapter_XX_colophon`**: Complete colophon text (last field)
   - Placed at the **end** of each chapter after all verses
   - Traditional closing statement with chapter marker `॥ X ॥`
   - Example: `chapter_01_colophon: 'ॐ तत्सदिति... ॥ १॥'`

Example colophon translation:
> "Thus, in the Upanishads of the glorious Bhagavad Gita, the science of the Eternal, the scripture of Yoga, the dialogue between Sri Krishna and Arjuna, ends the first chapter entitled 'Arjuna Vishada Yoga'."

## Statistics

The script outputs statistics to stderr:
```
# Statistics (to stderr):
# Total verses parsed: 701
# Verses by chapter:
#   Chapter 1: 47 verses
#   Chapter 2: 72 verses
#   ... etc
#   Chapter 18: 78 verses
```

**Note**: 18 chapter colophons are captured separately and not counted in the verse total.

## Summary of Parser Features

✅ **701 verses** with complete Devanagari text
✅ **Verse markers preserved**: Each verse ends with `॥ chapter-verse ॥`
✅ **18 chapter colophons**: Captured as `chapter_XX_colophon` with markers `॥ X ॥`
✅ **Sanskrit chapter names**: Extracted from source and used in YAML comments
✅ **Speaker declarations included**: `धृतराष्ट्र उवाच।`, `सञ्जय उवाच।`, etc.
✅ **Multi-line verses combined**: Automatically joins lines before markers
✅ **Parenthetical variants removed**: Text after markers like `(variant)` is stripped
✅ **Preamble skipped**: Ignores all text before first chapter header

## Next Steps

1. **Source text ready**: `data/source-texts/bhagavad-gita-sanskrit-devanagari.txt`
2. **Run the parser**: `python scripts/parse_gita.py data/source-texts/bhagavad-gita-sanskrit-devanagari.txt > data/verses/bhagavad-gita.yaml`
3. **Verify output**: Check that all 700 verses were parsed correctly
4. **Review manually**: Spot-check a few verses for accuracy
5. **Backup current file**: `cp data/verses/bhagavad-gita.yaml data/verses/bhagavad-gita.yaml.backup`
6. **Replace with new data**: `mv output.yaml data/verses/bhagavad-gita.yaml`
7. **Test generation**: Run `verse-generate --collection bhagavad-gita --next --all` to generate the next verse

## Current Status

- ✅ Parsing script completed and tested with sample data
- ✅ Script handles multi-line verses, speaker declarations, and variants
- ✅ Output format matches sanatan-sdk expectations
- ⏸️ **Waiting for**: Complete Gita text file (all 18 chapters, 700 verses)

## Troubleshooting

### Verse Count: 701 verses

**Parser Output**: 701 verses (Chapter 18 has 78 verses)

**Why 701 and not 700?**
- Traditional count varies: Some editions have 700 verses, others 701
- This source (sanskritdocuments.org) includes verse 18-78
- Verse 18-78 (यत्र योगेश्वरः कृष्णो...) is Sanjaya's final statement to Dhritarashtra
- Most modern critical editions include all 78 verses in Chapter 18

**What verse 18-78 says:**
> "Where there is Krishna, the master of yoga, and where there is Arjuna, the wielder of the bow, there will surely be fortune, victory, prosperity, and sound morality."

**Chapter Colophons** (separate from verses):
After each chapter's verses, the colophon appears ending with `॥ N ॥` (chapter number only):
```
ॐ तत्सदिति श्रीमद्भगवद्गीतासूपनिषत्सु
ब्रह्मविद्यायां योगशास्त्रे श्रीकृष्णार्जुनसंवादे
मोक्षसंन्यासयोगो नाम अष्टादशोऽध्यायः ॥ १८॥
```

Colophons are captured separately as `chapter_XX_colophon` fields, not counted as verses.

### No Verses Parsed

If the parser returns 0 verses:
1. Check that the source file has chapter headers matching: `अथ...ध्यायः`
2. Verify verse markers are in format: `॥ १-१॥` (Devanagari numerals)
3. Ensure file encoding is UTF-8

### Missing Chapter Names

If chapter comments show "Chapter X: Chapter X" instead of Sanskrit names:
1. Verify chapter headers have format: `अथ प्रथमोऽध्यायः । [name]`
2. Check for the `।` separator between header and name
3. Ensure Unicode characters are correct (avagraha `ऽ` not `अ`)

### Speaker Declarations Not Included

If speaker declarations are missing from verse text:
- This is correct behavior! They are **included** in the verse text
- Example: First verse contains `धृतराष्ट्र उवाच।` followed by the verse

## Note on Source Text

The input text file should contain the canonical Devanagari text from a reliable source such as:
- GitaPress publications
- ISKCON Bhagavad Gita
- Sanskrit Digital Library
- sanskritdocuments.org (currently used: `bhagavad-gita-sanskrit.txt`)
- Other authoritative sources

The script is format-agnostic and will extract verses as long as they have the `॥ X-Y ॥` markers.

**Current Source:**
- File: `data/source-texts/bhagavad-gita-sanskrit-devanagari.txt`
- Origin: https://sanskritdocuments.org/doc_giitaa/bhagvadnew.html
- Format: Devanagari with verse markers
