const asyncHandler = require("express-async-handler");
const RegisteredDevicesDataModel = require("./model");

const MAX_DEVICES = 5;

exports.getRegisteredDevices = asyncHandler(async (req, res) => {});

exports.addOrRefreshRegisterDevice = asyncHandler(async (req, res) => {
  const { deviceId, deviceName } = req.body;
  const userId = req.user.id;

  // // 1. JEDEN STRZAŁ: Aktualizuj lub stwórz (Upsert)
  // // To eliminuje potrzebę sprawdzania czy istnieje i osobnego tworzenia
  // const updatedDevice = await RegisteredDevicesDataModel.findOneAndUpdate(
  //   { deviceId: deviceId },
  //   {
  //     $set: {
  //       userId,
  //       deviceName: deviceName || "Unknown",
  //       //ip: device.ip,
  //       //userAgent: device.userAgent,
  //       lastActive: new Date(),
  //     },
  //   },
  //   {
  //     upsert: true,
  //     new: true,
  //     lean: true,
  //     setDefaultsOnInsert: true,
  //   },
  // );
  //
  // // 2. POLICZ I WYCZYŚĆ (Równolegle lub w tle)
  // // Używamy Promise.all, żeby nie czekać na jedno po drugim
  // const [devices, count] = await Promise.all([
  //   RegisteredDevicesDataModel.find({ userId }).sort({ lastActive: 1 }).lean(),
  //   RegisteredDevicesDataModel.countDocuments({ userId }),
  // ]);
  //
  // console.log(devices);
  // let removedOldest = false;
  //
  // // 3. Jeśli przekroczono limit, usuń najstarsze (nie musisz na to czekać z 'await' jeśli chcesz max speed)
  // if (count > MAX_DEVICES) {
  //   const toDelete = devices.slice(0, count - MAX_DEVICES);
  //   const idsToDelete = toDelete.map((d) => d._id);
  //
  //   await RegisteredDevicesDataModel.deleteMany({ _id: { $in: idsToDelete } });
  //   removedOldest = true;
  // }
  //
  // // // 3. Tworzymy nowe urządzenie
  // // const newDevice = await RegisteredDevicesDataModel.create({
  // //   userId,
  // //   deviceId,
  // //   deviceName: deviceName || "Unknown",
  // //   //ip: device.ip,
  // //   //userAgent: device.userAgent,
  // //   lastActive: new Date(),
  // // });
  // //
  // // const finalCount = await RegisteredDevicesDataModel.countDocuments({
  // //   userId,
  // // });
  //
  // const response = {
  //   success: true,
  //   activeCount: Math.min(count, MAX_DEVICES),
  //   isNew: true,
  //   removedOldest,
  //   device: updatedDevice,
  // };

  const allDevices = await RegisteredDevicesDataModel.find({}).lean();
  // /const allDevices = await RegisteredDevicesDataModel.deleteMany({})
  console.log(allDevices);

  res.status(200).json(allDevices);
});
