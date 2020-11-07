var AWS = require("aws-sdk");
var _ = require('lodash');
var formidable = require('formidable');
var secret = require('../secret/AWS');

//cai dat dyamodb
let awsConfig = {
    "region": "us-east-1",
    "endpoint": "http://dynamodb.us-east-1.amazonaws.com",
    "accessKeyId": secret.aws.AWSAccessKeyId,
    "secretAccessKey": secret.aws.AWSSecretKey,
};
AWS.config.update(awsConfig);
let docClient = new AWS.DynamoDB.DocumentClient();
//get toan bo sinh vien
module.exports.getAllLinhKien = function (req, res) {
    let params = {
        TableName: "LinhKien"
    };
    docClient.scan(params, (err, data) => {
        if (err) {
            res.end(JSON.stringify({ error: 'Lỗi không thể truy xuất dữ liệu' }));
        } else {
            res.render('index', { data: data });
        }
    });
};

// get page them sinh vien
module.exports.getAddLinhKien = function (req, res) {
    res.render('addlk');
}
// them sinh vien
module.exports.createLinhKien = function (req, res, next) {
    const { maLK, tenLK, gia, donVi, thongSo } = req.body;
    //const id = (Math.floor(Math.random() * 1000)).toString();
    let params = {
        TableName: 'LinhKien',
        Item:
        {
            maLK: maLK,
            tenLK: tenLK,
            gia: gia,
            donVi: donVi,
            thongSo: thongSo
        }
    };
    docClient.put(params, function (err, data) {
        if (err) {
            res.send({
                success: false,
                message: err
            });
        } else {
            const { Items } = data;
            res.redirect('/linhkien');
        }
    });
};
module.exports.delete = function(req, res) {
    var idLK = [];
    idLK = req.params.id.split(",");
    for( var x of idLK){
        var params = {
            TableName: 'LinhKien',
            Key: {
                "maLK": x
            }
        };
        docClient.delete(params, function (err, data) {
    
            if (err) {
                console.log('Batch delete unsuccessful ...');
                res.send("users::delete::error - " + JSON.stringify(err, null, 2));
            } else {
            }
        });      
    };
    res.redirect('/linhkien');  
}