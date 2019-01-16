import config from 'config.twilio.js';
const accountSid = config.twilio.accountSid;
const authToken = config.twilio.authToken;
const client = require('twilio')(accountSid, authToken);

export const interval = 5000;
export const promise = (fulfill, reject) => {
  console.log('Running TaskRouter job');

  const taskQueues = config.taskQueues;
  const workspace = config.twilio.workspace;

  if (typeof taskQueues === undefined) {
    console.log('No Task Queues defined');
    reject();
  }

  taskQueues.forEach(function(taskQueue) {

    let response = {};
    const lastMidnight = new Date();
    lastMidnight.setHours(0,0,0,0); //last midnight
    const tomorrowMidnight = new Date();
    tomorrowMidnight.setDate(lastMidnight.getDate() + 1);
    const tomorrowMidnightHours = tomorrowMidnight.getHours();
    const startDate = `${lastMidnight.toISOString()}-${tomorrowMidnightHours}:00`;

    client.taskrouter.workspaces(workspace)
      .taskQueues(taskQueue)
      .statistics({StartDate: startDate})
      .fetch()
      .then(task_queue_statistics => {

        const tasksWaiting = `${task_queue_statistics.taskQueueSid}.tasksWaiting`;
        const activeTasks = `${task_queue_statistics.taskQueueSid}.activeTasks`;
        const longestWait = `${task_queue_statistics.taskQueueSid}.longestWait`;
        const activeAgents = `${task_queue_statistics.taskQueueSid}.activeAgents`;
        const totalAnswered = `${task_queue_statistics.taskQueueSid}.totalAnswered`;
        const abandonedTasks = `${task_queue_statistics.taskQueueSid}.abandonedTasks`;
        const answeredPercent = `${task_queue_statistics.taskQueueSid}.answeredPercent`;
        const averageSpeedOfAnswer = `${task_queue_statistics.taskQueueSid}.averageSpeedOfAnswer`;

        response[tasksWaiting] = {number: task_queue_statistics.realtime.tasks_by_status.pending};
        response[activeTasks] = {number: task_queue_statistics.realtime.total_tasks};
        response[longestWait] = {text: formatWaitTime(task_queue_statistics.realtime.longest_task_waiting_age)};
        response[activeAgents] = {number: task_queue_statistics.realtime.total_eligible_workers};
        response[totalAnswered] = {number: task_queue_statistics.cumulative.reservations_accepted};
        response[abandonedTasks] = {number: task_queue_statistics.cumulative.tasks_canceled};
        response[answeredPercent] = {number: (task_queue_statistics.cumulative.reservations_accepted / task_queue_statistics.cumulative.tasks_entered) * 100};
        response[averageSpeedOfAnswer] = {number: task_queue_statistics.cumulative.avg_task_acceptance_time};

        console.log(response);
        fulfill(response);
      })
  })
};

function formatWaitTime(waitTime) {
  const minutes = Math.floor(waitTime / 60),
        seconds = Math.floor(waitTime - (minutes * 60));
  return minutes + ":" + (seconds < 10 ? '0' + seconds : seconds);
}
