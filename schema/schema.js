const graphql = require("graphql");
const Word = require("../models/Word");
const Dictonary = require("../dictonary/dictonary");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,

  GraphQLList,
  GraphQLNonNull,
} = graphql;
const Examples = new GraphQLObjectType({
  name: "examples",
  fields: {
    text: { type: GraphQLString },
  },
});
const WordType = new GraphQLObjectType({
  name: "Word",
  fields: () => ({
    id: { type: GraphQLID },
    word_id: { type: GraphQLString },
    lexicalCategory: { type: GraphQLString },
    pronunciations: { type: GraphQLString },
    definitions: { type: GraphQLString },
    examples: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    words: {
      type: new GraphQLList(WordType),
      resolve(parent, args) {
        return Word.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addWord: {
      type: WordType,
      args: {
        word_id: { type: GraphQLString },
        lexicalCategory: { type: GraphQLString },
        pronunciations: { type: GraphQLString },
        definitions: { type: GraphQLString },
      },
      resolve(parent, args) {
        let data = Word.find({ word_id: args.word_id });
        var oxford;
        Dictonary(args.word_id).then((data) => {
          console.log(
            data.results[0].lexicalEntries[0].entries[0].senses[0]
              .definitions[0]
          );
          var definitions =
            data.results[0].lexicalEntries[0].entries[0].senses[0]
              .definitions[0];
          var category = data.results[0].lexicalEntries[0].lexicalCategory.text;
          let word = new Word({
            word_id: args.word_id,
            lexicalCategory: category,
            pronunciations: args.pronunciations,
            definitions: definitions,
            examples: args.examples,
          });
          return word.save();
        });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
