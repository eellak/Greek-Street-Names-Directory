// @todo: usefull queries:
// db.getCollection('addresses').distinct("prefecture").sort()
// db.getCollection('addresses').distinct("postCode", { prefecture: "ΛΑΡΙΣΗΣ" }).sort()
// db.getCollection('addresses').distinct("municipality", { prefecture: "ΛΑΡΙΣΗΣ" }).sort()

// db.getCollection('addresses').aggregate([{$group:{_id:'$municipality'}}, {$skip:3}, {$limit:5}])
// db.getCollection('addresses').aggregate([{$match: { prefecture: "ΛΑΡΙΣΗΣ" }}, {$group:{_id:'$_id'}}, {$skip:0}, {$limit:5}])

db.getCollection('addresses').aggregate([
  { $match: { prefecture: "ΛΑΡΙΣΗΣ" } },
  { $project: { "municipality": 1 } },
  { $group: { _id: '$municipality' } },
  { $sort: { _id: -1 } },
  { $skip: 0 },
  { $limit: 25 }
])



db.getCollection('addresses').aggregate([
  { $match: { prefecture: "ΛΑΡΙΣΗΣ" } },
  { $sort: { municipality: 1 } },
  { $skip: 0 },
  { $limit: 25 }
])




db.getCollection('addresses').aggregate([
  { $match: { prefecture: "ΛΑΡΙΣΗΣ" } },
  { $group: {
      _id: '$municipality',
      streets: { $push: "$street" } // Do we need it?
    }
  },
  { $sort: { _id: 1 } },
  { $skip: 0 },
  { $limit: 25 }
])