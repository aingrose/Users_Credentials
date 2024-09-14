import express from "express";
import { auth } from "../Middleware/Auth.js"; 
import { getProfile,createProfile,updateProfile, newProfile, deletedProfile } from "../Helper.js";
const router = express.Router();


router.post("/newProfile",auth,async (req,res)=>{
    try{
        const {email,age,dob,contact,city} = req.body
        const userId  = req.user._id;
        
        const newone = await newProfile(userId,email,age,dob,contact,city)
        res.status(201).json(newone)


    }catch(error){
        res.status(500).json({message:"Error creating profile",error})
    }

}) 


// Get Profile
router.get("/profile", auth, async (req, res) => {
    try {
       const userId = req.query
        const profile = await getProfile(userId);
        console.log("jj",profile)
        console.log("toke",req.user.id)
        if (!profile) {
            return res.status(404).send({ message: "Profile not found" });
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});




// Update Profile

router.put('/update', auth, async (req, res) => {
    try {
        const { email,age, dob, contact,city } = req.body;
        const {id:userId} = req.user
        // Get the user ID from the token
       console.log("idss",userId) 

        // Fetch the current user profile from the database
        const currentProfile = await getProfile(userId);

        if (!currentProfile) {
         
            return res.json({ message: 'Profile is not there ' });
        } else {
            
            const result = await updateProfile(userId, email,age, dob, contact,city);
            return res.json({ message: 'Profile updated successfully'});
        }
    } catch (error) {
        console.error('Error updating or creating profile:', error);
        res.status(500).json({ message: 'Error updating or creating profile', error: error.message });
    }
});

router.delete("/delete", auth, async (req, res) => {
    try {
        const {userId} = req.query
        const deleteone = await deletedProfile(userId);

        if (!deleteone) return res.status(404).json({ message: "Profile not found" });
        res.status(200).json({ message: "Profile deleted", deletedProfile });
    } catch (error) {
        res.status(500).json({ message: "Error deleting profile", error });
    }
});


;






export const ProfileRouter = router;
