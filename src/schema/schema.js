const Item = require("../models/Item");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
} = require("graphql");

// ItemType
const ItemType = new GraphQLObjectType({
  name: "Item",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLString },
    image: { type: GraphQLString },
    url: { type: GraphQLString },
    wisher: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    items: {
      type: new GraphQLList(ItemType),
      resolve(parent, args) {
        return Item.find();
      },
    },
    item: {
      type: ItemType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Item.findById(args.id);
      },
    },
  },
});

// Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addItem: {
      type: ItemType,
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        price: { type: GraphQLNonNull(GraphQLString) },
        image: { type: GraphQLString },
        url: { type: GraphQLNonNull(GraphQLString) },
        wisher: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const item = new Item({
          title: args.title,
          description: args.description,
          price: args.price,
          image: args.image,
          url: args.url,
          wisher: args.wisher,
        });

        // Save to database
        return item.save();
        // OR Client.create(client)
      },
    },
    updateItem: {
      type: ItemType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLString },
        image: { type: GraphQLString },
        url: { type: GraphQLString },
        wisher: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Item.findByIdAndUpdate(
          args.id,
          {
            $set: {
              title: args.title,
              description: args.description,
              price: args.price,
              image: args.image,
              url: args.url,
              wisher: args.wisher,
            },
          },
          { new: true }
        );
      },
    },
    deleteItem: {
      type: ItemType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Item.findByIdAndRemove(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
