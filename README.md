# monero-lws-admin

This is a simple web-based GUI for managing accounts on your Monero Light Wallet Server by connecting to your LWS's Admin Rest server endpoint (a hot new feature on LWS develop branch).  To use it, you'll need to have the admin server flag enabled on your LWS, and you'll need a valid admin key.  

For today, this is built for Uncle Jims / managing just a handful of accounts- there's no pagination, no tables, just a simple dashboard.  If you're a corporate entity with 600000000 accounts, this tool won't work for you. 

Warning: This tool is for internal, private network use only. Do *not* expose publically to the world or someone will lay havoc on your Light Wallet Server.  

Make sure to take extreme caution when enabling the admin-rest-server flag on your Light Wallet Server- i.e. you may have your LWS publically available, but you will likely want to run your admin server on a different port that is only available from localhost or your internal network.

## Features:

- View and approve account requests
- Disable accounts
- View active and inactive accounts
- Rescan active accounts
- Add new accounts

## Images


<center> 
<figure>
<img src="doc-assets/monero-lws-admin.png" width="800">
<figcaption>Monero LWS Admin Dashboard</figcaption>
</figure>
</center>

## Install / Run

Using Node (18) /JS: 

```bash
npm i && NUXT_LWS_API_KEY=yourapikey NUXT_LWS_ADMIN_URL=http://your-ip:1234 npm run dev
```

If you don't want to set the environment variables inline, you can create a .env file in the base directory of the repo and add your environment variables there:

```bash
# .env
NUXT_LWS_API_KEY=yourapikey
NUXT_LWS_ADMIN_URL=http://your-admin-ip:1234
```

Docker: 

```bash
# First set your environment variables - NUXT_LWS_API_KEY and NUXT_LWS_ADMIN_URL in docker-compose.yml
docker compose up -d 
```

## Future

I will continue to add features as I need them, but I'm very welcome to PR's, style updates, etc.

## Donate

If you like this project, please feel free to donate to **[CryptoGrampy](https://twitter.com/CryptoGrampy)!**

```
89fwEPosk5oVypzqTDtAiScuyDiMzh8bD4d1TYiEWp4c12MJ3jou19b3YR6LhZ38Uj3NVPYhU4JoeQgmygHrBNFzDKUnVL3
```
