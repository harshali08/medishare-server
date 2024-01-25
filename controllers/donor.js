const Donor = require('../models/donor');
const Receiver = require('../models/receiver');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const existingDonor = await Donor.findOne({ email: req.body.email });

        if (existingDonor) {
            return res.status(400).json({
                message: 'Donor Already Registered'
            });
        }

        const newDonor = new Donor({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            location: req.body.location,
            donorType: req.body.donorType
        });

        await newDonor.save();

        return res.status(200).json({
            message: 'Donor Created Successfully'
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error,
            message: 'Something Went Wrong'
        });
    }
};

exports.login = async (req, res) => {
    try {
        const existingDonor = await Donor.findOne({ email: req.body.email });

        if (existingDonor) {
            if (existingDonor.authenticate(req.body.password)) {
                const token = jwt.sign({ _id: existingDonor._id, role: existingDonor.role }, "test", { expiresIn: '1h' })
                const { _id, firstName, lastName, fullName, email, role } = existingDonor;
                res.status(200).json({
                    token,
                    donor: {
                        _id, firstName, lastName, fullName, email, role
                    },
                    status: 200
                })
            }

            else {
                res.status(400).json({
                    message: "Enter correct credentials"
                })
            }
        }

        else {
            res.status(400).json({
                message: "Donor doesn't exist"
            })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error,
            message: 'Something Went Wrong'
        });
    }
}

exports.getAllReceivers = async (req, res) => {

    try {
        const receivers = await Receiver.find({});
        if (receivers) {
            return res.status(200).json({
                receivers
            });
        }
        else {
            return res.status(400).json({
                message: "Something went wrong"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error,
            message: 'Something Went Wrong'
        });
    }
}

