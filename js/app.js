'use strict';

let globalCache = [];

// Constructor function
function HornImage(horns) {
  this.keyword = horns.keyword;
  this.description = horns.description;
  this.title = horns.title;
  this.image_url = horns.image_url;
  globalCache.push(this);
}

HornImage.prototype.render = function () {
  let $hornsClone = $("#photo-template").clone();
  $("main").append($hornsClone);
  $hornsClone.find("img").attr("src", this.image_url);
  $hornsClone.find("p").text(this.description);
  $hornsClone.find("h3").text(this.title);
  // $hornsClone.removeID(‘photo-template’);
  // $hornsClone.(‘id’, this.name);
}

// Create function that loops through globalCache & target keywords

  function dropDownRender(horns) {
    this.keyword = horns.keyword;
  } 
  globalCache.forEach(keyword => {
    let optionTag = `<option value="${keyword}">${keyword}</option>`;
    $('select').append(optionTag);
  });

  dropDownRender.prototype.render = function () {
    let $hornsClone = $("#photo-template").clone();
    $("header").append(dropDownRender);
    dropDownRender.find("option").text(this.keyword);
  }



// ==============================================================

HornImage.readJson = () => {
  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };

  $.ajax('data/page-1.json', ajaxSettings).then(data => {
    data.forEach(item => {
      let horns = new HornImage(item);
      //call new dropdownRender function here
      dropDownRender();
      //Call handleDropdown function- use .then's to chain to ajax call
      console.log(horns);
      horns.render();
    });
  });
};

$(() => HornImage.readJson());























  // JSONARRAY.forEach creates array of all keywords (HornImage.keyword)
  // -push to keywordsArray
  // jsonarray.forEach(function (keyword) =>{
  //   keywordArray.push(HornImage.keyword);
  // });

  // keywordArray.forEach //loops over keywordArray
  //  selects only the specific keywords that user chooses};