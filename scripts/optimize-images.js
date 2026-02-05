
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '..', 'public');

const images = [
    'jack.jpg',
    'sebastian.jpg',
    'seth.jpg'
];

async function optimizeImages() {
    console.log('Starting image optimization...');

    for (const image of images) {
        const inputPath = path.join(publicDir, image);
        const tempPath = path.join(publicDir, `temp_${image}`);

        try {
            if (!fs.existsSync(inputPath)) {
                console.error(`File not found: ${inputPath}`);
                continue;
            }

            console.log(`Processing ${image}...`);

            // Resize to max 800px width/height, quality 80%
            await sharp(inputPath)
                .resize(800, 1000, {
                    fit: 'cover',
                    position: 'top' // Focus on top of image (faces)
                })
                .jpeg({ quality: 80, mozjpeg: true })
                .toFile(tempPath);

            // Replace original
            fs.unlinkSync(inputPath);
            fs.renameSync(tempPath, inputPath);

            console.log(`Successfully optimized ${image}`);
        } catch (error) {
            console.error(`Error processing ${image}:`, error);
            // Cleanup temp file if exists
            if (fs.existsSync(tempPath)) {
                fs.unlinkSync(tempPath);
            }
        }
    }
    console.log('Done!');
}

optimizeImages();
