# url-content
**url-content** is a module which parse a content by passing an url.

## Install it
``` shell
$ npm install --save url-content
```

``` javascript
import urlContent from 'url-content';
```

## Methods
### getMetadatas
**getMetadatas** get metadatas from a page.

``` javascript
urlContent.getMetadatas('http://google.com').then(meta => {
    // meta object
    /* author,
       authorlink,
       canonical,
       description,
       ico,
       publisher,
       robots,
       shortlink,
       title */
});
```

### getContent
**getContent** get all the html content from a page.

``` javascript
urlContent.getContent('http://google.com').then(content => {

});
```

### getImages
**getImages** get all images found in html content from a page.
The results is an array with all the images;

``` javascript
urlContent.getImages('http://google.com').then(images => {

});
```

## Changelogs
### v0.0.3
- Add readme

### v0.0.2
- Add some comments

### v0.0.1
- Add getMetadatas method
- Add getContent method
- Add getImages method
