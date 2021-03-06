const sequelize=require('../connectivity/sequelCnnctn');
const 
{User,Blogs}=require('../models');
const blogData=require('./blogData.json');
const userData=require('../fertilizer/userData.json');
// const cmmntData=require('./fertilizer/cmmentData');
// const artcleData=require('./fertilizer/artcleData');

const feedDatabase=async()=>{
    await sequelize.sync({force:true});

    const users=await User.bulkCreate(userData,{
        individualHooks:true,
        returning:true,
    });
    for(const blog of blogData){
        await Blogs.create({
            ...blog,
            userId:users[Math.floor(Math.random()*users.length)].id
        });
    }
    process.exit(0)
};
feedDatabase();