let spicedPg = require("spiced-pg");
let db;

if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    db = spicedPg("postgres:postgres:postgres@localhost:5432/images");
}

exports.getImages = function getImages() {
    return db.query(
        `SELECT *
        FROM images
        ORDER BY id DESC
        LIMIT 12;
        `
    );
};
