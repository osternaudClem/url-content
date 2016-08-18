'use strict';
var metadatas = require('html-metadatas');
var request = require('request');
var Q = require('q');

module.exports = {
  /**
   * Getting all metadata by passing an URL
   * @param  {string} url
   * @return {object}
   */
  getMetadatas: function(url) {
    let deferred = Q.defer();
    metadatas(url).then(function(metadata){
      deferred.resolve(metadata);
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
    request({
      uri: url,
    }, function(error, response, body) {
      deferred.resolve(body);
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

      urls.push(content.match(rex));
      deferred.resolve(urls[0]);
    });
    return deferred.promise;
  },
};
