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
  spouse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "person",
  },
  parents: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "person",
    default: [],
  },
  children: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "person",
    default: [],
  },
});

// create a person model using the schema
const Person = mongoose.model("person", personSchema);

module.exports = Person;
