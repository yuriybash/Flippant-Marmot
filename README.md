
**Deploying this app to Heroku:**

If this is your first time deploying to Heroku, following the ‘Getting Started with Node.js’ tutorial is key: https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction. The only thing the instructions do not specifically cover is how to install MongoLab, a Heroku add-on to use MongoDB in your production environment (MongoLab has an amazing interface for you to interact with your database). However, the instructions to do that are similar to those in the ‘Provision a database’ section in the tutorial (the second to last section), where it runs through how to add a Postgres database. The main difference is:

```
$ heroku addons:create mongolab
```
More info here: 
https://devcenter.heroku.com/articles/mongolab#adding-mongolab 

The rest of the work is done for you since the server ports for both the app and the database port has already been linked as shown below.

```javascript
/* Inside index.js in the root directory */
var port = process.env.PORT || 3000;

app.listen(port);
```
```javascript
/* Inside server.js in the server file */
var db_port = process.env.MONGOLAB_URI || 'mongodb://localhost/socialstocks';

mongoose.connect(db_port);
```

After following the Getting Started tutorial, and installing MongoLab, you’re good to go! Just git add, commit, and push to heroku master!

If you’re curious why the .bowerrc is in the root directory and how it relates to deployment, feel free to read: http://www.rockytang168.com/how-to-bower-install-when-deploying/ 

