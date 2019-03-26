// Moduels

const express =  require("express");

const ActionRouter = express.Router();

const actionDb = require("./helpers/actionModel")

const projectRouter = express.Router();

const projectDb = require("./helpers/projectModel")

module.exports = ActionRouter




ActionRouter.get("/",async(req,res)=>{

    try{

        const actions=await actionDb.get();

        if (actions){

            res.status(200).json(actions);

        } else {
            res.status(400).json({message:"actions doesn't exist"});    
        }
    } catch(error){


        res.status(500).json({message:error})
    }

})
ActionRouter.get("/:id",async(req,res)=>{
       try{
        
        
        const id =req.params.id;
       
       
        if(id){
         
         
            const result= await actionDb.get(id)
        
        
            res
            .status(200).json(result)

           }else{
   
            res.status(400).json({message:"action id doesn't exist"})
           }
       }
  
       catch(error){
    
        res.
        status(500).json({error:"Can't get the action with the specified id"})
       }



})

ActionRouter.post("/", async(req,res)=>{

    try{

        const newAction = req.body;
        if(newAction.project_id ){
            
            const project = await projectDb.get(newAction.project_id )
            
            if (project == null) {
            
                res.status(400).json({message:"Specified project does not exist"})
            
                return;
            }
            if(newAction.description.length<=128 && typeof newAction.notes==="string"){   
            
                const result = await actionDb.insert(newAction)
            
                res.status(200).json({message:"New Action has been sucessfully posted"})
            }else{
            
                res.status(400).json({message:"Description should be at max of 128 characters or below"})
            }
        }else{
            
            res.status(400).json({message:" Warning Id Not found"})
        }

    }catch(error){
        res.
        status(500).json({message:"Can't insert the new action in the database"})
    }
})


ActionRouter.delete("/:id",async(req,res)=>{
    
    try{
  
        const id =req.params.id;
  
        if(id){
  
            const result = await actionDb.remove(id)
  
            res.status(200).json({message:"Action has been sucessfully deleted"})

        }else{
  
            res.status(400).json({message:"Id not Obtained"}) 
        }
    }catch(error){
  
        res.status(500).json({error:" id not deleted "})
    }

})

ActionRouter.put ("/:id" , async(req,res)=>{
      
    try{
          
        const resource= req.body;
  

          const id=req.params.id
    
          if(id){
    
            try {  
    
                const action = await actionDb.get(id)
    
            } catch (error ){
    
                res.status(400).json({message:"Error reading action with id " + id})
    
                return;
            }    
    
            const result=await actionDb.update(id,resource)
    

            res.status(200).json({message:"Success Reosurce update"})
         
        }else{
        
            res.status(400).json({message:" Id don't exist"})
          }
      }
      catch(error){

        res.status(500).json({error:"Resource cant Update"})
      }

})