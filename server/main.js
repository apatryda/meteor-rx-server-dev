import { Collection } from 'meteor/apatryda:meteor-rx-server';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Observable } from 'rxjs';

Meteor.startup(() => {
  const pageCollection = new Mongo.Collection('page');
  const pageServerCollection = new Collection(pageCollection);

  pageServerCollection
    .observe({
      addedAt(...args) {
        console.log('addedAt:', args);
        return Observable.empty();
      },
      removedAt(...args) {
        console.log('removedAt:', args);
        return Observable.empty();
      },
    }, {}, {})
    .subscribe(() => {})
  ;

  pageServerCollection
    .insert({
      title: 'Page Title',
    })
    .subscribe(insertId => console.log({ insertId }))
  ;

  pageServerCollection
    .remove({})
    .subscribe(console.log)
  ;
});
