const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const Form = require('./models/registration')
const ejsMate = require('ejs-mate')
const { find } = require('./models/registration')

const dbUrl = 'mongodb://localhost:27017/lvcasta'

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"))
db.once("open", ()=>{
    console.log("Database Connected")
})
const app = express()

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
//app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))

// Form Body Parser
app.use(express.urlencoded({ extended: true}))

//Homepage
app.get('/', (req, res) =>{
    res.render('home')
})

app.get('/verify', async(req, res) =>{
    // const search = req.query;
    // const form = Form.find(search)
    // console.log(form)
    let results;
    res.render('verify', {
        results
    })   
})

app.post('/verify', async(req, res) =>{
    const search = req.body.search;
    Form.find({search}).then(
        form => {
            function filterItems(arr, query) {
                return arr.filter(function(el) {
                  return el.toString().toLowerCase().indexOf(query.toLowerCase()) !== -1
                })
              }

              let results = filterItems(form, search);

              console.log(results);
            res.render('verify', {
                results
            })   
        }
    )
    // console.log(form)
})

app.post('/submit', async(req, res)=>{
    const verify = new Form(req.body.verify)
    await verify.save()
    // console.log(verify)
    res.redirect('/')
})

const port = 5000;
app.listen(port, () =>{
    console.log(`Server started on port ${port}`);
})