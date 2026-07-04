

import fs from "fs/promises"
import path from "path";


export const deleteOldFiles = async (dirPath : string) => {
  try {
    const thirtyDaysInMs = 15 * 24 * 60 * 60 * 1000;
    const cutoffTime = Date.now() - thirtyDaysInMs;

    const files = await fs.readdir(dirPath);
    let deletedCount = 0;
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stats = await fs.stat(filePath);

      if (!stats.isFile()) continue;

      if (stats.mtimeMs < cutoffTime) {
        await fs.unlink(filePath);
        deletedCount++;
      }
    }
    console.log("Cleanup process completed successfully. Deleted files: " + deletedCount);
  } catch (error) {
    console.error("Error during file cleanup:", error);
  }
}