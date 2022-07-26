const express = require('express')
const app = express()
const fs = require('fs')
const { get_data } = require('./meraki')
const port = 4000

get_data()
app.use(express.json())

app.get('/alldata', (req, res) => {
    const data = fs.readFileSync('course.json', 'utf-8')
    const clear_data = JSON.parse(data)
    res.send(clear_data)
})

app.get('/course/:id', (req, res) => {
    const data = fs.readFileSync('course.json', 'utf-8')
    const clear_data = JSON.parse(data)

    for (let ele of clear_data) {
        if (ele['id'] == req.params.id) {
            res.json(ele)
            console.log(ele);
            return
        }
    }
    res.send({ "status": "id not found..." })
})



app.delete('/delete/:id', (req,res)=>{
    const data = fs.readFileSync('course.json','utf-8')
    const clear_data = JSON.parse(data)
    let incremnt = 0

    for(let element of clear_data){
        if(element['id']==req.params.id) {
            clear_data.splice(incremnt, 1) 
            console.log(clear_data);
            fs.writeFile('course.json',JSON.stringify(clear_data,null,4),(err,data)=>{
                console.log('id deleted........');
            })
            res.send({'status': "id deleted....."})
            return
        }
        incremnt ++
    }
    res.send({'status': 'id not found....'})
})


app.put('/update/:id',(req, res)=>{
    const data = fs.readFileSync('course.json','utf-8', 'r')
    const clear_data = JSON.parse(data)
    const bodyData = req.body
    let ind = 0
    for (let ele of clear_data) {
        if (ele['id'] == req.params.id) {
            clear_data.splice(ind,1,bodyData)
            fs.writeFileSync('course.json',JSON.stringify(clear_data,null,4))
            res.send({"status":"success","message":"data update successfully...",data:bodyData})
            return
        }
        ind++
    }

    res.send({ "status": "id not found..." })

})



app.listen(port, () => {
    console.log(`server is connected.......`)
})