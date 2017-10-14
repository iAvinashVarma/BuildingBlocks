$(function(){
  $('.error').hide();
  $.get('/cities', appendToList);

  $('form').on('submit', function(event) {
    event.preventDefault();
    var form = $(this);
    var cityData = form.serialize();
    $('.error').hide();
    $.ajax({
      type: 'POST', url: '/cities', data: cityData
    })
    .error(function(){
      $('.error').show();
    })
    .success(function(cityName){
      appendToList([cityName]);
      form.trigger('reset');
    });
  });

  function appendToList(cities) {
    var list = [];
    var content, block;
    for(var i in cities){
      block = cities[i];
      content = '<a href="/cities/'+block+'">'+block+'</a>'+ // + // example on how to serve static images
        ' <a href="#" data-block="'+block+'">'+
        '<img src="delete.png" width="15px"></a>';
      list.push($('<li>', { html: content }));
    }

    $('.block-list').append(list)
  }


  $('.block-list').on('click', 'a[data-block]', function (event) {
    if(!confirm('Are you sure ?')){
      return false;
    }

    var target = $(event.currentTarget);

    $.ajax({
      type: 'DELETE',
      url: '/cities/' + target.data('block')
    }).done(function () {
      target.parents('li').remove();
    });
  });

});
