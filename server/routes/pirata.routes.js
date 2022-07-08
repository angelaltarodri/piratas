const PirataController = require("../controllers/pirata.controller");

module.exports = (app) => {
    app.post("/api/piratas", PirataController.create_pirata);
    app.get("/api/piratas", PirataController.get_all);
    app.get("/api/piratas/:id", PirataController.get_pirata);
    app.put("/api/piratas/:id", PirataController.update_pirata);
    app.delete("/api/piratas/:id", PirataController.delete_pirata); 
}