const mongoose = require('mongoose');

const connMongoDB = async () => {
        try {
            await mongoose.connect('mongodb://root:root@172.23.0.2:27017/got?authSource=admin',
                {
                    useCreateIndex: true,
                    useNewUrlParser: true,
                    useFindAndModify: false,
                    useUnifiedTopology: true
                }
            );
            
            console.log("MongoDB connected: ");

        } catch (error) {
            console.log('MongoDB error when connecting: '+ error);
        }
}

module.exports = connMongoDB;

