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

## Express JS with SQLite3
The sqlite folder holds a database example using Express and SQLite3. While this generally follows the example at https://developerhowto.com/2018/12/29/build-a-rest-api-with-node-js-and-express-js/ it leaves out md5, which hashes passwords, in favour of using star war quotes so that it is similar to the mongoDb example.

The example above left out some installation requirements for body-parser, which could be fixed with comparison to the mongoDB example. In particular, you need to install body-parser, and set it to use urlencode. Without them, the JSON convertion doesn't work.

The UPDATE method, at least using curl as a tool to pass in values, proved challenging in order confirm it works correctly. While the option of sending data with curl as a data { } object, looked correct, it was actually, the use of strings that worked correctly as shown at https://www.taniarascia.com/making-api-requests-postman-curl/ You can test the update method with PATCH using this command:

        curl -d "name='darth'&quote='your lack of faith is disturbing'" -X PATCH http://localhost:8080/api/quote/4

Note in particular the outer wrapping of double quotes and single quotes inside.

The DELETE method via curl is easy to do:

        curl -X DELETE http://localhost:8080/api/quote/5
        

### Put a Web Front End On the SQLite Version
The guide for this version didn't inclue any web pages. We can eventually add some forms and such based on the ones used for the mongodb version. 