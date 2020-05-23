class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}


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

          var dbll = new DoublyLinkedList();
          dbll.insertHead(new Node("ibrahim"));

          text.innerHTML=url[3];

          Promise.all([connectDB(url[3]).then((ress)=>readDB(ress,url[3]))]).then((values) => {
            console.log(values);
          });
          //in the next world war, jacked knife jugernaut, I am born again
          //class="wo9IH QN7kB "
        }
      }
    }
    }
  });
  }, false);