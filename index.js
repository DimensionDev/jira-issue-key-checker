const core = require("@actions/core");
const github = require("@actions/github");

const jiraPrefix = core.getInput("jira-prefix");

async function run() {
  try {
    const prTitle = github.context.payload.pull_request.title;
    const prBody = github.context.payload.pull_request.body;
    
    if (prTitle === `docs(i18n): sync i18n files from Crowdin`) return;

    let regex = new RegExp(`${jiraPrefix}-[0-9]+`, 'i');
    if (!regex.test(prTitle) && !regex.test(prBody)) {
      core.setFailed("Jira Issue Key missing in PR title and description.");
      return;
    }
  } catch (error) {
    core.info(error);
  }
}

run();
