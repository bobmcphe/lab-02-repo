'use strict';

let globalCache1 = [];
let allKeywordsArray = [];

function HornsImage(horns){
  this.title = horns.title;
  this.imageUrl = horns.image_url;
  this.description = horns.description;
  this.keyword = horns.keyword;
  this.horns = horns.horns;
  globalCache1.push(this);
  addKeyword(horns.keyword);
}

HornsImage.prototype.render = function(){
  let template = $('#photo-template').html();
  let $hornsClone = $('<section></section>');
    $('main').append($hornsClone);
    $hornsClone.html(template);
    $hornsClone.find('h2').text(this.title);
    $hornsClone.find('img').attr('src', this.imageUrl);
    $hornsClone.find('p').text(this.description);
    $hornsClone.attr('data-keyword', this.keyword);
    $hornsClone.removeAttr('id');
    $hornsClone.find('h2').addClass('p1');
    // HornsImage.prototype.render = function(){
    //   let page1Button =  $('#p1').html();
    //   let page2Button =  $('#p2').html();
    // };
};

function addKeyword(keyword){
  if(!allKeywordsArray.includes(keyword)){
    allKeywordsArray.push(keyword);
  }
}

// adds keywords to dropdown
function addDropDownOptions (){
  let $dropdown = $('select');

  allKeywordsArray.forEach(keyword => {
    let $newOption = $(`<option value="${keyword}">${keyword}</option>`);
    $dropdown.append($newOption);
  });
}

// DROPDWON OPTION FUCTION ------------------------

addDropDownOptions();

$('select').on('change', function(){
  $('section').hide();
  $('section').each((index, element) => {
    if(this.value === $(element).attr('data-keyword')){
      $(element).show();
    };
  });
});
// DROPDWON OPTION FUCTION ------------------------

// $('#p1').on('click', function(){
//   $('globalCach2').hide();
//   $('section').each((index, element) => {
//     if(this.value === $(element).attr('data-keyword')){
//       $(element).show();
//     };
//   });
// });


// $('#p1').click(function(){
//   $('globalCach2').hide();
//   $('section').each((index, element) => {
//     if(this.value === $(element).attr('data-keyword')){
//       $(element).show();
//     };
//   });
// });


$( "#p1" ).click(function() {
  $('globalCache2').hide();
  console.log( "Handler for .click() called." );
  $('globalCache1').show();
});




// AJAX CALL--------------------------

$.ajax('data/page-1.json', {
  method: 'get', 
  dataType: 'json',
})
  .then(horns => {
    horns.forEach(horn => {
      new HornsImage(horn);
    });
    globalCache1.forEach(item => {
      item.render();
    });
  }

//Ajax call to add second page?
,function addPage(){
  let keywordLocal = [];
  let hornsArray = [];

  $.ajax(`data/page-2.json`, {
    method: 'get', 
    dataType: 'json'})
  .then ( (data) => {
      data.forEach( (value) => {
          new HornsImage(value).render(value);            
          if (!keywordLocal.includes(value.keyword)){
            keywordLocal.push(value.keyword);
          }           
      });
  // addDropDownOptions();    
});
});

// addPage();

// $('#P1').append('class')

function render(object){
  // make a copy of the html template and remove the template labeling
  let $template = $('#template').html();

  // create our elements dynamically (not relavent in mustache)
  let rendered = Mustache.render($template, object);
  console.log(rendered);

  // append to the DOM
  $('#target').append(rendered)
}