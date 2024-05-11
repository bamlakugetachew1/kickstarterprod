const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    projectid: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Projectid is a required field'],
      ref: 'Project',
    },
    payerid: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'payerid is a required field'],
      ref: 'Creator',
    },
    amount: {
      type: Number,
      required: [true, 'Amount is a required field'],
      validate: {
        validator(value) {
          return value > 0;
        },
        message: (props) => `${props.value} is not a valid amount, it must be greater than zero`,
      },
    },
    message: {
      type: String,
    },
    paymentemail: {
      type: String,
      required: [true, 'a valid paymentemail is required'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
