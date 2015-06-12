'use strict';

describe('Table', function () {

    var table;

    beforeEach(module('store'));

    beforeEach(inject(function (_Table_) {
      var Table = _Table_;
      table = new Table();
    }));

    it('inserts', function () {
      var object = {id: "1234", a: 1, b: 2};
      table.insert(object);
      expect(table.all()).toEqual([object])
    });

    it('searches', function () {
      var object = {id: "1234", a: 1, b: 2};
      var object2 = {id: "12345", a: 1, b: 2};
      table.insert(object);
      table.insert(object2);
      var retrieved = table.where({id: "1234"}); 
      expect(retrieved).toEqual([object])
    });

    it('freezes but allows $$hashKey writes', function () {
      var object = {id: "1234", a: 1, b: 2};
      table.insert(object);
      var retrieved = table.where({id: "1234"})[0]; 
      var idDescriptor = Object.getOwnPropertyDescriptor(retrieved, 'id');
      var hashKeyDescriptor = Object.getOwnPropertyDescriptor(retrieved, '$$hashKey');
      expect(idDescriptor.writable).toEqual(false);
      expect(hashKeyDescriptor.writable).toEqual(true);
      expect(Object.isExtensible(retrieved)).toEqual(false);
    });

    it('updates', function () {
      var object = {id: "1234", type: "a"};
      table.insert(object);
      table.update({id: "1234"}, {type: "b"});
      var retrieved = table.where({id: "1234"}); 
      expect(table.all()).toEqual([{id: "1234", type: "b"}])
    });

    it('deletes', function () {
      var object = {id: "1234", a: 1, b: 2};
      var object2 = {id: "12345", a: 1, b: 2};
      table.insert(object);
      table.insert(object2);
      table.delete({id: "1234"});
      expect(table.all()).toEqual([object2])
    });

});
