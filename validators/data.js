const yup = require("yup");

const getDataSchema = yup.object({
  startTime: yup.date().optional().nullable(),
  endTime: yup.date().optional().nullable(),
  limit: yup.number().integer().positive().optional().nullable(),
  skip: yup.number().integer().positive().optional().nullable(),
});

const addDataSchema = yup.object({
  ambientTemperature: yup.number().required().nullable(),
  forwardAcceleration: yup.number().required().nullable(),
  heartRate: yup.number().required().nullable(),
  horizontalAcceleration: yup.number().required().nullable(),
  objectTemperature: yup.number().required().nullable(),
  rotationX: yup.number().required().nullable(),
  rotationY: yup.number().required().nullable(),
  rotationZ: yup.number().required().nullable(),
  verticalAcceleration: yup.number().required().nullable(),
});

module.exports = { addDataSchema, getDataSchema };
