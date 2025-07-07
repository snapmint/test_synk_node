const { CronJob } = require('cron');
function startCron() {
    const job = CronJob.from({
        cronTime: '* * * * * *',
        onTick: function () {
            console.log('You will see this message every second');
        },
        timeZone: 'America/Los_Angeles'
    });

    console.log('Job ', job);
    console.log('is callback running', job.isCallbackRunning);
    if (!job.isActive) {
        job.start();
        console.log("is job active", job.isActive); // true
        console.log("is callback running", job.isCallbackRunning); // false
    }

}

setInterval(()=> {
    startCron();
}, 1000)

