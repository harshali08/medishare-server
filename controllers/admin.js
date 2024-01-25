const Medicine = require("../models/medicine");

exports.approveMed=async(req,res)=>{
    try {
        const id =req.query.id;
        const med=await Medicine.findById(id).populate('donor').exec();
        console.log(med);
        if(med){
            med.approval=true;
            await med.save();
            return res.status(200).json({
                med,
                message:"Medicine Approved"
            });
        }
        else{
            return res.status(400).json({
                message: 'Medicine not found'
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

// exports.acceptRequest=async(req,res)=>{
//     try {
//         const id =req.query.id;
//         const med=await Medicine.findById(id).populate('receiver','medicine').exec();
//         console.log(med);
//         if(med){
//             med.approval=true;
//             await med.save();
//             return res.status(200).json({
//                 med,
//                 message:"Medicine Approved"
//             });
//         }
//         else{
//             return res.status(400).json({
//                 message: 'Medicine not found'
//             });
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             error,
//             message: 'Something Went Wrong'
//         });
//     }
// }