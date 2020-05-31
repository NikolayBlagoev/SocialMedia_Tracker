//Node Class for the DLL

class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

//DLL for easier traversal

class DoublyLinkedList {
  constructor() {
    this.length = 0;
    this.head = new Node("HEAD NULL");
    this.tail = new Node("TAIL NULL");
    this.head.next=this.tail;
    this.tail.prev=this.head;
  }
  isEmpty(){
    if(this.length=0) return true;
    return false;
  }
  remove(index){

  }

  insertHead(nodeToAdd){
    var bufNode=this.head.next;
    bufNode.prev=nodeToAdd;
    this.head.next=nodeToAdd;
    this.length++;
  }
  insertTail(nodeToAdd){
    var bufNode=this.tail.prev;
    bufNode.next=nodeToAdd;
    this.tail.prev=nodeToAdd;
    this.length++;
  }
  popHead(){
    if(length==0){
      return null;
    }
    var bufNode=this.head.next;
    this.head.next=this.head.next.next;
    this.head.next.prev=this.head;
    length--;
    return bufNode;
  }
  popTail(){

  }
  firstElement(){
    if(length==0){
      return null;
    }
    return this.head.next;
  }
  findAndRemove(valueToSearch){

  }
  
}




//Get current followers from page
//Communication between extension and injected script
var readPage = (resolve, reject)=>{
  return new Promise((resolve, reject)=>{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      
      chrome.tabs.sendMessage(tabs[0].id, {msg: "send info"}, function(response) {
        console.log(response.msg);
        resolve("a")
      });
    });
    
  });
}


//Get information from indexedDB
var readDB = (db,username) => {
  return new Promise((resolve, reject) => {
    try{
    var trx = db.transaction(username, "readwrite").objectStore(username);
    let requeste = trx.getAllKeys();
    requeste.onsuccess = (res) => { 
      resolve(res.target.result);
    }
    requeste.onerror = (e) => {
      reject(e);
    }
  }catch (e){
  
  }
  });
}


//Connect to indexedDB
var connectDB = (username,resolve, reject) => {
  return new Promise((resolve, reject) => {
    window.indexedDB=window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB;
    if(!window.indexedDB){
      alert("hel");
    }
    req = window.indexedDB.open(username, 1);    
    req.onsuccess = (ev) => {       
      resolve(ev.target.result);
    }
    req.onupgradeneeded = (event) => {
      console.log("here")
      event.target.result.createObjectStore(username);
      arr=[]
      resolve(event.target.result);
    }
    req.onerror = (e) => {
      reject(e);
    }
  });
}


//Inject script
function inject(){
  //Makes sure we don't inject twice.
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        
    chrome.tabs.sendMessage(tabs[0].id, {msg: "test"}, function(response) {
      try{
      console.log(response.msg);
      }catch(err){
        chrome.tabs.executeScript(null, {
        file: "content.js"
        }, function() {});
      }
    });

  });
}



function main(){

}

button =document.getElementById("done"); 
document.addEventListener("DOMContentLoaded", function() {
  text = document.getElementById("fuck"); 
  
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
   
    let url = tabs[0].url;
    if(url!=null){
      url=url.split('/');
      if(url.length>3){
     
      if(url[2]=="www.instagram.com"){
        text.innerHTML="Please navigate to your account's followers list"
        if(url.length==4||url.length==5){
          text.innerHTML="Please navigate to your account's followers list"
        }else{
          //User has opened their follower list
          var dbll = new DoublyLinkedList();
          dbll.insertHead(new Node("ibrahim"));

          //We inject sctript
          inject();


          
          text.innerHTML="Click the button when you have scrolled to the bottom of your follower list";
          button.style.visibility='visible';
         
          button.addEventListener("click", function(){
           
            Promise.all([readPage(),connectDB(url[3]).then((ress)=>readDB(ress,url[3]))]).then((values) => {
              console.log(values);
            });
          });


        
          //in the next world war, jacked knife jugernaut, I am born again
          //class="wo9IH QN7kB "
        }
      }
    }
    }
  });



  
  }, false);