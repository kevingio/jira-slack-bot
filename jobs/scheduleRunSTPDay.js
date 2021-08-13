const cron = require("node-cron");
const TIMEZONE = "Asia/Jakarta";

function executeSchedule() {
  console.log("schedule running");
}

function runSchedule() {
  cron.schedule("30 12 * * 1,3,4", executeSchedule, {
    scheduled: true,
    timezone: TIMEZONE,
  });
}

module.exports = runSchedule;
