const model = require("../models");
const events = model.events;
const user = model.user;
const category = model.category;
const multer = require("multer");
const { Op } = require("sequelize");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./../uploads/events");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${+new Date()}.jpg`);
  }
});
const upload = multer({
  storage
});

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
      ],
      limit: 5
    })
    .then(index => res.send(index))
    .catch(err => res.send(err));
};

exports.show = (req, res) => {
  events
    .findOne({
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
      where: {
        name: { [Op.like]: [`%${req.params.name}%`] }
      },
      include: [
        {
          model: category,
          as: "Category"
        },
        {
          model: user,
          as: "User"
        }
      ]
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => res.send(err));
};

exports.sortBy = (req, res) => {
  events
    .findAll({
      where: {
        name: { [Op.like]: [`%${req.params.date}%`] }
      },
      include: [
        {
          model: category,
          as: "Category"
        },
        {
          model: user,
          as: "User"
        }
      ]
    })
    .then(data => {
      res.send(data);
    })
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

(exports.input = upload.single("photo")),
  async (req, res) => {
    try {
      const path = req.body.img.path;
      const { name } = req.body.img.name;
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
          img: path + "/" + name,
          createdBy: req.body.createdBy,
          createdAt: Date.now(),
          updatedAt: Date.now()
        })
        .then(register => res.json(register))
        .catch(err => res.send(err));
    } catch (ex) {
      res.status(400).send({ error: ex });
    }
  };
