import { catchAsync } from "../middlewares/catchAsync";
import { User } from "../models/User";
import { sign } from "jsonwebtoken"
import bcrypt from "bcrypt"

// GET
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

// POST
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
            const passwordHash = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS || 10));
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
        res.status(409).json({success:false, errorMessage:"Admin already exist"})
    }
});


// POST
export const loginUser = catchAsync( async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({where:{
        email
    }});
    if(user) {
        const userPass = user.password;
        const verified = await bcrypt.compare(password, userPass);
        if(verified) {
            const token = sign({
                id:user.id,
                username:user.username,
                role:user.role
            }, process.env.REFRESH_TOKEN || "HHhbhvjjbioL", {
                expiresIn:"7d"
            })
            res.status(200).json({success:true, message:"Login success", user:{id:user.id, username:user.username, role:user.role}}).cookie("REFRESH_TOKEN", token, {
                maxAge:7 * 24 * 60 * 60 * 1000,
                httpOnly:true,
                sameSite:"strict",
                signed:true,
                secure:process.env.HTTPS == "true"
            })
        } else {
            res.status(401).json({success:false, errorMessage:"Invalid password"})
        }

    } else {
        res.status(404).json({success:false, errorMessage:"User not found"})
    }

});

// GET
export const getAllUsers = catchAsync(async (req, res) => {
    const users = await User.findAll({
        attributes:[
            "id",
            "username",
            "email",
            "role"
        ],
        order:["name"]
    });
    res.status(200).json({success:true, message:"Got all users", users})
});

// POST
export const createNewUser = catchAsync(async (req, res) => {
    const {username, email, password, role} = req.body;
    const passwordHash = bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS || 10));
    const user = await User.create({
        username,
        email,
        role,
        password:passwordHash
    });

    res.status(201).json({success:true, message:"Created new user", insertId:user.id});
});

// PUT
export const updateUser = catchAsync(async (req, res) => {
    const {id, username, email, role} = req.body;

    const [affectedRows] = await User.update({username, email, role}, {where:{id}});
    if(affectedRows == 0) {
        const exists = await User.count({ where: { id } });
        if (!exists) {
            res.status(404).json({success:false, errorMessage:"User not found"})
        }
    }
    res.status(200).json({success:true, message:"Updated user"})
});

// PUT
export const updateUserPassword = catchAsync(async (req, res) => {
    const {id, newPassword} = req.body;

    const passwordhash = await bcrypt.hash(newPassword, Number(process.env.BCRYPT_ROUNDS || 10));

    const [affectedRows] = await User.update({password:passwordhash}, {where:{id}});

    if(affectedRows == 0) {
        const exists = await User.count({ where: { id } });
        if (!exists) {
            res.status(404).json({success:false, errorMessage:"User not found"})
        }
    } else {
        res.status(200).json({success:true, message:"Updated user"});
    }

});

// DELETE
export const deleteUser = catchAsync(async (req, res) => {
    const {id} = req.body;

    const deleted = await User.destroy({where:{id}});
    if(!deleted) {
        res.status(404).json({success:false, errorMessage:"User not found"})
    } else {
        res.status(200).json({success:true, message:"deleted user"});
    }
});
