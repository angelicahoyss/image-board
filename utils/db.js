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

exports.addImage = function addImage(url, username, title, description) {
    return db.query(
        "INSERT INTO images (url, username, title, description) VALUES ($1, $2, $3, $4) RETURNING *",
        [url, username, title, description]
    );
};

exports.getImagebyId = function getImagebyId(id) {
    return db.query(
        `SELECT *
        FROM images
        WHERE id = $1;
        `,
        [id]
    );
};

//query needs to be aware of where the user is on the page. include id** or timestamp of the last image on the lis: where id <$1 evnt handler for the more
//button, last image in the array find id.
//to determine w or not there should be more button is check if the last image in the result list is the lowest no in the database. check to see
// lowest id SELECT id FROM images ORDER BY id ASC LIMIT 1
//SELECT *, (
// SELECT id FROM images
// ORDER BY id ASC
// LIMIT 1
// ) AS 'lowestId' FROM images
// WHERE id <12
// ORDER BY id DESC
// LIMIT 20
