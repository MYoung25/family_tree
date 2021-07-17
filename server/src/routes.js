const router = require('express').Router();
const Person = require('./models/person');

//create an express route to return person information from person schema
router.route('/person')
    .get(function (req, res) {
        Person.find({})
        .populate('children')
        .populate('parents')
        .populate('spouse')
        .then((docs) => {
            res.status(200).send(docs);
        })
        .catch((err) => {
            console.error(err)
            res.status(500).send(err);
        })
    })
    .post(function (req, res) {
        const p = new Person(req.body)
        p.save(function (err, doc) {
                if (err) {
                    res.send(err);
                }
                res.json(doc);
            })
    })

router.route('/person/exclude/:id')
    .get(function (req, res) {
        Person.find({ _id: { $ne: req.params.id } })
        .populate('parents')
        .populate('children')
        .populate('spouse')
        .then((docs) => {
            res.status(200).send(docs);
        })
        .catch((err) => {
            console.error(err)
            res.status(500).send(err);
        })
    })

//create an express route to return person information from person schema
router.route('/person/:id')
    .get(function (req, res) {
        Person.findById(req.params.id)
        .populate('parents')
        .populate('children')
        .populate('spouse')
        .then(function (err, doc) {
            if (err) {
                res.send(err);
            } else {
                res.json(doc);
            }
        })
    })
    .put(function (req, res) {
        Person.findById(req.params.id, function (err, doc) {
            doc.firstName = req.body.firstName;
            doc.lastName = req.body.lastName;
            doc.parents = req.body.parents;
            doc.children = req.body.children;
            doc.spouse = req.body.spouse;
            doc.save(function (err) {
                if (err) {
                    res.send(err);
                } else {
                    res.json({ message: 'Person information updated!' });
                    // set spouse's spouse to user
                    if (doc.spouse) {
                        Person.findById(doc.spouse, function (err, spouse) {
                            spouse.spouse = doc._id;
                            spouse.save(function (err) {
                                if (err) {
                                    res.send(err);
                                }
                            })
                        })
                    }

                    if (doc.parents.length > 0) {
                        doc.parents.forEach(function (parent) {
                            Person.findById(parent, function (err, parent) {
                                parent.children.push(doc._id);
                                parent.save(function (err) {
                                    if (err) {
                                        res.send(err);
                                    }
                                })
                            })
                        })
                    }

                    if(doc.children.length > 0) {
                        doc.children.forEach(function (child) {
                            Person.findById(child, function (err, child) {
                                child.parents.push(doc._id);
                                if (doc.spouse) {
                                    child.parents.push(doc.spouse);
                                }
                                child.save(function (err) {
                                    if (err) {
                                        res.send(err);
                                    }
                                })
                            })
                        })
                    }
                }
            });
        });
    });

//create an express route to return person information from person schema
router.route('/person/:id')
    .delete(function (req, res) {
        Person.deleteOne({ _id: req.params.id }, function (err, doc) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Person information deleted!' });
        });
    });

module.exports = router;