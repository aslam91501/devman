
```json
[
    {
        "id": "_pb_users_auth_",
        "name": "users",
        "type": "auth",
        "system": false,
        "schema": [
            {
                "system": false,
                "id": "users_name",
                "name": "name",
                "type": "text",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "system": false,
                "id": "users_avatar",
                "name": "avatar",
                "type": "file",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "mimeTypes": [
                        "image/jpeg",
                        "image/png",
                        "image/svg+xml",
                        "image/gif",
                        "image/webp"
                    ],
                    "thumbs": null,
                    "maxSelect": 1,
                    "maxSize": 5242880,
                    "protected": false
                }
            }
        ],
        "indexes": [],
        "listRule": "",
        "viewRule": "",
        "createRule": "",
        "updateRule": "",
        "deleteRule": "",
        "options": {
            "allowEmailAuth": true,
            "allowOAuth2Auth": true,
            "allowUsernameAuth": true,
            "exceptEmailDomains": null,
            "manageRule": null,
            "minPasswordLength": 8,
            "onlyEmailDomains": null,
            "onlyVerified": false,
            "requireEmail": false
        }
    },
    {
        "id": "dkopzfb6aofrifm",
        "name": "bugs",
        "type": "base",
        "system": false,
        "schema": [
            {
                "system": false,
                "id": "bmfudfxh",
                "name": "title",
                "type": "text",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "system": false,
                "id": "yx6iolyc",
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
            },
            {
                "system": false,
                "id": "rcdidqad",
                "name": "project",
                "type": "relation",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "collectionId": "z9z7ctq1mp9dylg",
                    "cascadeDelete": false,
                    "minSelect": null,
                    "maxSelect": 1,
                    "displayFields": null
                }
            },
            {
                "system": false,
                "id": "xh3fk6t5",
                "name": "feature",
                "type": "relation",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "collectionId": "m2yzh0c117aw5ai",
                    "cascadeDelete": false,
                    "minSelect": null,
                    "maxSelect": 1,
                    "displayFields": null
                }
            },
            {
                "system": false,
                "id": "xbtcztxi",
                "name": "status",
                "type": "select",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "maxSelect": 1,
                    "values": [
                        "resolved",
                        "unresolved",
                        "triage"
                    ]
                }
            },
            {
                "system": false,
                "id": "jwbei2zv",
                "name": "photos",
                "type": "file",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "mimeTypes": [],
                    "thumbs": [],
                    "maxSelect": 99,
                    "maxSize": 5242880,
                    "protected": false
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
    },
    {
        "id": "m2yzh0c117aw5ai",
        "name": "features",
        "type": "base",
        "system": false,
        "schema": [
            {
                "system": false,
                "id": "qjkbnpmd",
                "name": "name",
                "type": "text",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "system": false,
                "id": "e9vd5dq7",
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
            },
            {
                "system": false,
                "id": "0ewu71n4",
                "name": "project",
                "type": "relation",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "collectionId": "z9z7ctq1mp9dylg",
                    "cascadeDelete": false,
                    "minSelect": null,
                    "maxSelect": 1,
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
    },
    {
        "id": "5p8j1z8zyup88cp",
        "name": "items",
        "type": "base",
        "system": false,
        "schema": [
            {
                "system": false,
                "id": "5ryvic5x",
                "name": "name",
                "type": "text",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "system": false,
                "id": "ato0alch",
                "name": "done",
                "type": "bool",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {}
            },
            {
                "system": false,
                "id": "qcctujvi",
                "name": "subfeature",
                "type": "relation",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "collectionId": "c6qk8pgvito0m8p",
                    "cascadeDelete": false,
                    "minSelect": null,
                    "maxSelect": 1,
                    "displayFields": null
                }
            },
            {
                "system": false,
                "id": "pupd1wbt",
                "name": "type",
                "type": "select",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "maxSelect": 1,
                    "values": [
                        "todo",
                        "test",
                        "business"
                    ]
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
    },
    {
        "id": "z9z7ctq1mp9dylg",
        "name": "projects",
        "type": "base",
        "system": false,
        "schema": [
            {
                "system": false,
                "id": "ha3aji1w",
                "name": "title",
                "type": "text",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "system": false,
                "id": "gcyhdoxu",
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
            }
        ],
        "indexes": [],
        "listRule": "",
        "viewRule": "",
        "createRule": "",
        "updateRule": "",
        "deleteRule": "",
        "options": {}
    },
    {
        "id": "c6qk8pgvito0m8p",
        "name": "sub_features",
        "type": "base",
        "system": false,
        "schema": [
            {
                "system": false,
                "id": "pwqbnkf1",
                "name": "name",
                "type": "text",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "system": false,
                "id": "kuod2hb5",
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
            },
            {
                "system": false,
                "id": "lcw4lg37",
                "name": "feature",
                "type": "relation",
                "required": false,
                "presentable": false,
                "unique": false,
                "options": {
                    "collectionId": "m2yzh0c117aw5ai",
                    "cascadeDelete": false,
                    "minSelect": null,
                    "maxSelect": 1,
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
    }
]
```

