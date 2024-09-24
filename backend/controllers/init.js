const fs = require("fs").promises;
const path = require("path");
const { cwd } = require("node:process");

async function initRepo() {
    const repoPath = path.resolve(process.cwd(), ".dsGit");
    const commitsPath = path.join(repoPath, "commits");

    try {
        await fs.mkdir(repoPath, { recursive: true });
        await fs.mkdir(commitsPath, { recursive: true });

        await fs.writeFile(
            path.join(repoPath, "config.json"),
            JSON.stringify({ bucket: process.env.S3_BUCKET })
        );

        console.log("Repository Initialised");
    } catch (err) {
        console.error("Erro initialising repository", err);
    }
}

module.exports = { initRepo };
