"use strict";

angular.module("store")
  .factory("Table", function(Util) {

    var Table = function(validationSpec) {

      this.__updateTime = Date.now();
      this.records = {};            

    };

    var memoize = function(fn) {

      return _.memoize(fn, function() {
        return this.__updateTime;
      });

    };

    var freezeExcept = function(object, keys) {

      _.forEach(object, function(value, key) {
        if (_.includes(keys, key)) return;
        Object.defineProperty(object, key, {
          value: value,
          configurable: false,
          writable: false,
        });
      });

      _.forEach(keys, function(allowedKey) {
        Object.defineProperty(object, allowedKey, {
          configurable: true,
          writable: true,
        });
      });

      Object.preventExtensions(object);

    };

    Table.prototype.all = memoize(function() {
      return _.pluck(_.values(this.records), 'object');
    });

    Table.prototype.where = memoize(function(matcher) {
      return _.where(_.pluck(this.records, 'object'), matcher);
    });

    Table.prototype.insert = function(record) {

      // Shallow clone and freeze, so we're not affected
      // by any changes to the passed-in object after
      // calling or after we return it.
      var clone = _.clone(record);

      var localStoreId = Util.uid();

      freezeExcept(clone, ["$$hashKey"]);

      var record = {
        localStoreId: localStoreId,
        object: clone,
      };

      this.records[localStoreId] = record;

      this.__updateTime = Date.now();

      return record;

    };

    Table.prototype.delete = function(matcher) {
      this.records = _.reject(this.records, function(record) {
        return _.matches(matcher)(record.object);
      });
      this.__updateTime = Date.now();
    };

    return Table;
       
  });
