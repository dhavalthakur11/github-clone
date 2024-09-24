const mongoose = require("mongoose");
const Repository = require("../models/repoModel");
const User = require("../models/userModel");
const Issue = require("../models/issueModel");

async function createRepository(req, res) {
  const { owner, name, issues, content, description, visibility } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ error: "Repository Name Is Required" });
    }

    if (!mongoose.Types.ObjectId.isValid(owner)) {
      return res.status(400).json({ error: "Invalid User ID" });
    }

    const newRepository = new Repository({
      name,
      description,
      visibility,
      owner,
      content,
      issues,
    });

    const result = await newRepository.save();
    res
      .status(201)
      .json({ message: "Repository Created", repositoryId: result._id });
  } catch (err) {
    console.error("Error during Repository creation : ", err);
    res.status(500).send("Server Error");
  }
}

async function getAllRepositories(req, res) {
  try {
    const repositories = await Repository.find({})
      .populate("owner")
      .populate("issues");

    res.json(repositories);
  } catch (err) {
    console.error("Error during Fetching Repositories : ", err);
    res.status(500).send("Server Error");
  }
}

async function fetchRepositoryById(req, res) {
  const { id } = req.params;

  try {
    const repositoriy = await Repository.find({ _id: id })
      .populate("owner")
      .populate("issues");

    res.json(repositoriy);
  } catch (err) {
    console.error("Error during Fetching Repository : ", err);
    res.status(500).send("Server Error");
  }
}

async function fetchRepositoryByName(req, res) {
  const { name } = req.params;

  try {
    const repositoriy = await Repository.find({ name })
      .populate("owner")
      .populate("issues");

    res.json(repositoriy);
  } catch (err) {
    console.error("Error during Fetching Repository : ", err);
    res.status(500).send("Server Error");
  }
}

async function fetchRepositoriesForCurrentUser(req, res) {
  const {userID} = req.params;

  try {
    const repositories = await Repository.find({ owner: userID });

    if (!repositories || repositories.length == 0) {
      return res.status(404).json({ message: "Repositories not Found" });
    }

    res.json({ message: "Repositoreis Found", repositories });
  } catch (err) {
    console.error("Error during Fetching User Repositories : ", err);
    res.status(500).send("Server Error");
  }
}

async function updateRepositoryById(req, res) {
  const { id } = req.params;
  const { description, content } = req.body;

  try {
    const repositoriy = await Repository.find({ _id: id });

    if (!repositoriy) {
      return res.status(500).json({ message: "Repository Not Found" });
    }

    repositoriy.content.push(content);
    repositoriy.description = description;

    const updateRepository = await repositoriy.save();

    res.json({
      message: "Repository Updated Successfully",
      repositoriy: updateRepository,
    });
  } catch (err) {
    console.error("Error during updating Repository : ", err);
    res.status(500).send("Server Error");
  }
}

async function toggleVisibilityById(req, res) {
  const { id } = req.params;

  try {
    const repositoriy = await Repository.find({ _id: id });

    if (!repositoriy) {
      return res.status(500).json({ message: "Repository Not Found" });
    }

    repositoriy.visibility = !repositoriy.visibility;

    const updatedRepository = await repositoriy.save();

    res.json({
      message: "Repository visability toggled successfully",
      repositoriy: updatedRepository,
    });
  } catch (err) {
    console.error("Error during updating Repository : ", err);
    res.status(500).send("Server Error");
  }
}

async function deleteRepositoryById(req, res) {
  const { id } = req.params;

  try {
    const repositoriy = await Repository.findByIdAndDelete(id);
    if (!repositoriy) {
      return res.status(500).json({ message: "Repository Not Found" });
    }

    res.json({ message: "Repository Deleted Successfully" });
  } catch (err) {
    console.error("Error during updating Repository : ", err);
    res.status(500).send("Server Error");
  }
}

module.exports = {
  createRepository,
  getAllRepositories,
  fetchRepositoryById,
  fetchRepositoryByName,
  fetchRepositoriesForCurrentUser,
  updateRepositoryById,
  toggleVisibilityById,
  deleteRepositoryById,
};
