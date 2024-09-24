const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const readdir = promisify(fs.readdir);
const copyFile = promisify(fs.copyFile);

async function revertRepo(commitID) {
  const repoPath = path.resolve(process.cwd(), ".dsGit");
  const commitsPath = path.join(repoPath, "commits");

  try {
    const commitDir = path.join(commitsPath, commitID);
    const files = await readdir(commitDir);

    const parentDir = path.join(repoPath, "..");

    for (const file of files) {
      await copyFile(path.join(commitDir, file), (parentDir, file));
    }

    console.log(`Commit ${commitID} revert succesfully!`);
  } catch (err) {
    console.error("Unable to revert : ", err);
  }
}

module.exports = { revertRepo };
