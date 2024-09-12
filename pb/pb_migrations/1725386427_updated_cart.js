/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7wa9jtt26qickwn")

  // remove
  collection.schema.removeField("nnbov8fq")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7wa9jtt26qickwn")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nnbov8fq",
    "name": "products",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "vdh6gpn5pfzdf2n",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
