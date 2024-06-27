//authentication using middleware

const z = require("zod");
const express = require("express");
const app = express();
const port = 3000;


const schema = z.object({
  username: z.string().optional(),
  password: z.string().min(5).optional(),
 kidneyId: z.number().optional(),
 kidneys: z.array(z.number())
});



function userMiddleware(req, res, next) {
    
  const username = req.headers.username;
  const password = req.headers.password;
 const kidneyId = parseInt(req.query.kidneyId);
 const kidneys = req.body.kidneys;

  const validation = schema.safeParse({ kidneys});
  if (!validation.success) {
    res.status(400).json({
      msg: "Something wrong with inputs",
    });
  } else {
    next();
  }
}




app.use(express.json()); //for body parser

/*app.get('/health-checkup', userMiddleware, (req, res) => {

    res.json({
        "msg":"Kidney is healthy"
    })
});*/




app.post("/health-checkup",userMiddleware,(req, res) => {
   const validation = schema.safeParse(req.body);
  if(!validation.success){
    res.status(400).json({
      msg: "Something wrong with kidney",
      error: validation.error.errors
});
}else{
    res.json({
        "msg":"Kidney is healthy"
    })
}

 })

// global catches
app.use((error, req, res, next) => {
  res.json({
    msg: "Something went wrong",
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
