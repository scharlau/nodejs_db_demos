# NodeJS Demos with Databases
Some examples of using NodeJs with databases

## Express JS with MongoDb
This is based on someone elses example, with some minor changes where things didn't seem to work as expected. For example, I didn't bother with CSS, and the instructions on the web page were not always clear, but the GitHub repo clarified things.
https://github.com/zellwk/crud-demo which points to example instructions at https://zellwk.com/blog/crud-express-mongodb 

I also found it useful to look at the MongoDB driver documentation for NodeJS at https://docs.mongodb.com/drivers/node/current/quick-start/ 

To run this use this command to ensure node is available:

        nvm install node --reinstall-packages-from=node

Then install dependencies with:

        npm install

which should put all libraries in place for you.

### Adding Some Security with Dotenv
As we now have usernames and passwords for database connections, which should NEVER be put into Git repositories, we'll add the use of the Dotenv library following the example at https://zellwk.com/blog/environment-variables/

I'm on a Mac OSX and found that I couldn't use the relative path of ./<folder> example, but needed to include the full path to my file. 

You'll need to add a 'secrets' folder with the file 'variables.env' which holds the connection string for your mongoDB server. It should look like this:
hello="hello"
DB_URL="connectionformongodb"

