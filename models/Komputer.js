const mongoose = require("mongoose")

const komputerSchema = new mongoose.Schema({
   model: {
       type: String,
       required: [true , "Название обязательно!"], 
       trim: true
   },
   description: {
       type:String,
       required:  [true , "Описание обязательно!"],
       trim: true
   },

   color:{
    type:String,
    required:  [true , "Описание обязательно!"],
    trim: true
   },
   price: {
       type: Number,
       required: [true , "Цена обязательна!"],
       min: 0
   }
})

module.exports = mongoose.model('Komputer' , komputerSchema)