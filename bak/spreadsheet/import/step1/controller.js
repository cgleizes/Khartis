import Ember from 'ember';
import CSV from 'npm:csv-string';

export default Ember.Controller.extend({
  
  store: Ember.inject.service(),
  
  csv: null,
  
  importReport: null,
  
  setup() {
    this.set('csv', null);
  },
  
  parsable: function() {
    if (this.get('csv'))
    console.log(this.get('csv').length);
    return this.get('csv') && this.get('csv').length > 0;
  }.property('csv'),
  
  actions: {
    
    loadCsv(text) {
      this.set('csv', text);
    },
    

    parseCsvContent() {
      let data = CSV.parse(this.get('csv'));
      data = data.map( r => {
        return r.map( c => c.trim() );
      });
      this.set('importReport', this.get('model').importRawData(data));
      this.get('store').versions().freeze(this.get('model'));
      this.transitionToRoute('spreadsheet');
    },
    
    cancel() {
      this.transitionToRoute('spreadsheet');
    }
    
  }
  
});
