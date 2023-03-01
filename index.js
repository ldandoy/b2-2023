/*import  {dire_bonjour, dire_aurevoir} from './utils.js';

console.log('Hello World !');

dire_bonjour('à vous');
dire_bonjour();

dire_aurevoir('test')*/

import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import helmet from 'helmet';
import session from 'express-session'


mongoose.connect(`mongodb://root:root@127.0.0.1:27017/`, {
    useNewUrlParser: true
}, (error) => {
    if (error) {
        console.log('Error:' + error);
    } else {
        console.log("DB connect");
    }
});

import motivateRoute from './routes/motivate.js';
import authRoute from './routes/auth.js';

const App = express();
App.use(helmet());
App.use(morgan('dev'));
App.use(express.json());
App.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        httpOnly: true,
        secure: false
    }
}))

App.get('/',(request, response) => {
    return response.send('<h1>It works !</h1>');
});

App.use('/api/motivate', motivateRoute);
App.use('/api', authRoute);

const PORT = 5663;

App.listen(PORT, () => {
    console.log(`server ready on http://localhost:${PORT}`);
});