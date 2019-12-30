module.exports = {
    apps : [
        {
          name: "api2cs100",
          script: "./app.js",
          watch: true,
          ignore_watch : ["node_modules", "public/tmp", "fuentes","avatares"],
          env: {
            "NODE_ENV": "produccion",
          },
          env_test: {
            "NODE_ENV": "test",
          }
        }
    ]
  }