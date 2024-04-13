const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./controllers');
const path = require('path');
const session = require('express-session');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: 'Super secret secret',
    cookie: {
        maxAge: 3600000 // Set cookie expiration time to 1 hour (in milliseconds)
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});