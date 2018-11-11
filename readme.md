# ARK PARADIGM BACKEND CHALLENGE

### Usage

run `npm install` to install project dependencies
run `npm start` to start server on port 3000 (default unless specified by env file)

### API ENDPOINTS

You can append to the JSON file by posting to `/update` and you can search file for key using `/get`
By design choice the JSON requests are stored within in an array called requests within the JSON file currently named as `requests.json`. The JSON File is stored as such:

``` javascript
{
    "requests": [
        {"request1": "data1"},
        {"request2": "data2},
    ]
}
```

#### Update

Make sure it's valid JSON or request won't go through and use application/json content-type. Ex. is as follows

```javascript
{
    "Hello": "World",
    "New": "Key"
}
```

#### Get

To return value associated with given key the request must be in the following format. 

```javascript
{
    "key": "key you want"
}
```

### Next Steps

Due to time limitations I was unable to make a comprehensive test-suite which would have been created using the Mocha framework. Additionally, I would've incorporated a more robust testing mechanism. I also would've liked to have delved deeper into the functionality of socket.io. 