$(document).ready(function() { 

    // Declare some vars
    var $navSection = $('nav'),
        $navOptions = $navSection.find('ul li a'),
        $mainSection = $('main');

    $navOptions.click(function(event){
        event.preventDefault($navOptions);
        
        var $self = $(this);
        $mainSection.find('.tab_content').hide();
        $mainSection.find('.tab_content').eq($navOptions.index($self)).toggle();
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
                    tmpContent[index] = '<div class="tab_content hide">' + data + '</div>';
                    })
                .fail(function() {
                    console.log("Couldn't load content for: " + href);
                }));
        })
       
       // when all the AJAX requests are successful the .done handler is executed.
       $.when.apply($, retrievedData).done(function() {
            $mainSection.html(tmpContent.join(''));
            
            // Makes the contents of the tab that appears at the beginning to be displayed.
            $mainSection.find('.tab_content').hide();           
            $mainSection.find('.tab_content').eq(0).show();

        });
        
    
     })();
    
});


