const mongoose = require("mongoose");

// create a schema with person properties
const personSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  // mother: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "person",
  // },
  // father: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "person",
  // },
  // spouse: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "person",
  // },
});

// create a person model using the schema
const Person = mongoose.model("person", personSchema);

module.exports = Person;
