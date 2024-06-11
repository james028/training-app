const asyncHandler = require("express-async-handler");
const PlankDataModel = require("./model");

exports.getList = asyncHandler(async (req, res) => {
    try {
        const a = await PlankDataModel.find({});
        //
        // console.log(a)

        // const a = PlankDataModel.findOneAndUpdate(
        //   { "01": { $exists: true } }, // Warunek wyszukiwania dla stycznia
        //   {
        //     $push: {
        //       "01": {
        //         // Dodajemy nowy obiekt do tablicy 01
        //         //id: 2,
        //         duration: "00:02:00",
        //         month: "01",
        //         day: 13,
        //       },
        //     },
        //   },
        //   //{ new: true, upsert: true }, // Opcje: new - zwraca zaktualizowany dokument, upsert - tworzy dokument, jeśli nie istnieje
        //   // (err, result) => {
        //   //   if (err) {
        //   //     console.error(err);
        //   //   } else {
        //   //     console.log("Data added successfully:", result);
        //   //   }
        //   // },
        // );

        //console.log(a, "list1");



        res.send(a);

    } catch (error) {
        console.log(error, "err");
    }
});
