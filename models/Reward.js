const mongoose = require('mongoose');
const  RewardSchema= new mongoose.Schema({
    totalReward: { type: Number, default: 0 }
});

module.exports = mongoose.model('Reward', RewardSchema);
