/*global describe, it */
'use strict';
(function () {
  describe('The to-do form', function(){
    this.timeout(5000);
 
    it('should save a new note to the Parse server, and return it (to the local?)', function(done){
      var result;
 
      // $('.form') is refern to the .form class
      var form = $('.form')
      // make a random title to query on parse
      var randomTitle = ''+ Math.floor(Math.random()*10000000)
      form.find('#title').val(randomTitle)
      form.find('#content').val('')
 
      // submit it
      $('.save').click()
 
      setTimeout((function(){
 
        var query = new Parse.Query(noteConstructor);
        query.equalTo("title", randomTitle);
        query.find({
          success: function(results) {
            result = results[0]
            console.log(results)
            
/*------*/  expect(result.get('title')).to.equal(randomTitle)
            
            done()
          },
          error: function(error) {
            done(error.description)
          }
        });
 
      }), 2000)
    }); // end it()


 	it('should be able to edit an existing note on the Parse server and return it (to the local?)', function(done){
 		// var form = $('form')
 		// var title = 'kgr1mTm2zk'
 		// form.find('#title').val(title)
 		// form.find('#content').val      maybe not???


 		expect(.get('title')).to.equal('kgr1mTm2zk');

    })
  })
})();