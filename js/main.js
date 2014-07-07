$(document).ready(function() { 

    // Declare some vars
    var $navSection = $('nav'),
        $navOptions = $navSection.find('ul li'),
        $tabContent = $('#tabContent');

    $navOptions.click(function(event){
        
        var $self = $(this);
        $tabContent.find('.selected_content').hide();
        $tabContent.find('.selected_content').eq($navOptions.index($self)).fadeToggle();
    });
        
    
    /* Utility functions v.2 - The purpose is to use asynchronous calling with the Deferred object. */
    (function initTabs() {
        var tmpContent = [4], retrievedData = [],
            curLink,  href;
    
       $navSection.find('ul li').each(function(index) {
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
            $tabContent.html(tmpContent.join(''));
            
            // Makes the contents of the tab that appears at the beginning to be displayed.
            $tabContent.find('.selected_content').hide();           
            $tabContent.find('.selected_content').eq(0).show();

        });
        
    
     })();
    
});


