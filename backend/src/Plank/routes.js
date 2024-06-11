//const express = require("express");

const { getList } = require("./controller");

exports.routesConfig = function (app) {
    app.get("/api/plank/list", getList);
};
