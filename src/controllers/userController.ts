import { catchAsync } from "../middlewares/catchAsync";
import { User } from "../models/User";
import bcrypt from "bcrypt"


export const checkAdminExist = catchAsync( async (req, res) => {
    const admin = await User.findOne({attributes:["id"], where:{
        role:"Admin"
    }});
    if(admin) {
        res.status(200).json({
            success:true,
            exist:true
        })
    } else {
        res.status(200).json({
            success:true,
            exist:false
        })
    }
});

export const createAdminIfNotExist = catchAsync(async (req, res) => {
    const adminCount = await User.count({where:{
        role:"Admin"
    }});
    if(adminCount == 0) {
        const {username, email, password} = req.body;
        const usersWithSameEmailCount = await User.count({where:{
            email
        }});
        if(usersWithSameEmailCount == 0) {
            const passwordHash = await bcrypt.hash(password, 16);
            const user = await User.create({
                email,
                username,
                password:passwordHash,
                role:"Admin"
            });
            res.status(201).json({
                success:true,
                message:"Created Admin user",
                insertId:user.id
            });
        } else {
            res.status(400).json({success:false, errorMessage:"This email is already taken"})
        }
    } else {
        res.status(400).json({success:false, errorMessage:"Admin already exist"})
    }
})