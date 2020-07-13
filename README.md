# finance-web
Web based finance tracker being written in node.js and React.

### Information
The server relies on a few environment variables. In  the .env file you need to create:    
PORT=<Port number>  
DB_URL=<url of your database>  
JWT_SECRET=<Secret used to create jwt's>  

where PORT is the port the server will run on. This defaults to 5000 if nothing is set here.  
DB_URL is the conneciton string to connect to a MongoDB.  
JWT_SECRET is the secret that JWT uses to sign the authentication cookies.  

Both servers can be started by using ``` npm run dev ``` in the root folder. This will start
the express server on port PORT || 5000 and the react server on port 3000.

### Routes

``` POST /auth/signup ``` => Creates a new User.  
``` POST /auth/signin ``` => Signs in the user.  
``` GET /auth/signout ``` => Signs the user out.  
``` DELETE /user/:username ``` => Deletes the given user.    

``` POST /user/:username/transaction ``` => adds a transaction to the user given in :username  
``` DELETE /user/:username/transaction/:transactionId ``` => deletes the transaction :transactionId from the user with username :username    
``` GET /user/:username/month/:month/transactions ``` => returns all transactions for that month. (:month must be of the form mmm-yy, eg jan-20)  

``` GET /user/:username/transaction/types ``` => Returns income category and expenditure category arrays    
  
  
TODO:
    - display overall balance in navbar
    - ability to delete transaction
    - ability to delete user profile
    - add inital balance input whgen signing up
    - ability to alter current balance in edit profile