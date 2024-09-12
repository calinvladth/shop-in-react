/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4huoamm298lx7wz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4p7rqh0s",
    "name": "paymentType",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4huoamm298lx7wz")

  // remove
  collection.schema.removeField("4p7rqh0s")

  return dao.saveCollection(collection)
})
