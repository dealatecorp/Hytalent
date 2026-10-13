import fs from 'node:fs/promises';
import sharp from 'sharp';
const source = process.argv[2];
if (!source) throw new Error('Supply the generated workshop image path.');
await fs.mkdir('public/media', { recursive: true });
await sharp(source).webp({ quality: 92, alphaQuality: 100 }).toFile('public/media/hytalent-learning-workshop-v1.webp');
console.log('Saved alpha-preserving workshop hero asset.');
