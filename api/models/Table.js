const mongoose = require("mongoose");
const User = mongoose.model('User');

const tableSchema = new mongoose.Schema({
    seats: Number,
    free: Number,
    rake: Number
});

tableSchema.methods.updateFreeSeats = function() {
    let table = this;

    return User.count({games: {$in: [table._id]}}).then(function(count){
        table.free = table.seats - count;

        return table.save();
    });
};

tableSchema.methods.toJSONFor = function(user){
    return {
        id: this._id,
        seats: this.seats,
        free: this.free,
        rake: this.rake,
        isPlaying: user.isPlaying(this._id)
    };
};

mongoose.model('Table', tableSchema);