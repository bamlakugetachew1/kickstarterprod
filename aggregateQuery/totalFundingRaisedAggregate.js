const totalFundingRaisedAggregate = [{ $group: { _id: null, totalAmount: { $sum: '$amount' } } }];

module.exports = totalFundingRaisedAggregate;
