const express =  require('express');
const app =  express();
const mysql =  require('mysql');

app.use(express.urlencoded({extended:false}));
app.use(express.json());
//Create a connection to our database
let conn = mysql.createConnection({
    host: '127.0.0.1', //127.0.0.1
    user: 'newuser',
    password: 'password',
    database: 'microhard'
});

//Test our database connection
conn.connect(function(err){
    if(err){
        console.log(err);
    }else{
        console.log('Database is connected!');
    }
});

app.get('/', function(req, res){
    let sql = 'SELECT * FROM students';
    conn.query(sql, function(err, result){
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    });    
});


app.post ('/', function (req,res){
    let sql = `insert into students ( first_name , last_name , age , gender , gpa , department_id) values('${req.body.first_name}' , '${req.body.last_name}' , ${req.body.age} , '${req.body.gender}' , ${req.body.gpa}, ${req.body.department_id} )`;
    conn.query(sql, function(err,result){
        if(err){
            res.send(err);
        }
        else{
            res.redirect('/');
        }
    })
});

app.get('/testconnect',function(req,res){
if(conn!=null){
    res.send('connect success') ;
}else{
    res.send('connect fail');
}
});
// GET all students
app.get('/students' , function ( req , res){
    conn.query('SELECT * FROM students' , function ( err ,rows , field){
        if(!err){
           // console.log(rows[0].department_id);
           res.send(rows);
        }else{
            res.send(error);
        }
    });
});

// GET a specific students
app.get('/students/:id' , function ( req , res){
    conn.query('SELECT * FROM students WHERE department_id=?' , [req.params.id] , function ( err,rows , field){
        if(!err){
           // console.log(rows[0].department_id);
           res.send(rows);
        }else{
            res.send(error);
        }
    });
});

// insert a specific students
app.delete('/students/:id' , function ( req , res){
    conn.query('DELETE FROM students WHERE department_id=?' , [req.params.id] , function ( err, rows , field){
        if(!err){
           // console.log(rows[0].department_id);
           res.send(' deleted successfuly');
        }else{
            res.send(error);
        }
    });
});
// update a specific students

app.put ('/', function (req,res){
    let sql = `UPDATE students SET ( first_name , last_name , age , gender , gpa , department_id) values('${req.body.first_name}' , '${req.body.last_name}' , ${req.body.age} , '${req.body.gender}' , ${req.body.gpa}, ${req.body.department_id} )`;
    conn.query(sql, function(err,result){
        if(err){
            res.send(err);
        }
        else{
            res.redirect('/');
        }
    })
});



app.listen(3000, function(){
    console.log('Server running on port 3000...');
});

 
 