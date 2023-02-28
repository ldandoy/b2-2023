import express from "express";
import motivationModel from "../models/motivation.js";

const Router = express.Router();

/*const motivates = [
    "It's a good day to dev",
    "Belle journée à vous !",
    "Et encore un problème de résolu !"
];*/

Router.post('/', async (request, response) => {
    const { label } = request.body;

    if (label == null || label == "") {
        return 
    }

    const motivation = new motivationModel({
        label: label
    });
    
    await motivation.save();

    return response.status(200).json(motivation);
});

Router.get('/', async (request, response) => {
    let motivates = await motivationModel.find();

    return response.status(200).json(motivates);
});

Router.get('/:id', async (request, response) => {
    let {id} = request.params;

    let motivate = await motivationModel.findById(id);

    return response.status(200).json(motivate);
});

Router.get('/random', (request, response) => {
    return response.status(200).json({
        msg: motivates[Math.floor(Math.random() * motivates.length - 0)]
    });
});

Router.put('/:id', async (request, response) => {
    let {id} = request.params;
    const { label } = request.body;

    const motivation = await motivationModel.findByIdAndUpdate(id, {
        label: label
    }, {
        new: true
    });

    return response.status(200).json(motivation);
});

Router.delete('/:id', async (request, response) => {
    let {id} = request.params;

    await motivationModel.findByIdAndDelete(id);
    /*await motivationModel.findOneAndDelete({
        _id: id
    });*/

    return response.status(200).json({msg: "Phrase bien supprimer !"});
});

export default Router;