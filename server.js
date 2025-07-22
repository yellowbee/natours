const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const app = require('./app')
const getParameter = require('./service/ssm');

const DB_URL_NAME = "/natours/dev/db/mongo/natours/url";
const DB_PASSWORD_NAME = "/natours/dev/db/mongo/natours/password";
/*let cache = {};
async function getCachedParameter(name) {
  if (!cache[name]) {
    cache[name] = await getParameter(name);
  }
  return cache[name];
}*/
let cache = {};
(async () => {
  if (!cache[DB_URL_NAME]) {
    try {
      cache[DB_URL_NAME] = await getParameter(DB_URL_NAME);
    } catch(error) {
          console.log(`error: + ${error}`);
    }
  }
  if (!cache[DB_PASSWORD_NAME]) {
    try {
      cache[DB_PASSWORD_NAME] = await getParameter(DB_PASSWORD_NAME);
    } catch(error) {
      console.log(`error: + ${error}`);
    }
  }

//const DB  = process.env.DATABASE.replace(
//  '<db_password>',
//  process.env.DATABASE_PASSWORD
//)
const DB  = cache[DB_URL_NAME].replace(
    '<db_password>',
    cache[DB_PASSWORD_NAME]
)

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then((con) => {
  console.log('Database connected');
});
})();

//console.log(process.env);
// START SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});