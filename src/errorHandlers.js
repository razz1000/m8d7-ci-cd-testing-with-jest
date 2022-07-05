import mongoose from "mongoose";

export const badRequestHandler = (err, req, res, next) => {
  /* console.log(err instanceof mongoose.Error.ValidationError); */
  if (
    err.status === 400 /* || err instanceof mongoose.Error.ValidationError */
  ) {
    res.status(400).send({ message: err.message });
  } else {
    next(err);
  }
};

export const unauthorizedHandler = (err, req, res, next) => {
  if (err.status === 401) {
    res.status(401).send({ message: err.message });
  } else {
    next(err);
  }
};

export const forbiddenHandler = (err, req, res, next) => {
  if (err.status === 403) {
    res.status(403).send({ message: err.message });
  } else {
    next(err);
  }
};

export const catchAllHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({
    message: "An error occurred on our side! We gonna fix that ASAP!",
  });
};
