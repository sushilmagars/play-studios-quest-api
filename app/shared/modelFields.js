'use strict';

const DataTypes = require('sequelize').DataTypes;

/**
 * Helper methods to generate sequelize model field configuration objects
 *
 * @class ModelFields
 */
class ModelFields {
  /**
   * Generate object for model's decimal field
   *
   * @function decimal
   * @static
   * @memberof ModelFields
   * @param  {string} field - name of field
   * @param  {number} [precision=10]
   * @param  {number} [scale=2]
   * @param  {boolean} [allowNull=true]
   * @param  {object} [validation] - optional validations. Will override default validation options
   * @return {object} sequelize model configuration object for decimal fields
   */
  static decimal({field, precision = 10, scale = 2, allowNull = true, validation} = {}) {
    const defaultValidation = {
      isDecimal: true,
      min: 0,
    };

    return {
      type: DataTypes.DECIMAL(precision, scale),
      field,
      allowNull,
      validate: validation || defaultValidation,
    };
  }

  /**
   * Generate object for model's integer field
   *
   * @function integer
   * @static
   * @memberof ModelFields
   * @param  {string} field - name of field
   * @param  {boolean} [allowNull=true]
   * @param  {object} [validation] - optional validations. Will override default validation options
   * @return {object} sequelize model configuration object for integer fields
   */
  static integer({field, allowNull = true, validation} = {}) {
    const defaultValidation = {
      isInt: true,
    };

    return {
      type: DataTypes.INTEGER,
      allowNull,
      field,
      validate: validation || defaultValidation,
    };
  }

  /**
   * Generate object for model's string field.
   * By default, field is nullable, and min length will be set to 1 (to prevent empty string values)
   *
   * @param  {object} options
   * @param  {string} options.field - name of field
   * @param  {boolean} [options.allowNull=true] - when true, field is nullable
   * @param  {number} [options.minLength=1] min length of 1 by default
   * @param  {number} [options.maxLength] max length is not defined by default
   * @param  {boolean} [options.unique] - when true, field is unique
   * @param  {object} [options.validation] - optional validations. Will override default validation options
   * @return {object} sequelize model configuration object for string fields
   */
  static string({field, allowNull = true, minLength = 1, maxLength, unique = false, validation, ...rest} = {}) {
    const defaultValidation = {
      len: [minLength, maxLength].filter(Boolean), // if maxLength is not defined, it will not be set
    };

    return {
      type: DataTypes.STRING,
      allowNull,
      field,
      unique,
      validate: validation || defaultValidation,
      ...rest,
    };
  }

  /**
   * Generate object for model's boolean field.
   * By default field, field is nullable.
   *
   * @function boolean
   * @static
   * @memberof ModelFields
   * @param  {object} options
   * @param  {string} options.field - name of the field
   * @param  {boolean} [options.allowNull=true] - true by default
   * @param  {boolean} [options.unique=false] - false by default
   * @return {object} Sequelize model configuration object for boolean fields
   */
  static boolean({field, allowNull = true, unique = false, validation} = {}) {
    const defaultValidation = {
      isBoolean: true,
    };

    return {
      type: DataTypes.BOOLEAN,
      field,
      allowNull,
      unique,
      validate: validation || defaultValidation,
    };
  }

  /**
   * Generate object for model's text field.
   * By default, field is nullable, and min length will be set to 1 (to prevent empty text values)
   *
   * @function text
   * @static
   * @memberof ModelFields
   * @param  {object} options
   * @param  {string} options.field - name of field
   * @param  {boolean} [options.allowNull=true] - when true, field is nullable
   * @param  {number} [options.minLength=1] min length of 1 by default
   * @param  {number} [options.maxLength] max length is not defined by default
   * @return {object} sequelize model configuration object for text fields
   */
  static text({field, allowNull = true, minLength = 1, maxLength} = {}) {
    const validate = {
      len: [minLength, maxLength].filter(Boolean), // if maxLength is not defined, it will not be set
    };

    return {
      type: DataTypes.TEXT,
      allowNull,
      field,
      validate,
    };
  }

  /**
   * Generates the object for a model's phone field.
   *
   * @function phone
   * @static
   * @memberof ModelFields
   * @param  {boolean} allowNull
   * @param  {string} field - the field name if not 'phone'
   * @return {object} sequelize model configuration object for phone fields
   */
  static phone({field = 'phone', allowNull = true} = {}) {
    return {
      type: DataTypes.CHAR(10),
      field,
      allowNull,
      validate: {
        isValidFormat: (value) => PhoneHelpers.validateFormat(value),
      },
    };
  }

  /**
   * Generates the object for a model's integer primary key.
   *
   * @function pk
   * @static
   * @memberof ModelFields
   * @param  {boolean} autoIncrement
   * @return {object} sequelize model configuration object for primary key fields
   */
  static pk({autoIncrement = true} = {}) {
    return {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement,
    };
  }

  /**
   * Generates the object for a model's UUID primary key.
   *
   * @function pkUuid
   * @memberof ModelFields
   * @return {object} sequelize model configuration object for (uuid) primary key fields
   */
  static pkUuid() {
    return {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      validate: {
        isUUID: 4,
      },
    };
  }

  /**
   * Generates the object for a model's UUID field.
   *
   * @function uuid
   * @memberof ModelFields
   * @return {object} sequelize model configuration object for (uuid) fields
   */
  static uuid({field, allowNull = true}) {
    return {
      type: DataTypes.UUID,
      field,
      allowNull,
      validate: {
        isUUID: 4,
      },
    };
  }

  /**
   * Generate object for model's date field
   *
   * @function date
   * @static
   * @memberof ModelFields
   * @param  {string} field - name of field
   * @param  {boolean} [allowNull=true]
   * @param  {object} [validation] - optional validations. Will override default validation options
   * @return {object} sequelize model configuration object for date fields
   */
  static date({field, allowNull = true, validation} = {}) {
    const defaultValidation = {
      isDate: true,
    };

    return {
      type: DataTypes.DATE,
      allowNull,
      field,
      validate: validation || defaultValidation,
    };
  }
}

module.exports = ModelFields;
