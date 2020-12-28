const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Product=require('./productSchema');

router.get('/',(req,res,next)=>{
   Product.find().exec().then(result=>{
       res.status(200).json({
           message:'data fetched successfully',
           data:result
       })
     } ).catch(result=>{
         res.status(500).json({error:result});
     });
});

router.get('/:Id',(req,res,next)=>{
    const id=req.params.Id;
    Product.findById({_id:id}).exec().then(result=>{
        res.status(200).json({
            data:result
        })
    }).catch(err=>{
        res.status(404).json(err);
    });
})

router.post('/',(req,res,next)=>{
    const products= new Product({
      _id:mongoose.Types.ObjectId(),
      name:req.body.name,
      country:req.body.country
    });
    products.save().then(result=>{
        res.status(200).json({
            message:'record addded successfully',
            created:result
        })
    }).catch();
    
});

router.delete('/:Id',(req,res,next)=>{
    const id=req.params.Id;
    Product.remove({_id:id}).exec().then(
        result=>{
            res.status(200).json({
                message:'record removed successfully',
                removedData:result
            })
        }
    ).catch(result=>{
        res.status(500).json({
            error:result
        })
    });
});

router.patch('/:Id',(req,res,next)=>{
   const id=req.params.Id;
   Product.update({_id:id},{$set:{name:req.body.name,country:req.body.country}}).exec().then(result=>{
    
        res.status(200).json({
        
            'message' :'record updated suceessfully',
             updatedData: result
         
        })
    
   }
       
   ).catch(err=>{
       res.status(500).json({error:err});
   });
})

module.exports=router;