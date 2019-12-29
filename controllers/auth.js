const jwt = require("jsonwebtoken");
const models = require("../models");
const user = models.user;
const hash = require("password-hash");

exports.login = (req, res) => {
  //   const email = req.body.email;
  //   const password = req.body.password;
  //   res.send({ message: "okeokeoko" });
  user
    .findOne({
      where: {
        email: req.body.email
        // password: req.body.password
      }
    })
    .then(user => {
      if (user) {
        const password = user.password;
        const verify = hash.verify(req.body.password, password);
        if (verify === true) {
          const token = jwt.sign({ userId: user.id }, "secret code");
          const message = "sukses";
          res
            .send({
              user,
              token,
              message
            })
            .catch(err => res.send(err));
        } else {
          res.send({
            error: true,
            message: "wrong password"
          });
        }
      } else {
        res.send({
          error: true,
          message: "your email not registered"
        });
      }
    })
    .catch(err => res.send(err));
};

exports.register = (req, res) => {
  user
    .findOne({
      where: { email: req.body.email }
    })
    .then(user => {
      if (user) {
        res
          .send({
            error: true,
            message: "email telah terdaftar"
          })
          .catch(err => res.send(err));
      } else {
        models.user
          .create({
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            password: hash.generate(req.body.password),
            img: req.body.img,
            createdAt: Date.now(),
            updatedAt: Date.now()
          })
          .then(register => res.json(register))
          .catch(err => res.send(err));
      }
    })
    .catch(err => res.send(err));
};
