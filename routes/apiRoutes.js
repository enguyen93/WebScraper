module.exports = function (app, db, axios, cheerio) {

    app.get("/api/articles", (req, res) => {
        db.Review.find({})
            .then(dbReview => { res.json(dbReview) })
            .catch(err => { res.json(err) });
    });

    app.get("/api/notes", (req, res) => {
        db.Review.find({})
            .then(dbReview => { res.json(dbReview) })
            .catch(err => { res.json(err) });
    });

    app.delete("/api/articles", (req, res) => {
        db.Review.deleteMany({ "isSaved": false }).exec(function (err, doc) {
            if (err) {
                res.json("There was a problem deleting the information from the database.");
            }
            else {
                res.json("Successfully deleted");
            }
        })
    })

    app.post("/api/articles/:id", (req, res) => {
        db.Review.updateOne({
            "_id": req.params.id
        }, {
                $set:
                    { "isSaved": true }
            }).then(dbReview => { res.json(dbReview) })
    })

    app.delete("/api/articles/:id", (req, res) => {
        db.Review.deleteOne({ "_id": req.params.id })
            .then(dbReview => { res.json(dbReview) })
            .catch(err => { res.json(err) });
    });

    app.post("/api/notes/:id", (req, res) => {
        var Note = new db.Note({
            body: req.body.text,
            review: req.body.article
        });
        Note.save((err, note) => {
            if (err) console.log(err)
            else {
                db.Review.findOneAndUpdate({ "_id": req.params.id }, { $push: { "notes": note } })
                    .then(dbNote => { res.send(dbNote) })
                    .catch(err => { res.send(err) });
            }
        });
    });

    app.delete("/api/notes/:noteid/:reviewid", (req, res) => {
        db.Note.deleteOne({ "_id": req.params.noteid }, err => {
            console.log(req.params.noteid);
            console.log(req.params.reviewid);
            if (err) console.log(err)
            else {
                db.Review.findOneAndUpdate({
                    "_id": req.params.reviewid
                }, {
                        $pull: {
                            "notes": req.params.noteid
                        }
                    })
                    .then(dbNote => { res.send(dbNote) })
                    .catch(err => { res.send(err) });
            }
        });
    });
};