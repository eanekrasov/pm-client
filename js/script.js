(function ($) {
  $(document).ready(function(){

    if($('.messenger-box .header-top-line .add-person').length && $('.messenger-box .header-top-line .add-person-box .scroll-box').length) {

      /* скролл блока "Добавление собеседика" .messenger-box .header-top-line .add-person-box*/
      $(".messenger-box .header-top-line .add-person-box .scroll-box").customScrollbar({
        fixedThumbHeight: 45,
        hScroll: false,
        updateOnWindowResize: true
      });

      $('.messenger-box .header-top-line .add-person').on('click', function(e) {
        e.preventDefault();

        $('.messenger-box .header-top-line .add-person-box .scroll-box').customScrollbar({
          fixedThumbHeight: 45,
          hScroll: false,
          updateOnWindowResize: true
        });

        var $box = $('.messenger-box .header-top-line .add-person-box');
        $box.toggleClass('active');

        $('.messenger-box .header-top-line .add-person-box .scroll-box').customScrollbar("resize", true);
      
      });
    }

    /* при вводе в поле input значений подстраивать высоту скролла */
    $('.messenger-box .header-top-line .add-person-box input').keypress(function() {
      $('.messenger-box .header-top-line .add-person-box .scroll-box').customScrollbar("resize", true);
    });
    /*___________________________________________________*/

    /* выпадающий список статусов */
    $(".select-status-box .select-status").msDropDown();
    /*___________________________________________________*/


    /* скролл левой части */
    if ($('.messenger-box .list-friends').length) {

      $(".messenger-box .list-friends").customScrollbar({
        fixedThumbHeight: 45,
        hScroll: false,
        updateOnWindowResize: true
      });
    }

    /* при вводе в поле input значений подстраивать высоту скролла */
    $('.messenger-box .search input').keypress(function() {
      $(".messenger-box .list-friends").customScrollbar("resize", true);
    });
    /*___________________________________________________*/


    /* скролл правой части */
    if ($('.messenger-box .dialog-wrap .content .dialog').length) {

      $(".messenger-box .dialog-wrap .content .dialog").customScrollbar({
        fixedThumbHeight: 45,
        hScroll: false,
        updateOnWindowResize: true
      });
    }
    /*___________________________________________________*/


    /* ограниченная автовысота для поля ввода текста на добавление контакта */
    jQuery('.messenger-box .dialog-wrap .request-to-add textarea').autoResize();
    /*___________________________________________________*/

    /* скролл поля ввода сообщения textarea */
    $('.messenger-box .field-input-text textarea').niceScroll({
      mousescrollstep: 10,
      cursoropacitymin: 1,
      cursorminheight: 26,
      cursorwidth: "8px",
      cursorcolor: "#2980b9",
      cursorborderradius: "0px",
      background: "#f3f3f30"
    });
    /*___________________________________________________*/



    /* Проверяем и обеспечиваем правильную работу скроллов после появление из скрытого состояния мессенджера */
    $('.open').on('click', function(e) {
      e.preventDefault();

      $('.messenger-box').show();
      $(".messenger-box .list-friends").customScrollbar("resize", true);
      $(".messenger-box .dialog-wrap .content .dialog").customScrollbar("resize", true);

      /* скролл поля ввода сообщения textarea */
      $('.messenger-box .field-input-text textarea').niceScroll({
        mousescrollstep: 10,
        cursoropacitymin: 1,
        cursorminheight: 26,
        cursorwidth: "8px",
        cursorcolor: "#2980b9",
        cursorborderradius: "0px",
        background: "#f3f3f30"
      });

    });
    /*___________________________________________________*/

    /* Закрытие мессенджера */
    $('.messenger-box .header-top-line .close').on('click', function(e) {
      e.preventDefault();

      $('.messenger-box').hide();
    });
    /*___________________________________________________*/


  });
})(jQuery);