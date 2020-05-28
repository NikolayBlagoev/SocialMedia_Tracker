

var port =chrome.runtime.connect({name: "instagramTracker"});



port.onMessage.addListener(function(msg) {
    console.log(msg);
    try{
    respond();
    }catch(err){
        port =chrome.runtime.connect({name: "instagramTracker"});
        try{
            respond();
        }catch(err0){

        }
    }
});

let flag = true;

function respond() {

 
            a = document.getElementsByClassName('oMwYe');
            if(a.length > 0){
                console.log("giving up")
                return;
            }
            if(flag){
            console.log("sending message")
            
                port.postMessage({source: "ended"});
                flag=false;
           
        
        } 
    

}
  
  