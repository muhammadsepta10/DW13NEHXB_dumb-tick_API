const model = require("./../models");
const category = model.category;

exports.index = (req, res) => {
  category
    .findAll()
    .then(categories => res.send(categories))
    .catch(err => res.send(err));
};
exports.show = (req, res) => {
  category
    .findOne({
      where: { id: req.params.id }
    })
    .then(show => res.send(show))
    .catch(err => res.send(err));
};
