//post 
let req2 = new XMLHttpRequest();

req2.onreadystatechange = () => {
  if (req2.readyState == XMLHttpRequest.DONE) {
    console.log(req2.responseText);
  }
};

req2.open("POST", "https://api.jsonbin.io/b5ff961a1f52f70204abccc4e", true);
req2.setRequestHeader("Content-Type", "application/json");
req2.setRequestHeader("secret-key", "5ff7555563e86571a2e3216a");
req2.send('{"Sample": "Hello World post"}');


//put
   let req3 = new XMLHttpRequest();

req3.onreadystatechange = () => {
  if (req3.readyState == XMLHttpRequest.DONE) {
    console.log(req3.responseText);
  }
};

req3.open("PUT", "https://api.jsonbin.io/b/5ff961a1f52f70204abccc4e", true);
req3.setRequestHeader("Content-Type", "application/json");
req3.send('{"Sample": "Hello World put"}');


//post schema
let req = new XMLHttpRequest();

req.onreadystatechange = () => {
  if (req.readyState == XMLHttpRequest.DONE) {
    console.log(req.responseText);
  }
};

req.open("POST", "https://api.jsonbin.io/s/", true);
req.setRequestHeader("Content-Type", "application/json");
req.setRequestHeader("secret-key", "$2b$10$MC7WsM2nFKf.X0X7Mls4w.0Ijauk9tyXOYV2VYxhtt8ncozO19uGi");
req.send('{ "messageText": "Whats up?",  "author": "John",  "date": "20210106170642415" }');