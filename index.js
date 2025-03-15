import express from 'express'

const app = express()
const port = 3000 
app.use(express.json())

const dataArr = []
let countId = 1

// sending info of 1 tea
app.post("/teas",(req,res)=>{
    const {name, price} = req.body
    const newData = {id: countId++, name, price}
    dataArr.push(newData)
    res.status(201).send(newData)
})

/* app.get("/",(req,res)=>{
    res.send(`This is a server made on using express`)
})

app.get("/year",(req,res)=>{
    res.send(`This is 2025`)
})

app.get("/month",(req,res)=>{
    res.send(`This month is March`)
}) */

    //  info of all tea
    app.get("/teas",(req,res)=>{
        res.status(200).send(dataArr)
    })


    // geting a particular tea
    app.get("/teas/:id" , (req,res) =>{
        const tea = dataArr.find(tea => tea.id === parseInt(req.params.id))
        if(!tea){
            res.status(404).send(`We could not price for tea you are searching for please pick another one`)
        }
        res.status(200).send(tea)
    })

    // update tea 
    app.put("/teas/:id" , (req,res)=>{
        const tea = dataArr.find(tea => tea.id === parseInt(req.params.id))
        if(!tea){
            res.status(404).send(`We could not price for tea you are searching for please pick another one`)
        }
        const {name,price} = req.body
        tea.name = name
        tea.price = price
        res.send(200).send(tea)

    })

    // delete tea
    app.delete("/teas/:id" , (req,res)=>{
        const index = dataArr.findIndex(t => t.id === parseInt(req.params.id))
        if(index === -1){
            res.status(404).send("Tea not found")
        }
        dataArr.splice(index,1)
        return res.status(204).send("deleted")
    })

app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`)
} 
)