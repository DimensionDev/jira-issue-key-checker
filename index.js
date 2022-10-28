const core = require("@actions/core");
const github = require("@actions/github");

const jiraPrefix = core.getInput("jira-prefix");

async function run() {
  const prTitle = github.context.payload.pull_request.title;
  const prBody = github.context.payload.pull_request.body;

  let regex = new RegExp(`${jiraPrefix}-[0-9]+`, 'i');
  if (!regex.test(prTitle) && !regex.test(prBody)) {
    core.warning("Jira Issue Key missing in PR title and description.");
    return;
  }
}

run().catch(error => core.error(error));
