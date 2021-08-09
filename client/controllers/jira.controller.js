const axios = require('axios');
const { sendMessage } = require('../controllers/slack.controller');

exports.getJiraWithEmptyStoryPoint = async (req, res) => {
    const endpoint = 'https://tokopedia.atlassian.net/rest/api/3/search?jql=project = WP AND component in (Communication, Topads) AND Sprint in openSPrints() ORDER BY created DESC&fields=created,assignee,status,summary,fixVersions,customfield_10010,components.name,issuetype,customfield_10014';
    const result = await axios.get(endpoint, {
        headers: {
            'Accept': 'application/json'
        },
        auth: {
            username: process.env.JIRA_USERNAME,
            password: process.env.JIRA_TOKEN
        }
    });

    const data = result.data;
    const issues = data.issues;
    const filteredTickets = issues.filter(item => !item.fields.customfield_10014);
    const totalIssues = filteredTickets.length;

    let message = `There are ${totalIssues} JIRA in current sprint that doesn't have story point! \n\n`;
    filteredTickets.forEach(item => {
        message += `- https://tokopedia.atlassian.net/browse/${item.key} \n`;
    });

    message += `\n\nPlease help to check and fill it!\n Testing from slack bot!`;

    sendMessage(message);

    res.send(filteredTickets);
};