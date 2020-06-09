'use strict'

EventSpacer.prototype.addEvent = function (data) {
  const collection = firebase.firestore().collection('events');
  return collection.add(event)
};

EventSpacer.prototype.getEvent = function (id) {
  return firebase.firestore().collection('events').doc(id).get();
};

/*
EventSpacer.prototype.claimSpot = function (eventID, spot) {
  const collection = firebase.firestore().collection('events');
  const document = collection.doc(eventID);

  // TO-DO add spot to claimed_spots

  return firebase.firestore().runTransaction((transaction) => {
    return transaction.get(document).then(doc) => {
      const data = doc.data();

      transaction.update(document, {});
      return transaction.set()
    }
  });
};
*/
