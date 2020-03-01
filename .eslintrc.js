// 这个是eslint init自动生成的配置文件
module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "parser": "babel-eslint",   //
    "plugins": [
        "vue"
    ],
    "rules": {
      "no-new": "off" // 去掉某个规则
    }
};
