const express = require('express');
const dataController = require('../controllers/data');
const { resolver } = require('../utils/errorHandler');

const dataRouter = express.Router();

dataRouter.get('/', resolver(dataController.getDataInTimeRange));
// dataRouter.post('/', resolver(levelsController.createLevel));
dataRouter.put('/', resolver(dataController.addData));
// dataRouter.delete('/:levelId', levelsController.deleteLevel);
// dataRouter.get('/:levelId', levelsController.getOneLevel);

module.exports = dataRouter;
