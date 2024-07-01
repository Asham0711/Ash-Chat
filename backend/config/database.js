const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
URL = process.env.MONGODB_URL;

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(URL, {
            useNewUrlParser : true,
            useUnifiedTopology: true,
        });

        console.log(`DB connected succesfully ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error : ${error.message}`);
        process.exit();
    }
};

module.exports = connectDB;