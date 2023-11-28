*First: you must install module
 You need open terminal and enter: 
    npm i express ejs socket.io uuid --save-dev nodemon -g peer peerjs
*Second: You run in terminal
    - open 2 terminal:
        + terminal 1 : you run port 3001
            .enter in terminal: Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned
            .and then enter: peerjs --port 3001 (Because I hard set port is 3001)
        + terminal 2 : you run localhost by port 3000
            . enter in terminal: npm run start
*Third: Run in web:
        +Open web such as Chrome, Cốc Cốc,...
        +Enter: http://localhost:3000 (Because I hard set port in my code is 3000)