/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("dipiw7xuuou14ke");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "dipiw7xuuou14ke",
    "created": "2024-09-10 13:21:01.185Z",
    "updated": "2024-09-10 18:21:02.335Z",
    "name": "wishlist",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "gmipxk2v",
        "name": "user",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "rm4wnixo",
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
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
