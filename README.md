

# zipLink!

A tool to shorten your URLs with ease along with features to search and analyse your generated URLs.

## How to Run zipLink?

Installation:

```bash
npm install
```

Run zipLink:

```bash
node index.js
```

## Internal Working

### Express

Express is used to build the basic CRUD structure that handles all the routes of the web-App.

### MongoDB

MongoDB Atlas is used as a cloud Database to store all the generated URLs and their notes. The database also has a collection for the basic authentication of the webApp. The URLs generated are linked to a particular user in the database. Atlas search is used to search URLs efficiently. The database also stores the number of clicks of all the stored URLs.

### Bootstrap

To add styling to the .ejs files.

## Takeaways

- Learned Express and MongoDB
- Implemented Atlas Search

## Reference

[https://www.youtube.com/watch?v=jnxnhbTO2RA](https://www.youtube.com/watch?v=jnxnhbTO2RA)

[https://expressjs.com/](https://expressjs.com/)

[https://www.mongodb.com/docs/](https://www.mongodb.com/docs/)
