jira-slack-bot
## Slack Webhook is available in here
Copy the value and fill `SLACK_CHAT_WEBHOOKS` field
https://api.slack.com/apps/A01MATE9X5F/incoming-webhooks?

## Create your JIRA API Token here
Copy the value and fill `JIRA_USERNAME` and `JIRA_TOKEN` field
https://id.atlassian.com/manage-profile/security/api-tokens

## How to Run this repo with Docker
1. Install Docker
you can follow the instruction [here](https://docs.docker.com/engine/install/)
2. Run `docker compose up`
to stop, use `Ctrl + C` or `docker compose stop`.
to check the process, use `docker ps`.