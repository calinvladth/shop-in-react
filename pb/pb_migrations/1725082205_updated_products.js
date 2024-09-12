/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vdh6gpn5pfzdf2n")

  // remove
  collection.schema.removeField("qetkq7nq")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "y9njjvfj",
    "name": "description",
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
  const collection = dao.findCollectionByNameOrId("vdh6gpn5pfzdf2n")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qetkq7nq",
    "name": "description",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  // remove
  collection.schema.removeField("y9njjvfj")

  return dao.saveCollection(collection)
})
