$(document).ready(function() {
    // Declare some vars
    var navController = {
        $navOptions: $('nav').find('ul li'),
        $tabContent: $('#tabContent'),
        $currentSelection: null,
        assignClickHandler: function () {
            navController.$navOptions.click(function(event){
                if (navController.$currentSelection.is($(this)))
                    return null;
                var $previousSelection = navController.$currentSelection;
                navController.$currentSelection = $(this);
                // The previous selection hides, whereas the new one fades in.
                navController.$tabContent.find('.selected_content').hide();
                navController.$tabContent.find('.selected_content').eq(navController.$navOptions.index(navController.$currentSelection)).fadeIn();
                
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
        }
    } // close navController
    
    navController.assignClickHandler();
    
    
    /* Utility functions v.2 - The purpose is to use asynchronous calling with the Deferred object. */
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
                navController.$currentSelection = navController.$navOptions.eq(0);
                navController.$currentSelection.addClass('currentSelectionStyle');
                navController.$currentSelection.addClass('currentSelectionCurvedCornersUp');

            });
     })();
     
}); // close ready()


