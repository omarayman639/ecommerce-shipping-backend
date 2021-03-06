const Seq = require('sequelize').Sequelize;
const sequelize = new Seq('ecommerce-shipping', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});
const db = {
    users: sequelize.import('./models/users'),
    products: sequelize.import('./models/products'),
    business: sequelize.import('./models/business'),
    product_categories: sequelize.import('./models/product_categories'),
    requests: sequelize.import('./models/requests')
}

db.users.hasMany(db.requests, {
    as: 'recievedRequests',
    foreignKey: 'to_user_id'
});
db.users.hasMany(db.requests, {
    as: 'sentRequests',
    foreignKey: 'by_user_id'
});
db.requests.belongsTo(db.users, {
    as: 'recievingUser',
    foreignKey: 'to_user_id'
});
db.requests.belongsTo(db.users, {
    as: 'sendingUser',
    foreignKey: 'by_user_id'
});

db.products.hasMany(db.requests, {
    foreignKey: 'product_id',
});
db.requests.belongsTo(db.products, {
    foreignKey: 'product_id',
})


db.users.hasOne(db.business, {
    foreignKey: 'user_id'
});
db.business.belongsTo(db.users, {
    foreignKey: 'user_id'
});
// db.business.hasOne(db.users, {
//     foreignKey: 'user_id'
// });

db.business.hasMany(db.products, {
    foreignKey: 'bussiness_id'
});
db.products.belongsTo(db.business, {
    foreignKey: 'bussiness_id'
});

db.users.hasMany(db.products, {
    foreignKey: 'user_id'
});
db.products.belongsTo(db.users, {
    foreignKey: 'user_id'
});

db.product_categories.hasMany(db.products, {
    foreignKey: 'category_id'
});
db.products.belongsTo(db.product_categories, {
    foreignKey: 'category_id'
});


module.exports = db;