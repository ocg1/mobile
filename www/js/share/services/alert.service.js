/**
 * @name alertService
 * @author Massih Hazrati
 * @contributors []
 * @since 10/26/2015
 * @copyright Binary Ltd
 */

angular
	.module('binary')
	.service('alertService',
		function($translate, $ionicPopup, $rootScope) {
			var displayAlert = function(_title, _message, _button, _callback) {
        $translate(['alert.ok'])
          .then((translation) => {
            if (navigator.notification === undefined) {
              var alertPopup = $ionicPopup.alert({
                title: _title,
                template: _message,
                buttons: [{
                  type: 'button-positive',
                  text: _button || translation['alert.ok']
                }]
              });
              alertPopup.then(_callback);
            } else {
              navigator.notification.alert(_message, _callback, _title, _button || translation['alert.ok']);
            }
          });
			};

			var displayConfirmation = function(_title, _message, _buttons, _callback) {
				if (navigator.notification === undefined) {
					var confirmPopup = $ionicPopup.confirm({
						title: _title,
						template: _message,
            buttons: _buttons
					});
					confirmPopup.then(_callback);
				} else {
					navigator.notification.confirm(
						_message,
						_callback,
						_title,
						_buttons
					);
				}
			};

			this.displayRealitCheckInterval = function(_title, _class, scope, _template, _buttons, _callback) {
					var showPopup = $ionicPopup.show({
						title: _title,
						cssClass: _class,
						scope: scope,
						templateUrl: _template,
						buttons: _buttons,
					});
					showPopup.then(_callback);
			};


			this.displayRealityCheckResult = function(_title, _class, scope, _template, _buttons, _callback) {
				var showPopup = $ionicPopup.show({
					title: _title,
					cssClass: _class,
					scope: scope,
					templateUrl: _template,
					buttons: _buttons,
				});
				showPopup.then(_callback);
			};

			this.displaySelectResidence = function(_title, _class, scope, _template, _buttons, _callback) {
					var showPopup = $ionicPopup.show({
						title: _title,
						cssClass: _class,
						scope: scope,
						templateUrl: _template,
						buttons: _buttons,
					});
					showPopup.then(_callback);
			};

			this.displayError = function(_message) {
				$translate(['alert.error'])
					.then(function(translation) {
						displayAlert(translation['alert.error'], _message);
					});
			};

			this.displaySymbolWarning = function(_message, _callback) {
				$translate(['alert.warning', _message])
					.then(function(translation) {
						displayAlert(translation['alert.warning'], translation[_message]);
					});
			}

			this.accountError = {
				tokenNotValid: function() {
					$translate(['alert.error', 'alert.not_valid'])
						.then(function(translation) {
							displayAlert(translation['alert.error'], translation['alert.not_valid']);
							//navigator.notification.alert(translation['alert.not_valid'], null, translation['alert.error'], 'OK');
						});
				},
				tokenNotAuthenticated: function(message) {
					$translate(['alert.error', 'alert.not_auth'])
					.then(function (translation) {
						displayAlert(translation['alert.error'], message ? message : translation['alert.not_auth']);
					});
				},
				tokenNotUnique: function() {
					$translate(['alert.error', 'alert.not_unique'])
						.then(function(translation) {
							displayAlert(translation['alert.error'], translation['alert.not_unique']);
						});
				}
			};

			this.contractError = {
				notAvailable: function() {
					$translate(['alert.error', 'alert.contract_error'])
						.then(function(translation) {
							displayAlert(translation['alert.error'], translation['alert.contract_error']);
						});
				}
			};

			this.optionsError = {
				noTick: function() {
					$translate(['alert.error', 'alert.no_tick'])
						.then(function(translation) {
							displayAlert(translation['alert.error'], translation['alert.no_tick']);
						});
				}
			};

			this.displayAlert =	displayAlert;

			this.confirmAccountRemoval = function(_token) {
				$translate(['alert.remove_token_title', 'alert.remove_token_content'])
					.then(function(translation) {
						displayConfirmation(translation['alert.remove_token_title'],
							translation['alert.remove_token_content'], ['Yes', 'No'],
							function(res) {
								if (!(typeof(res) === "boolean")) {
									if (res == 1)
										res == true;
									else
										res = false;
								}

								if (res) {
									$rootScope.$broadcast('token:remove', _token);
								}
							}
						);
					});
			};

			this.confirmRemoveAllAccount = function(_callback) {
				$translate(['alert.remove_all_tokens_title', 'alert.remove_all_tokens_content',
            'alert.yes', 'alert.no'])
					.then(function(translation) {
            var buttons = null;
            if(navigator.notification){
              buttons = [translation['alert.yes'], translation['alert.no']];
            } else {
              buttons = [
              {
                text: translation['alert.no'],
                onTap: () => {
                  return false;
                }
              },
              {
                text: translation['alert.yes'],
                type: 'button-positive',
                onTap: () => {
                  return true;
                }
              }
              ]
            }
						displayConfirmation(
							translation['alert.remove_all_tokens_title'],
							translation['alert.remove_all_tokens_content'],
              buttons,
							_callback
						);
					});
			}

			this.confirmExit = function(_callback) {
				$translate(['app.exit_title', 'app.exit_confirmation',
            'alert.yes', 'alert.no'])
					.then(function(translation) {
						displayConfirmation(
							translation['app.exit_title'],
							translation['app.exit_confirmation'],
              [translation['alert.yes'], translation['alert.no']],
							_callback
						);
					});
			}

		});
