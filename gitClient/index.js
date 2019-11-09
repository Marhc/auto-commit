// Use dotenv, if found
require("../envLoader")();

const path = require("path");

// Simple Git with Promise for handling success and failure
const simpleGit = require("simple-git")(path.resolve(__dirname, "../"));

// Repo name and provider
const repoName = process.env.REPO_NAME;
const repoHost = process.env.REPO_HOST;
const repoBranch = process.env.REPO_BRANCH;

// User name of your Remote Repo
const repoUser = process.env.REPO_USER;

// User name and email of your Local Repo
const userName = process.env.USER_NAME;
const userEmail = process.env.USER_EMAIL;
const userToken = process.env.USER_TOKEN;

// Set up GitHub url like this so no manual entry of user pass needed
const repoUrl = `https://${repoUser}:${userToken}@${repoHost}/${repoUser}/${repoName}.git`;

// add local git config like repoUser and email
simpleGit.addConfig("user.email", userEmail);
simpleGit.addConfig("user.name", userName);

// Add remore repo url as origin to repo
simpleGit.removeRemote("origin");
simpleGit.addRemote("origin", repoUrl);

// Add all files for commit
simpleGit.add(path.resolve(__dirname, "../", "dataset", "*.csv"), err => {
  if (err) {
    console.log("adding files failed:", err);
  } else {
    console.log("No erros when add files to stage.");
  }
});

// Commit files as Initial Commit
simpleGit.commit("Scheduled build at " + Date(), err => {
  if (err) {
    console.log("failed commmit.");
  } else {
    console.log("No erros when commit changes.");
  }
});

simpleGit.silent(true).checkoutLocalBranch(repoBranch, err => {
  if (err) {
    console.log("failed to create " + repoBranch + " branch.");
  } else {
    console.log("Created " + repoBranch + " branch.");
  }
});

// Finally push to online repository
simpleGit.push("origin", repoBranch, { "--set-upstream": null }, err => {
  if (err) {
    console.log("repo push failed:", err);
  } else {
    console.log("No erros when push changes");
  }
});
