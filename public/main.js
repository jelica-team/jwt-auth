var map;

ymaps.ready(init);

function addAddress(address) {
	var myGeocoder = ymaps.geocode(address);
	myGeocoder.then(
	    function (res) {
	        var coordinates = res.geoObjects.properties._data.metaDataProperty.GeocoderResponseMetaData.Point.coordinates;
	        axios.post('/newPlacemarker', { 
	        	user_id: 1, // После слияния с авторизацией надо будет передавать авторизованного пользователя
	        	latitude: coordinates[1], 
	        	longitude: coordinates[0], 
	        	hintContent: "da", // На хинты, балуны надо будет навесить еще поля и также передавать
	        	balloonContent: "net" 
	        })
			.then(function(response){
			  console.log('saved successfully')
			  var placemark = {
			  		latitude: coordinates[1], 
	        		longitude: coordinates[0], 
	        		hintContent: "da",
	        		balloonContent: "net" 
	        	}
			  map.geoObjects.add(new ymaps.Placemark([placemark.latitude, placemark.longitude], 
	{
		hintContent: placemark.hintContent,
		balloonContent: placemark.balloonContent
	},	
	{
		iconLayout: 'default#image',
		iconImageHref: 'Game.ico',
		iconImageSize: [43, 43],
		iconImageOffset: [-21, -43]
	}));
			});  
	    },
	    function (err) {
	        // обработка ошибки
	    }
	);
};

function init() {
	map = new ymaps.Map('map', {
		center: [59.94, 30.32],
        zoom: 10,
        controls: ['zoomControl']
	});
}