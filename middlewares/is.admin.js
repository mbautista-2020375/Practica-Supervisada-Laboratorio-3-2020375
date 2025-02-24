export const isAdmin = async(req, res, next)=>{
    console.log("Admin verification: ");
    
    try{
        const { user } = req
        if(!user  || user.role !== 'ADMIN'){ 
            console.log(`-> You dont have access | username ${user.username}`);
            return res.status(403).send(
            {
                success: false,
                message: `Admin verification -> You dont have access | username ${user.username}`
            }
            
        )
        
        
    }
        next()
    }catch(err){
        console.error(err)
        return res.status(403).send(
            {
                success: false,
                message: 'Admin verification -> Unauthorized role'
            }
        )
    }
}