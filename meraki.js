const fs = require('fs')
const axios = require('axios')
const { get } = require('http')


async function get_data(){
    if(!(fs.existsSync("course.json"))){
        cources= await axios.get("https://api.merakilearn.org/courses")
        fs.writeFile("course.json",JSON.stringify(cources.data,null,4),(data)=>{console.log(data);})

    }
}
get_data()



module.exports={get_data}