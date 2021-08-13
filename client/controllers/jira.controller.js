const axios = require('axios');
const { sendMessage } = require('../controllers/slack.controller');

const httpClient = axios.create({
    baseURL: 'https://tokopedia.atlassian.net/rest/api/3/',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    auth: {
        username: process.env.JIRA_USERNAME,
        password: process.env.JIRA_TOKEN
    }
});

exports.getJiraWithEmptyStoryPoint = async (req, res) => {
    const endpoint = 'search?jql=project = WP AND component in (Communication, Topads) AND Sprint in openSPrints() ORDER BY created DESC&fields=created,assignee,status,summary,fixVersions,customfield_10010,components.name,issuetype,customfield_10014';
    const result = await httpClient.get(endpoint, {
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

    let message = `There are ${totalIssues} JIRA tickets in current sprint that don't have story point! \n\n`;
    filteredTickets.forEach(item => {
        message += `- https://tokopedia.atlassian.net/browse/${item.key} \n`;
    });

    message += `\n\nPlease help to check and fill it!\n Testing from slack bot!`;

    sendMessage(message);

    res.send(filteredTickets);
};