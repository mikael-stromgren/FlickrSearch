
function initGallery() {
	galleryData = {};
	var photos = [];
	var photo = [];
	galleryData.photos = photos;
	galleryData.photos.photo = photo;	
}

function displayPhotos(data) {
    for(var i = 0; i < data.photos.photo.length; i++) {
	    var photo = data.photos.photo[i];
	    var div = document.createElement('div');
	    div.className = 'searchresultimg';

	    div.innerHTML = '<img class="imgThumb" height="150" width="150" title="'+photo.title+'" src="https://farm'+photo.farm+'.staticflickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'_q.jpg"  alt="https://farm'+photo.farm+'.staticflickr.com/'+photo.server+'/'+photo.id+'_'+photo.secret+'_z.jpg" onClick="openPhoto(this);" />';
	    if (!isInGallery(photo.id)) {
	    	div.innerHTML += '<a data-photo=\''+JSON.stringify(photo)+'\' class="btn galleryBtn" onClick="addToGallery(this);">Lägg till i galleri</a>';
	    } else {
			div.innerHTML += '<span>Galleri</span>';	    	
	    }
	    document.getElementById('searchresult').appendChild(div);					
	}	
}

function searchPhotos(page) {
	var term = document.getElementById("searchTerm").value;

    var key = "b7f25a2b737610c4978d477ee6ba6117";
    var url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key="+key+"&format=json&nojsoncallback=1&page="+page+"&text=" + term;

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
	clearPhotos();
	xhttp.onload = function () {
	    if (xhttp.readyState === xhttp.DONE) {
	        if (xhttp.status === 200) {
	            var data = JSON.parse(xhttp.responseText);
	            displayPhotos(data); 
	            if (page < data.photos.page) {

	            }        
	        }
	    }
	};
	xhttp.send(null);
}

function openPhoto(photo) {
    document.getElementById('modal').style.display = "block";
    document.getElementById("modalImg").src = photo.alt;
    document.getElementById("modalCaption").innerHTML = photo.title;
}

function updateViewGalleryBtn() {
	if (galleryData.photos.photo.length > 0) {
		document.getElementById("displayGallery").innerText = "Visa galleri (" + galleryData.photos.photo.length +")";
	} else {
		document.getElementById("displayGallery").innerText = "Visa galleri";
	}	
}

function addToGallery(photo) {
	thePhoto = JSON.parse(photo.dataset.photo);
	if (!isInGallery(thePhoto.id)) {
		galleryData.photos.photo.push(thePhoto);
		updateViewGalleryBtn();
	}
}

function isInGallery(id) {
	for(var i = 0; i < galleryData.photos.photo.length; i++) {
		var galleryPhoto = galleryData.photos.photo[i];
		if (galleryPhoto.id == id) {
			return true;
			break;
		}		
	}
	return false;
}




function clearSearchField() {
    document.getElementById("searchTerm").value = "";
}

function clearPhotos() {
    document.getElementById("searchresult").innerHTML = "";
}

function checkSubmit(e) {
   	if(e && e.keyCode == 13) {
   		e.preventDefault();	
      	searchPhotos();
   	}
}



document.getElementById("submitSearch").onclick = function() {
	searchPhotos(1);
};

document.getElementById("clearSearch").onclick = function() {
	clearSearchField();
};

document.getElementById("displayGallery").onclick = function() { 
	clearPhotos(); 
	displayPhotos(galleryData); 
};

document.getElementById("emptyGallery").onclick = function() { 
	initGallery();
	clearPhotos(); 
	updateViewGalleryBtn();
 };

document.getElementById("closeModal").onclick = function() {
	modal.style.display = "none";
};

initGallery();