const mongoose = require("../common/mongoose.service.js");

const Schema = mongoose.Schema;

const RecordSchema = new Schema({
    id: {type: Number, required: true},
    duration: {type: String, required: true},
    month: {type: String, required: true},
    day: {type: Number, required: true},
});

const MainSchema = new Schema({});

for (let i = 1; i <= 12; i++) {
    MainSchema.add({[`${i}`]: [RecordSchema]});
}

const PlankDataModel = mongoose.model("data", MainSchema);

module.exports = PlankDataModel;