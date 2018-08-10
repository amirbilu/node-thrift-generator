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
        "language": [
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
## config.log
Log level, can be 'info' or debug **(default: info)**

## config.executable
Thrift cli executable path **(default: thrift)**

## config.ignore
Array of glob patterns to ignore while searching for thrift idl files.


## config.genereators
Array of thrift genereation commands

### genereator.language 
Language to generate, can be a string or an array of languages

### generator.idl
Path to idl file/s. supports globbing **(default: \**/*.thrift)**

### generator.output
Output folder.
If **generator.language** is an array, then files will be genereated at output/gen-\*,
otherwise, files will be genereated at output (no gen-\* will be created).






