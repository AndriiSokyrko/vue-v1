$(function(){
   console.log('test');

}())
$(document).ready(function () {
    // new WOW().init();
    // $('.section1-top-col-left')
    //     .waypoint( function(dir) {
    //         if ( dir === 'down' )
    //             $(this)
    //                 .removeClass('fadeOutDown')
    //                 .addClass('fadeInUp');
    //
    //         else
    //             $(this)
    //                 .removeClass('fadeInUp')
    //                 .addClass('fadeOutDown');
    //     }, {
    //         offset: '80%'
    //     })
    //
    //     .waypoint( function(dir) {
    //         if ( dir === 'up' )
    //             $(this)
    //                 .removeClass('fadeInUp')
    //                 .addClass('fadeOutDown');
    //         else
    //             $(this)
    //                 .removeClass('fadeOutDown')
    //                 .addClass('fadeInUp');
    //     }, {
    //         offset: -50
    //     });


    // var waypoint = new Waypoint({
    //     element: document.getElementsByClassName('section1-top-col-left'),
    //     handler: function(dir) {
    //        // notify(this.element.id + ' triggers at ' + this.triggerPoint)
    //                 if ( dir === 'down' )
    //                     $(this.element)
    //                         .removeClass('fadeOutDown')
    //                         .addClass('fadeInUp');
    //
    //                 else
    //                     $(this.element)
    //                         .removeClass('fadeInUp')
    //                         .addClass('fadeOutDown');
    //             }
    //     ,
    //     offset: '25%'
    // })

   /*     var waypoint = new Waypoint({
            element: document.getElementById('basic-waypoint'),
            handler: function() {
                notify('Basic waypoint triggered')
            }
        });
*/
    /*waypoint*/

    /*bgscroll paralax*/
    // $(window).stellar();
    /*end paralax*/

   /* function blueasyTabs() {
        var $wrapper = $('.tab-wrapper'),
            $menu = $wrapper.find('.tab-menu li'),
            $content = $wrapper.find('.thumbs-row');

        $content.not(':first-of-type').hide();
        $content.each(function (i) {
            $(this).attr('data-tab', 'tab-' + i);
        });
        $menu.each(function (i) {
            $(this).attr('data-tab', 'tab-' + i);
        });

        $menu.click(function () {
            var $getWrapper = $(this).closest($wrapper),
                dataTab = $(this).attr('data-tab');

            $getWrapper.find($menu).find('a').removeClass('active');
            $(this).find('a').addClass('active');

            $getWrapper.find($content).hide();
            $getWrapper.find($content).filter('[data-tab=' + dataTab + ']').show();
        });


    }*/
    //blueasyTabs();
    //end blueasyTabs

    function blueasyMenu() {
        var $nav_toggle = $('#nav_toggle'),
            $mainMenu = $('.mainMenu');

        $nav_toggle.click(function () {
             $mainMenu.slideToggle() ;
        });

        $(window).resize(function () {
            if ($(window).width() > 960) {
                $mainMenu.removeAttr('style');
            }
        });
    }

    blueasyMenu();

    $('.mainMenu a').on('click', function() {

        let href = $(this).attr('href');

        $('html, body').animate({
            scrollTop: $(href).offset().top
        }, {
            duration: 370,   // по умолчанию «400»
            easing: "linear" // по умолчанию «swing»
        });

        return false;
    });



});






