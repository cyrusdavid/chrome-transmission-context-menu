// SAMPLE
this.manifest = {
    "name": "My Extension",
    "icon": "icon.png",
    "settings": [
        {
            "tab": i18n.get("information"),
            "group": i18n.get("login"),
            "name": "host",
            "type": "text",
            "label": i18n.get("host"),
            "text": "http://localhost"
        },
        {
            "tab": i18n.get("information"),
            "group": i18n.get("login"),
            "name": "port",
            "type": "text",
            "label": i18n.get("port"),
            "text": 52259
        },
        {
            "tab": i18n.get("information"),
            "group": i18n.get("login"),
            "name": "endpoint",
            "type": "text",
            "label": i18n.get("endpoint"),
            "text": "/transmission/rpc"
        },
        {
            "tab": i18n.get("information"),
            "group": i18n.get("login"),
            "name": "username",
            "type": "text",
            "label": i18n.get("username"),
            "text": i18n.get("(optional)")
        },
        {
            "tab": i18n.get("information"),
            "group": i18n.get("login"),
            "name": "password",
            "type": "text",
            "label": i18n.get("password"),
            "masked": true
        }
    ],
    "alignment": [
        [
            "username",
            "password",
            "host",
            "port",
            "endpoint"
        ]
    ]
};
