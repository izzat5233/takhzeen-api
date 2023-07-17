# API Manual

The API is live at https://takhzeen.azurewebsites.net/ for now.

## Setup

- Create a new file in the root folder named `.env` as follows:

```
  DB_NAME=...
  DB_USER=...
  DB_PASS=...
  ```

- Ask the IT department for the values and fill them out.
- **Make sure `.env` file is never uploaded to Github.**

## Endpoints

### `/find`

**related to all forms submitted at 'Find' page.**

- `GET /find` Returns all forms.
- `GET /find/:id` Returns the form with the given id.
- `POST /find` Creates a new form.
    - The body should be a json of the form data.
    - The response contains the id of the new form.
