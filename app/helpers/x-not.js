import Ember from 'ember';

export default Ember.Helper.helper(function(hash, opts) {
    
    return Ember.isEmpty(hash[0]);
	
});
