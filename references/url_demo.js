const url = require('url');

const myUrl = new URL('https://library-application-rails-2.herokuapp.com:3000/index.html?book=1&user_id=3');

// Serialized URL
console.log(myUrl.href);
console.log(myUrl.href.toString());

// Host (root domain)
console.log(myUrl.host);

// Hostname
console.log(myUrl.hostname);

// Pathname
console.log(myUrl.pathname);

// Serialized query
console.log(myUrl.search);

// Params object
console.log(myUrl.searchParams);

// Add params
myUrl.searchParams.append('comments','2');
console.log(myUrl.searchParams);

// Loop through params
myUrl.searchParams.forEach(function(key, value){console.log(`${key}:${value}`)});
myUrl.searchParams.forEach((key, value)=>{console.log(`${key}:${value}`)});