

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

![Screenshot from 2023-06-28 16-45-13](https://github.com/Yash-1907/zipILink-url-shortner/assets/76249576/ed7b0862-f453-47a0-a942-184e1080a886)

![Screenshot from 2023-06-28 16-46-22](https://github.com/Yash-1907/zipILink-url-shortner/assets/76249576/918829f4-360c-4c63-968b-a73255a73d83)

![Screenshot from 2023-06-28 16-46-40](https://github.com/Yash-1907/zipILink-url-shortner/assets/76249576/1a35dd36-2d9b-43c5-a50e-c89e5286a644)


## Takeaways

- Learned Express and MongoDB
- Implemented Atlas Search

## Reference

[https://www.youtube.com/watch?v=jnxnhbTO2RA](https://www.youtube.com/watch?v=jnxnhbTO2RA)

[https://expressjs.com/](https://expressjs.com/)

[https://www.mongodb.com/docs/](https://www.mongodb.com/docs/)
