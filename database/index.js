'use strict';

const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const componentPath = path.resolve(__dirname, '../app/components');
const modelExtension = '.model.js';

const isDirectory = (targetPath) => fs.statSync(targetPath).isDirectory();
const isFile = (targetPath) => fs.statSync(targetPath).isFile();
const isModelFile = (filePath) => isFile(filePath) && filePath.endsWith(modelExtension);
const getFullPath = (basePath, targetPath) => path.join(basePath, targetPath);
const isNotEmpty = _.negate(_.isEmpty);

/**
 * Retrieve all model files paths in directory.
 * Will recursively enter directories.
 *
 * @param {string} currentPath
 * @return {string[]}
 */
function findModelPaths(currentPath) {
  // read current directory
  const models = fs.readdirSync(currentPath)
    .map((itemPath) => {
      const fullPath = getFullPath(currentPath, itemPath);

      if (isModelFile(fullPath)) {
        return fullPath;
      } else if (isDirectory(fullPath)) {
        return findModelPaths(fullPath);
      }
    })
    .filter(isNotEmpty);

  return _.flatten(models);
}

module.exports = (sequelize, Sequelize) => {
  const modelPaths = findModelPaths(componentPath);

  // import all models
  const models = modelPaths
    .reduce((acc, modelPath) => {
      const model = sequelize.import(modelPath);
      return Object.assign(acc, {[model.name]: model});
    }, {});

  // once imported, establish associations
  _.forEach(models, (model) => {
    if (_.isFunction(model.associate)) {
      model.associate(models);
    }
  });

  return Object.assign(models, {
    sequelize,
    Sequelize,
  });
};
