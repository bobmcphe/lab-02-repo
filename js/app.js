'use strict';

let globalCache = [];
let allKeywords = [];

function HornsImage(horns){
  this.title = horns.title;
  this.imageUrl = horns.image_url;
  this.description = horns.description;
  this.keyword = horns.keyword;
  this.horns = horns.horns;
  globalCache.push(this);
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

    // $hornsClone.attr('class', 'hornCard');

};

function addKeyword(keyword){
  if(!allKeywords.includes(keyword)){
    allKeywords.push(keyword);
  }
}

function addDropDownOptions (){
  let $dropdown = $('select');

  allKeywords.forEach(keyword => {
    let $newOption = $(`<option value="${keyword}">${keyword}</option>`);
    $dropdown.append($newOption);
  });
}

$.ajax('data/page-1.json', {
  method: 'get', 
  dataType: 'json',
})
  .then(horns => {
    horns.forEach(horn => {
      new HornsImage(horn);
    });
    globalCache.forEach(item => {
      item.render();
    });
    addDropDownOptions();
    $('select').on('change', function(){
      $('section').hide();
      $('section').each((index, element) => {
        if(this.value === $(element).attr('data-keyword')){
          $(element).show();
        };
      });
    });
  });


// Used Carrington's code as guide and help
// let globalCache = [];
// let keyWords = [];

// // Constructor function MODDING TO SAVE
// function HornImage(horns) {
//   this.keyword = horns.keyword;
//   this.description = horns.description;
//   this.title = horns.title;
//   this.image_url = horns.image_url;
//   globalCache.push(this);
// }

// HornImage.prototype.render = function () {
//   let $hornsClone = $("#photo-template").clone();
//   $("main").append($hornsClone);
//   $hornsClone.find("img").attr("src", this.image_url);
//   $hornsClone.find("p").text(this.description);
//   $hornsClone.find("h3").text(this.title);
//   // $hornsClone.removeID(‘photo-template’);
//   // $hornsClone.(‘id’, this.name);
// }

// function addKeyword(keyword){
//   if(!keywords.includes(globalCahce.keyword)){
//     keywords.push(globalCache.keyword);
//   }
// }

//   // Create function that loops through globalCache & target keywords
//   function dropDownRender(keyword) {
//     this.keyword = globalCache.keyword;
//   } 
//   globalCache.forEach(keyword => {
//     let optionTag = `<option value="${keyword}">${keyword}</option>`;
//     $('select').append(optionTag);
//   });

//   dropDownRender.prototype.render = function () {
//     let $hornsClone = $("#photo-template").clone();
//     $("header").append(dropDownRender);
//     dropDownRender.find("option").text(this.keyword);
//   }



// // ==============================================================

// HornImage.readJson = () => {
//   const ajaxSettings = {
//     method: 'get',
//     dataType: 'json'
//   };

//   $.ajax('data/page-1.json', ajaxSettings).then(data => {
//     data.forEach(item => {
//       let horns = new HornImage(item);
//       //call new dropdownRender function here
//       //Call handleDropdown function- use .then's to chain to ajax call
//       console.log(horns);
//       horns.render();
//     });
//   });
// };

// $(() => HornImage.readJson());



// dropDownRender.readJson = () => {
//   const ajaxSettings = {
//     method: 'get',
//     dataType: 'json'
//   };

//   $.ajax('data/page-1.json', ajaxSettings).then(data => {
//     data.forEach(item => {
//       let menuItem = new dropDownRender(item);
//       //call new dropdownRender function here
//       dropDownRender();
//       //Call handleDropdown function- use .then's to chain to ajax call
//       console.log(menuItem);
//       menuItem.render();
//     });
//   });
// };

// $(() => dropDownRender.readJson());





















//   // JSONARRAY.forEach creates array of all keywords (HornImage.keyword)
//   // -push to keywordsArray
//   // jsonarray.forEach(function (keyword) =>{
//   //   keywordArray.push(HornImage.keyword);
//   // });

//   // keywordArray.forEach //loops over keywordArray
//   //  selects only the specific keywords that user chooses};