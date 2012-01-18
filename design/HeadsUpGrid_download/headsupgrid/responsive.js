definegrid = function() {
	var browserWidth = $(window).width(); 
	if (browserWidth >= 1001) 
	{
        pageUnits = 'px';
        colUnits = 'px';
		pagewidth = 960;
		columns = 6;
		columnwidth = 140;
		gutterwidth = 24;
		pagetopmargin = 35;
		rowheight = 20;
		gridonload = 'off';
		makehugrid();
	} 
	if (browserWidth <= 1000) 
	{
        pageUnits = '%';
        colUnits = '%';
		pagewidth = 94;
		columns = 3;
		columnwidth = 32;
		gutterwidth = 2;
		pagetopmargin = 35;
		rowheight = 20;
		gridonload = 'off';
		makehugrid();
	}
	if (browserWidth <= 768) 
	{
        pageUnits = '%';
        colUnits = '%';
		pagewidth = 96;
		columns = 2;
		columnwidth = 49;
		gutterwidth = 2;
		pagetopmargin = 35;
		rowheight = 20;
		gridonload = 'off';
		makehugrid();
	}
}
$(document).ready(function() {
	definegrid();
	setgridonload();
});    

$(window).resize(function() {
	definegrid();
});