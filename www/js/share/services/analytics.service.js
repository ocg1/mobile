/**
 * @name analyticsService
 * @author Morteza Tavanarad
 * @contributors []
 * @since 07/17/2016
 * @copyright Binary Ltd
 * Send information to all analytics services
 */

angular
    .module('binary')
    .factory('analyticsService',
            function(accountService){
                var factory = {};
                factory.google = {
                    addUser: function(){
                      var user = accountService.getDefault();
                      var userId = user && user.id ? user.id : null;
                      window.ga.setUserId(userId);
                    },
                    trackView: function(_view){
                        this.addUser();
                        if(typeof(ga) !== "undefined"){
                            ga.trackView(_view);
                        }
                    },
                    trackEvent: function(id, symbole, contractType, payout){
                        this.addUser();
                        if(typeof(ga) !== "undefined"){
                            ga.trackEvent(id, symbole, contractType, payout);
                        }
                    }
                };

                factory.amplitude = {
                    logEvent: function(title, data){
                        if(amplitude !== "undefined"){
                            amplitude.logEvent(title, data);
                        }
                    }
                }

                return factory;
            });

