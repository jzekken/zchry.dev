import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const walkDir = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkDir(fullPath)));
    } else {
      files.push(fullPath);
    }
  }
  return files;
};

const optimizeImages = async () => {
  console.log('Starting image optimization...');
  const dirs = [
    path.join(process.cwd(), 'public/projects'),
    path.join(process.cwd(), 'public/gallery')
  ];
  
  const allFiles = [];
  for (const dir of dirs) {
    try {
      allFiles.push(...(await walkDir(dir)));
    } catch (e) {
      console.log(`Skipping ${dir}`);
    }
  }

  const images = allFiles.filter(f => f.match(/\.(png|jpg|jpeg)$/i));
  let totalSaved = 0;

  for (const file of images) {
    const stat = await fs.stat(file);
    const sizeMB = stat.size / (1024 * 1024);
    
    const ext = path.extname(file);
    const webpFile = file.replace(new RegExp(`${ext}$`, 'i'), '.webp');
    
    console.log(`Processing: ${file} (${sizeMB.toFixed(2)} MB)`);
    
    try {
      const image = sharp(file);
      const metadata = await image.metadata();
      
      let sharpInstance = image;
      if (metadata.width > 2560) {
        sharpInstance = sharpInstance.resize({ width: 2560, withoutEnlargement: true });
      }
      
      await sharpInstance
        .webp({ quality: 80, effort: 6 })
        .toFile(webpFile);
        
      const newStat = await fs.stat(webpFile);
      const newSizeMB = newStat.size / (1024 * 1024);
      console.log(`  -> Saved as ${webpFile} (${newSizeMB.toFixed(2)} MB)`);
      
      // Delete original to save space
      await fs.unlink(file);
      totalSaved += (stat.size - newStat.size);
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
  
  console.log(`Optimization complete! Total space saved: ${(totalSaved / (1024*1024)).toFixed(2)} MB.`);
};

optimizeImages();
