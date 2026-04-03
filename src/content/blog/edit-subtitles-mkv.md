---
title: "Edit Subtitles in MKV!"
date: 2010-03-01
category: "Tech"
description: "A quick guide to editing subtitle tracks in MKV files without re-encoding — useful when the subtitles are out of sync or in the wrong language."
---

MKV (Matroska) files are great — they can hold multiple video tracks, audio tracks, and subtitle tracks all in one container. But editing those subtitle tracks used to feel like a mystery.

Here's how to do it without re-encoding the video (which would take forever and reduce quality).

## What You Need

- **MKVToolNix** — a free, open-source toolkit for working with MKV files. Available for Windows, Mac, and Linux.
- The MKV file you want to edit
- A subtitle file (.srt or .ass format)

## Extract the Subtitle Track

First, use `mkvextract` to pull the subtitle track out:

```bash
mkvextract tracks yourfile.mkv 3:subtitles.srt
```

(Replace `3` with the actual track number of your subtitle — use `mkvinfo yourfile.mkv` to find it.)

## Edit the Subtitle File

Open the `.srt` file in any text editor. SRT format is just numbered blocks with timestamps and text:

```
1
00:01:23,456 --> 00:01:26,789
This is the subtitle text.
```

Adjust the timestamps or edit the text as needed.

## Put It Back

Use `mkvmerge` to create a new MKV with your edited subtitles:

```bash
mkvmerge -o output.mkv yourfile.mkv --no-subtitles subtitles.srt
```

No re-encoding. Fast. Clean. The open source tools for working with video have always been surprisingly good.
