spiderman.js
============

This is pretty straightforward, aren't you tired of having to add infinite amounts of _script_ tags at the end of your HTML templates?

Cry no more because **spiderman.js** is here to help you!

***

## Usage:

1) Include the file in your template (last _script_ tag ever, I promise!):
<script src="js/spiderman.js"></script>

2) Require other files like a boss!

### You can require many files at once:

    var includes = [
        "js/libs/handlebars",
        "js/libs/model",
        "js/libs/view"
    ];

    require(includes, function() {
        // once the file are required, have fun!
    });
  
### Or simply require one file:

    require(["js/handlebars"], function() {
        // the rest of your wonderful code goes here.
    });
    
## How does it work?
This is simple: The file gets fetched with a XmlHttpRequest, and then gets eval'd globally. Simple as this.

## But wait, there's more!
It also includes a wonderful XmlHttpRequest method!

### Usage:

    xhr({ uri: "/potatoes/list", method: "get", jsonData: { sortBy: "id" }}, function(response){
        // gets potatoes!
    });
    
There's also a **data** option that accepts normal url parameters (_?sortBy=id_).