const {
  Types: { ObjectId },
} = require('mongoose');

const getSingleProjectStatusAggregate = (projectId) => {
  const SingleProjectStatusAggregate = [
    {
      $match: { projectid: new ObjectId(projectId) },
    },
    {
      $group: {
        _id: null,
        donors: { $sum: 1 },
        averageDonationAmount: { $avg: '$amount' },
        totalFunds: { $sum: '$amount' },
      },
    },
  ];

  return SingleProjectStatusAggregate;
};

module.exports = getSingleProjectStatusAggregate;
