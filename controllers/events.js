const model = require("../models");
const events = model.events;
const user = model.user;
const category = model.category;

exports.index = (req, res) => {
  events
    .findAll({
      include: [
        {
          model: user,
          as: "User"
        },
        {
          model: category,
          as: "Category"
        }
      ]
    })
    .then(index => res.send(index))
    .catch(err => res.send(err));
};

exports.show = (req, res) => {
  events
    .findAll({
      where: { id: req.params.id },
      include: [
        {
          model: user,
          as: "User"
        },
        {
          model: category,
          as: "Category"
        }
      ]
    })
    .then(events => res.send(events))
    .catch(err => res.send(err));
};

exports.search = (req, res) => {
  events
    .findAll({
      where: { name: req.body.name }
    })
    .then(search => res.send(search))
    .catch(err => res.send(err));
};

exports.byCategory = (req, res) => {
  events
    .findAll({
      where: { category: req.params.id }
    })
    .then(byCategory => res.send(byCategory))
    .catch(err => res.send(err));
};

exports.input = (req, res) => {
  events
    .create({
      name: req.body.name,
      category: req.body.category,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      price: req.body.price,
      descrption: req.body.descrption,
      addres: req.body.addres,
      urlMaps: req.body.urlMap,
      img: req.body.img,
      createdBy: req.body.createdBy,
      createdAt: Date.now(),
      updatedAt: Date.now()
    })
    .then(register => res.json(register))
    .catch(err => res.send(err));
};
