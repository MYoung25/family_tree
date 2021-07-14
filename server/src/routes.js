const router = require('express').Router();
const Person = require('./models/person');

//create an express route to return person information from person schema
router.route('/person')
    .get(function (req, res) {
        Person.find(req.params.id)
        .populate('mother')
        .populate('father')
        .populate('spouse')
        .then(function (err, docs) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(docs);
            }
        })
    })
    .post(function (req, res) {
        const p = new Person(req.body)
        console.log(p)
        p.save(function (err, doc) {
                if (err) {
                    res.send(err);
                }
                res.json(doc);
            })
    })

//create an express route to return person information from person schema
router.route('/person/:id')
    .get(function (req, res) {
        Person.findById(req.params.id)
        .populate('mother')
        .populate('father')
        .populate('spouse')
        .then(function (err, doc) {
            if (err) {
                res.send(err);
            }
            res.json(doc);
        })
    })
    .put(function (req, res) {
        Person.findById(req.params.id, function (err, doc) {
            doc.name = req.body.name;
            doc.age = req.body.age;
            doc.save(function (err) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'Person information updated!' });
            });
        });
    });

//create an express route to return person information from person schema
router.route('/person/:id')
    .delete(function (req, res) {
        Person.remove({ _id: req.params.id }, function (err, doc) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Person information deleted!' });
        });
    });

module.exports = router;