/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("j9ch678m07uxmpr")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qjjepeho",
    "name": "fullName",
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
  const collection = dao.findCollectionByNameOrId("j9ch678m07uxmpr")

  // remove
  collection.schema.removeField("qjjepeho")

  return dao.saveCollection(collection)
})
