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
        LIMIT 24;
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
        WHERE id=$1;
        `,
        [id]
    );
};

exports.addComment = function(imageId, newComment, author) {
    return db.query(
        `INSERT INTO comments
        (imageId, newComment, author)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        [imageId, newComment, author]
    );
};

exports.getComments = function(imageId) {
    return db.query(
        `SELECT *
        FROM comments
        WHERE imageId=$1
        ORDER BY created_at DESC
        `,
        [imageId]
    );
};
//
// exports.getMoreImages = function getMoreImages(lastimageId) {
//     `SELECT *, (
//     SELECT id FROM images
//     ORDER BY id ASC
//     LIMIT 1
//     ) AS 'lowestId' FROM images
//     WHERE id <12
//     ORDER BY id DESC
//     LIMIT 12`,
//         [lastimageId];
// };

exports.getMoreImages = function getMoreImages(id) {
    return db.query(
        `SELECT * FROM images
        WHERE id <$1
        ORDER BY id DESC
        LIMIT 24`,
        [id]
    );
};
