const model = require("./../models");
const user = model.user;
const order = model.order;
const event = model.events;
const category = model.category;

exports.index = (req, res) => {
  order
    .findAll({
      include: [
        {
          model: user,
          as: "User"
        },
        {
          model: event,
          as: "Event"
        }
      ]
    })
    .then(index => res.send(index))
    .catch(err => res.send(err));
};

exports.pending = (req, res) => {
  order
    .create({
      event: req.body.event,
      customer: req.body.customer,
      quantity: req.body.quantity,
      totalPrice: req.body.totalPrice,
      status: "pending",
      attachment: null,
      createdAt: Date.now(),
      updateAt: Date.now()
    })
    .then(pending => res.json(pending))
    .catch(err => res.send(err));
};

exports.confirmed = (req, res) => {
  order
    .update(
      {
        attachment: req.body.attachment,
        status: "confirm"
      },
      {
        where: { id: req.params.id }
      }
    )
    .then(confirm => res.json(confirm))
    .catch(err => res.send(err));
};

exports.approved = (req, res) => {
  order.update(
    {
      status: "approved"
    },
    {
      where: { id: req.params.id }
    }
  );
};

exports.showApplymen = (req, res) => {
  order
    .findAll({
      include: [
        {
          model: user,
          as: "User"
        },
        {
          model: event,
          as: "Event",
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
        }
      ],
      where: { customer: req.params.id }
    })
    .then(show => res.send(show))
    .catch(err => res.send(err));
};
exports.showApprove = (req, res) => {
  order
    .findAll({
      include: [
        {
          model: user,
          as: "User"
        },
        {
          model: event,
          as: "Event",
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
        }
      ],
      where: { customer: req.params.id },
      where: { status: "approved" }
    })
    .then(show => res.send(show))
    .catch(err => res.send(err));
};
