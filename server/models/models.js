const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Personage = sequelize.define('personage', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    personageClass: {type: DataTypes.STRING, allowNull: false},
    level: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0}
})

const ItemType = sequelize.define('itemType', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false}
})

const Item = sequelize.define('item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    quality: {type: DataTypes.STRING, allowNull: false, defaultValue: 100}
})

const Location = sequelize.define('location', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: true, unique: true},
    description: {type: DataTypes.STRING, allowNull: true},
    type: {type: DataTypes.STRING, allowNull: false}
})

const Message = sequelize.define('message', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.STRING(1000), allowNull: false}
})

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, allowNull: false, defaultValue: 'user'},
})

const Token = sequelize.define('token', {
    token: {type: DataTypes.TEXT}
})

Personage.belongsTo(Location, {foreignKey: {
    name: 'position',
    allowNull: false,
    defaultValue: 1
}})

Item.belongsTo(ItemType, {foreignKey: {
    name: 'item_type',
    allowNull: false
}})

Item.belongsTo(Personage, {foreignKey: {
    name: 'owner',
    allowNull: false
}})

Message.belongsTo(Personage,{
    as: 'sender',
    foreignKey: 'sender_id'
})
Message.belongsTo(Personage,{
    as: 'recipient',
    foreignKey: 'recipient_id'
})

Personage.hasMany(Message, {
    as: 'sender',
    foreignKey :'sender_id'
})
Personage.hasMany(Message, {
    as: 'recipient',
    foreignKey: 'recipient_id'
})

Personage.belongsTo(User, {
    as: 'personage',
    foreignKey: {
        name: 'user_id',
        allowNull: false,
    }
})


User.hasOne(Token, {
    as: 'user_token',
    foreignKey: {
        name: 'user_id',
        allowNull: false,
    }
})
Token.belongsTo(User, {
    as: 'user_token',
    foreignKey: {
        name: 'user_id',
        allowNull: false,
    }
})


module.exports = {
    Personage, 
    ItemType,
    Item,
    Location,
    Message,
    User,
    Token
}