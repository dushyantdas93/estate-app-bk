import prisma from "../lib/prisma.js";


export const getPosts = async (req,res)=>{

    try {
        const getPost = await prisma.

        res.status(200).json(getPost)
        
    } catch (error) {
        res.status(500).json({message:"failed"})
    }


}

export const getPost = async (req,res) => {
    const id = req.params.id
    console.log(id)
    try {
        const getpost = await prisma.post.findUnique({
            where:{ id },
        })
        res.status(200).json(getpost)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"failed"})
        
    }
}

export const addPost = async (req,res) =>{
    const body = req.body
    const tokenUserId = req.userId
    try {
        // console.log(body,tokenUserId)
        const newPost = await prisma.post.create({
            data:{
                ...body,
                userId:tokenUserId,
            }
        })
        res.status(200).json(newPost)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"failed"})
        
    }
}

export const updatePost = async (req,res) =>{
    const id = req.params.id
    const tokenUserId = req.userId
    try {

        const post = await prisma.post.findUnique({
            where:{id}
        })

        if(post.userId !== tokenUserId){
            return res.status(403).json({message:"not authorized"})
        }

        await prisma.post.delete({
            where:{ id }
        })
        res.status(200).json({message:"post deleted"})
        
    } catch (error) {
        res.status(500).json({message:"failed"})
        
    }
}

export const deletePost = async (req,res) =>{
    try {
        res.status(200).json({message:"post to getdfshdfhsd"})
        
    } catch (error) {
        res.status(500).json({message:"failed"})
        
    }
}
