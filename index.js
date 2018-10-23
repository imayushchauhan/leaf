/**
 * Created by Ayush on 19-10-2018.
 */

const App = require("./app");

let app = new App();
app.startServer();
app.connectDatabases();
app.attachRoutes();
app.attachBrokers();