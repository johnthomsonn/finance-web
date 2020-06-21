# finance-web
Web based finance tracker being written in node.js and React.

### Information
The server relies on a few environment variables. In  the .env file you need to create:    
PORT=<Port number>  
DB_URL=<url of your database>  
JWT_SECRET=<Secret used to create jwt's>  


### Routes

``` POST /auth/signup ``` => Creates a new User.  
``` POST /auth/signin ``` => Signs in the user.  
``` GET /auth/signout ``` => Signs the user out.  

``` POST /user/:username/transaction ``` => adds a transaction to the user given in :username     
