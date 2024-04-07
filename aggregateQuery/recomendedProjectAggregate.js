const recommendedProjectAggregate = [
  {
    $addFields: {
      percentfunded: { $multiply: [{ $divide: ['$amountReached', '$goal'] }, 100] },
      deadline: {
        $toDate: '$deadline',
      },
      today: new Date(),
    },
  },
  {
    $addFields: {
      daysLeft: {
        $ceil: {
          $divide: [{ $subtract: ['$deadline', '$today'] }, 1000 * 60 * 60 * 24],
        },
      },
    },
  },
  {
    $sort: { percentfunded: -1 },
  },
  {
    $project: { today: 0, deadline: 0, reward: 0, updates: 0, videoLink: 0 },
  },
  {
    $limit: 5,
  },
];

module.exports = recommendedProjectAggregate;
