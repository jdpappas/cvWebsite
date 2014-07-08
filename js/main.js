$(document).ready(function() {
    // We create an object to define the behavior of the navigation panel.
    var navController = {
        $navOptions: $('nav').find('ul li'),    // The navigation options.
        $tabContent: $('#tabContent'),          // The reference to the div where the content to be displayed is placed. Here are all the available files stored.
        $currentSelection: null,                // The current option selection is stored.
    } // close navController
        
    navController.$navOptions.click(function(event){
        if (navController.$currentSelection.is($(this))) // If the user clicks the current selection nothing happens.
            return null;
       var $previousSelection = navController.$currentSelection; // We store the previous selection to compare it with the new one.
        navController.$currentSelection = $(this);
        // The previous selection hides, whereas the new one fades in.
        navController.$tabContent.find('.selected_content').hide();
        navController.$tabContent.find('.selected_content').eq(navController.$navOptions.index(navController.$currentSelection)).fadeIn();
        // The previous line finds the index of the selected navigation option and retrieves the corresponding tab content to be displayed.

        /*
        In the section below the style of the selected option in the navigator is determined.
        The 2 if blocks are required, so that the upper and lower box corners are curved.
        */
        $previousSelection.toggleClass();
        navController.$currentSelection.addClass('currentSelectionStyle');
        if (navController.$navOptions.index(navController.$currentSelection) === 0) 
            navController.$currentSelection.addClass('currentSelectionStyle').addClass('currentSelectionCurvedCornersUp');
        if (navController.$navOptions.index(navController.$currentSelection) === navController.$navOptions.length-1) 
            navController.$currentSelection.addClass('currentSelectionStyle').addClass('currentSelectionCurvedCornersDown'); 
    });
    
    navController.$navOptions.mouseenter(function(event) {
        if ($(this).is(navController.$currentSelection))
            return false;
        $(this).addClass('currentSelectionStyle');
        if (navController.$navOptions.index($(this)) === 0) 
            $(this).addClass('currentSelectionStyle').addClass('currentSelectionCurvedCornersUp');
        if (navController.$navOptions.index($(this)) === navController.$navOptions.length-1) 
            $(this).addClass('currentSelectionStyle').addClass('currentSelectionCurvedCornersDown'); 
    });    
    
    navController.$navOptions.mouseleave(function(event) {
         if ($(this).is(navController.$currentSelection))
            return false;
        $(this).removeClass('currentSelectionStyle');
    });    
        
    // The purpose is to use asynchronous calling with the Deferred object. 
    (function initTabs() {
        var tmpContent = [4], retrievedData = [],
            curLink,  href;
    
           navController.$navOptions.each(function(index) {
                curLink = $(this),
                href = curLink.find('a').attr('href');

                // We use the retrievedData array to check later if all the requested data are retrieved
                retrievedData.push($.ajax(href) 
                    .done(function(data){
                        tmpContent[index] = '<div class="selected_content">' + data + '</div>';
                        })
                    .fail(function() {
                        console.log("Couldn't load content for: " + href);
                }));
            })
              
           // when all the AJAX requests are successful the .done handler is executed.
           $.when.apply($, retrievedData).done(function() {
                navController.$tabContent.html(tmpContent.join(''));

                // Makes the contents of the tab that appears at the beginning to be displayed.
                navController.$tabContent.find('.selected_content').hide();           
                navController.$tabContent.find('.selected_content').eq(0).show();
               
                /* The displayed content corresponds to the first navigation option.
                Therefore the navigation option must be displayed as selected.
                */
                navController.$currentSelection = navController.$navOptions.eq(0);
                navController.$currentSelection.addClass('currentSelectionStyle');
                navController.$currentSelection.addClass('currentSelectionCurvedCornersUp');

                // In order to make the accordion effect meaningfull we have to hide the corresponding elements when the page starts for the first time.
                var $spanElements = navController.$tabContent.find('ul li').children('span');
                $spanElements.hide();
               
               // We assign the click handler that controls the accordion behavior.
                $("h1.linkStyle").click(function(event) {
                    var $spanElements = $(this).next().find('li').children('span');
                    $spanElements.slideToggle('slow');
                });
               
            });
     })();
    
}); // close ready()


