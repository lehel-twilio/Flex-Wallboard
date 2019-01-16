import React from 'react';
import ReactDOM from 'react-dom';
import Packery from 'packery';
import ImageWidget from 'widgets/image_widget';
import ListWidget from 'widgets/list_widget';
import NumberWidget from 'widgets/number_widget';
import TextWidget from 'widgets/text_widget';
import config from 'config.twilio.js';
import 'styles/default.scss';

ReactDOM.render(
  <div id="dashboard">
    <TextWidget name="sales" title="Sales" width="1"/>
    <NumberWidget name={config.taskQueues[0] + ".tasksWaiting"} title="Tasks Waiting" width="1"/>
    <NumberWidget name={config.taskQueues[0] + ".activeTasks"} title="Active Tasks" width="1"/>
    <NumberWidget name={config.taskQueues[0] + ".longestWait"} title="Longest Task Wait" width="1" numberVisibility="invisible"/>
    <NumberWidget name={config.taskQueues[0] + ".activeAgents"} title="Active Workers" width="1"/>
    <NumberWidget name={config.taskQueues[0] + ".totalAnswered"} title="# Tasks Answered" width="1"/>
    <NumberWidget name={config.taskQueues[0] + ".abandonedTasks"} title="Abandoned Tasks" width="1"/>
    <NumberWidget name={config.taskQueues[0] + ".answeredPercent"} title="Answered %" width="1" formatString="0"/>
    <NumberWidget name={config.taskQueues[0] + ".averageSpeedOfAnswer"} title="ASA in seconds" width="1" formatString="0"/>

    <TextWidget name="marketing" title="Marketing" width="1"/>
    <NumberWidget name={config.taskQueues[1] + ".tasksWaiting"} title="Tasks Waiting" width="1"/>
    <NumberWidget name={config.taskQueues[1] + ".activeTasks"} title="Active Tasks" width="1"/>
    <NumberWidget name={config.taskQueues[1] + ".longestWait"} title="Longest Task Wait" width="1" numberVisibility="invisible"/>
    <NumberWidget name={config.taskQueues[1] + ".activeAgents"} title="Active Workers" width="1"/>
    <NumberWidget name={config.taskQueues[1] + ".totalAnswered"} title="# Tasks Answered" width="1"/>
    <NumberWidget name={config.taskQueues[1] + ".abandonedTasks"} title="Abandoned Tasks" width="1"/>
    <NumberWidget name={config.taskQueues[1] + ".answeredPercent"} title="Answered %" width="1" formatString="0"/>
    <NumberWidget name={config.taskQueues[1] + ".averageSpeedOfAnswer"} title="ASA in seconds" width="1" formatString="0"/>

    <TextWidget name="support" title="Support" width="1"/>
    <NumberWidget name={config.taskQueues[2] + ".tasksWaiting"} title="Tasks Waiting" width="1"/>
    <NumberWidget name={config.taskQueues[2] + ".activeTasks"} title="Active Tasks" width="1"/>
    <NumberWidget name={config.taskQueues[2] + ".longestWait"} title="Longest Task Wait" width="1" numberVisibility="invisible"/>
    <NumberWidget name={config.taskQueues[2] + ".activeAgents"} title="Active Workers" width="1"/>
    <NumberWidget name={config.taskQueues[2] + ".totalAnswered"} title="# Tasks Answered" width="1"/>
    <NumberWidget name={config.taskQueues[2] + ".abandonedTasks"} title="Abandoned Tasks" width="1"/>
    <NumberWidget name={config.taskQueues[2] + ".answeredPercent"} title="Answered %" width="1" formatString="0"/>
    <NumberWidget name={config.taskQueues[2] + ".averageSpeedOfAnswer"} title="ASA in seconds" width="1" formatString="0"/>
  </div>,
  document.getElementById('content')
);

new Packery("#dashboard", {itemSelector: ".widget", gutter: 10});
