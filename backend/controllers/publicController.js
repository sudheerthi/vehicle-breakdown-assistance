const Owner = require('../models/Owner');

exports.getMechanics = async (req, res) => {
    try {
        const mechanics = await Owner.find();
        res.status(200).json(mechanics);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching mechanics', error });
    }
};
    