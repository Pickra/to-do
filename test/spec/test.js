/*global describe, it */
'use strict';
(function () {
  describe('The to-do form', function(){
    this.timeout(15000);
 
    it('should save a new note, said note, should be returned from Parse', function(done){
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
 
  })
})();