// importing mongoose
const mongoose = require('mongoose');

// catching errors
main().catch(err => console.log(err));

// firing up the database
async function main() {
    await mongoose.connect(process.env.MONGODB);
    console.log('DataBase setup');
}