# Node Thrift Generator

An easy way to compile thrift idl files using simple configuration.

## Use globally

### Install
```npm install -g thrift-generator```

### Use with configuration file (package.json is used by default)
```thrift-generator --config=config-file.json```


## Use as a script

### Install
```npm install --save-dev thrift-generator```

### Add configuration to your package.json
```
{
  "thrift-generator": {
    "log": "debug",
    "generators": [
      {
        "languages": [
          "js:node",
          "java"
        ],
        "idl": "**/.thrift",
        "output": "./dist"
      }
    ]
  }
}
```

### Add as a script on your package.json
```
{
 "scripts": {
    "thrift": "thrift-generator"
  }
}
```

# Configuration
TBA
