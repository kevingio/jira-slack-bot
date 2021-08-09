const express = require('express');
const router = express.Router();
const JiraController = require('../controllers/jira.controller');

router.get('/', JiraController.getJiraWithEmptyStoryPoint);

module.exports = router;