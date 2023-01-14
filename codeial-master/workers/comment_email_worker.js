const queue = require('../config/kue');

const commmentMailers = require('../mailers/comment_mailer');

queue.process('emails', function(job, done){

    console.log('email worker is running', job.data);

    commmentMailers.newComment(job.data);

    done();
});