const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data into JS Obj
app.use(express.json());

//nstructs the server to make certain files readily available 
app.use(express.static('public'));

//telling the server, the app will use the routers we set up
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`App server now on ${PORT}!`);
})