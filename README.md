# Aergo Web Example Project

This is an example project using Vue + Aergo.

In the future you can generate this kind of project using a new CLI tool.

For now, clone this repository and then:

1. Run a local Aergo node in test mode: `docker run -d -p 7845:7845 --name aergo_test aergo/node aergosvr --config /aergo/testmode.toml`
2. Run the client:

```
cd client
npm i  // or yarn
npm run serve  // or yarn run serve
```