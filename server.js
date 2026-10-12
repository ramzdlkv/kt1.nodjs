const express = require("express")
const mongoose = require("mongoose")
const Komputer = require("./models/Komputer")
const PORT=  5000;

const app = express();
app.use(express.json());

mongoose
    .connect("mongodb://localhost:27017/komputer")
    .then(() => {
        console.log("Успешное подкючение");
        
    })
    .catch((error) => {
        console.log("Ошибка при подключении к БД: " + error);
      });
    
    app.get("/komputer", async (req, res) => {
      try {
        const komputer = await Komputer.find();
      res.json(komputer);
      } catch (error) {
        console.log("Ошибка при получении компьютера: " + error);
      }
    });

    app.get("/komputer/:id", async (req, res) => {
      try {
        const {id} = req.params
        const komputer = await Komputer.findById(id)


        if (!komputer) {
          return res.status(404).send("такого компьютера не существует")
        }
        res.send(komputer)
      } catch (error) {
        console.log("Ошибка при подключении 1 компьютера" + error);
        
      }
    });

    
    app.post("/addkomputer", async (req, res) => {
      const { model, description, color, price } = req.body;
      const newKomputer = await Komputer.create({
        model,
        description,
        color,
        price
      });
      console.log(req.body);
      
      await newKomputer.save();
      res.send("Компьютер успешно добавлен!");
    });
    
    app.patch('/komputer/:id' , async (req , res) =>{
      
    try{
      const {id} = req.params
      const {title , description , color, price} = req.body
    
      const updateKomputer = await Product.findByIdAndUpdate(id , {model , description , color, price});
    if(!updateKomputer){
      res.send("Такого компьютера не сущетсвует!")
    }
    
      res.send("Данные успешно изменены!")
    
      
    }catch(error){
    console.log("Ошибка не удалось выполнить команду: " + error);
    
    }
    
    
    })
    
    app.put("/komputer/:id" , async (req , res)=>{
      try{

        const updateKomputer = await Komputer.findByIdAndUpdate(id , {model, description, color, price} )
      }catch(error){
    
      }
    })
    
    app.delete("/deletekomputer/:id" , async (req , res)=>{
        try{
            const {id} = req.params
            
            const komputer = await Komputer.findByIdAndDelete(id)
            if (!komputer) {
              res.send("Компьютер не найден!")
            }
            res.send("Компьютер успешно удален!")
        }catch(error){
            console.log("Ошибка при удалении Компьюера: " + error);
            
        }
    })
    
    app.listen(PORT, () => {
      console.log("Сервер успешно запущен на порту http://localhost:" + PORT);
    });
    