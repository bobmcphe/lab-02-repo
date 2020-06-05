'use strict';



// Constructor function
function HornImage(horns) {
  this.name = horns.name;
  this.keyword = horns.keyword;
  this.description = horns.description;
  this.title = horns.title;
  this.image_url = horns.image_url;
}

HornImage.prototype.render = function () {
  let $hornsClone = $('#photo-template').clone();
  $('main').append($hornsClone);
  $hornsClone.find('h2').text(this.name);
  $hornsClone.find('img').attr('src', this.image_url);
  $hornsClone.find('p').text(this.description);
  $hornsClone.find('h3').text(this.title);
  // $hornsClone.removeID('photo-template');
  // $hornsClone.('id', this.name);

}

HornImage.readJson = () => {
  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };

  $.ajax('data/page-1.json', ajaxSettings).then(data => {
    data.forEach(item => {
      let horns = new HornImage(item);
      console.log(horns);
      horns.render();
    });
  });
};

$(() => HornImage.readJson());