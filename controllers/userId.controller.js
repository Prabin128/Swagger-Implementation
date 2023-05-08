const { where } = require('sequelize');
const models = require('../models');

function save(req,res) {
    const userId = {
        name: req.body.name,
        phone:req.body.phone,
        email: req.body.email
    }

    models.userId.create(userId).then(result => {
        res.status(201).json({
            message: "Userid created successfully",
            userId : result
        })
    }).catch(error => {
        res.status(500).json({
            message : "Something went wrong",
            error : error
        });
    
    });

}

function show(req, res){
    const id = req.params.id; //getting url parameters from the request
    models.userId.findByPk(id).then(result => {
        if(result){
            res.status(200).json(result);
        }else{
            res.status(404).json({
                message : "User id not found!!"
            });
        }
        
    }).catch(error => {
        res.status(500).json({
            message:"Something went wrong!"
        });
    });
}

function index(req, res){
    models.userId.findAll().then(result =>{
        res.status(200).json(result);
    }).catch(error => {
        message: "Something went wrong"
    });
}

function update(req, res) {
    const id = req.params.id;
    const updatedUserId = {
        name: req.body.name,
        phone:req.body.phone,
        email: req.body.email
    }

    const userId =1;

    models.userId.update(updatedUserId, {where:{id:id}}).then(result => {
        res.status(201).json({
            message: "UserId updated succesfully",
            userId : updatedUserId
        });
        }).catch(error => {
            res.status(500).json({
                message:"Something went wrong!"
            });
        });
}

function destroy(req,res){
    const id = req.params.id;
    const userId = 1;

    models.userId.destroy({where: {id:id}}).then(result => {
       if(result){
        res.status(200).json({
            message: "UserId deleted succesfully",
            
        });
       }else{
        res.status(404).json({
            message: "User id is not in the list!!"
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
    save : save,
    show : show, 
    index:index,
    update : update,
    destroy : destroy
}