exports.add = function(req, res) {

    console.log('add image >>>')
    res.json({
        data: "a"+req.files,
        data2: req.file
    })
};
