# Update Movies in Backend

In order to have an account you need to create an environment variable called `JWT_SECRET=[yourkey]` that is set to anything. To do this create a file called .env.local in the express-backend folder and add that line. This is for sending an encrypted web token to the frontend.

```bash
npm start dev
```

In a new terminal run the following command to update the movies in the database.

```bash
node src/movieapi.js
```
