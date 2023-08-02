# API Manual

The API is live at https://takhzeen.azurewebsites.net/ for now.

## Setup

- Create a new file in the root folder named `.env` as follows:

```
  DB_NAME=...[the database name]
  DB_USER=...[the database username]
  DB_PASS=...[the database password]
  JWT_SECRET=...[the JWT generator secret, any random value]
  ALLOWED_ORIGINGS=...[the website domains allowed to access this server]
  ```

- Ask the IT department for the values and fill them out.
- **Make sure `.env` file is never uploaded to Github.**

## Endpoints

### `/form`

**related to all submitted forms.**

For development & testing purposes:

- `GET /form` Returns all forms.
- `GET /form/:id` Returns the form with the given id.

Client safe endpoints:

- `POST /form` Creates a new form.
    - The body should be a json of the form data.
    - The response contains a jwt token `response.json().token`
    - The token can be used for further updates and operations on form.
- `GET /form` Returns the form corresponding to the token in the authorization header.
- `PATCH /form` Updates the form corresponding to the token in the authorization header.

### '/storage'

**related to all storages data**

- `GET /storage` Returns all storages data in the database.