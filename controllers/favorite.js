const model = require("../models");
const favorite = model.favorite;
const events = model.events;
const user = model.events;

exports.index = (req, res) => {
  favorite
    .findAll({
      include: [
        {
          model: events,
          as: "Event"
        },
        {
          model: user,
          as: "User"
        }
      ]
    })
    .then(index => res.send(index))
    .catch(err => res.send(err));
};

exports.showByUser = (req, res) => {
  favorite
    .findAll({
      include: [
        {
          model: events,
          as: "Event"
        },
        {
          model: user,
          as: "User"
        }
      ],
      where: { user: req.params.id }
    })
    .then(show => res.send(show))
    .catch(err => res.send(err));
};

exports.like = (req, res) => {
  favorite
    .create({
      user: req.body.user,
      event: req.body.event
    })
    .then(store => res.json(store))
    .catch(err => res.send(err));
};

exports.disLike = (req, res) => {
  favorite
    .destroy({
      where: { id: req.params.id }
    })
    .then(res.send("deletet"))
    .catch(err => res.send(err));
};
