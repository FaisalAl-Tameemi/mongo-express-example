'use strict';

module.exports = (db) => {
  // save mongoDB collection ref into a var
  const logs = db.collection('logs');

  // start by creating a few sample logs entires
  const log_messages = [
      {
        message: 'Message 1',
        score: 10
      },
      {
        message: 'Message 2',
        score: 20
      },
      {
        message: 'Message 3',
        score: 15
      }
  ];

  // insert them into the DB
  logs.insertMany(log_messages, (err) => {
    if(err){ return console.log('Failed to insert logs'); }
    // Now fetch the logs that were just inserted
    logs.find({
      score: { $gt: 10 }
    }).toArray((err, results) => {
      if(err){ return console.log('Failed to find logs'); }
      // print the results
      console.log('Logs Found', results);
    });
  });

}
