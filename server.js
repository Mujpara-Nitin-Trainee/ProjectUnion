const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const dotenv = require('dotenv');
const logger = require('./middlewares/logger');

dotenv.config();

const port = process.env.PORT;

app.set('view engine','ejs');
app.set('views',[__dirname+'/views/',__dirname+'/views/pagging',__dirname+'/views/jobApplication',__dirname+'/views/jobApplicationNormal']);

app.use(express.static(__dirname+'/public'));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(cookieparser());

const routes = require('./routers/router');

app.use("/api",routes);

app.listen(port, () => logger.info(port + " is listening"));