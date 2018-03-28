module.exports= function(sequelize, DataTypes){

    var todo = sequelize.define("Todo",{
        action:DataTypes.TEXT,
        date:DataTypes.TEXT,
        complete:DataTypes.BOOLEAN
    });
    return todo;
}