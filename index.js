const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const env=require('dotenv');
const bodyParser=require('body-parser');

const app=express();

app.use(bodyParser());
app.use(cors());

const DATABASE_URL="mongodb+srv://pranjali:pranjali@cluster0.uwykvxw.mongodb.net/"
const PORT=2000;

app.listen(PORT,()=>{
    console.log(`Server running at ${PORT}`)
});

mongoose.connect(`${DATABASE_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Database Connected");
    })
    .catch((err) => {
        console.error(err);
    });

const donorRoutes=require('./routes/donor');
const receiverRoutes=require('./routes/receiver');
const medicineRoutes=require('./routes/medicine')
const adminRoutes=require('./routes/admin')

app.use('/donor',donorRoutes);
app.use('/receiver',receiverRoutes);
app.use('/medicine',medicineRoutes);
app.use('/admin',adminRoutes);