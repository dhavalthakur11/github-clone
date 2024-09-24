const mongoose = require("mongoose");
const User = require("../models/userModel");
const Repository = require("../models/repoModel");
const Issue = require("../models/issueModel");

async function createIssue(req, res) {
  
  const {title,description} = req.body;
  const {id} = req.params;
  try {

    const issue = new Issue({
      title,
      description,
      repository:id
    });

    await issue.save();

    res.status(201).json(issue);
    
  } catch (err) {
    console.error("Error during issue creation : ",err);
    res.status(500).json({message:"Server Error"});
  }
};

async function updateIssueById(req, res) {
  const {id} = req.params;
  const {title,description,status} = req.body;

  try {

    const issue = await Issue.findById(id);

    if(!issue){
      return res.status(404).json({error:"Issue not Found"});
    }

    issue.title = title;
    issue.description = description;
    issue.status = status;

    await issue.save();

    res.json({message:"Issue Upadated Successfully",issue});
    
  } catch (err) {
    console.error("Error during issue Updation : ",err);
    res.status(500).json({message:"Server Error"});
  }
};

async function deleteIssueById(req, res) {
  const {id} = req.params;

  try {

    const issue = await Issue.findByIdAndDelete(id);

    if(!issue){
      return res.status(500).json({error:"Issue Not Found"});
    }

    res.json({message:"Issue Deleted Successfully"});
    
  } catch (err) {
    console.error("Error during issue Deletion : ",err);
    res.status(500).json({message:"Server Error"});
  }
};

async function getAllIssues(req, res) {
  try {
    
    const issues = await Issue.find({repository:id});

    if(!issues){
      return res.status(404).json({error:"Issues Not Founded"});
    }

    res.status(200).json(issues);

  } catch (err) {
    console.error("Error during issue Fetching : ",err);
    res.status(500).json({message:"Server Error"});
  }
};

async function getIssueById(req, res) {
  const {id} = req.params;

  try {
    
    const issue = await Issue.findById(id);

    if(!issue){
      return res.status(404).json({error:"Issue Not Found"});
    }

    res.json(issue);
    
  } catch (err) {
    console.error("Error during issue Fetching : ",err);
    res.status(500).json({message:"Server Error"});
  }
};

module.exports = {
  createIssue,
  updateIssueById,
  deleteIssueById,
  getAllIssues,
  getIssueById,
};
