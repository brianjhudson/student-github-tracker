# Student Tracker

This simple server allows you to track student github accounts without manually looking at their repos. Every time a student creates a repo or pushes a commit (or any event really), the tracker will catch the event, update the log in the database, clone or pull the repo, and send you a slack notification. 

## .env
Create a `.env` file, following the format of the `.env-sample` file. You will need a session secret and several other environment variables to get this server working. 

### Github Access Token
I'm using github tokens to authenticate requests to github so that we don't hit the rate limit. You can generate one on [github](https://github.com/settings/tokens). Copy the token and place it in your `.env` file.

### Slack Channel Url
If you want slack notifications, go to [Slack's Incoming Webhooks Page](https://api.slack.com/incoming-webhooks) to configure your webhook. You just need a channel url for your private channel. Put this url in your `.env` if you would like to be notified of your mentees' github events through slack. You will also need to set `SLACK_NOTIFICATIONS=true`.

## Database
First install knex globally through the following command: 

```npm install -g knex```

Then create a PostgreSQL database to hold mentors, students, and student projects. I called mine `student_tracker`, but you can choose any name as long as you put the right connection string in the .env file. 

Update the pg connection string.

Run the following command to generate the tables:

```knex migrate:latest```

This command will generate the student, mentor, and student_project tables. 

Now generate the data for the mentor and student tables. You can use the seed files in the `seeds` directory to generate the mentor and student data, or you can input the data manually if you prefer. You do not need to generate the student_project data. The app will do this for you. If you use the seed files to input your data, run the following the command after you save the seed files:

```knex seed:run```

Now your database is up and running. Next create the directories to hold the cloned git repos. 

## Creating directories
Update the `.env` file with the base path where you would like to hold the directories. I have mine in a devmountain directory, under a subdirectory with the cohorts name. 

I have a mentees only option in my .env because I want to be able to check on all students in the cohort. You probably don't want this, though, so add `MENTEES_ONLY=true` to your `.env`.

Then run the following command:

```node tasks/make-directories.js```

This task will create the directories for you mentees.

## Spinning up the server
The server at `index.js` is set up to run immediately, so you might receive a lot of notifications on the first run. After the first run, it will only check for new events. You can shut the server down after you check, or you can leave it running. 

## Cron job
If you leave it running, the server should check github every ten minutes for updates and send you slack notifications if it finds any. I didn't want to check too frequently, but feel free to adjust this value on the cron job in `index.js`. 

## PCs? 
Okay, I only use this on my Mac, and I am certain that the `&&` command is going to break on my PC, but I haven't had time to look into that. I'm also not sure about the file paths. I need to get to this. In the meantime, PC users, you might just shut down the `exec()` command and just rely on the slack notifications.