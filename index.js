'use strict';
var metadatas = require('html-metadata');
var request = require('request');
var findFavicon = require('find-favicon');
var isUrl = require('is-url');
var Q = require('q');

module.exports = {
  /**
   * Getting all metadata by passing an URL
   * @param  {string} url
   * @return {object}
   */
  getMetadatas: function(url) {
    if(!isUrl(url)) {
      return {
        error: {
          message: 'the "url" parameter is not a valid url',
        },
      };
    }

    let deferred = Q.defer();
    let promise1 = metadatas(url);
    let promise2 = this.getIco(url);
    let promise3 = this.getImages(url);

    Q.all([promise1, promise2, promise3]).done(function(result) {
      let metadatas = result[0];
      metadatas.ico = result[1];
      metadatas.images = result[2];
      deferred.resolve(metadatas);
    });

    return deferred.promise;
  },

  /**
   * Get html content from url
   * @param  {string} url
   * @return {string} content
   */
  getContent: function(url) {
    let deferred = Q.defer();
    request(
      {
        uri: url
      },
      function(error, response, body) {
        deferred.resolve(body);
      }
    );
    return deferred.promise;
  },

  getIco: function(url) {
    let deferred = Q.defer();
    findFavicon(url, (err, favicon) => {
      if (err) {
        return deferred.resolve(null);
      }
      return deferred.resolve(favicon.url);
    });
    return deferred.promise;
  },

  /**
   * Get all image from url
   * @param  {string} url
   * @return {array} images
   */
  getImages: function(url) {
    let deferred = Q.defer();
    this.getContent(url).then(content => {
      let urls = [],
        rex = /<img[^>]+src="([^">]+)/g;

      for (var imgs; (imgs = rex.exec(content)); ) {
        urls.push(imgs[1]);
      }
      deferred.resolve(urls);
    });
    return deferred.promise;
  }
};
