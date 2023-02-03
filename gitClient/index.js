const debug = require('debug');
const simpleGit = require("simple-git")

debug.enable('simple-git,simple-git:*');

// Use dotenv, if found
require("../envLoader")();

const path = require("path");

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

// Set up GitHub url so no manual entry for password is needed
const repoUrl = `https://${repoUser}:${userToken}@${repoHost}/${repoUser}/${repoName}.git`;

// Simple Git as Promise for handling success and failure
simpleGit(path.resolve(__dirname, "../"))

  // add user config
  .addConfig("user.email", userEmail)
  .addConfig("user.name", userName)

  // Add/remove url as origin
  .removeRemote("origin")
  .addRemote("origin", repoUrl)

  // Add all files for commit
  .add(path.resolve(__dirname, "../", "dataset", "*.csv"), err => {
    if (err) {
      console.log("adding files failed:", err);
    } else {
      console.log("No errors adding files to stage.");
    }
  })

  // Commit files
  .commit("Scheduled build at " + Date(), err => {
    if (err) {
      console.log("failed commmit:", err);
    } else {
      console.log("No errors committing changes.");
    }
  })

  .silent(true).checkoutLocalBranch(repoBranch, err => {
    if (err) {
      console.log("failed to create " + repoBranch + " branch.");
    } else {
      console.log("A " + repoBranch + " branch has been created.");
    }
  })

  // Finally push to remote repo
  .push("origin", repoBranch, { "--set-upstream": null }, err => {
    if (err) {
      console.log("repo push failed:", err);
    } else {
      console.log("No errors pushing changes");
    }
  });
