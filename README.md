https://socialcapital.herokuapp.com
# Social Capital 

**The Social Media Stock Market where you can buy shares of your favorite celebrities, politicians, and friends.**

<ol>
<li>Log in with Twitter
<li>Go to the Search tab, input the twitter handle of your choice (for a list of ideas, try http://twittercounter.com/pages/100 for the top 100 Twitter accounts) and hit Enter. Input the number of shares you'd like to purchase and hit Enter again.
<li>Refresh your Dashboard every few seconds to see your stock values change. Remember, buy low, sell high!
</ol>

![Social Capital](http://g.recordit.co/RPri9iYyBq.gif)

## Pricing Algorithm

The stock price increases or decreases according to the growth of their follower count compared to the benchmark, which we deem as .00066, or 6.6% of 1%, or 6.6 basis points - which are 3 different ways to say the same number (For basis point definition see: http://www.investopedia.com/terms/b/basispoint.asp). If they grow at a faster pace than .0007 then their stock price increases; if they grow slower, then their stock price decreases. This benchmark has been chosen by calculating the average follower growth rate from the top 100 twitter accounts.

This algorithm will annualize the stock (the twitter account) daily, if not a full day has passed, we use the milliseconds that have passed divided by the milliseconds per day then we use this to annualize the stock's current growth rate to an assumed daily value. In other words, if the stock grows by 2 users in 10 seconds, we will assume the stock will keep growing 2 users every 10 seconds for the first day. Then compare that against the benchmark.

##Client-Side Testing

Social Capital uses Karma and Jasmine for client-side testing.

To run client-side testing, enter
```
karma start karma.conf.js
```
from the root directory.

The Karma configuration file is
```
karma.conf.js
```
in the root directory and the actual tests are located
in client/spec/clientSpec.js.

To rewrite or modify tests, enter
```
karma init karma.conf.js
```
from the command line.

## Deploying this app to Heroku:

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

## Caveats
<ul>
<li> Users can only buy one instance of a stock
<li> Users have to search the exact Twitter handle to buy a stock
</ul>

## Additional Ideas For Improvement

**More Twitter Information:**
<ul>
<li> Add Hashtag search
<li> Add Retweets in the pricing algorithm
</ul>

**Visual:**
<ul>
<li> More D3 - bar charts, trend maps, density graphs, etc.
<li> Visual / Database: Track historical growth of portfolios, stocks, follower counts.
</ul>

**UI/UX:**
<ul>
<li> Add autocomplete for when users search
<li> Add "Featured Stocks" on search page
<li> Add a recommendations engine to recommend other stocks users may also like. Check out: https://github.com/guymorita/recommendationRaccoon
<li> Allow "Search" to search for keywords, rather than specific handles
<li> Persistent sessions through MongoStore
<li> Enhanced server-side testing with mock Passport initialization and cookie jar.
</ul>

**Other social media integration:**
<ul>
<li> Facebook
<li> Instagram
</ul>

