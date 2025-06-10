const aiService = require("../services/ai.services");
exports.getReview =  async (req, res) => {
    const code = req.body.code;
    if(!code){
        res.status(400).send({error: "Prompt is required"});
    }
    const response = await aiService(code);

    res.send(response);
}