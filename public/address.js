var place = new ymaps.Placemark([placemark.latitude, placemarks.longitude], 
	{
		hintContent: placemark.hintContent,
		balloonContent: placemark.balloonContent
	},	
	{
		iconLayout: 'default#image',
		iconImageHref: 'Game.ico',
		iconImageSize: [43, 43],
		iconImageOffset: [-21, -43]
	});
map.geoObjects.add(place);