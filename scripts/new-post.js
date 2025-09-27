// scripts/new-post.js
// But astro-pure-lab have provided a 'new' script function, so this is discarded.
import fs from 'fs';
import path from 'path';

// Get title from the cli
const title = process.argv[2];

if (!title) {
	console.error('❌ Please provide a title for the post.');
	process.exit(1);
}

// Generate date and slug
const today = new Date();
const date = today.toISOString().slice(0,10);
const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/+g,  '');
const filename = `${date}-${slug}.md`;

// Define Frontmatter template
const frontmatter = `---
title: "${title}"
publishDate: ${date}
description: ""
tags: []
---

## ${title}

`;

// Generate file
const filepath = path.join('src', 'content', 'blog', filename);
fs.writeFileSync(filepath, frontmatter);

console.log(`✅ Successfully created post: ${filepath}`);