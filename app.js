const https=require('https');
const express=require('express');

const app=express();

const URL="https://api.data.gov.in/resource/c10ba00b-090c-42c1-b2ad-02fb5541e864?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&offset=0&limit=10";

function month_parse(month){
    monArr=["January","February","March","April","May","June","July","August","September","October","November","December"];
    return monArr[month+3];
    
}


app.listen(2403,function(){
    console.log("started");

});



app.get("/",function(req,res){
    res.send("ok");    
});

app.get("/data",function(req,res){
    https.get(URL,function(res_API){
        res_API.on("data",function(data){
            data=JSON.parse(data);
            let rec=data.records;
            rec.forEach(function(record,index){
                res.write("<p>Month "+month_parse(index)+"</br>Petrol: "+record.product_rsp__delhi____petrol__rs__litre_+"</br>"+ "Diesel: "+record.product_rsp__delhi____diesel__rs__litre_+"</p>");
                res.write("</br>");
            })
            res.send();
            
           
        })
    })
})

