const fs = require("fs");

function getConnectionString() {
    let userName;
    let password;

    if (process.env.NODE_ENV === "production") {
        userName = process.env.MONGO_DB_USER;
        password = process.env.MONGO_DB_PASSWORD;
    } else {
        const rawdata = fs.readFileSync("mongo-credentials.json");
        const credentials = JSON.parse(rawdata);
        userName = credentials.userName;
        password = credentials.password;
    }

    const connectionString = `mongodb+srv://${userName}:${password}@wedding.dxud6.mongodb.net/?retryWrites=true&w=majority`;
    return connectionString;
}

module.exports = { getConnectionString };