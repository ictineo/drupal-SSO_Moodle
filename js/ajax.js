/**
 * SSO to Moodle
 * Block visibility depending the login status
 * hidde block if login cookies aviable
 *//*
jQuery('#block-sso-moodle-sso-login').ready( function () {
  // TODO usar la variable d'entorn!!
  jQuery.post(
    Drupal.settings.sso_moodle.login_url,
    '',
    function(data) {
      var out = jQuery(data).find('.logininfo:contains(ogout)').html();
      if(out == null) {
        jQuery('#block-sso-moodle-sso-login').css('display', 'block').addClass('not-logged');
      }
    });
});
*/

/**
 * SSO to Moodle
 * Form interaction with Moodle login page
 * via ajax query and the html reply
 */
//jQuery(document).ready(function () {
Drupal.behaviors.sso_moodle = {
 attach: function (context, settings) {
   // DEBUG: console.log(settings.sso_moodle);
   var jsformid = settings.sso_moodle.form_id;
  jQuery(jsformid).submit(function (event) {
    if( !jQuery(jsformid).hasClass('prevented')) {
      event.preventDefault();
      jQuery(jsformid).addClass('prevented');
    }
    
    // TODO posar element de login (gif animat)
    // TODO cadenes traduibles via la api de drupal javascript drupal.t ??

    jQuery.post(
      settings.sso_moodle.login_url,
      {'username':jQuery(jsformid + ' #edit-name').val(),'password':jQuery(jsformid + ' #edit-pass').val()}, 
      function(data) {
        var err = jQuery(data).find('.loginpanel .loginerrors .error').html();
        var out = jQuery(data).find('.logininfo:contains(ogout)').html();
        if(err != null) {
          jQuery('#edit-description').append(err).css('color','red').addClass('not-logged');
          jQuery('#edit-password').val('');
          jQuery('#block-sso-moodle-sso-login').addClass('not-logged');
        } else if(out == null) {
          jQuery('#edit-description').append(Drupal.t('Login Error, please retry')).css('color','red').addClass('not-logged');
          jQuery('#edit-password').val('');
          jQuery('#block-sso-moodle-sso-login').addClass('not-logged');
        } else {
          jQuery('#block-sso-moodle-sso-login h2').empty().append(Drupal.t('You are correct logged in into Moodle'));
          jQuery('#block-sso-moodle-sso-login .content').hide('slow');
          jQuery('#block-sso-moodle-sso-login','#edit-description').removeClass('not-logged').addClass('logged');
        }
        jQuery(jsformid).submit();
     });
  });
 }
};
//});

