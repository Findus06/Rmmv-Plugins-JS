//=============================================================================
// FIN_ChangeBattleBackground.js                                                             
//=============================================================================

/*:
 * @plugindesc This plugin allows skills to change the battle background in battle.
 * @author Findus
 * 
 * @help
 * To use this plugin, you need to create a skill and add the following notetag to it:
 * <changeBackground: filename>
 * 
 * 'filename' is the name of the background image you want to use. The image needs to be in the img/system folder.
 */

// Namespace for any code you create; replace this with your own name
var Fin = Fin || {};

// Create a new namespace for plugins
Fin.Plugins = Fin.Plugins || {};

// Helpers for utility functions or for developer use
Fin.Helpers = Fin.Helpers || {};

(function($) {

  //=============================================================================
  // PluginManager Parameters                                                             
  //=============================================================================

  $.Plugins.Plugin1 = function($) {
    'use strict';

    // Check if Fin.Helpers is defined, if not, define it
    if (!$.Helpers) {
      $.Helpers = {};
    }

    // Register the notetag handler
    $.Helpers.changeBackground = function(skillId, filename) {
      const skill = $dataSkills[skillId];
      skill.meta.changeBackground = filename;
    };

    // Override the battle background
    const _Scene_Battle_createBackground = Scene_Battle.prototype.createBackground;
    Scene_Battle.prototype.createBackground = function() {
      _Scene_Battle_createBackground.call(this);
      const skill = BattleManager.inputtingAction().item();
      if (skill && skill.meta.changeBackground) {
        const filename = skill.meta.changeBackground;
        this._backgroundSprite.bitmap = ImageManager.loadSystem(filename);
      }
    };
  };

  // Run all plugin code
  $.Plugins.Plugin1();
})(Fin);