

var port;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("mamammma miaa "+request.msg);
        if(request.msg=="test"){
            sendResponse({msg: "here"}) ;
        }else{
        try{
            sendResponse({msg: respond()}) ;
        }catch(err){
           
        }
    }
    });



let flag = true;

function respond() {
            console.log("res")
 
            a = document.getElementsByClassName('oMwYe');
            if(a.length > 0){
                console.log("giving up");
                return "still have";
            }
            if(flag){
            console.log("sending message")
            return "done";
                flag=false;
           
        
        } 
    

}
  
  