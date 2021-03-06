const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// allow cross-origin requests
app.use(cors());

// connect to mlab database
mongoose.connect(
  "mongodb+srv://Test:test123@cluster0.ppd9e.mongodb.net/test?retryWrites=true&w=majority"
);
mongoose.connection.once("open", () => {
  console.log("conneted to database");
});

// bind express with graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
app.get('/',(req,res)=>{
	res.send('Running')
})

app.listen(process.env.PORT||4000, () => {
  console.log("now listening for requests on port 4000");
});
