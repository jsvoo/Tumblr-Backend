# Tumblr-Backend
This project contains all endpoints built for and integrated into the Tumblr-clone project (https://github.com/jsvoo/tumblr-clone))

DOCUMENTATION

TO RUN
Simply visit https://tumblr-api.cyclic.app/ to view endpoints online.
Alternatively, to run this app on your local machine, run npm install to install all neccessary dependencies. Run npm start to start development server. Once it's connected, you'd get a message on your console that reads "Running on http://localhost:4000" and "Cloud Database Connected". CLick the previous link to view endpoints on your browser.

CONST url = http://localhost:4000

GET REQUESTS
    POSTS/UUSERS

        *All Posts: route to get all posts = url/posts
        *Single post route = url/post/:id : where id is a the post ID passed as params
        *User's posts route = url/user/:id/posts: where id is the ID of the user whose post you wish to get.
        *Post's likes route = url/:post_id/likes
        *Post's comments route = url/comments/:post_id
        *Post categories route = url/posts/categories
         *All users route = url/users

    OTHERS
        *All comments = url/comments
        *All likes = url/likes

NOTE: Routes for POST, PUT, DELETE and some GET Requests are withheld for security reasons.
