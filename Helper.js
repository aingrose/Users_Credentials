
import bcrypt from "bcrypt"
import { client } from "./index.js"
import { ObjectId } from "mongodb"; 

const genPassword = async (Password) =>{
    const salt =  await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(Password,salt)
    return hashPassword
}


const createUser = async (Username,Password) =>{
    return await client.db("RaftLabs").collection("Users").insertOne({Username:Username,Password:Password})
}
 
const getUser = async (Username) => {
    return await client.db("RaftLabs").collection("Users").findOne({Username:Username})
}

const deletedProfile= async (userId) => {
    return await client.db("RaftLabs").collection("Users").deleteOne({_id:new ObjectId(userId)  })
}




const updateProfile = async (userId,email, age, dob, contact,city) => {
    try {
        const filter = {_id: new ObjectId(userId)};
        const updateDoc = {
            $set: {
                email:email,
                age: age,
                dob: dob,
                contact: contact,
                city:city
            }
        };
        const options = { upsert: false };  
        const result = await client.db("RaftLabs").collection("Users").updateOne(filter, updateDoc, options);
        return result;

    } catch (error) {
        console.error("Error updating profile:", error);
        throw error;
    }
};

const getProfile = async (userId) => {
    try {
        const profile = await client.db("RaftLabs").collection("Users").findOne({ _id:new ObjectId(userId)  });
        return profile;
    } catch (error) {
        console.error("Error fetching profile:", error);
        throw error;
    }
};




const newProfile = async (userId,email,age,dob,contact,city) =>{
    return await client.db("RaftLabs").collection("Profiles").insertOne({_id :new ObjectId(userId),email:email,age:age,dob:dob,contact:contact,city:city})
}
 


export {genPassword ,createUser,getUser,getProfile,updateProfile,newProfile,deletedProfile}