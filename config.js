const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const url = 'mongodb://surkhi1:surkhi1@ds147233.mlab.com:47233/surkhi';
mongoose.connect(url, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);
