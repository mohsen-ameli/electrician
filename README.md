## Getting Started

1. Install packages:

```bash
npm install
```

2. Check out the `.env.example` file. Copy it to a new `.env` file

3. Configure a PostgreSQL database. Make sure to include `?schema=public` at the end of the uri string. Copy the connection link to `.env`
   If using linux or mac, you can create a new postgres db by running

```bash
createdb -U user dbname
```

Then you have to configure prisma to apply the schema to your newly created db.

```bash
npx prisma db push
npx prisma generate
```

To create an admin user, send a POST request to `http://localhost:3000/api/admin`
with the following content:

```json
{
  "username": "user",
  "password": "pass",
  "email": "email@email.com"
}
```

4. Generate a new JWT secret token and copy it to `.env`

5. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
