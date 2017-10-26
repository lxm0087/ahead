(function () {
	var ulLi = document.querySelectorAll('.slidenav li');

	for (var i = 0; i < ulLi.length; i++) {
		(function (x) {
			ulLi[x].onclick =function () {
				for (var i = 0; i < ulLi.length; i++) {
					ulLi[i].className = ulLi[i].className.replace('slidenav-active','');
				}
				this.className += ' slidenav-active ';
			}
		})(i)
	}
})()