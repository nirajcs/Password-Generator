import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

const userController = {
    register : asyncHandler(async(req,res)=>{
        const { name,email,password } = req.body;
        const userExists = await User.findOne({email:email})
        if(userExists){
            res.status(401)
            throw new Error('User Already Exists')
        }
        const user = await User.create({
            name,
            email,
            password
        })
        if(user){
            await generateToken(res,user._id);
            res.status(200).json({
                _id:user._id,
                name:user.name,
                email:user.email
            });
        }else{
            res.status(401)
            throw new Error('User Registeration Failed')
        }
    }),

    authUser : asyncHandler(async(req,res)=>{
        const { email,password } = req.body
        let userExists = await User.findOne({email:email});
        if(userExists){
            if(await userExists.matchPassword(password)){
                await generateToken(res,userExists._id);
                res.status(200).json({
                    _id:userExists._id,
                    name:userExists.name,
                    email:userExists.email
                });
            }else{
                res.status(401)
                throw new Error("Incorrect Password");
            }
        }else{
            res.status(401)
            throw new Error("Invalid User")
        }
    }),

    getPassword: asyncHandler(async(req,res)=>{
        let userId = req.params.id
        let user = await User.findById(userId);
        if(user){
            res.status(200).json(user.savedcollection)
        }else{
            res.status(401)
            throw new Error("Failed to fetch collection")
        }
    }),

    deleteSaved: asyncHandler(async(req,res)=>{
        let userId = req.user._id
        let savedId = req.body.saved
        
        let user = await User.findById(userId)
        if(user){
            let newArr = user.savedcollection.filter((item)=>item._id != savedId)
            user.savedcollection = newArr
            let saveData = await user.save()
            if(saveData){
                res.status(200).json(saveData.savedcollection)
            }
        }else{
            res.status(401)
            throw new Error("User not Found")
        }
    }),

    savePassword: asyncHandler(async(req,res)=>{
        let { result } = req.body
        let userId = req.user._id
        let user = await User.findById(userId)
        if(user){
            user.savedcollection.push({ saved: result }); 
            await user.save()
            res.status(200).json(user);
        }else{
            res.status(401)
            throw new Error("Collection update failed")
        }
    }),

    logoutUser : asyncHandler(async(req,res)=>{
        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0),
          });
        res.status(200).json({message:"Logout Successful"})
    })
}

export default userController;