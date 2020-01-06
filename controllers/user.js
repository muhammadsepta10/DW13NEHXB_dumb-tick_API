const model = require("./../models");
const user = model.user;

exports.show = (req, res) => {
  user
    .findOne({
      where: { id: req.params.id }
    })
    .then(show => res.send(show))
    .catch(err => res.send(err));
};

exports.edit = (req, res) => {
  user
    .update(
      {
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        img: req.body.img,
        updatedAt: Date.now()
      },
      {
        where: { id: req.params.id }
      }
    )
    .then(edit => res.json(edit))
    .catch(err => res.send(err));
};
