cluster = require('cluster');
numCPUs = require('os').cpus().length;

module.exports = {
    launch : function(){

        if (cluster.isMaster) {
            // Fork workers.
            console.log('CPU available '+ numCPUs);

            if ( numCPUs > 1 ){

                for (var i = 0; i < numCPUs; i++) {
                    cluster.fork();
                }

                Object.keys(cluster.workers).forEach(function(id) {
                    console.log("I am running with ID : "+cluster.workers[id].process.pid);
                });

                cluster.on('exit', function(worker, code, signal) {
                    console.log('worker ' + worker.process.pid + ' died');
                });


            }


        }else {
            console.log('I am a worker! ');
        }
    }
};