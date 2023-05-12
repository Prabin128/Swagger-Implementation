const models = require('../models');
const Validator = require('fastest-validator');


function createProduct(req, res) {
    if (req.files.images) {
        var images =
          
          "/uploads/images/" +
          req.files.images[0].filename;
      }
    const product = {
        title : req.body.title,
        description :req.body.description,
        images : images,
        specification : req.body.specification,
        ratings : req.body.ratings,
        userId : req.body.userId,
        rate : req.body.rate,
        stock : req.body.stock
    }

// const schema ={
//     title : {type: "string", optional: false, max: "100"},
//     description : {type: "string", optional: false, max: "500"},
//     specification :  {type: "string", optional: false, max: "100"},
//     ratings :  {type: "number", optional: false, max: "100"},
// }
// const v = new Validator();
// const validationResponse = v.validate(product, schema);
// if(validationResponse !== true){
//     return res.status(400).json({
//         message : "Validation failed!!",
//         error : validationResponse
//     });
// }

models.Product.create(product).then(result => {  
    res.status(201).json({
        message : "Product created succesfully",
        product: result
    });
}).catch(error => {
    res.status(500).json({
        message: "Something went wrong",
        error : error
    });
});
}

function show(req,res){
    const id = req.params.id; //getting url parameters from the request
    models.Product.findByPk(id).then(result =>{
        if(result){
            res.status(200).json(result);
        }else{
            res.status(404).json({
                message : "Product id not found!!"
            })
        }
        
    }).catch(error => {
        res.status(500).json({
            message:"Something went wrong!"
        })
    });
}

function index(req, res){  //get all the post that have been created in the product table 
    models.Product.findAll({
        include:[
            {
                as : "user",
                model: models.userId,
               
            }
        ]
    }).then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error :error
        });
    });
}

function update(req, res){
    const id = req.params.id;
    const updatedProduct = {
        title : req.body.title,
        description :req.body.description,
        images : req.body.images,
        specification : req.body.specification,
        ratings : req.body.ratings
        
    }
    

    const userId =1;

    models.Product.update(updatedProduct, {where : {id:id, userId:userId}}).then(result => {
        res.status(200).json({
            message : "Product updated succesfully",
            product : updatedProduct
        });
    }).catch( error =>{
        res.status(500).json({
            message:"something went wrong",
            error: error
        });
    });
}

function destroy(req,res){
    const id = req.params.id;
    const userId = 1;

    models.Product.destroy({where: {id:id, userId:userId}}).then(result => {
       if(result){
        res.status(200).json({
            message: "Product deleted succesfully",
            
        });
       }else{
        res.status(404).json({
            message: "Product id is not in the list!!"
        })
       }
       
    }).catch(error => {
        res.status(500).json({
            message : "Something went wrong",
            error : error
        });
       

    });
}


module.exports = {
   createProduct : createProduct,
   show: show,
   index: index,
   update : update, 
   destroy: destroy
}