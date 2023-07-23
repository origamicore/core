# TypeScript OrigamiCore
OrigamiCore is a powerful Node.js framework that allows you to develop your project maintainable, fast and easily

[Old Repository](https://www.npmjs.com/package/origamicore)
## Installation

OrigamiCore requires [Node.js](https://nodejs.org/) v14+ to run.
 
install OrigamiCore
```sh
npm install @origamicore/core@latest
```

install CLI
```sh
npm install @origamicore/cli@latest -g
```

### Create Projects

```sh
occli --new projectName
occli -n projectName
```

### Add Service

```sh
occli --addservice serviceName
occli -a serviceName
```


## Plugins
OrigamiCore is currently extended with the following plugins.
Instructions on how to use them in your own application are linked below.

| Plugin | README |
| ------ | ------ |
| Endpoint(express,socket) | [https://www.npmjs.com/package/@origamicore/endpoint] | 
| MongoDb | [https://www.npmjs.com/package/@origamicore/mongo] | 
| Redis | [https://www.npmjs.com/package/@origamicore/redis] |  
| EOSIO Hyperion | [https://www.npmjs.com/package/@origamicore/hyperion] | 