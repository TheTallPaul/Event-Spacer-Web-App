'use strict';

function EventSpacer() {
  var that = this

  firebase.firestore().enablePersistence()
    .then(function() {
      return firebase.auth().signInAnonymously();
    })
    .then(function() {
      that.initMap();
      that.initTemplates();
      that.initRouter();
    })
    .catch(function(err) {
      console.log(err);
    });
}

/**
 * Initializes the router for the EventSpacer app.
 */
EventSpacer.prototype.initRouter = function() {
  this.router = new Navigo();

  var that = this;
  this.router
    .on({
      '/': function() {}
    })
    .on({
      '/event/*': function() {
        var path = that.getCleanPath(document.location.pathname);
        var id = path.split('/')[2];
        that.viewEvent(id);
      }
    })
    .resolve();
};

EventSpacer.prototype.getCleanPath = function(dirtyPath) {
  if (dirtyPath.startsWith('/index.html')) {
    return dirtyPath.split('/').slice(1).join('/');
  } else {
    return dirtyPath;
  }
};

EventSpacer.prototype.getFirebaseConfig = function() {
  return firebase.app().options;
};

window.onload = function() {
  window.app = new EventSpacer();
};
