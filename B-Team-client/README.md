CodeWorks Vue Starter
=====================



Broken stuff
- In the comments service the get is using the ... operator rather then just reassigning the AppState
- In the posts service the get all posts has and extra /
- In the posts service the delete is using ", id" rather then a "+ id"



Broken stuff in the server
- In the post controller the .use() is below the post route
- In the post service the getAll takes in a query but never defaults it to an empty object, "query = {}" in the params
- In the post service the getById is populating incorrectly, the c should be capitalized
