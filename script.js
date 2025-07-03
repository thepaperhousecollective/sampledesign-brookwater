(function(){
    var script = {
 "start": "this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A], 'gyroscopeAvailable'); this.syncPlaylists([this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist,this.mainPlayList]); this.playList_E1B70E33_D1C6_8B7A_41D7_B9DC798E121D.set('selectedIndex', 0); if(!this.get('fullscreenAvailable')) { [this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0].forEach(function(component) { component.set('visible', false); }) }",
 "children": [
  "this.MainViewer",
  "this.Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
  "this.Container_0DD1BF09_1744_0507_41B3_29434E440055",
  "this.Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48",
  "this.Container_062AB830_1140_E215_41AF_6C9D65345420",
  "this.Container_23F0F7B8_0C0A_629D_418A_F171085EFBF8",
  "this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
  "this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
  "this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
  "this.Container_2820BA13_0D5D_5B97_4192_AABC38F6F169",
  "this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
  "this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC",
  "this.Image_C25A6D86_D0C5_891A_41D9_8FE63628FCCE",
  "this.Image_FF940F5B_D1C7_8929_41E3_D0F4B857329D"
 ],
 "id": "rootPlayer",
 "mobileMipmappingEnabled": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "vrPolyfillScale": 0.74,
 "width": "100%",
 "borderSize": 0,
 "minWidth": 20,
 "propagateClick": true,
 "defaultVRPointer": "laser",
 "scripts": {
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "unregisterKey": function(key){  delete window[key]; },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "registerKey": function(key, value){  window[key] = value; },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "existsKey": function(key){  return key in window; },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "getKey": function(key){  return window[key]; }
 },
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minHeight": 20,
 "buttonToggleFullscreen": "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "verticalAlign": "top",
 "downloadEnabled": false,
 "layout": "absolute",
 "class": "Player",
 "paddingTop": 0,
 "gap": 10,
 "backgroundPreloadEnabled": true,
 "horizontalAlign": "left",
 "shadow": false,
 "paddingBottom": 0,
 "mouseWheelEnabled": true,
 "buttonToggleMute": "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
 "overflow": "visible",
 "scrollBarWidth": 10,
 "definitions": [{
 "duration": 3000,
 "label": "Kitchen - 4",
 "id": "photo_C4538527_D0CE_B91A_41D5_F49AB9090CA5",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C4538527_D0CE_B91A_41D5_F49AB9090CA5.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C4538527_D0CE_B91A_41D5_F49AB9090CA5_t.png"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C2AF9BBB_D0C5_896A_41CA_81C79B1747D1_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "items": [
  {
   "media": "this.panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_C25238B4_D0C5_B77F_41E2_DD4EF4EA7B35",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C25238B4_D0C5_B77F_41E2_DD4EF4EA7B35_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_C25406DA_D0C5_9B2B_41E3_7A83540D87A9",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C25406DA_D0C5_9B2B_41E3_7A83540D87A9_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_C25409CB_D0C6_892A_41D9_F52BE90F5405",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C25409CB_D0C6_892A_41D9_F52BE90F5405_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_C252F4BB_D0C5_9F6A_41BF_86C9D4F794AA",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C252F4BB_D0C5_9F6A_41BF_86C9D4F794AA_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_C2AF9BBB_D0C5_896A_41CA_81C79B1747D1",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C2AF9BBB_D0C5_896A_41CA_81C79B1747D1_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_C250C769_D0C5_7916_41C7_1AEDD193A02E",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C250C769_D0C5_7916_41C7_1AEDD193A02E_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_C2AA6D3B_D0C5_8969_41DD_00EB73C32CE8",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C2AA6D3B_D0C5_8969_41DD_00EB73C32CE8_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_C4FADE7C_D0C5_8BEE_41CB_97FB898151D6",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C4FADE7C_D0C5_8BEE_41CB_97FB898151D6_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_C25BF6DB_D0C5_9B2A_41E9_8388B3E0C16F",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C25BF6DB_D0C5_9B2A_41E9_8388B3E0C16F_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_C251A155_D0C5_993E_41E3_8D21B41BF428",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C251A155_D0C5_993E_41E3_8D21B41BF428_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_C2515A41_D0C5_8B16_41E1_1612CBC55DC8",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C2515A41_D0C5_8B16_41E1_1612CBC55DC8_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_C2513312_D0C5_F93A_41D8_1A527338BDA8",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C2513312_D0C5_F93A_41D8_1A527338BDA8_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_C2569E98_D0C5_8B37_41E1_7EBA2025196A",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C2569E98_D0C5_8B37_41E1_7EBA2025196A_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_C2561511_D0C5_B939_41A8_8D31D24AE963",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C2561511_D0C5_B939_41A8_8D31D24AE963_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_C250FB63_D0C6_891A_41DC_A53205D0D898",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C250FB63_D0C6_891A_41DC_A53205D0D898_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_C2551E04_D0C5_8B1F_41A3_5721D45C65C4",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C2551E04_D0C5_8B1F_41A3_5721D45C65C4_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.album_83A41AEF_B189_0C12_41E1_AE2983209598",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 0)",
   "player": "this.MainViewerPhotoAlbumPlayer",
   "end": "this.trigger('tourEnded')",
   "class": "PhotoAlbumPlayListItem"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "duration": 3000,
 "label": "Master Bedroom 2",
 "id": "photo_C4479159_D0CF_9936_41E4_592EC93DC8E0",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C4479159_D0CF_9936_41E4_592EC93DC8E0.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C4479159_D0CF_9936_41E4_592EC93DC8E0_t.png"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "id": "panorama_C25406DA_D0C5_9B2B_41E3_7A83540D87A9",
 "thumbnailUrl": "media/panorama_C25406DA_D0C5_9B2B_41E3_7A83540D87A9_t.jpg",
 "label": "Media Room",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C25406DA_D0C5_9B2B_41E3_7A83540D87A9_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25406DA_D0C5_9B2B_41E3_7A83540D87A9_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25406DA_D0C5_9B2B_41E3_7A83540D87A9_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25406DA_D0C5_9B2B_41E3_7A83540D87A9_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C25406DA_D0C5_9B2B_41E3_7A83540D87A9_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25406DA_D0C5_9B2B_41E3_7A83540D87A9_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25406DA_D0C5_9B2B_41E3_7A83540D87A9_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25406DA_D0C5_9B2B_41E3_7A83540D87A9_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C25406DA_D0C5_9B2B_41E3_7A83540D87A9_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25406DA_D0C5_9B2B_41E3_7A83540D87A9_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25406DA_D0C5_9B2B_41E3_7A83540D87A9_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25406DA_D0C5_9B2B_41E3_7A83540D87A9_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C25406DA_D0C5_9B2B_41E3_7A83540D87A9_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25406DA_D0C5_9B2B_41E3_7A83540D87A9_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25406DA_D0C5_9B2B_41E3_7A83540D87A9_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25406DA_D0C5_9B2B_41E3_7A83540D87A9_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C25406DA_D0C5_9B2B_41E3_7A83540D87A9_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25406DA_D0C5_9B2B_41E3_7A83540D87A9_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25406DA_D0C5_9B2B_41E3_7A83540D87A9_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25406DA_D0C5_9B2B_41E3_7A83540D87A9_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C25406DA_D0C5_9B2B_41E3_7A83540D87A9_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25406DA_D0C5_9B2B_41E3_7A83540D87A9_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25406DA_D0C5_9B2B_41E3_7A83540D87A9_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25406DA_D0C5_9B2B_41E3_7A83540D87A9_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C25406DA_D0C5_9B2B_41E3_7A83540D87A9_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "cardboardMenu": "this.Menu_E19BFE3B_D1C6_8B6A_41D8_0924ADC0DFC1",
 "overlays": [
  "this.overlay_C7FA9F11_D0DD_8939_41E9_33FAD0B72497"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C2561511_D0C5_B939_41A8_8D31D24AE963"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C2551E04_D0C5_8B1F_41A3_5721D45C65C4"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "id": "panorama_C250FB63_D0C6_891A_41DC_A53205D0D898",
 "thumbnailUrl": "media/panorama_C250FB63_D0C6_891A_41DC_A53205D0D898_t.jpg",
 "label": "WIC ",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C250FB63_D0C6_891A_41DC_A53205D0D898_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C250FB63_D0C6_891A_41DC_A53205D0D898_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C250FB63_D0C6_891A_41DC_A53205D0D898_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C250FB63_D0C6_891A_41DC_A53205D0D898_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C250FB63_D0C6_891A_41DC_A53205D0D898_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C250FB63_D0C6_891A_41DC_A53205D0D898_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C250FB63_D0C6_891A_41DC_A53205D0D898_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C250FB63_D0C6_891A_41DC_A53205D0D898_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C250FB63_D0C6_891A_41DC_A53205D0D898_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C250FB63_D0C6_891A_41DC_A53205D0D898_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C250FB63_D0C6_891A_41DC_A53205D0D898_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C250FB63_D0C6_891A_41DC_A53205D0D898_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C250FB63_D0C6_891A_41DC_A53205D0D898_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C250FB63_D0C6_891A_41DC_A53205D0D898_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C250FB63_D0C6_891A_41DC_A53205D0D898_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C250FB63_D0C6_891A_41DC_A53205D0D898_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C250FB63_D0C6_891A_41DC_A53205D0D898_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C250FB63_D0C6_891A_41DC_A53205D0D898_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C250FB63_D0C6_891A_41DC_A53205D0D898_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C250FB63_D0C6_891A_41DC_A53205D0D898_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C250FB63_D0C6_891A_41DC_A53205D0D898_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C250FB63_D0C6_891A_41DC_A53205D0D898_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C250FB63_D0C6_891A_41DC_A53205D0D898_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C250FB63_D0C6_891A_41DC_A53205D0D898_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C250FB63_D0C6_891A_41DC_A53205D0D898_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "cardboardMenu": "this.Menu_E19BFE3B_D1C6_8B6A_41D8_0924ADC0DFC1",
 "overlays": [
  "this.overlay_C74841F9_D0CB_98F6_41E3_5C01FB8EF429",
  "this.overlay_C8B82A9F_D0CB_8B2A_41D8_077D47B635BF"
 ]
},
{
 "duration": 3000,
 "label": "Pantry-1",
 "id": "photo_C4574BB6_D0CF_897A_41E3_D1F5C5013084",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C4574BB6_D0CF_897A_41E3_D1F5C5013084.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C4574BB6_D0CF_897A_41E3_D1F5C5013084_t.png"
},
{
 "duration": 3000,
 "label": "Pooja",
 "id": "photo_C48B7613_D0CE_9B3A_41C7_F76677195D02",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C48B7613_D0CE_9B3A_41C7_F76677195D02.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C48B7613_D0CE_9B3A_41C7_F76677195D02_t.png"
},
{
 "duration": 3000,
 "label": "Kitchen - 7",
 "id": "photo_C4594584_D0CE_991F_41E1_349DB01AFEE1",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C4594584_D0CE_991F_41E1_349DB01AFEE1.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C4594584_D0CE_991F_41E1_349DB01AFEE1_t.png"
},
{
 "duration": 3000,
 "label": "Media Room -3",
 "id": "photo_C4AA223A_D0CE_9B6B_41E1_B640D5589C4A",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C4AA223A_D0CE_9B6B_41E1_B640D5589C4A.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C4AA223A_D0CE_9B6B_41E1_B640D5589C4A_t.png"
},
{
 "duration": 3000,
 "label": "WIL 1",
 "id": "photo_C45CA669_D0CE_9B16_41CE_6EA18705B428",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C45CA669_D0CE_9B16_41CE_6EA18705B428.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C45CA669_D0CE_9B16_41CE_6EA18705B428_t.png"
},
{
 "viewerArea": "this.MapViewer",
 "movementMode": "constrained",
 "id": "MapViewerMapPlayer",
 "class": "MapPlayer"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C2AA6D3B_D0C5_8969_41DD_00EB73C32CE8_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "viewerArea": "this.MainViewer",
 "buttonNext": [
  "this.IconButton_23F037B7_0C0A_6293_41A2_C1707EE666E4",
  "this.IconButton_28BF3E40_0D4B_DBF0_41A3_D5D2941E6E14",
  "this.IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510"
 ],
 "id": "MainViewerPhotoAlbumPlayer",
 "class": "PhotoAlbumPlayer",
 "buttonPrevious": [
  "this.IconButton_23F7E7B7_0C0A_6293_419F_D3D84EB3AFBD",
  "this.IconButton_2BE71718_0D55_6990_41A5_73D31D902E1D",
  "this.IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482"
 ]
},
{
 "duration": 3000,
 "label": "Dining- 1",
 "id": "photo_C45F7A7D_D0CE_8BE9_41D0_D7B769D83ED2",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C45F7A7D_D0CE_8BE9_41D0_D7B769D83ED2.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C45F7A7D_D0CE_8BE9_41D0_D7B769D83ED2_t.png"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C2513312_D0C5_F93A_41D8_1A527338BDA8_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "duration": 3000,
 "label": "Dining 4",
 "id": "photo_C456FD56_D0CF_893A_41DE_852CF108515E",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C456FD56_D0CF_893A_41DE_852CF108515E.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1706,
 "thumbnailUrl": "media/photo_C456FD56_D0CF_893A_41DE_852CF108515E_t.png"
},
{
 "duration": 3000,
 "label": "Bed 4 - 3",
 "id": "photo_C4471988_D0CE_8916_41D5_0436260400B7",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C4471988_D0CE_8916_41D5_0436260400B7.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C4471988_D0CE_8916_41D5_0436260400B7_t.png"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C252F4BB_D0C5_9F6A_41BF_86C9D4F794AA_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "duration": 3000,
 "label": "Alfresco - 2",
 "id": "photo_C4761835_D0CF_9779_41DE_7EF55E3C8FE9",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C4761835_D0CF_9779_41DE_7EF55E3C8FE9.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C4761835_D0CF_9779_41DE_7EF55E3C8FE9_t.png"
},
{
 "duration": 3000,
 "label": "Dining 2",
 "id": "photo_C44284F6_D0CF_F8FB_41D8_673A4FE30AE4",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C44284F6_D0CF_F8FB_41D8_673A4FE30AE4.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1706,
 "thumbnailUrl": "media/photo_C44284F6_D0CF_F8FB_41D8_673A4FE30AE4_t.png"
},
{
 "duration": 3000,
 "label": "Pantry-3",
 "id": "photo_C4A525F7_D0CF_98FA_41D0_BD087ACAB829",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C4A525F7_D0CF_98FA_41D0_BD087ACAB829.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C4A525F7_D0CF_98FA_41D0_BD087ACAB829_t.png"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C2569E98_D0C5_8B37_41E1_7EBA2025196A"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C250FB63_D0C6_891A_41DC_A53205D0D898"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "id": "panorama_C2561511_D0C5_B939_41A8_8D31D24AE963",
 "thumbnailUrl": "media/panorama_C2561511_D0C5_B939_41A8_8D31D24AE963_t.jpg",
 "label": "Master Bedroom ",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2561511_D0C5_B939_41A8_8D31D24AE963_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2561511_D0C5_B939_41A8_8D31D24AE963_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2561511_D0C5_B939_41A8_8D31D24AE963_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2561511_D0C5_B939_41A8_8D31D24AE963_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2561511_D0C5_B939_41A8_8D31D24AE963_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2561511_D0C5_B939_41A8_8D31D24AE963_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2561511_D0C5_B939_41A8_8D31D24AE963_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2561511_D0C5_B939_41A8_8D31D24AE963_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2561511_D0C5_B939_41A8_8D31D24AE963_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2561511_D0C5_B939_41A8_8D31D24AE963_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2561511_D0C5_B939_41A8_8D31D24AE963_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2561511_D0C5_B939_41A8_8D31D24AE963_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2561511_D0C5_B939_41A8_8D31D24AE963_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2561511_D0C5_B939_41A8_8D31D24AE963_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2561511_D0C5_B939_41A8_8D31D24AE963_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2561511_D0C5_B939_41A8_8D31D24AE963_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2561511_D0C5_B939_41A8_8D31D24AE963_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2561511_D0C5_B939_41A8_8D31D24AE963_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2561511_D0C5_B939_41A8_8D31D24AE963_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2561511_D0C5_B939_41A8_8D31D24AE963_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2561511_D0C5_B939_41A8_8D31D24AE963_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2561511_D0C5_B939_41A8_8D31D24AE963_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2561511_D0C5_B939_41A8_8D31D24AE963_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2561511_D0C5_B939_41A8_8D31D24AE963_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C2561511_D0C5_B939_41A8_8D31D24AE963_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "cardboardMenu": "this.Menu_E19BFE3B_D1C6_8B6A_41D8_0924ADC0DFC1",
 "overlays": [
  "this.overlay_C7E779E6_D0DE_891A_41BC_6EE41962259C",
  "this.overlay_C72A1EF2_D0DE_88FA_41A3_E04135069A8E"
 ]
},
{
 "duration": 3000,
 "label": "GF - Bathroom 1",
 "id": "photo_C4AB1ECE_D0CE_8B2B_41D6_42C293E9970E",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C4AB1ECE_D0CE_8B2B_41D6_42C293E9970E.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C4AB1ECE_D0CE_8B2B_41D6_42C293E9970E_t.png"
},
{
 "duration": 3000,
 "label": "Dining - 3",
 "id": "photo_C446D371_D0CF_79F9_41DA_624761815DEA",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C446D371_D0CF_79F9_41DA_624761815DEA.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C446D371_D0CF_79F9_41DA_624761815DEA_t.png"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C250FB63_D0C6_891A_41DC_A53205D0D898_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E0612E4C_D1C6_8B2E_41C3_2DA216AC0DBF",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 33.01,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "duration": 3000,
 "label": "Kitchen -2",
 "id": "photo_C4454C04_D0CE_8F1F_41D6_AE285DD65598",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C4454C04_D0CE_8F1F_41D6_AE285DD65598.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C4454C04_D0CE_8F1F_41D6_AE285DD65598_t.png"
},
{
 "duration": 3000,
 "label": "Dining 3",
 "id": "photo_C45C2932_D0CF_897A_41E1_B93B292BB79D",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C45C2932_D0CF_897A_41E1_B93B292BB79D.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1706,
 "thumbnailUrl": "media/photo_C45C2932_D0CF_897A_41E1_B93B292BB79D_t.png"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C2561511_D0C5_B939_41A8_8D31D24AE963_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "duration": 3000,
 "label": "Office 3",
 "id": "photo_C457C8BC_D0CF_B76F_41C3_871C80FAA288",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C457C8BC_D0CF_B76F_41C3_871C80FAA288.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C457C8BC_D0CF_B76F_41C3_871C80FAA288_t.png"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C251A155_D0C5_993E_41E3_8D21B41BF428_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "duration": 3000,
 "label": "Laundry",
 "id": "photo_C4E2B10E_D0CE_992A_41E7_DF5B60DD4C98",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C4E2B10E_D0CE_992A_41E7_DF5B60DD4C98.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C4E2B10E_D0CE_992A_41E7_DF5B60DD4C98_t.png"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C25406DA_D0C5_9B2B_41E3_7A83540D87A9_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "id": "panorama_C2513312_D0C5_F93A_41D8_1A527338BDA8",
 "thumbnailUrl": "media/panorama_C2513312_D0C5_F93A_41D8_1A527338BDA8_t.jpg",
 "label": "Kids Bedroom ",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2513312_D0C5_F93A_41D8_1A527338BDA8_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2513312_D0C5_F93A_41D8_1A527338BDA8_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2513312_D0C5_F93A_41D8_1A527338BDA8_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2513312_D0C5_F93A_41D8_1A527338BDA8_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2513312_D0C5_F93A_41D8_1A527338BDA8_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2513312_D0C5_F93A_41D8_1A527338BDA8_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2513312_D0C5_F93A_41D8_1A527338BDA8_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2513312_D0C5_F93A_41D8_1A527338BDA8_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2513312_D0C5_F93A_41D8_1A527338BDA8_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2513312_D0C5_F93A_41D8_1A527338BDA8_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2513312_D0C5_F93A_41D8_1A527338BDA8_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2513312_D0C5_F93A_41D8_1A527338BDA8_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2513312_D0C5_F93A_41D8_1A527338BDA8_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2513312_D0C5_F93A_41D8_1A527338BDA8_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2513312_D0C5_F93A_41D8_1A527338BDA8_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2513312_D0C5_F93A_41D8_1A527338BDA8_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2513312_D0C5_F93A_41D8_1A527338BDA8_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2513312_D0C5_F93A_41D8_1A527338BDA8_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2513312_D0C5_F93A_41D8_1A527338BDA8_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2513312_D0C5_F93A_41D8_1A527338BDA8_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2513312_D0C5_F93A_41D8_1A527338BDA8_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2513312_D0C5_F93A_41D8_1A527338BDA8_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2513312_D0C5_F93A_41D8_1A527338BDA8_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2513312_D0C5_F93A_41D8_1A527338BDA8_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C2513312_D0C5_F93A_41D8_1A527338BDA8_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "cardboardMenu": "this.Menu_E19BFE3B_D1C6_8B6A_41D8_0924ADC0DFC1",
 "overlays": [
  "this.overlay_C7D0BAAF_D0DB_8B69_41C6_1722F895F68A"
 ]
},
{
 "duration": 3000,
 "label": "Office 2",
 "id": "photo_C4AB23EE_D0CF_B8EA_41E6_BDC72E0ECB1B",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C4AB23EE_D0CF_B8EA_41E6_BDC72E0ECB1B.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C4AB23EE_D0CF_B8EA_41E6_BDC72E0ECB1B_t.png"
},
{
 "duration": 3000,
 "label": "Pantry Entry",
 "id": "photo_C4B892E6_D0CF_BB1A_41E4_6A64FEB1312C",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C4B892E6_D0CF_BB1A_41E4_6A64FEB1312C.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C4B892E6_D0CF_BB1A_41E4_6A64FEB1312C_t.png"
},
{
 "duration": 3000,
 "label": "Entryway 1",
 "id": "photo_C6BBF737_D0CD_7979_4192_F436F3EC25F2",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C6BBF737_D0CD_7979_4192_F436F3EC25F2.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C6BBF737_D0CD_7979_4192_F436F3EC25F2_t.png"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "id": "panorama_C251A155_D0C5_993E_41E3_8D21B41BF428",
 "thumbnailUrl": "media/panorama_C251A155_D0C5_993E_41E3_8D21B41BF428_t.jpg",
 "label": "Common  Bathroom ",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C251A155_D0C5_993E_41E3_8D21B41BF428_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C251A155_D0C5_993E_41E3_8D21B41BF428_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C251A155_D0C5_993E_41E3_8D21B41BF428_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C251A155_D0C5_993E_41E3_8D21B41BF428_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C251A155_D0C5_993E_41E3_8D21B41BF428_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C251A155_D0C5_993E_41E3_8D21B41BF428_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C251A155_D0C5_993E_41E3_8D21B41BF428_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C251A155_D0C5_993E_41E3_8D21B41BF428_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C251A155_D0C5_993E_41E3_8D21B41BF428_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C251A155_D0C5_993E_41E3_8D21B41BF428_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C251A155_D0C5_993E_41E3_8D21B41BF428_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C251A155_D0C5_993E_41E3_8D21B41BF428_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C251A155_D0C5_993E_41E3_8D21B41BF428_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C251A155_D0C5_993E_41E3_8D21B41BF428_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C251A155_D0C5_993E_41E3_8D21B41BF428_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C251A155_D0C5_993E_41E3_8D21B41BF428_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C251A155_D0C5_993E_41E3_8D21B41BF428_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C251A155_D0C5_993E_41E3_8D21B41BF428_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C251A155_D0C5_993E_41E3_8D21B41BF428_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C251A155_D0C5_993E_41E3_8D21B41BF428_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C251A155_D0C5_993E_41E3_8D21B41BF428_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C251A155_D0C5_993E_41E3_8D21B41BF428_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C251A155_D0C5_993E_41E3_8D21B41BF428_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C251A155_D0C5_993E_41E3_8D21B41BF428_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C251A155_D0C5_993E_41E3_8D21B41BF428_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "cardboardMenu": "this.Menu_E19BFE3B_D1C6_8B6A_41D8_0924ADC0DFC1",
 "overlays": [
  "this.overlay_C7A8D4F5_D0C5_78FE_41E7_7F9C6428E9ED"
 ]
},
{
 "duration": 3000,
 "label": "Master WIC",
 "id": "photo_C459CA0E_D0CF_8B2B_41E2_BE518171573D",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C459CA0E_D0CF_8B2B_41E2_BE518171573D.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C459CA0E_D0CF_8B2B_41E2_BE518171573D_t.png"
},
{
 "duration": 3000,
 "label": "Bed 2 - 4",
 "id": "photo_C4ACCA36_D0CE_8B7A_41E6_9C0D4213BF7F",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C4ACCA36_D0CE_8B7A_41E6_9C0D4213BF7F.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C4ACCA36_D0CE_8B7A_41E6_9C0D4213BF7F_t.png"
},
{
 "duration": 3000,
 "label": "Dining -2",
 "id": "photo_C4478F17_D0CE_893A_41B1_0F83F842C8F5",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C4478F17_D0CE_893A_41B1_0F83F842C8F5.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C4478F17_D0CE_893A_41B1_0F83F842C8F5_t.png"
},
{
 "duration": 3000,
 "label": "Master Bedroom 1",
 "id": "photo_C45F4D2F_D0CF_896A_41E1_6CBE5CC92C1C",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C45F4D2F_D0CF_896A_41E1_6CBE5CC92C1C.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C45F4D2F_D0CF_896A_41E1_6CBE5CC92C1C_t.png"
},
{
 "duration": 3000,
 "label": "Kitchen -3",
 "id": "photo_C45A50BF_D0CE_B76A_41E9_F00A163CEDBB",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C45A50BF_D0CE_B76A_41E9_F00A163CEDBB.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C45A50BF_D0CE_B76A_41E9_F00A163CEDBB_t.png"
},
{
 "duration": 3000,
 "label": "Alfresco -1",
 "id": "photo_C4482410_D0CF_9F37_41D2_44F4BE2E93B7",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C4482410_D0CF_9F37_41D2_44F4BE2E93B7.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C4482410_D0CF_9F37_41D2_44F4BE2E93B7_t.png"
},
{
 "duration": 3000,
 "label": "Bed 2 - 1",
 "id": "photo_C473BC89_D0CE_8F16_41E9_D472742EDAFB",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C473BC89_D0CE_8F16_41E9_D472742EDAFB.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C473BC89_D0CE_8F16_41E9_D472742EDAFB_t.png"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C2AF9BBB_D0C5_896A_41CA_81C79B1747D1"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C4FADE7C_D0C5_8BEE_41CB_97FB898151D6"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "id": "panorama_C2AA6D3B_D0C5_8969_41DD_00EB73C32CE8",
 "thumbnailUrl": "media/panorama_C2AA6D3B_D0C5_8969_41DD_00EB73C32CE8_t.jpg",
 "label": "Living Area",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2AA6D3B_D0C5_8969_41DD_00EB73C32CE8_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2AA6D3B_D0C5_8969_41DD_00EB73C32CE8_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2AA6D3B_D0C5_8969_41DD_00EB73C32CE8_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2AA6D3B_D0C5_8969_41DD_00EB73C32CE8_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2AA6D3B_D0C5_8969_41DD_00EB73C32CE8_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2AA6D3B_D0C5_8969_41DD_00EB73C32CE8_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2AA6D3B_D0C5_8969_41DD_00EB73C32CE8_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2AA6D3B_D0C5_8969_41DD_00EB73C32CE8_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2AA6D3B_D0C5_8969_41DD_00EB73C32CE8_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2AA6D3B_D0C5_8969_41DD_00EB73C32CE8_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2AA6D3B_D0C5_8969_41DD_00EB73C32CE8_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2AA6D3B_D0C5_8969_41DD_00EB73C32CE8_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2AA6D3B_D0C5_8969_41DD_00EB73C32CE8_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2AA6D3B_D0C5_8969_41DD_00EB73C32CE8_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2AA6D3B_D0C5_8969_41DD_00EB73C32CE8_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2AA6D3B_D0C5_8969_41DD_00EB73C32CE8_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2AA6D3B_D0C5_8969_41DD_00EB73C32CE8_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2AA6D3B_D0C5_8969_41DD_00EB73C32CE8_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2AA6D3B_D0C5_8969_41DD_00EB73C32CE8_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2AA6D3B_D0C5_8969_41DD_00EB73C32CE8_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2AA6D3B_D0C5_8969_41DD_00EB73C32CE8_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2AA6D3B_D0C5_8969_41DD_00EB73C32CE8_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2AA6D3B_D0C5_8969_41DD_00EB73C32CE8_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2AA6D3B_D0C5_8969_41DD_00EB73C32CE8_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C2AA6D3B_D0C5_8969_41DD_00EB73C32CE8_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "cardboardMenu": "this.Menu_E19BFE3B_D1C6_8B6A_41D8_0924ADC0DFC1",
 "overlays": [
  "this.overlay_C7820D75_D0DE_89FE_41E2_AF73CF70A7DE",
  "this.overlay_C7735C81_D0DF_8F19_41D9_A464F6ADD9FE"
 ]
},
{
 "duration": 3000,
 "label": "Master WIC 2",
 "id": "photo_C451EE77_D0CF_8BFA_41DE_1783C60A93AB",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C451EE77_D0CF_8BFA_41DE_1783C60A93AB.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C451EE77_D0CF_8BFA_41DE_1783C60A93AB_t.png"
},
{
 "duration": 3000,
 "label": "Bed 4 - 2",
 "id": "photo_C44974DF_D0CE_BF29_41DA_BB0F6B3F7A06",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C44974DF_D0CE_BF29_41DA_BB0F6B3F7A06.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C44974DF_D0CE_BF29_41DA_BB0F6B3F7A06_t.png"
},
{
 "duration": 3000,
 "label": "Master Ensuite 4",
 "id": "photo_C44050A7_D0CE_971A_41E0_6CCBA7F8921F",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C44050A7_D0CE_971A_41E0_6CCBA7F8921F.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C44050A7_D0CE_971A_41E0_6CCBA7F8921F_t.png"
},
{
 "duration": 3000,
 "label": "Bed 3- 3",
 "id": "photo_C45943B4_D0CE_997E_41E1_8AE8EEABFAE1",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C45943B4_D0CE_997E_41E1_8AE8EEABFAE1.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C45943B4_D0CE_997E_41E1_8AE8EEABFAE1_t.png"
},
{
 "items": [
  {
   "media": "this.panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_C25238B4_D0C5_B77F_41E2_DD4EF4EA7B35",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C25238B4_D0C5_B77F_41E2_DD4EF4EA7B35_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_C25406DA_D0C5_9B2B_41E3_7A83540D87A9",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C25406DA_D0C5_9B2B_41E3_7A83540D87A9_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_C25409CB_D0C6_892A_41D9_F52BE90F5405",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C25409CB_D0C6_892A_41D9_F52BE90F5405_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_C252F4BB_D0C5_9F6A_41BF_86C9D4F794AA",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C252F4BB_D0C5_9F6A_41BF_86C9D4F794AA_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_C2AF9BBB_D0C5_896A_41CA_81C79B1747D1",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C2AF9BBB_D0C5_896A_41CA_81C79B1747D1_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_C250C769_D0C5_7916_41C7_1AEDD193A02E",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C250C769_D0C5_7916_41C7_1AEDD193A02E_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_C2AA6D3B_D0C5_8969_41DD_00EB73C32CE8",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C2AA6D3B_D0C5_8969_41DD_00EB73C32CE8_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_C4FADE7C_D0C5_8BEE_41CB_97FB898151D6",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C4FADE7C_D0C5_8BEE_41CB_97FB898151D6_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_C25BF6DB_D0C5_9B2A_41E9_8388B3E0C16F",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C25BF6DB_D0C5_9B2A_41E9_8388B3E0C16F_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_C251A155_D0C5_993E_41E3_8D21B41BF428",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C251A155_D0C5_993E_41E3_8D21B41BF428_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_C2515A41_D0C5_8B16_41E1_1612CBC55DC8",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C2515A41_D0C5_8B16_41E1_1612CBC55DC8_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_C2513312_D0C5_F93A_41D8_1A527338BDA8",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C2513312_D0C5_F93A_41D8_1A527338BDA8_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_C2569E98_D0C5_8B37_41E1_7EBA2025196A",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C2569E98_D0C5_8B37_41E1_7EBA2025196A_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_C2561511_D0C5_B939_41A8_8D31D24AE963",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C2561511_D0C5_B939_41A8_8D31D24AE963_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_C250FB63_D0C6_891A_41DC_A53205D0D898",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C250FB63_D0C6_891A_41DC_A53205D0D898_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "media": "this.panorama_C2551E04_D0C5_8B1F_41A3_5721D45C65C4",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_C2551E04_D0C5_8B1F_41A3_5721D45C65C4_camera",
   "class": "PanoramaPlayListItem"
  },
  {
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 19, 0)",
   "media": "this.album_83A41AEF_B189_0C12_41E1_AE2983209598",
   "player": "this.MainViewerPhotoAlbumPlayer",
   "class": "PhotoAlbumPlayListItem"
  }
 ],
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "class": "PlayList"
},
{
 "duration": 3000,
 "label": "Entryway 2",
 "id": "photo_C473EBC5_D0CE_891E_41E6_8A018905DF16",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C473EBC5_D0CE_891E_41E6_8A018905DF16.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C473EBC5_D0CE_891E_41E6_8A018905DF16_t.png"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C2569E98_D0C5_8B37_41E1_7EBA2025196A_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "duration": 3000,
 "label": "Bed 4 - WIC 1",
 "id": "photo_C4488DCA_D0CE_892A_41E4_A45F6F24741C",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C4488DCA_D0CE_892A_41E4_A45F6F24741C.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C4488DCA_D0CE_892A_41E4_A45F6F24741C_t.png"
},
{
 "fontFamily": "Arial",
 "backgroundColor": "#404040",
 "selectedFontColor": "#FFFFFF",
 "children": [
  {
   "label": "Entryway ",
   "click": "this.mainPlayList.set('selectedIndex', 0)",
   "class": "MenuItem"
  },
  {
   "label": "Pooja ",
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "class": "MenuItem"
  },
  {
   "label": "Garage",
   "click": "this.mainPlayList.set('selectedIndex', 2)",
   "class": "MenuItem"
  },
  {
   "label": "Media Room",
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "class": "MenuItem"
  },
  {
   "label": "Powder Room",
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "class": "MenuItem"
  },
  {
   "label": "Laundry ",
   "click": "this.mainPlayList.set('selectedIndex', 5)",
   "class": "MenuItem"
  },
  {
   "label": "Kitchen ",
   "click": "this.mainPlayList.set('selectedIndex', 6)",
   "class": "MenuItem"
  },
  {
   "label": "Pantry ",
   "click": "this.mainPlayList.set('selectedIndex', 7)",
   "class": "MenuItem"
  },
  {
   "label": "Living Area",
   "click": "this.mainPlayList.set('selectedIndex', 8)",
   "class": "MenuItem"
  },
  {
   "label": "Alfresco ",
   "click": "this.mainPlayList.set('selectedIndex', 9)",
   "class": "MenuItem"
  },
  {
   "label": "Upper Living ",
   "click": "this.mainPlayList.set('selectedIndex', 10)",
   "class": "MenuItem"
  },
  {
   "label": "Bedroom ",
   "click": "this.mainPlayList.set('selectedIndex', 11)",
   "class": "MenuItem"
  },
  {
   "label": "Common  Bathroom ",
   "click": "this.mainPlayList.set('selectedIndex', 12)",
   "class": "MenuItem"
  },
  {
   "label": "Guest Bedroom",
   "click": "this.mainPlayList.set('selectedIndex', 13)",
   "class": "MenuItem"
  },
  {
   "label": "Kids Bedroom ",
   "click": "this.mainPlayList.set('selectedIndex', 14)",
   "class": "MenuItem"
  },
  {
   "label": "Office ",
   "click": "this.mainPlayList.set('selectedIndex', 15)",
   "class": "MenuItem"
  },
  {
   "label": "Master Bedroom ",
   "click": "this.mainPlayList.set('selectedIndex', 16)",
   "class": "MenuItem"
  },
  {
   "label": "WIC ",
   "click": "this.mainPlayList.set('selectedIndex', 17)",
   "class": "MenuItem"
  },
  {
   "label": "Master Ensuite ",
   "click": "this.mainPlayList.set('selectedIndex', 18)",
   "class": "MenuItem"
  }
 ],
 "fontColor": "#FFFFFF",
 "rollOverBackgroundColor": "#000000",
 "id": "Menu_E19BFE3B_D1C6_8B6A_41D8_0924ADC0DFC1",
 "class": "Menu",
 "rollOverFontColor": "#FFFFFF",
 "label": "Media",
 "opacity": 0.4,
 "rollOverOpacity": 0.8,
 "selectedBackgroundColor": "#202020"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -146.99,
   "backwardYaw": 21.95,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1",
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C2569E98_D0C5_8B37_41E1_7EBA2025196A"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C2513312_D0C5_F93A_41D8_1A527338BDA8"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C2515A41_D0C5_8B16_41E1_1612CBC55DC8"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C25BF6DB_D0C5_9B2A_41E9_8388B3E0C16F"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C251A155_D0C5_993E_41E3_8D21B41BF428"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "id": "panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80",
 "thumbnailUrl": "media/panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80_t.jpg",
 "label": "Upper Living ",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "cardboardMenu": "this.Menu_E19BFE3B_D1C6_8B6A_41D8_0924ADC0DFC1",
 "overlays": [
  "this.overlay_C72C26D5_D0C7_9B39_41E6_5DEF766907A6",
  "this.overlay_C786DDEE_D0C6_88EA_41E7_7D4D4EAE8EFB",
  "this.overlay_C77C63C0_D0C5_7917_41D1_2E4B1E84BE3D",
  "this.overlay_C9FB9880_D0C5_7717_41E4_6E60E311A4C9",
  "this.overlay_C7DD22E6_D0CA_9B1A_41D0_CD7EE5D909FB",
  "this.overlay_CADC7157_D0CF_993A_41E9_F27A96EC02BB"
 ]
},
{
 "duration": 3000,
 "label": "Media Room-1",
 "id": "photo_C44D3883_D0CE_F71A_41E1_9C39DAF9E2A6",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C44D3883_D0CE_F71A_41E1_9C39DAF9E2A6.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C44D3883_D0CE_F71A_41E1_9C39DAF9E2A6_t.png"
},
{
 "duration": 3000,
 "label": "Upper Living 1",
 "id": "photo_C4457194_D0CF_993E_41E7_B963211962FF",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C4457194_D0CF_993E_41E7_B963211962FF.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C4457194_D0CF_993E_41E7_B963211962FF_t.png"
},
{
 "duration": 3000,
 "label": "Entryway 3",
 "id": "photo_C44A8FDA_D0CE_892A_41E3_36FA0B633BAE",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C44A8FDA_D0CE_892A_41E3_36FA0B633BAE.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C44A8FDA_D0CE_892A_41E3_36FA0B633BAE_t.png"
},
{
 "fieldOfViewOverlayRadiusScale": 0.3,
 "fieldOfViewOverlayOutsideColor": "#000000",
 "maximumZoomFactor": 3,
 "minimumZoomFactor": 0.8,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/map_E7421DDB_D1DA_892A_41E8_BEAB46AE440D.png",
    "width": 3200,
    "class": "ImageResourceLevel",
    "height": 2262
   },
   {
    "url": "media/map_E7421DDB_D1DA_892A_41E8_BEAB46AE440D_lq.png",
    "width": 304,
    "class": "ImageResourceLevel",
    "height": 215,
    "tags": "preload"
   }
  ]
 },
 "label": "Floor Plans",
 "fieldOfViewOverlayOutsideOpacity": 0,
 "initialZoomFactor": 1,
 "thumbnailUrl": "media/map_E7421DDB_D1DA_892A_41E8_BEAB46AE440D_t.png",
 "width": 6000,
 "id": "map_E7421DDB_D1DA_892A_41E8_BEAB46AE440D",
 "class": "Map",
 "fieldOfViewOverlayInsideColor": "#FFFFFF",
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "scaleMode": "fit_inside",
 "height": 4242
},
{
 "duration": 3000,
 "label": "Master Ensuite 2",
 "id": "photo_C449E701_D0CF_7916_41DB_7805F4D95C23",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C449E701_D0CF_7916_41DB_7805F4D95C23.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C449E701_D0CF_7916_41DB_7805F4D95C23_t.png"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C2561511_D0C5_B939_41A8_8D31D24AE963"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "id": "panorama_C2569E98_D0C5_8B37_41E1_7EBA2025196A",
 "thumbnailUrl": "media/panorama_C2569E98_D0C5_8B37_41E1_7EBA2025196A_t.jpg",
 "label": "Office ",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2569E98_D0C5_8B37_41E1_7EBA2025196A_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2569E98_D0C5_8B37_41E1_7EBA2025196A_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2569E98_D0C5_8B37_41E1_7EBA2025196A_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2569E98_D0C5_8B37_41E1_7EBA2025196A_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2569E98_D0C5_8B37_41E1_7EBA2025196A_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2569E98_D0C5_8B37_41E1_7EBA2025196A_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2569E98_D0C5_8B37_41E1_7EBA2025196A_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2569E98_D0C5_8B37_41E1_7EBA2025196A_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2569E98_D0C5_8B37_41E1_7EBA2025196A_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2569E98_D0C5_8B37_41E1_7EBA2025196A_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2569E98_D0C5_8B37_41E1_7EBA2025196A_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2569E98_D0C5_8B37_41E1_7EBA2025196A_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2569E98_D0C5_8B37_41E1_7EBA2025196A_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2569E98_D0C5_8B37_41E1_7EBA2025196A_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2569E98_D0C5_8B37_41E1_7EBA2025196A_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2569E98_D0C5_8B37_41E1_7EBA2025196A_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2569E98_D0C5_8B37_41E1_7EBA2025196A_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2569E98_D0C5_8B37_41E1_7EBA2025196A_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2569E98_D0C5_8B37_41E1_7EBA2025196A_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2569E98_D0C5_8B37_41E1_7EBA2025196A_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2569E98_D0C5_8B37_41E1_7EBA2025196A_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2569E98_D0C5_8B37_41E1_7EBA2025196A_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2569E98_D0C5_8B37_41E1_7EBA2025196A_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2569E98_D0C5_8B37_41E1_7EBA2025196A_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C2569E98_D0C5_8B37_41E1_7EBA2025196A_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "cardboardMenu": "this.Menu_E19BFE3B_D1C6_8B6A_41D8_0924ADC0DFC1",
 "overlays": [
  "this.overlay_C774A2ED_D0DA_98EE_41E7_FA6EDACBBB88",
  "this.overlay_C8F9B3C0_D0DB_B916_41D3_7034BFC9A575"
 ]
},
{
 "duration": 3000,
 "label": "Pooja 2",
 "id": "photo_C45D2A39_D0CE_8B76_41D9_D8F059C336CA",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C45D2A39_D0CE_8B76_41D9_D8F059C336CA.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1706,
 "thumbnailUrl": "media/photo_C45D2A39_D0CE_8B76_41D9_D8F059C336CA_t.png"
},
{
 "duration": 3000,
 "label": "Upper Lviing 2",
 "id": "photo_C451D60A_D0CF_9B2B_41C8_284620C12965",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C451D60A_D0CF_9B2B_41C8_284620C12965.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C451D60A_D0CF_9B2B_41C8_284620C12965_t.png"
},
{
 "duration": 3000,
 "label": "Bed 3 -1",
 "id": "photo_C4502AE7_D0CE_8B1A_41D4_F0FAA1073B9E",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C4502AE7_D0CE_8B1A_41D4_F0FAA1073B9E.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C4502AE7_D0CE_8B1A_41D4_F0FAA1073B9E_t.png"
},
{
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'free_drag_and_rotation')",
   "media": "this.map_E7421DDB_D1DA_892A_41E8_BEAB46AE440D",
   "player": "this.MapViewerMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_E1B70E33_D1C6_8B7A_41D7_B9DC798E121D",
 "class": "PlayList"
},
{
 "duration": 3000,
 "label": "Upper Bathroom 6",
 "id": "photo_C44D3836_D0CE_B77B_41E0_66ECC2810DC8",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C44D3836_D0CE_B77B_41E0_66ECC2810DC8.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C44D3836_D0CE_B77B_41E0_66ECC2810DC8_t.png"
},
{
 "duration": 3000,
 "label": "Kitchen - 1",
 "id": "photo_C456B7AE_D0CE_996A_41E9_40D7304B4043",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C456B7AE_D0CE_996A_41E9_40D7304B4043.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C456B7AE_D0CE_996A_41E9_40D7304B4043_t.png"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C2AA6D3B_D0C5_8969_41DD_00EB73C32CE8"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "id": "panorama_C4FADE7C_D0C5_8BEE_41CB_97FB898151D6",
 "thumbnailUrl": "media/panorama_C4FADE7C_D0C5_8BEE_41CB_97FB898151D6_t.jpg",
 "label": "Alfresco ",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C4FADE7C_D0C5_8BEE_41CB_97FB898151D6_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C4FADE7C_D0C5_8BEE_41CB_97FB898151D6_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C4FADE7C_D0C5_8BEE_41CB_97FB898151D6_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C4FADE7C_D0C5_8BEE_41CB_97FB898151D6_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C4FADE7C_D0C5_8BEE_41CB_97FB898151D6_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C4FADE7C_D0C5_8BEE_41CB_97FB898151D6_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C4FADE7C_D0C5_8BEE_41CB_97FB898151D6_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C4FADE7C_D0C5_8BEE_41CB_97FB898151D6_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C4FADE7C_D0C5_8BEE_41CB_97FB898151D6_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C4FADE7C_D0C5_8BEE_41CB_97FB898151D6_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C4FADE7C_D0C5_8BEE_41CB_97FB898151D6_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C4FADE7C_D0C5_8BEE_41CB_97FB898151D6_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C4FADE7C_D0C5_8BEE_41CB_97FB898151D6_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C4FADE7C_D0C5_8BEE_41CB_97FB898151D6_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C4FADE7C_D0C5_8BEE_41CB_97FB898151D6_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C4FADE7C_D0C5_8BEE_41CB_97FB898151D6_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C4FADE7C_D0C5_8BEE_41CB_97FB898151D6_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C4FADE7C_D0C5_8BEE_41CB_97FB898151D6_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C4FADE7C_D0C5_8BEE_41CB_97FB898151D6_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C4FADE7C_D0C5_8BEE_41CB_97FB898151D6_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C4FADE7C_D0C5_8BEE_41CB_97FB898151D6_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C4FADE7C_D0C5_8BEE_41CB_97FB898151D6_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C4FADE7C_D0C5_8BEE_41CB_97FB898151D6_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C4FADE7C_D0C5_8BEE_41CB_97FB898151D6_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C4FADE7C_D0C5_8BEE_41CB_97FB898151D6_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "cardboardMenu": "this.Menu_E19BFE3B_D1C6_8B6A_41D8_0924ADC0DFC1",
 "overlays": [
  "this.overlay_C6699B94_D0CA_893E_41E0_E6FD17912766"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C252F4BB_D0C5_9F6A_41BF_86C9D4F794AA"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7"
  },
  {
   "yaw": 21.95,
   "backwardYaw": -146.99,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80",
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C25238B4_D0C5_B77F_41E2_DD4EF4EA7B35"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "id": "panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1",
 "thumbnailUrl": "media/panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1_t.jpg",
 "label": "Entryway ",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "cardboardMenu": "this.Menu_E19BFE3B_D1C6_8B6A_41D8_0924ADC0DFC1",
 "overlays": [
  "this.overlay_C735E772_D0C7_B9FB_41C6_4808C377B21A",
  "this.overlay_C765AC77_D0C7_8FFA_41E2_860A234E2CDB",
  "this.overlay_C98F13BA_D0C6_B96A_41E7_254F39D22327",
  "this.overlay_F9E03986_D0BF_891A_41EA_12FED822A3F8"
 ]
},
{
 "viewerArea": "this.MainViewer",
 "buttonCardboardView": [
  "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
  "this.IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270"
 ],
 "buttonToggleHotspots": "this.IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
 "gyroscopeVerticalDraggingEnabled": true,
 "touchControlMode": "drag_rotation",
 "id": "MainViewerPanoramaPlayer",
 "displayPlaybackBar": true,
 "class": "PanoramaPlayer",
 "buttonToggleGyroscope": "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "mouseControlMode": "drag_acceleration"
},
{
 "duration": 3000,
 "label": "Upper Bathroom 3",
 "id": "photo_C44BFED0_D0CE_8B36_41E5_F7B948728F77",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C44BFED0_D0CE_8B36_41E5_F7B948728F77.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C44BFED0_D0CE_8B36_41E5_F7B948728F77_t.png"
},
{
 "duration": 3000,
 "label": "MAster Bedroom 3",
 "id": "photo_C44765EE_D0CF_98EA_41C3_D90596315BB7",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C44765EE_D0CF_98EA_41C3_D90596315BB7.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C44765EE_D0CF_98EA_41C3_D90596315BB7_t.png"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "duration": 3000,
 "label": "Living Room - 1",
 "id": "photo_C45D8779_D0CF_B9E9_41E3_EFFC1A1EBC17",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C45D8779_D0CF_B9E9_41E3_EFFC1A1EBC17.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C45D8779_D0CF_B9E9_41E3_EFFC1A1EBC17_t.png"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C4FADE7C_D0C5_8BEE_41CB_97FB898151D6_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C25409CB_D0C6_892A_41D9_F52BE90F5405_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C252F4BB_D0C5_9F6A_41BF_86C9D4F794AA"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C2AF9BBB_D0C5_896A_41CA_81C79B1747D1"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C25406DA_D0C5_9B2B_41E3_7A83540D87A9"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C25409CB_D0C6_892A_41D9_F52BE90F5405"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C25238B4_D0C5_B77F_41E2_DD4EF4EA7B35"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "id": "panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7",
 "thumbnailUrl": "media/panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7_t.jpg",
 "label": "Pooja ",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "cardboardMenu": "this.Menu_E19BFE3B_D1C6_8B6A_41D8_0924ADC0DFC1",
 "overlays": [
  "this.overlay_C7B96C7C_D0C5_8FEE_41DE_B57CCA7871A8",
  "this.overlay_C78ED9ED_D0C5_88EE_41E6_122A060AD309",
  "this.overlay_C7085539_D0C5_B969_41E8_1112B960ACBC",
  "this.overlay_C6196001_D0C5_9719_41D1_245DE495F2B2",
  "this.overlay_CAA6191E_D0CD_892A_41E0_93276ACF70D4",
  "this.overlay_CCB38F77_D0CA_89F9_41C5_5C8B9F28C9B8"
 ]
},
{
 "duration": 3000,
 "label": "Upper Bathroom 4",
 "id": "photo_C475B31C_D0CE_B92F_414E_7545866E3134",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C475B31C_D0CE_B92F_414E_7545866E3134.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C475B31C_D0CE_B92F_414E_7545866E3134_t.png"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "id": "panorama_C252F4BB_D0C5_9F6A_41BF_86C9D4F794AA",
 "thumbnailUrl": "media/panorama_C252F4BB_D0C5_9F6A_41BF_86C9D4F794AA_t.jpg",
 "label": "Laundry ",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C252F4BB_D0C5_9F6A_41BF_86C9D4F794AA_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C252F4BB_D0C5_9F6A_41BF_86C9D4F794AA_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C252F4BB_D0C5_9F6A_41BF_86C9D4F794AA_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C252F4BB_D0C5_9F6A_41BF_86C9D4F794AA_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C252F4BB_D0C5_9F6A_41BF_86C9D4F794AA_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C252F4BB_D0C5_9F6A_41BF_86C9D4F794AA_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C252F4BB_D0C5_9F6A_41BF_86C9D4F794AA_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C252F4BB_D0C5_9F6A_41BF_86C9D4F794AA_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C252F4BB_D0C5_9F6A_41BF_86C9D4F794AA_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C252F4BB_D0C5_9F6A_41BF_86C9D4F794AA_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C252F4BB_D0C5_9F6A_41BF_86C9D4F794AA_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C252F4BB_D0C5_9F6A_41BF_86C9D4F794AA_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C252F4BB_D0C5_9F6A_41BF_86C9D4F794AA_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C252F4BB_D0C5_9F6A_41BF_86C9D4F794AA_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C252F4BB_D0C5_9F6A_41BF_86C9D4F794AA_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C252F4BB_D0C5_9F6A_41BF_86C9D4F794AA_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C252F4BB_D0C5_9F6A_41BF_86C9D4F794AA_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C252F4BB_D0C5_9F6A_41BF_86C9D4F794AA_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C252F4BB_D0C5_9F6A_41BF_86C9D4F794AA_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C252F4BB_D0C5_9F6A_41BF_86C9D4F794AA_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C252F4BB_D0C5_9F6A_41BF_86C9D4F794AA_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C252F4BB_D0C5_9F6A_41BF_86C9D4F794AA_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C252F4BB_D0C5_9F6A_41BF_86C9D4F794AA_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C252F4BB_D0C5_9F6A_41BF_86C9D4F794AA_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C252F4BB_D0C5_9F6A_41BF_86C9D4F794AA_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "cardboardMenu": "this.Menu_E19BFE3B_D1C6_8B6A_41D8_0924ADC0DFC1",
 "overlays": [
  "this.overlay_C736438F_D0DD_992A_41B9_92640AD7298A"
 ]
},
{
 "duration": 3000,
 "label": "Living Room -3",
 "id": "photo_C44DFFEC_D0CF_88EE_41CC_6F08A8518399",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C44DFFEC_D0CF_88EE_41CC_6F08A8518399.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C44DFFEC_D0CF_88EE_41CC_6F08A8518399_t.png"
},
{
 "duration": 3000,
 "label": "Living Room -2",
 "id": "photo_C4499B92_D0CF_893A_41C1_202FFB9A2DE8",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C4499B92_D0CF_893A_41C1_202FFB9A2DE8.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C4499B92_D0CF_893A_41C1_202FFB9A2DE8_t.png"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C250C769_D0C5_7916_41C7_1AEDD193A02E_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "duration": 3000,
 "label": "Kitchen - 5",
 "id": "photo_C45EB9C4_D0CE_891E_41B3_58C233944432",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C45EB9C4_D0CE_891E_41B3_58C233944432.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C45EB9C4_D0CE_891E_41B3_58C233944432_t.png"
},
{
 "duration": 3000,
 "label": "Dining - 4",
 "id": "photo_C442F78D_D0CF_792E_41DF_D61ADDCE3BA6",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C442F78D_D0CF_792E_41DF_D61ADDCE3BA6.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C442F78D_D0CF_792E_41DF_D61ADDCE3BA6_t.png"
},
{
 "duration": 3000,
 "label": "Pantry-2",
 "id": "photo_C4BA00C3_D0CF_971A_41B3_4B8A4FE2D0BA",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C4BA00C3_D0CF_971A_41B3_4B8A4FE2D0BA.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C4BA00C3_D0CF_971A_41B3_4B8A4FE2D0BA_t.png"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C25406DA_D0C5_9B2B_41E3_7A83540D87A9"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "id": "panorama_C25409CB_D0C6_892A_41D9_F52BE90F5405",
 "thumbnailUrl": "media/panorama_C25409CB_D0C6_892A_41D9_F52BE90F5405_t.jpg",
 "label": "Powder Room",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C25409CB_D0C6_892A_41D9_F52BE90F5405_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25409CB_D0C6_892A_41D9_F52BE90F5405_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25409CB_D0C6_892A_41D9_F52BE90F5405_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25409CB_D0C6_892A_41D9_F52BE90F5405_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C25409CB_D0C6_892A_41D9_F52BE90F5405_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25409CB_D0C6_892A_41D9_F52BE90F5405_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25409CB_D0C6_892A_41D9_F52BE90F5405_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25409CB_D0C6_892A_41D9_F52BE90F5405_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C25409CB_D0C6_892A_41D9_F52BE90F5405_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25409CB_D0C6_892A_41D9_F52BE90F5405_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25409CB_D0C6_892A_41D9_F52BE90F5405_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25409CB_D0C6_892A_41D9_F52BE90F5405_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C25409CB_D0C6_892A_41D9_F52BE90F5405_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25409CB_D0C6_892A_41D9_F52BE90F5405_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25409CB_D0C6_892A_41D9_F52BE90F5405_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25409CB_D0C6_892A_41D9_F52BE90F5405_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C25409CB_D0C6_892A_41D9_F52BE90F5405_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25409CB_D0C6_892A_41D9_F52BE90F5405_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25409CB_D0C6_892A_41D9_F52BE90F5405_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25409CB_D0C6_892A_41D9_F52BE90F5405_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C25409CB_D0C6_892A_41D9_F52BE90F5405_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25409CB_D0C6_892A_41D9_F52BE90F5405_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25409CB_D0C6_892A_41D9_F52BE90F5405_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25409CB_D0C6_892A_41D9_F52BE90F5405_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C25409CB_D0C6_892A_41D9_F52BE90F5405_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "cardboardMenu": "this.Menu_E19BFE3B_D1C6_8B6A_41D8_0924ADC0DFC1",
 "overlays": [
  "this.overlay_C7EFD58C_D0C6_992F_41E6_EAE908957B73",
  "this.overlay_CBE9DAAE_D0C6_8B6A_41E5_6032B9DC90DC"
 ]
},
{
 "duration": 3000,
 "label": "Master Ensuite 3",
 "id": "photo_C443FB8E_D0CE_892A_41E6_9F4A4ED38178",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C443FB8E_D0CE_892A_41E6_9F4A4ED38178.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C443FB8E_D0CE_892A_41E6_9F4A4ED38178_t.png"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C2515A41_D0C5_8B16_41E1_1612CBC55DC8"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "id": "panorama_C25BF6DB_D0C5_9B2A_41E9_8388B3E0C16F",
 "thumbnailUrl": "media/panorama_C25BF6DB_D0C5_9B2A_41E9_8388B3E0C16F_t.jpg",
 "label": "Bedroom ",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C25BF6DB_D0C5_9B2A_41E9_8388B3E0C16F_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25BF6DB_D0C5_9B2A_41E9_8388B3E0C16F_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25BF6DB_D0C5_9B2A_41E9_8388B3E0C16F_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25BF6DB_D0C5_9B2A_41E9_8388B3E0C16F_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C25BF6DB_D0C5_9B2A_41E9_8388B3E0C16F_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25BF6DB_D0C5_9B2A_41E9_8388B3E0C16F_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25BF6DB_D0C5_9B2A_41E9_8388B3E0C16F_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25BF6DB_D0C5_9B2A_41E9_8388B3E0C16F_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C25BF6DB_D0C5_9B2A_41E9_8388B3E0C16F_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25BF6DB_D0C5_9B2A_41E9_8388B3E0C16F_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25BF6DB_D0C5_9B2A_41E9_8388B3E0C16F_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25BF6DB_D0C5_9B2A_41E9_8388B3E0C16F_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C25BF6DB_D0C5_9B2A_41E9_8388B3E0C16F_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25BF6DB_D0C5_9B2A_41E9_8388B3E0C16F_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25BF6DB_D0C5_9B2A_41E9_8388B3E0C16F_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25BF6DB_D0C5_9B2A_41E9_8388B3E0C16F_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C25BF6DB_D0C5_9B2A_41E9_8388B3E0C16F_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25BF6DB_D0C5_9B2A_41E9_8388B3E0C16F_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25BF6DB_D0C5_9B2A_41E9_8388B3E0C16F_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25BF6DB_D0C5_9B2A_41E9_8388B3E0C16F_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C25BF6DB_D0C5_9B2A_41E9_8388B3E0C16F_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25BF6DB_D0C5_9B2A_41E9_8388B3E0C16F_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25BF6DB_D0C5_9B2A_41E9_8388B3E0C16F_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25BF6DB_D0C5_9B2A_41E9_8388B3E0C16F_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C25BF6DB_D0C5_9B2A_41E9_8388B3E0C16F_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "cardboardMenu": "this.Menu_E19BFE3B_D1C6_8B6A_41D8_0924ADC0DFC1",
 "overlays": [
  "this.overlay_C99C5E22_D0C5_8B1A_41D5_5132D41EB734",
  "this.overlay_C762BDCE_D0C5_892B_41AF_773174E99711"
 ]
},
{
 "duration": 3000,
 "label": "Pantry- 4",
 "id": "photo_C4A02D5D_D0CF_892E_41E1_D982601D8DE6",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C4A02D5D_D0CF_892E_41E1_D982601D8DE6.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C4A02D5D_D0CF_892E_41E1_D982601D8DE6_t.png"
},
{
 "duration": 3000,
 "label": "Upper Bathroom 2",
 "id": "photo_C4562A73_D0CE_8BFA_41E5_8B0B0A680F55",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C4562A73_D0CE_8BFA_41E5_8B0B0A680F55.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C4562A73_D0CE_8BFA_41E5_8B0B0A680F55_t.png"
},
{
 "duration": 3000,
 "label": "Upper Bathroom 1",
 "id": "photo_C447D57E_D0CE_99EA_41B6_A60D6F869B96",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C447D57E_D0CE_99EA_41B6_A60D6F869B96.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C447D57E_D0CE_99EA_41B6_A60D6F869B96_t.png"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C2AF9BBB_D0C5_896A_41CA_81C79B1747D1"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "id": "panorama_C250C769_D0C5_7916_41C7_1AEDD193A02E",
 "thumbnailUrl": "media/panorama_C250C769_D0C5_7916_41C7_1AEDD193A02E_t.jpg",
 "label": "Pantry ",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C250C769_D0C5_7916_41C7_1AEDD193A02E_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C250C769_D0C5_7916_41C7_1AEDD193A02E_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C250C769_D0C5_7916_41C7_1AEDD193A02E_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C250C769_D0C5_7916_41C7_1AEDD193A02E_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C250C769_D0C5_7916_41C7_1AEDD193A02E_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C250C769_D0C5_7916_41C7_1AEDD193A02E_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C250C769_D0C5_7916_41C7_1AEDD193A02E_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C250C769_D0C5_7916_41C7_1AEDD193A02E_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C250C769_D0C5_7916_41C7_1AEDD193A02E_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C250C769_D0C5_7916_41C7_1AEDD193A02E_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C250C769_D0C5_7916_41C7_1AEDD193A02E_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C250C769_D0C5_7916_41C7_1AEDD193A02E_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C250C769_D0C5_7916_41C7_1AEDD193A02E_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C250C769_D0C5_7916_41C7_1AEDD193A02E_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C250C769_D0C5_7916_41C7_1AEDD193A02E_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C250C769_D0C5_7916_41C7_1AEDD193A02E_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C250C769_D0C5_7916_41C7_1AEDD193A02E_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C250C769_D0C5_7916_41C7_1AEDD193A02E_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C250C769_D0C5_7916_41C7_1AEDD193A02E_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C250C769_D0C5_7916_41C7_1AEDD193A02E_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C250C769_D0C5_7916_41C7_1AEDD193A02E_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C250C769_D0C5_7916_41C7_1AEDD193A02E_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C250C769_D0C5_7916_41C7_1AEDD193A02E_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C250C769_D0C5_7916_41C7_1AEDD193A02E_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C250C769_D0C5_7916_41C7_1AEDD193A02E_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "cardboardMenu": "this.Menu_E19BFE3B_D1C6_8B6A_41D8_0924ADC0DFC1",
 "overlays": [
  "this.overlay_C93E9F37_D0C5_8979_41DB_6C7BBC922DC3"
 ]
},
{
 "label": "Renders",
 "id": "album_83A41AEF_B189_0C12_41E1_AE2983209598",
 "thumbnailUrl": "media/album_83A41AEF_B189_0C12_41E1_AE2983209598_t.png",
 "playList": "this.album_83A41AEF_B189_0C12_41E1_AE2983209598_AlbumPlayList",
 "class": "PhotoAlbum"
},
{
 "duration": 3000,
 "label": "Bed 4 - 1",
 "id": "photo_C44660C8_D0CE_B716_41E8_A4484716AC37",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C44660C8_D0CE_B716_41E8_A4484716AC37.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C44660C8_D0CE_B716_41E8_A4484716AC37_t.png"
},
{
 "duration": 3000,
 "label": "Master Ensuite 1",
 "id": "photo_C4AB1293_D0CF_7B3A_41DB_61840B9BA876",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C4AB1293_D0CF_7B3A_41DB_61840B9BA876.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C4AB1293_D0CF_7B3A_41DB_61840B9BA876_t.png"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C2AA6D3B_D0C5_8969_41DD_00EB73C32CE8"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C4FADE7C_D0C5_8BEE_41CB_97FB898151D6"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "id": "panorama_C2AF9BBB_D0C5_896A_41CA_81C79B1747D1",
 "thumbnailUrl": "media/panorama_C2AF9BBB_D0C5_896A_41CA_81C79B1747D1_t.jpg",
 "label": "Kitchen ",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2AF9BBB_D0C5_896A_41CA_81C79B1747D1_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2AF9BBB_D0C5_896A_41CA_81C79B1747D1_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2AF9BBB_D0C5_896A_41CA_81C79B1747D1_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2AF9BBB_D0C5_896A_41CA_81C79B1747D1_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2AF9BBB_D0C5_896A_41CA_81C79B1747D1_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2AF9BBB_D0C5_896A_41CA_81C79B1747D1_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2AF9BBB_D0C5_896A_41CA_81C79B1747D1_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2AF9BBB_D0C5_896A_41CA_81C79B1747D1_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2AF9BBB_D0C5_896A_41CA_81C79B1747D1_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2AF9BBB_D0C5_896A_41CA_81C79B1747D1_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2AF9BBB_D0C5_896A_41CA_81C79B1747D1_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2AF9BBB_D0C5_896A_41CA_81C79B1747D1_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2AF9BBB_D0C5_896A_41CA_81C79B1747D1_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2AF9BBB_D0C5_896A_41CA_81C79B1747D1_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2AF9BBB_D0C5_896A_41CA_81C79B1747D1_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2AF9BBB_D0C5_896A_41CA_81C79B1747D1_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2AF9BBB_D0C5_896A_41CA_81C79B1747D1_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2AF9BBB_D0C5_896A_41CA_81C79B1747D1_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2AF9BBB_D0C5_896A_41CA_81C79B1747D1_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2AF9BBB_D0C5_896A_41CA_81C79B1747D1_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2AF9BBB_D0C5_896A_41CA_81C79B1747D1_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2AF9BBB_D0C5_896A_41CA_81C79B1747D1_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2AF9BBB_D0C5_896A_41CA_81C79B1747D1_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2AF9BBB_D0C5_896A_41CA_81C79B1747D1_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C2AF9BBB_D0C5_896A_41CA_81C79B1747D1_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "cardboardMenu": "this.Menu_E19BFE3B_D1C6_8B6A_41D8_0924ADC0DFC1",
 "overlays": [
  "this.overlay_C7E8B6BB_D0DB_7B6A_41E0_A8D06943AD6F",
  "this.overlay_C789DC2F_D0DA_8F6A_41DC_F7DC074C904E",
  "this.overlay_C99FD6A6_D0DA_9B1A_41B7_115094DA3E77"
 ]
},
{
 "duration": 3000,
 "label": "Bed 2 - 2",
 "id": "photo_C4AE90D0_D0CE_9736_41D2_96C8A97BBD11",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C4AE90D0_D0CE_9736_41D2_96C8A97BBD11.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C4AE90D0_D0CE_9736_41D2_96C8A97BBD11_t.png"
},
{
 "duration": 3000,
 "label": "Kitchen - 6",
 "id": "photo_C4AB210D_D0CE_992E_41D4_02FDF045D266",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C4AB210D_D0CE_992E_41D4_02FDF045D266.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C4AB210D_D0CE_992E_41D4_02FDF045D266_t.png"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C25238B4_D0C5_B77F_41E2_DD4EF4EA7B35_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "duration": 3000,
 "label": "Bed 2 - 3",
 "id": "photo_C4B105CE_D0CE_992B_41E1_C7A6E6E0284F",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C4B105CE_D0CE_992B_41E1_C7A6E6E0284F.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C4B105CE_D0CE_992B_41E1_C7A6E6E0284F_t.png"
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C25BF6DB_D0C5_9B2A_41E9_8388B3E0C16F_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "duration": 3000,
 "label": "GF - Bathroom 2",
 "id": "photo_C45E839D_D0CE_F92E_41B2_614573FDF86F",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C45E839D_D0CE_F92E_41B2_614573FDF86F.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C45E839D_D0CE_F92E_41B2_614573FDF86F_t.png"
},
{
 "duration": 3000,
 "label": "Media Room -2",
 "id": "photo_C452CD15_D0CE_893E_41DF_C186C9D541E8",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C452CD15_D0CE_893E_41DF_C186C9D541E8.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C452CD15_D0CE_893E_41DF_C186C9D541E8_t.png"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C250FB63_D0C6_891A_41DC_A53205D0D898"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "id": "panorama_C2551E04_D0C5_8B1F_41A3_5721D45C65C4",
 "thumbnailUrl": "media/panorama_C2551E04_D0C5_8B1F_41A3_5721D45C65C4_t.jpg",
 "label": "Master Ensuite ",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2551E04_D0C5_8B1F_41A3_5721D45C65C4_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2551E04_D0C5_8B1F_41A3_5721D45C65C4_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2551E04_D0C5_8B1F_41A3_5721D45C65C4_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2551E04_D0C5_8B1F_41A3_5721D45C65C4_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2551E04_D0C5_8B1F_41A3_5721D45C65C4_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2551E04_D0C5_8B1F_41A3_5721D45C65C4_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2551E04_D0C5_8B1F_41A3_5721D45C65C4_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2551E04_D0C5_8B1F_41A3_5721D45C65C4_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2551E04_D0C5_8B1F_41A3_5721D45C65C4_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2551E04_D0C5_8B1F_41A3_5721D45C65C4_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2551E04_D0C5_8B1F_41A3_5721D45C65C4_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2551E04_D0C5_8B1F_41A3_5721D45C65C4_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2551E04_D0C5_8B1F_41A3_5721D45C65C4_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2551E04_D0C5_8B1F_41A3_5721D45C65C4_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2551E04_D0C5_8B1F_41A3_5721D45C65C4_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2551E04_D0C5_8B1F_41A3_5721D45C65C4_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2551E04_D0C5_8B1F_41A3_5721D45C65C4_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2551E04_D0C5_8B1F_41A3_5721D45C65C4_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2551E04_D0C5_8B1F_41A3_5721D45C65C4_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2551E04_D0C5_8B1F_41A3_5721D45C65C4_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2551E04_D0C5_8B1F_41A3_5721D45C65C4_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2551E04_D0C5_8B1F_41A3_5721D45C65C4_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2551E04_D0C5_8B1F_41A3_5721D45C65C4_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2551E04_D0C5_8B1F_41A3_5721D45C65C4_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C2551E04_D0C5_8B1F_41A3_5721D45C65C4_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "cardboardMenu": "this.Menu_E19BFE3B_D1C6_8B6A_41D8_0924ADC0DFC1",
 "overlays": [
  "this.overlay_C7B7533F_D0DE_B969_41E0_FC0CB3A7A97E"
 ]
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C25BF6DB_D0C5_9B2A_41E9_8388B3E0C16F"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "id": "panorama_C2515A41_D0C5_8B16_41E1_1612CBC55DC8",
 "thumbnailUrl": "media/panorama_C2515A41_D0C5_8B16_41E1_1612CBC55DC8_t.jpg",
 "label": "Guest Bedroom",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2515A41_D0C5_8B16_41E1_1612CBC55DC8_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2515A41_D0C5_8B16_41E1_1612CBC55DC8_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2515A41_D0C5_8B16_41E1_1612CBC55DC8_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2515A41_D0C5_8B16_41E1_1612CBC55DC8_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2515A41_D0C5_8B16_41E1_1612CBC55DC8_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2515A41_D0C5_8B16_41E1_1612CBC55DC8_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2515A41_D0C5_8B16_41E1_1612CBC55DC8_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2515A41_D0C5_8B16_41E1_1612CBC55DC8_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2515A41_D0C5_8B16_41E1_1612CBC55DC8_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2515A41_D0C5_8B16_41E1_1612CBC55DC8_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2515A41_D0C5_8B16_41E1_1612CBC55DC8_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2515A41_D0C5_8B16_41E1_1612CBC55DC8_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2515A41_D0C5_8B16_41E1_1612CBC55DC8_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2515A41_D0C5_8B16_41E1_1612CBC55DC8_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2515A41_D0C5_8B16_41E1_1612CBC55DC8_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2515A41_D0C5_8B16_41E1_1612CBC55DC8_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2515A41_D0C5_8B16_41E1_1612CBC55DC8_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2515A41_D0C5_8B16_41E1_1612CBC55DC8_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2515A41_D0C5_8B16_41E1_1612CBC55DC8_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2515A41_D0C5_8B16_41E1_1612CBC55DC8_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2515A41_D0C5_8B16_41E1_1612CBC55DC8_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2515A41_D0C5_8B16_41E1_1612CBC55DC8_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2515A41_D0C5_8B16_41E1_1612CBC55DC8_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C2515A41_D0C5_8B16_41E1_1612CBC55DC8_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C2515A41_D0C5_8B16_41E1_1612CBC55DC8_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "cardboardMenu": "this.Menu_E19BFE3B_D1C6_8B6A_41D8_0924ADC0DFC1",
 "overlays": [
  "this.overlay_C6028CA6_D0DA_8F1A_41D6_FDDC806ABEED",
  "this.overlay_C813227C_D0DB_9BEE_41E8_9EDCACCC7F98"
 ]
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C2551E04_D0C5_8B1F_41A3_5721D45C65C4_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_C2515A41_D0C5_8B16_41E1_1612CBC55DC8_camera",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_E0767E46_D1C6_8B1A_41C5_162D03D0FA90",
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -158.05,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 }
},
{
 "duration": 3000,
 "label": "Office 1",
 "id": "photo_C45F6F96_D0CF_893A_41E1_D551983720C1",
 "class": "Photo",
 "width": 2560,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/photo_C45F6F96_D0CF_893A_41E1_D551983720C1.png",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 1704,
 "thumbnailUrl": "media/photo_C45F6F96_D0CF_893A_41E1_D551983720C1_t.png"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C252F4BB_D0C5_9F6A_41BF_86C9D4F794AA"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1"
  }
 ],
 "hfovMin": "120%",
 "hfov": 360,
 "id": "panorama_C25238B4_D0C5_B77F_41E2_DD4EF4EA7B35",
 "thumbnailUrl": "media/panorama_C25238B4_D0C5_B77F_41E2_DD4EF4EA7B35_t.jpg",
 "label": "Garage",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C25238B4_D0C5_B77F_41E2_DD4EF4EA7B35_0/f/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25238B4_D0C5_B77F_41E2_DD4EF4EA7B35_0/f/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25238B4_D0C5_B77F_41E2_DD4EF4EA7B35_0/f/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25238B4_D0C5_B77F_41E2_DD4EF4EA7B35_0/f/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C25238B4_D0C5_B77F_41E2_DD4EF4EA7B35_0/u/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25238B4_D0C5_B77F_41E2_DD4EF4EA7B35_0/u/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25238B4_D0C5_B77F_41E2_DD4EF4EA7B35_0/u/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25238B4_D0C5_B77F_41E2_DD4EF4EA7B35_0/u/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C25238B4_D0C5_B77F_41E2_DD4EF4EA7B35_0/r/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25238B4_D0C5_B77F_41E2_DD4EF4EA7B35_0/r/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25238B4_D0C5_B77F_41E2_DD4EF4EA7B35_0/r/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25238B4_D0C5_B77F_41E2_DD4EF4EA7B35_0/r/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C25238B4_D0C5_B77F_41E2_DD4EF4EA7B35_0/b/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25238B4_D0C5_B77F_41E2_DD4EF4EA7B35_0/b/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25238B4_D0C5_B77F_41E2_DD4EF4EA7B35_0/b/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25238B4_D0C5_B77F_41E2_DD4EF4EA7B35_0/b/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C25238B4_D0C5_B77F_41E2_DD4EF4EA7B35_0/d/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25238B4_D0C5_B77F_41E2_DD4EF4EA7B35_0/d/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25238B4_D0C5_B77F_41E2_DD4EF4EA7B35_0/d/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25238B4_D0C5_B77F_41E2_DD4EF4EA7B35_0/d/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C25238B4_D0C5_B77F_41E2_DD4EF4EA7B35_0/l/0/{row}_{column}.jpg",
      "rowCount": 6,
      "height": 3072,
      "tags": "ondemand",
      "width": 3072,
      "colCount": 6,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25238B4_D0C5_B77F_41E2_DD4EF4EA7B35_0/l/1/{row}_{column}.jpg",
      "rowCount": 3,
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25238B4_D0C5_B77F_41E2_DD4EF4EA7B35_0/l/2/{row}_{column}.jpg",
      "rowCount": 2,
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "class": "TiledImageResourceLevel"
     },
     {
      "url": "media/panorama_C25238B4_D0C5_B77F_41E2_DD4EF4EA7B35_0/l/3/{row}_{column}.jpg",
      "rowCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "class": "TiledImageResourceLevel"
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C25238B4_D0C5_B77F_41E2_DD4EF4EA7B35_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "vfov": 180,
 "cardboardMenu": "this.Menu_E19BFE3B_D1C6_8B6A_41D8_0924ADC0DFC1",
 "overlays": [
  "this.overlay_C7E3802F_D0C5_976A_41E7_F0308C2C909E",
  "this.overlay_C7E3B02F_D0C5_976A_41E6_F7A788724BC3"
 ]
},
{
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipPaddingRight": 10,
 "toolTipBorderSize": 1,
 "id": "MainViewer",
 "left": 0,
 "toolTipPaddingTop": 7,
 "paddingLeft": 0,
 "minWidth": 100,
 "toolTipPaddingLeft": 10,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "borderRadius": 0,
 "toolTipDisplayTime": 600,
 "progressBorderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarLeft": 0,
 "width": "100%",
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "toolTipBorderRadius": 3,
 "playbackBarHeadHeight": 15,
 "progressBackgroundColorDirection": "vertical",
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadShadowHorizontalLength": 0,
 "progressBorderColor": "#FFFFFF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 5,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "toolTipBorderColor": "#767676",
 "minHeight": 50,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "class": "ViewerArea",
 "height": "100%",
 "toolTipOpacity": 0.5,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeight": 10,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": 13,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "shadow": false,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "transitionMode": "blending",
 "toolTipPaddingBottom": 7,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 6,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "paddingRight": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 0,
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "borderSize": 0,
 "playbackBarBorderSize": 0,
 "propagateClick": true,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontStyle": "normal",
 "toolTipFontFamily": "Georgia",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "top": 0,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 55,
 "toolTipBackgroundColor": "#000000",
 "paddingTop": 0,
 "progressHeight": 6,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "toolTipFontColor": "#FFFFFF",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "paddingBottom": 0,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "transitionDuration": 500,
 "progressBorderSize": 0,
 "data": {
  "name": "Main Viewer"
 }
},
{
 "children": [
  "this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE"
 ],
 "id": "Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
 "backgroundOpacity": 0,
 "width": 115.05,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "borderRadius": 0,
 "borderSize": 0,
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "propagateClick": true,
 "creationPolicy": "inAdvance",
 "verticalAlign": "top",
 "top": "0%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minHeight": 1,
 "height": 641,
 "layout": "absolute",
 "class": "Container",
 "gap": 10,
 "paddingTop": 0,
 "horizontalAlign": "left",
 "shadow": false,
 "paddingBottom": 0,
 "visible": false,
 "data": {
  "name": "--SETTINGS"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "children": [
  "this.Label_C2F3A281_D0CA_9B16_41C0_4C2122B7E843",
  "this.Label_C2D95C0C_D0C5_8F2F_41D6_8C85362101E6"
 ],
 "id": "Container_0DD1BF09_1744_0507_41B3_29434E440055",
 "left": 30,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "width": 573,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "propagateClick": true,
 "verticalAlign": "top",
 "top": 15,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minHeight": 1,
 "height": 133,
 "layout": "absolute",
 "class": "Container",
 "gap": 10,
 "paddingTop": 0,
 "horizontalAlign": "left",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "--STICKER"
 },
 "overflow": "visible",
 "scrollBarWidth": 10
},
{
 "children": [
  "this.Image_1B99DD00_16C4_0505_41B3_51F09727447A",
  "this.Container_1B99BD00_16C4_0505_41A4_A3C2452B0288",
  "this.IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270",
  "this.Button_FA94E7B6_B287_0472_41E4_885B6E4B9BB1"
 ],
 "id": "Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48",
 "left": "0%",
 "backgroundOpacity": 0.64,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "borderSize": 0,
 "right": "0%",
 "minWidth": 1,
 "backgroundImageUrl": "skin/Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48.png",
 "propagateClick": true,
 "verticalAlign": "top",
 "bottom": 0,
 "contentOpaque": false,
 "minHeight": 1,
 "height": 118,
 "layout": "absolute",
 "scrollBarMargin": 2,
 "class": "Container",
 "gap": 10,
 "paddingTop": 0,
 "horizontalAlign": "left",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "--MENU"
 },
 "overflow": "visible",
 "scrollBarWidth": 10
},
{
 "children": [
  "this.Container_062A782F_1140_E20B_41AF_B3E5DE341773",
  "this.Container_062A9830_1140_E215_41A7_5F2BBE5C20E4"
 ],
 "id": "Container_062AB830_1140_E215_41AF_6C9D65345420",
 "left": "0%",
 "backgroundOpacity": 0.6,
 "paddingLeft": 0,
 "scrollBarColor": "#333333",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "borderSize": 0,
 "minWidth": 1,
 "propagateClick": true,
 "creationPolicy": "inAdvance",
 "backgroundColorRatios": [
  0,
  1
 ],
 "top": "0%",
 "bottom": "0%",
 "contentOpaque": false,
 "minHeight": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "layout": "absolute",
 "scrollBarMargin": 2,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false)",
 "gap": 10,
 "horizontalAlign": "left",
 "shadow": false,
 "paddingBottom": 0,
 "visible": false,
 "data": {
  "name": "--INFO photo"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "children": [
  "this.Container_23F7B7B7_0C0A_6293_4197_F931EEC6FA48",
  "this.Container_23F097B8_0C0A_629D_4176_D87C90BA32B6"
 ],
 "id": "Container_23F0F7B8_0C0A_629D_418A_F171085EFBF8",
 "left": "0%",
 "backgroundOpacity": 0.6,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "borderSize": 0,
 "minWidth": 1,
 "propagateClick": true,
 "creationPolicy": "inAdvance",
 "backgroundColorRatios": [
  0,
  1
 ],
 "top": "0%",
 "bottom": "0%",
 "contentOpaque": false,
 "minHeight": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "layout": "absolute",
 "scrollBarMargin": 2,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_23F0F7B8_0C0A_629D_418A_F171085EFBF8, false, 0, null, null, false)",
 "gap": 10,
 "horizontalAlign": "left",
 "shadow": false,
 "paddingBottom": 0,
 "visible": false,
 "data": {
  "name": "--INFO photoalbum"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "children": [
  "this.Container_39A197B1_0C06_62AF_419A_D15E4DDD2528"
 ],
 "id": "Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
 "left": "0%",
 "backgroundOpacity": 0.6,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "borderSize": 0,
 "minWidth": 1,
 "propagateClick": true,
 "creationPolicy": "inAdvance",
 "backgroundColorRatios": [
  0,
  1
 ],
 "top": "0%",
 "bottom": "0%",
 "contentOpaque": false,
 "minHeight": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "layout": "absolute",
 "scrollBarMargin": 2,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "gap": 10,
 "horizontalAlign": "left",
 "shadow": false,
 "paddingBottom": 0,
 "visible": false,
 "data": {
  "name": "--PANORAMA LIST"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "children": [
  "this.Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
  "this.Container_221B3648_0C06_E5FD_4199_FCE031AE003B"
 ],
 "id": "Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
 "left": "0%",
 "backgroundOpacity": 0.6,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "borderSize": 0,
 "minWidth": 1,
 "propagateClick": true,
 "creationPolicy": "inAdvance",
 "backgroundColorRatios": [
  0,
  1
 ],
 "top": "0%",
 "bottom": "0%",
 "contentOpaque": false,
 "minHeight": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "layout": "absolute",
 "scrollBarMargin": 2,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false)",
 "gap": 10,
 "horizontalAlign": "left",
 "shadow": false,
 "paddingBottom": 0,
 "visible": false,
 "data": {
  "name": "--LOCATION"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "children": [
  "this.Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3"
 ],
 "id": "Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
 "left": "0%",
 "backgroundOpacity": 0.6,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "borderSize": 0,
 "minWidth": 1,
 "propagateClick": true,
 "creationPolicy": "inAdvance",
 "backgroundColorRatios": [
  0,
  1
 ],
 "top": "0%",
 "bottom": "0%",
 "contentOpaque": false,
 "minHeight": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "layout": "absolute",
 "scrollBarMargin": 2,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "gap": 10,
 "horizontalAlign": "left",
 "shadow": false,
 "paddingBottom": 0,
 "visible": false,
 "data": {
  "name": "--FLOORPLAN"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "children": [
  "this.Container_28215A13_0D5D_5B97_4198_A7CA735E9E0A"
 ],
 "id": "Container_2820BA13_0D5D_5B97_4192_AABC38F6F169",
 "left": "0%",
 "backgroundOpacity": 0.6,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "borderSize": 0,
 "minWidth": 1,
 "propagateClick": true,
 "creationPolicy": "inAdvance",
 "backgroundColorRatios": [
  0,
  1
 ],
 "top": "0%",
 "bottom": "0%",
 "contentOpaque": false,
 "minHeight": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "layout": "absolute",
 "scrollBarMargin": 2,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_2820BA13_0D5D_5B97_4192_AABC38F6F169, true, 0, null, null, false)",
 "gap": 10,
 "horizontalAlign": "left",
 "shadow": false,
 "paddingBottom": 0,
 "visible": false,
 "data": {
  "name": "--PHOTOALBUM + text"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "children": [
  "this.Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536"
 ],
 "id": "Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
 "left": "0%",
 "backgroundOpacity": 0.6,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "borderSize": 0,
 "minWidth": 1,
 "propagateClick": true,
 "creationPolicy": "inAdvance",
 "backgroundColorRatios": [
  0,
  1
 ],
 "top": "0%",
 "bottom": "0%",
 "contentOpaque": false,
 "minHeight": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "layout": "absolute",
 "scrollBarMargin": 2,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "gap": 10,
 "horizontalAlign": "left",
 "shadow": false,
 "paddingBottom": 0,
 "visible": false,
 "data": {
  "name": "--PHOTOALBUM"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "children": [
  "this.Container_06C5DBA5_1140_A63F_41AD_1D83A33F1255",
  "this.Container_06C43BA5_1140_A63F_41A1_96DC8F4CAD2F"
 ],
 "id": "Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC",
 "left": "0%",
 "backgroundOpacity": 0.6,
 "paddingLeft": 0,
 "scrollBarColor": "#04A3E1",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "borderSize": 0,
 "minWidth": 1,
 "propagateClick": true,
 "creationPolicy": "inAdvance",
 "backgroundColorRatios": [
  0,
  1
 ],
 "top": "0%",
 "bottom": "0%",
 "contentOpaque": false,
 "minHeight": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "layout": "absolute",
 "scrollBarMargin": 2,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false)",
 "gap": 10,
 "horizontalAlign": "left",
 "shadow": false,
 "paddingBottom": 0,
 "visible": false,
 "data": {
  "name": "--REALTOR"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "maxHeight": 668,
 "id": "Image_C25A6D86_D0C5_891A_41D9_8FE63628FCCE",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": "-6.63%",
 "width": "6.634%",
 "borderRadius": 0,
 "borderSize": 0,
 "url": "skin/Image_C25A6D86_D0C5_891A_41D9_8FE63628FCCE.png",
 "propagateClick": false,
 "verticalAlign": "middle",
 "top": "0.11%",
 "bottom": "87.76%",
 "minHeight": 1,
 "click": "this.openLink('https://www.thepaperhousecollective.com', '_blank')",
 "minWidth": 1,
 "class": "Image",
 "paddingTop": 0,
 "horizontalAlign": "center",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "Image4871"
 },
 "cursor": "hand",
 "maxWidth": 1075,
 "scaleMode": "fit_inside"
},
{
 "maxHeight": 1000,
 "id": "Image_FF940F5B_D1C7_8929_41E3_D0F4B857329D",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": "2.17%",
 "width": "10.377%",
 "borderRadius": 0,
 "url": "skin/Image_FF940F5B_D1C7_8929_41E3_D0F4B857329D.png",
 "borderSize": 0,
 "minWidth": 1,
 "propagateClick": false,
 "verticalAlign": "middle",
 "top": "3.09%",
 "minHeight": 1,
 "height": "9.372%",
 "click": "this.openLink('https://www.thepaperhousecollective.com', '_blank')",
 "class": "Image",
 "paddingTop": 0,
 "horizontalAlign": "center",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "Image62725"
 },
 "cursor": "hand",
 "maxWidth": 1000,
 "scaleMode": "fit_inside"
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "id": "IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 58,
 "borderRadius": 0,
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0_pressed.png",
 "minWidth": 1,
 "propagateClick": true,
 "verticalAlign": "middle",
 "minHeight": 1,
 "mode": "toggle",
 "height": 58,
 "iconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0.png",
 "class": "IconButton",
 "paddingTop": 0,
 "horizontalAlign": "center",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton FULLSCREEN"
 },
 "cursor": "hand",
 "maxWidth": 58
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "id": "IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 58,
 "borderRadius": 0,
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D_pressed.png",
 "minWidth": 1,
 "propagateClick": true,
 "verticalAlign": "middle",
 "minHeight": 1,
 "mode": "toggle",
 "height": 58,
 "iconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D.png",
 "class": "IconButton",
 "paddingTop": 0,
 "horizontalAlign": "center",
 "shadow": false,
 "paddingBottom": 0,
 "visible": false,
 "data": {
  "name": "IconButton MUTE"
 },
 "cursor": "hand",
 "maxWidth": 58
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 5.95,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F95B52F2_D14D_98FA_41D1_27276182B069",
   "pitch": -31.7,
   "yaw": -41.55,
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C7FA9F11_D0DD_8939_41E9_33FAD0B72497",
 "data": {
  "label": "Circle Arrow 04b"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.95,
   "yaw": -41.55,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -31.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C25406DA_D0C5_9B2B_41E3_7A83540D87A9_1_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 16)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 10.79,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F962C2F4_D14D_98FE_41E2_F820A823751E",
   "pitch": -35.1,
   "yaw": -85.33,
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C74841F9_D0CB_98F6_41E3_5C01FB8EF429",
 "data": {
  "label": "Circle Arrow 04b"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 10.79,
   "yaw": -85.33,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -35.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C250FB63_D0C6_891A_41DC_A53205D0D898_1_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 18)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 9.08,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F96372F4_D14D_98FE_41D9_6FDC43CD9741",
   "pitch": -36.52,
   "yaw": 83.18,
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C8B82A9F_D0CB_8B2A_41D8_077D47B635BF",
 "data": {
  "label": "Circle Arrow 04b"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 9.08,
   "yaw": 83.18,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -36.52,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C250FB63_D0C6_891A_41DC_A53205D0D898_1_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "id": "MapViewer",
 "left": "0.47%",
 "toolTipPaddingTop": 4,
 "paddingLeft": 0,
 "minWidth": 1,
 "toolTipPaddingLeft": 6,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "borderRadius": 0,
 "toolTipDisplayTime": 600,
 "progressBorderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarLeft": 0,
 "width": "97.957%",
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "toolTipBorderRadius": 3,
 "playbackBarHeadHeight": 15,
 "progressBackgroundColorDirection": "vertical",
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadShadowHorizontalLength": 0,
 "progressBorderColor": "#FFFFFF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "toolTipBorderColor": "#767676",
 "minHeight": 1,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "class": "ViewerArea",
 "height": "95.31%",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeight": 10,
 "toolTipOpacity": 1,
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": 12,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "shadow": false,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "transitionMode": "blending",
 "toolTipShadowHorizontalLength": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 6,
 "toolTipShadowVerticalLength": 0,
 "show": "this.setMediaBehaviour(this.playList_E1B70E33_D1C6_8B7A_41D7_B9DC798E121D, 0)",
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "paddingRight": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "borderSize": 0,
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontStyle": "normal",
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "top": "1.84%",
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "paddingTop": 0,
 "progressHeight": 6,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "toolTipFontColor": "#606060",
 "playbackBarOpacity": 1,
 "paddingBottom": 0,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "transitionDuration": 500,
 "progressBorderSize": 0,
 "data": {
  "name": "Floor Plan"
 }
},
{
 "transparencyActive": true,
 "maxHeight": 150,
 "id": "IconButton_23F037B7_0C0A_6293_41A2_C1707EE666E4",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": "12%",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_23F037B7_0C0A_6293_41A2_C1707EE666E4_pressed.png",
 "borderSize": 0,
 "minWidth": 70,
 "propagateClick": false,
 "verticalAlign": "middle",
 "minHeight": 70,
 "height": "8%",
 "iconURL": "skin/IconButton_23F037B7_0C0A_6293_41A2_C1707EE666E4.png",
 "mode": "push",
 "class": "IconButton",
 "paddingTop": 0,
 "horizontalAlign": "center",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton >"
 },
 "cursor": "hand",
 "maxWidth": 150,
 "rollOverIconURL": "skin/IconButton_23F037B7_0C0A_6293_41A2_C1707EE666E4_rollover.png"
},
{
 "transparencyActive": false,
 "maxHeight": 60,
 "id": "IconButton_28BF3E40_0D4B_DBF0_41A3_D5D2941E6E14",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": 10,
 "width": "14.22%",
 "borderRadius": 0,
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_28BF3E40_0D4B_DBF0_41A3_D5D2941E6E14_pressed.png",
 "propagateClick": false,
 "verticalAlign": "middle",
 "top": "20%",
 "bottom": "20%",
 "minHeight": 50,
 "iconURL": "skin/IconButton_28BF3E40_0D4B_DBF0_41A3_D5D2941E6E14.png",
 "minWidth": 50,
 "mode": "push",
 "class": "IconButton",
 "paddingTop": 0,
 "horizontalAlign": "center",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton >"
 },
 "cursor": "hand",
 "maxWidth": 60,
 "rollOverIconURL": "skin/IconButton_28BF3E40_0D4B_DBF0_41A3_D5D2941E6E14_rollover.png"
},
{
 "transparencyActive": false,
 "maxHeight": 60,
 "id": "IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": "1.77%",
 "width": "5.17%",
 "borderRadius": 0,
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_pressed.png",
 "minWidth": 50,
 "propagateClick": false,
 "verticalAlign": "middle",
 "top": "45.75%",
 "minHeight": 50,
 "height": 58,
 "iconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510.png",
 "mode": "push",
 "class": "IconButton",
 "paddingTop": 0,
 "horizontalAlign": "center",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton >"
 },
 "cursor": "hand",
 "maxWidth": 60,
 "rollOverIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_rollover.png"
},
{
 "transparencyActive": true,
 "maxHeight": 150,
 "id": "IconButton_23F7E7B7_0C0A_6293_419F_D3D84EB3AFBD",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": "12%",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_23F7E7B7_0C0A_6293_419F_D3D84EB3AFBD_pressed.png",
 "borderSize": 0,
 "minWidth": 70,
 "propagateClick": false,
 "verticalAlign": "middle",
 "minHeight": 70,
 "height": "8%",
 "iconURL": "skin/IconButton_23F7E7B7_0C0A_6293_419F_D3D84EB3AFBD.png",
 "mode": "push",
 "class": "IconButton",
 "paddingTop": 0,
 "horizontalAlign": "center",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton <"
 },
 "cursor": "hand",
 "maxWidth": 150,
 "rollOverIconURL": "skin/IconButton_23F7E7B7_0C0A_6293_419F_D3D84EB3AFBD_rollover.png"
},
{
 "transparencyActive": false,
 "maxHeight": 60,
 "id": "IconButton_2BE71718_0D55_6990_41A5_73D31D902E1D",
 "left": 10,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": "14.22%",
 "borderRadius": 0,
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_2BE71718_0D55_6990_41A5_73D31D902E1D_pressed.png",
 "propagateClick": false,
 "verticalAlign": "middle",
 "top": "20%",
 "bottom": "20%",
 "minHeight": 50,
 "iconURL": "skin/IconButton_2BE71718_0D55_6990_41A5_73D31D902E1D.png",
 "minWidth": 50,
 "mode": "push",
 "class": "IconButton",
 "paddingTop": 0,
 "horizontalAlign": "center",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton <"
 },
 "cursor": "hand",
 "maxWidth": 60,
 "rollOverIconURL": "skin/IconButton_2BE71718_0D55_6990_41A5_73D31D902E1D_rollover.png"
},
{
 "transparencyActive": false,
 "maxHeight": 60,
 "id": "IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
 "left": 10,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": "14.22%",
 "borderRadius": 0,
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_pressed.png",
 "propagateClick": false,
 "verticalAlign": "middle",
 "top": "20%",
 "bottom": "20%",
 "minHeight": 50,
 "iconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482.png",
 "minWidth": 50,
 "mode": "push",
 "class": "IconButton",
 "paddingTop": 0,
 "horizontalAlign": "center",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton <"
 },
 "cursor": "hand",
 "maxWidth": 60,
 "rollOverIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_rollover.png"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 15)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 9.86,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F96212F4_D14D_98FE_41A9_4E7CF6A0A2FB",
   "pitch": -38.26,
   "yaw": -166.67,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C7E779E6_D0DE_891A_41BC_6EE41962259C",
 "data": {
  "label": "Arrow 02a Left"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 9.86,
   "yaw": -166.67,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -38.26,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2561511_D0C5_B939_41A8_8D31D24AE963_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 17)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 6.66,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F962A2F4_D14D_98FE_41D0_1FDEA726A382",
   "pitch": -26.06,
   "yaw": -68.58,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C72A1EF2_D0DE_88FA_41A3_E04135069A8E",
 "data": {
  "label": "Arrow 02a Left"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.66,
   "yaw": -68.58,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -26.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2561511_D0C5_B939_41A8_8D31D24AE963_1_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 10)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 5.73,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F96122F4_D14D_98FE_41CB_EBF37D6D0549",
   "pitch": -19.93,
   "yaw": 40.71,
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C7D0BAAF_D0DB_8B69_41C6_1722F895F68A",
 "data": {
  "label": "Circle Arrow 04b"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.73,
   "yaw": 40.71,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -19.93,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2513312_D0C5_F93A_41D8_1A527338BDA8_1_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 10)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 6.8,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F96032F3_D14D_98FA_41E8_C342627FA327",
   "pitch": -30.47,
   "yaw": -89.6,
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C7A8D4F5_D0C5_78FE_41E7_7F9C6428E9ED",
 "data": {
  "label": "Circle Arrow 04b"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.8,
   "yaw": -89.6,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -30.47,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C251A155_D0C5_993E_41E3_8D21B41BF428_1_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 8.08,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F96462F3_D14D_98FA_41E8_4DF41D12A223",
   "pitch": -21.17,
   "yaw": -122.5,
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C7820D75_D0DE_89FE_41E2_AF73CF70A7DE",
 "data": {
  "label": "Circle Arrow 04b"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 8.08,
   "yaw": -122.5,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -21.17,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2AA6D3B_D0C5_8969_41DD_00EB73C32CE8_1_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 6.99,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2AA6D3B_D0C5_8969_41DD_00EB73C32CE8_1_HS_1_0.png",
      "width": 179,
      "class": "ImageResourceLevel",
      "height": 173
     }
    ]
   },
   "pitch": -27.61,
   "yaw": 89.34
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C7735C81_D0DF_8F19_41D9_A464F6ADD9FE",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.99,
   "yaw": 89.34,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -27.61,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2AA6D3B_D0C5_8969_41DD_00EB73C32CE8_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 13)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 6.71,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F96502F3_D14D_98FA_41DA_6D87A62B5035",
   "pitch": -15.3,
   "yaw": -61.94,
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C72C26D5_D0C7_9B39_41E6_5DEF766907A6",
 "data": {
  "label": "Circle Arrow 04b"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.71,
   "yaw": -61.94,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -15.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80_1_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 12)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 6.49,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F965B2F3_D14D_98FA_41E2_B45C7D212F7F",
   "pitch": -18.8,
   "yaw": 32.09,
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C786DDEE_D0C6_88EA_41E7_7D4D4EAE8EFB",
 "data": {
  "label": "Circle Arrow 04b"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.49,
   "yaw": 32.09,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -18.8,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80_1_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 11)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 5.41,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F965C2F3_D14D_98FA_41CB_A5AC8CC8538E",
   "pitch": -25.34,
   "yaw": -64.3,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C77C63C0_D0C5_7917_41D1_2E4B1E84BE3D",
 "data": {
  "label": "Arrow 02a Left"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.41,
   "yaw": -64.3,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -25.34,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80_1_HS_2_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 14)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 6.26,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F96602F3_D14D_98FA_41E5_942AC7969157",
   "pitch": -22.71,
   "yaw": 13.33,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C9FB9880_D0C5_7717_41E4_6E60E311A4C9",
 "data": {
  "label": "Arrow 02a Left"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.26,
   "yaw": 13.33,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -22.71,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80_1_HS_3_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 15)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 7.26,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F966A2F3_D14D_98FA_41C4_3CEB5C796B8E",
   "pitch": -21.54,
   "yaw": 54.84,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C7DD22E6_D0CA_9B1A_41D0_CD7EE5D909FB",
 "data": {
  "label": "Arrow 02c Right"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.26,
   "yaw": 54.84,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -21.54,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80_1_HS_4_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1, this.camera_E0767E46_D1C6_8B1A_41C5_162D03D0FA90); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 2.56,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F966C2F3_D14D_98FA_41E0_B8CC20897D7B",
   "pitch": -78.86,
   "yaw": -146.99,
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_CADC7157_D0CF_993A_41E9_F27A96EC02BB",
 "data": {
  "label": "Circle Arrow 04b"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 2.56,
   "yaw": -146.99,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -78.86,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80_1_HS_5_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 10)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 8.28,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F96142F4_D14D_98FE_41CC_AD857DC6ED4F",
   "pitch": -17.14,
   "yaw": -48.65,
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C774A2ED_D0DA_98EE_41E7_FA6EDACBBB88",
 "data": {
  "label": "Circle Arrow 04b"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 8.28,
   "yaw": -48.65,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -17.14,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2569E98_D0C5_8B37_41E1_7EBA2025196A_1_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 16)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 8.45,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F961E2F4_D14D_98FE_41E5_5D797446E650",
   "pitch": -21.87,
   "yaw": 141.33,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C8F9B3C0_D0DB_B916_41D3_7034BFC9A575",
 "data": {
  "label": "Arrow 02c Right"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 8.45,
   "yaw": 141.33,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -21.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2569E98_D0C5_8B37_41E1_7EBA2025196A_1_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 4.89,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C4FADE7C_D0C5_8BEE_41CB_97FB898151D6_1_HS_0_0.png",
      "width": 117,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -18.79,
   "yaw": -66.83
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C6699B94_D0CA_893E_41E0_E6FD17912766",
 "data": {
  "label": "Image"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.89,
   "yaw": -66.83,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -18.79,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C4FADE7C_D0C5_8BEE_41CB_97FB898151D6_1_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 7.51,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F95FB2F1_D14D_98F6_41B3_E7054D301FA9",
   "pitch": -17.88,
   "yaw": 80.23,
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C735E772_D0C7_B9FB_41C6_4808C377B21A",
 "data": {
  "label": "Circle Arrow 04b"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.51,
   "yaw": 80.23,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -17.88,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1_1_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 6.9,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F95FD2F1_D14D_98F6_41E0_5AD53DBE3360",
   "pitch": -28.97,
   "yaw": -34.82,
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C765AC77_D0C7_8FFA_41E2_860A234E2CDB",
 "data": {
  "label": "Circle Arrow 04b"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.9,
   "yaw": -34.82,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -28.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1_1_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 5.36,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F95802F1_D14D_98F6_41E2_9CDA5F4C4F65",
   "pitch": -40.14,
   "yaw": 84.03,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C98F13BA_D0C6_B96A_41E7_254F39D22327",
 "data": {
  "label": "Arrow 02a Right"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.36,
   "yaw": 84.03,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -40.14,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1_1_HS_2_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80, this.camera_E0612E4C_D1C6_8B2E_41C3_2DA216AC0DBF); this.mainPlayList.set('selectedIndex', 10)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 6.97,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F958B2F1_D14D_98F6_41D5_93E483ED9A9E",
   "pitch": -27.95,
   "yaw": 21.95,
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_F9E03986_D0BF_891A_41EA_12FED822A3F8",
 "data": {
  "label": "Circle Arrow 04b"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.97,
   "yaw": 21.95,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -27.95,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1_1_HS_3_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "id": "IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 58,
 "borderRadius": 0,
 "borderSize": 0,
 "minWidth": 1,
 "propagateClick": true,
 "verticalAlign": "middle",
 "minHeight": 1,
 "mode": "push",
 "height": 58,
 "iconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB.png",
 "class": "IconButton",
 "paddingTop": 0,
 "horizontalAlign": "center",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton VR"
 },
 "cursor": "hand",
 "maxWidth": 58,
 "rollOverIconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB_rollover.png"
},
{
 "transparencyActive": true,
 "maxHeight": 37,
 "id": "IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270",
 "backgroundOpacity": 0,
 "width": 100,
 "paddingRight": 0,
 "right": 30,
 "paddingLeft": 0,
 "borderRadius": 0,
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270_pressed.png",
 "minWidth": 1,
 "propagateClick": true,
 "verticalAlign": "middle",
 "bottom": 8,
 "minHeight": 1,
 "mode": "push",
 "height": 75,
 "iconURL": "skin/IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270.png",
 "class": "IconButton",
 "paddingTop": 0,
 "horizontalAlign": "center",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton VR"
 },
 "cursor": "hand",
 "maxWidth": 49,
 "rollOverIconURL": "skin/IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270_rollover.png"
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "id": "IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 58,
 "borderRadius": 0,
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96_pressed.png",
 "minWidth": 1,
 "propagateClick": true,
 "verticalAlign": "middle",
 "minHeight": 1,
 "mode": "toggle",
 "height": 58,
 "iconURL": "skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96.png",
 "class": "IconButton",
 "paddingTop": 0,
 "horizontalAlign": "center",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton HS "
 },
 "cursor": "hand",
 "maxWidth": 58
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "id": "IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 58,
 "borderRadius": 0,
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A_pressed.png",
 "minWidth": 1,
 "propagateClick": true,
 "verticalAlign": "middle",
 "minHeight": 1,
 "mode": "toggle",
 "height": 58,
 "iconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A.png",
 "class": "IconButton",
 "paddingTop": 0,
 "horizontalAlign": "center",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton GYRO"
 },
 "cursor": "hand",
 "maxWidth": 58
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 7.92,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F958D2F1_D14D_98F6_41E4_1266B213D2FF",
   "pitch": -23.92,
   "yaw": -54.93,
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C7B96C7C_D0C5_8FEE_41DE_B57CCA7871A8",
 "data": {
  "label": "Circle Arrow 04b"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.92,
   "yaw": -54.93,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -23.92,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7_1_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 7.91,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F95912F1_D14D_98F6_41CE_FA5EF5C9E86E",
   "pitch": -24.17,
   "yaw": -29.56,
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C78ED9ED_D0C5_88EE_41E6_122A060AD309",
 "data": {
  "label": "Circle Arrow 04b"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.91,
   "yaw": -29.56,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -24.17,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7_1_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 8.15,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F95942F1_D14D_98F6_41D5_B13B82E3146C",
   "pitch": -19.95,
   "yaw": -118.21,
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C7085539_D0C5_B969_41E8_1112B960ACBC",
 "data": {
  "label": "Circle Arrow 04b"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 8.15,
   "yaw": -118.21,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -19.95,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7_1_HS_2_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 7.51,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F959F2F1_D14D_98F6_41D6_C7271C1E7BF2",
   "pitch": -29.95,
   "yaw": 92.29,
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C6196001_D0C5_9719_41D1_245DE495F2B2",
 "data": {
  "label": "Circle Arrow 04b"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.51,
   "yaw": 92.29,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -29.95,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7_1_HS_3_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 4.52,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F95A12F2_D14D_98FA_4191_76D8AB8179FD",
   "pitch": -13.4,
   "yaw": -145.64,
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_CAA6191E_D0CD_892A_41E0_93276ACF70D4",
 "data": {
  "label": "Circle Arrow 04b"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.52,
   "yaw": -145.64,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -13.4,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7_1_HS_4_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 10)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 7.33,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F95A52F2_D14D_98FA_41E3_B4FDE19DC820",
   "pitch": -32.26,
   "yaw": -170.71,
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_CCB38F77_D0CA_89F9_41C5_5C8B9F28C9B8",
 "data": {
  "label": "Circle Arrow 04b"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.33,
   "yaw": -170.71,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -32.26,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7_1_HS_5_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 5.69,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F96462F2_D14D_98FA_41DC_EBBFD09E5A7D",
   "pitch": -14.78,
   "yaw": -75.76,
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C736438F_D0DD_992A_41B9_92640AD7298A",
 "data": {
  "label": "Circle Arrow 04b"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.69,
   "yaw": -75.76,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -14.78,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C252F4BB_D0C5_9F6A_41BF_86C9D4F794AA_1_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 8.42,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F95B92F2_D14D_98FA_41DE_EBF13657DC8A",
   "pitch": -41.13,
   "yaw": 121.43,
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C7EFD58C_D0C6_992F_41E6_EAE908957B73",
 "data": {
  "label": "Circle Arrow 04b"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 8.42,
   "yaw": 121.43,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -41.13,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C25409CB_D0C6_892A_41D9_F52BE90F5405_1_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 8.92,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F96432F2_D14D_98FA_41E4_825551160D49",
   "pitch": -43.09,
   "yaw": 154.32,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_CBE9DAAE_D0C6_8B6A_41E5_6032B9DC90DC",
 "data": {
  "label": "Arrow 02c Right"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 8.92,
   "yaw": 154.32,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -43.09,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C25409CB_D0C6_892A_41D9_F52BE90F5405_1_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 13)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 5.61,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F96702F3_D14D_98FA_41CA_17EBAC0BC3C4",
   "pitch": -35.85,
   "yaw": -110.05,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C99C5E22_D0C5_8B1A_41D5_5132D41EB734",
 "data": {
  "label": "Arrow 02a Left"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.61,
   "yaw": -110.05,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -35.85,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C25BF6DB_D0C5_9B2A_41E9_8388B3E0C16F_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 10)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 5.66,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F967A2F3_D14D_98FA_41E5_D47FCF130A6E",
   "pitch": -36.05,
   "yaw": -90.62,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C762BDCE_D0C5_892B_41AF_773174E99711",
 "data": {
  "label": "Arrow 02a Right"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.66,
   "yaw": -90.62,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -36.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C25BF6DB_D0C5_9B2A_41E9_8388B3E0C16F_1_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 11.33,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F96422F3_D14D_98FA_41DD_08A0458E6512",
   "pitch": -40.13,
   "yaw": 88.43,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C93E9F37_D0C5_8979_41DB_6C7BBC922DC3",
 "data": {
  "label": "Arrow 02c Left-Up"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 11.33,
   "yaw": 88.43,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -40.13,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C250C769_D0C5_7916_41C7_1AEDD193A02E_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "items": [
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C6BBF737_D0CD_7979_4192_F436F3EC25F2",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C473EBC5_D0CE_891E_41E6_8A018905DF16",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C44A8FDA_D0CE_892A_41E3_36FA0B633BAE",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C4E2B10E_D0CE_992A_41E7_DF5B60DD4C98",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C48B7613_D0CE_9B3A_41C7_F76677195D02",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C45D2A39_D0CE_8B76_41D9_D8F059C336CA",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C4AB1ECE_D0CE_8B2B_41D6_42C293E9970E",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C45E839D_D0CE_F92E_41B2_614573FDF86F",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C44D3883_D0CE_F71A_41E1_9C39DAF9E2A6",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C452CD15_D0CE_893E_41DF_C186C9D541E8",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C4AA223A_D0CE_9B6B_41E1_B640D5589C4A",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C456B7AE_D0CE_996A_41E9_40D7304B4043",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C4454C04_D0CE_8F1F_41D6_AE285DD65598",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C45A50BF_D0CE_B76A_41E9_F00A163CEDBB",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C4538527_D0CE_B91A_41D5_F49AB9090CA5",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C45EB9C4_D0CE_891E_41B3_58C233944432",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C4AB210D_D0CE_992E_41D4_02FDF045D266",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C4594584_D0CE_991F_41E1_349DB01AFEE1",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C45F7A7D_D0CE_8BE9_41D0_D7B769D83ED2",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C4478F17_D0CE_893A_41B1_0F83F842C8F5",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C446D371_D0CF_79F9_41DA_624761815DEA",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C442F78D_D0CF_792E_41DF_D61ADDCE3BA6",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C4574BB6_D0CF_897A_41E3_D1F5C5013084",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C4BA00C3_D0CF_971A_41B3_4B8A4FE2D0BA",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C4A525F7_D0CF_98FA_41D0_BD087ACAB829",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C4A02D5D_D0CF_892E_41E1_D982601D8DE6",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C4B892E6_D0CF_BB1A_41E4_6A64FEB1312C",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C45D8779_D0CF_B9E9_41E3_EFFC1A1EBC17",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C4499B92_D0CF_893A_41C1_202FFB9A2DE8",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C44DFFEC_D0CF_88EE_41CC_6F08A8518399",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C4482410_D0CF_9F37_41D2_44F4BE2E93B7",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C4761835_D0CF_9779_41DE_7EF55E3C8FE9",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C44284F6_D0CF_F8FB_41D8_673A4FE30AE4",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C45C2932_D0CF_897A_41E1_B93B292BB79D",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C456FD56_D0CF_893A_41DE_852CF108515E",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C4457194_D0CF_993E_41E7_B963211962FF",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C451D60A_D0CF_9B2B_41C8_284620C12965",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C45F6F96_D0CF_893A_41E1_D551983720C1",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C4AB23EE_D0CF_B8EA_41E6_BDC72E0ECB1B",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C457C8BC_D0CF_B76F_41C3_871C80FAA288",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C45F4D2F_D0CF_896A_41E1_6CBE5CC92C1C",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C4479159_D0CF_9936_41E4_592EC93DC8E0",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C44765EE_D0CF_98EA_41C3_D90596315BB7",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C459CA0E_D0CF_8B2B_41E2_BE518171573D",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C451EE77_D0CF_8BFA_41DE_1783C60A93AB",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C4AB1293_D0CF_7B3A_41DB_61840B9BA876",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C449E701_D0CF_7916_41DB_7805F4D95C23",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C443FB8E_D0CE_892A_41E6_9F4A4ED38178",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C44050A7_D0CE_971A_41E0_6CCBA7F8921F",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C447D57E_D0CE_99EA_41B6_A60D6F869B96",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C4562A73_D0CE_8BFA_41E5_8B0B0A680F55",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C44BFED0_D0CE_8B36_41E5_F7B948728F77",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C475B31C_D0CE_B92F_414E_7545866E3134",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C44D3836_D0CE_B77B_41E0_66ECC2810DC8",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C473BC89_D0CE_8F16_41E9_D472742EDAFB",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C4AE90D0_D0CE_9736_41D2_96C8A97BBD11",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C4B105CE_D0CE_992B_41E1_C7A6E6E0284F",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C4ACCA36_D0CE_8B7A_41E6_9C0D4213BF7F",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C4502AE7_D0CE_8B1A_41D4_F0FAA1073B9E",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C45943B4_D0CE_997E_41E1_8AE8EEABFAE1",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C44660C8_D0CE_B716_41E8_A4484716AC37",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C44974DF_D0CE_BF29_41DA_BB0F6B3F7A06",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C4471988_D0CE_8916_41D5_0436260400B7",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C4488DCA_D0CE_892A_41E4_A45F6F24741C",
   "class": "PhotoPlayListItem"
  },
  {
   "camera": {
    "class": "PhotoCamera",
    "scaleMode": "fit_to_height"
   },
   "media": "this.photo_C45CA669_D0CE_9B16_41CE_6EA18705B428",
   "class": "PhotoPlayListItem"
  }
 ],
 "id": "album_83A41AEF_B189_0C12_41E1_AE2983209598_AlbumPlayList",
 "class": "PhotoPlayList"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 5.09,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F96492F2_D14D_98FA_41DC_B3C3DAF3DEF6",
   "pitch": -10.63,
   "yaw": -43.08,
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C7E8B6BB_D0DB_7B6A_41E0_A8D06943AD6F",
 "data": {
  "label": "Circle Arrow 04b"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.09,
   "yaw": -43.08,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -10.63,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2AF9BBB_D0C5_896A_41CA_81C79B1747D1_1_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 6.2,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F95B52F2_D14D_98FA_41C8_1892ACEEB90C",
   "pitch": -16.05,
   "yaw": 138.69,
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C789DC2F_D0DA_8F6A_41DC_F7DC074C904E",
 "data": {
  "label": "Circle Arrow 04b"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.2,
   "yaw": 138.69,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -16.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2AF9BBB_D0C5_896A_41CA_81C79B1747D1_1_HS_1_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 4.19,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F95B82F3_D14D_98FA_41D0_87E4CA635E55",
   "pitch": -17.52,
   "yaw": 144.46,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C99FD6A6_D0DA_9B1A_41B7_115094DA3E77",
 "data": {
  "label": "Arrow 02b Right"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.19,
   "yaw": 144.46,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -17.52,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2AF9BBB_D0C5_896A_41CA_81C79B1747D1_1_HS_2_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 17)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 6.85,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F96392F4_D14D_98FE_41E3_8CC1ACA4BC63",
   "pitch": -37.74,
   "yaw": -159.44,
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C7B7533F_D0DE_B969_41E0_FC0CB3A7A97E",
 "data": {
  "label": "Circle Arrow 04b"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.85,
   "yaw": -159.44,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -37.74,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2551E04_D0C5_8B1F_41A3_5721D45C65C4_1_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 10)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 5.08,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F96052F4_D14D_98FE_41D8_49DE36C4EDA3",
   "pitch": -11.63,
   "yaw": -41.58,
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C6028CA6_D0DA_8F1A_41D6_FDDC806ABEED",
 "data": {
  "label": "Circle Arrow 04b"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.08,
   "yaw": -41.58,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -11.63,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2515A41_D0C5_8B16_41E1_1612CBC55DC8_1_HS_0_0_0_map.gif",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 11)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 4.5,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F96092F4_D14D_98FE_41DF_3B7C1D99BC62",
   "pitch": -23.94,
   "yaw": -41.99,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C813227C_D0DB_9BEE_41E8_9EDCACCC7F98",
 "data": {
  "label": "Arrow 02a Right"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.5,
   "yaw": -41.99,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -23.94,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2515A41_D0C5_8B16_41E1_1612CBC55DC8_1_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 4.77,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F95A82F2_D14D_98FA_41E5_31D843538F4C",
   "pitch": -22.51,
   "yaw": -59.76,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C7E3802F_D0C5_976A_41E7_F0308C2C909E",
 "data": {
  "label": "Arrow 02a Left"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.77,
   "yaw": -59.76,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -22.51,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C25238B4_D0C5_B77F_41E2_DD4EF4EA7B35_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "items": [
  {
   "hfov": 4.16,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F95B22F2_D14D_98FA_41E5_5AA733D61E29",
   "pitch": -22.75,
   "yaw": -52.18,
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "rollOverDisplay": false,
 "id": "overlay_C7E3B02F_D0C5_976A_41E6_F7A788724BC3",
 "data": {
  "label": "Arrow 02a Right"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.16,
   "yaw": -52.18,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -22.75,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C25238B4_D0C5_B77F_41E2_DD4EF4EA7B35_1_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "children": [
  "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
  "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
  "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
  "this.IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
  "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
  "this.IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC",
  "this.IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521"
 ],
 "id": "Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "right": "0%",
 "width": "91.304%",
 "borderSize": 0,
 "minWidth": 1,
 "propagateClick": true,
 "verticalAlign": "top",
 "bottom": "0%",
 "contentOpaque": false,
 "minHeight": 1,
 "height": "85.959%",
 "layout": "vertical",
 "scrollBarMargin": 2,
 "class": "Container",
 "gap": 3,
 "paddingTop": 0,
 "horizontalAlign": "center",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "-button set"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "fontFamily": "Bahnschrift",
 "id": "Label_C2F3A281_D0CA_9B16_41C0_4C2122B7E843",
 "left": "1.57%",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": "69.284%",
 "borderRadius": 0,
 "borderSize": 0,
 "minWidth": 1,
 "text": "BROOKWATER RESIDENCE",
 "propagateClick": false,
 "verticalAlign": "middle",
 "top": "27.82%",
 "minHeight": 1,
 "height": "22.556%",
 "fontSize": "3vmin",
 "fontColor": "#FFFFFF",
 "class": "Label",
 "paddingTop": 0,
 "fontStyle": "normal",
 "horizontalAlign": "left",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "Label5170"
 },
 "fontWeight": "bold",
 "textDecoration": "none"
},
{
 "fontFamily": "Bahnschrift",
 "id": "Label_C2D95C0C_D0C5_8F2F_41D6_8C85362101E6",
 "left": "2.44%",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": "37.871%",
 "borderRadius": 0,
 "borderSize": 0,
 "minWidth": 1,
 "text": "Queensland, Australia",
 "propagateClick": false,
 "verticalAlign": "middle",
 "bottom": "28.61%",
 "minHeight": 1,
 "height": "22.556%",
 "fontSize": "1.7vmin",
 "fontColor": "#FFFFFF",
 "class": "Label",
 "paddingTop": 0,
 "fontStyle": "normal",
 "horizontalAlign": "left",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "Label5170"
 },
 "fontWeight": "normal",
 "textDecoration": "none"
},
{
 "maxHeight": 2,
 "id": "Image_1B99DD00_16C4_0505_41B3_51F09727447A",
 "left": "0%",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": "0%",
 "borderRadius": 0,
 "borderSize": 0,
 "url": "skin/Image_1B99DD00_16C4_0505_41B3_51F09727447A.png",
 "minWidth": 1,
 "propagateClick": true,
 "verticalAlign": "middle",
 "bottom": 53,
 "minHeight": 1,
 "height": 2,
 "class": "Image",
 "paddingTop": 0,
 "horizontalAlign": "center",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "white line"
 },
 "maxWidth": 3000,
 "scaleMode": "fit_outside"
},
{
 "children": [
  "this.Button_1B998D00_16C4_0505_41AD_67CAA4AAEFE0",
  "this.Button_1B999D00_16C4_0505_41AB_D0C2E7857448",
  "this.Button_1B9A6D00_16C4_0505_4197_F2108627CC98",
  "this.Button_1B9A4D00_16C4_0505_4193_E0EA69B0CBB0",
  "this.Button_1B9A5D00_16C4_0505_41B0_D18F25F377C4",
  "this.Button_1B9A3D00_16C4_0505_41B2_6830155B7D52",
  "this.Button_FBE62D4B_D1C7_892A_41DC_2AB26FA2A66D"
 ],
 "id": "Container_1B99BD00_16C4_0505_41A4_A3C2452B0288",
 "left": "0%",
 "backgroundOpacity": 0,
 "paddingLeft": 30,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "width": 1199,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "propagateClick": true,
 "verticalAlign": "middle",
 "bottom": "0%",
 "contentOpaque": false,
 "minHeight": 1,
 "height": 51,
 "layout": "horizontal",
 "scrollBarMargin": 2,
 "class": "Container",
 "gap": 3,
 "paddingTop": 0,
 "horizontalAlign": "left",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "-button set container"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "pressedBackgroundColor": [
  "#000000"
 ],
 "fontFamily": "Montserrat",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "id": "Button_FA94E7B6_B287_0472_41E4_885B6E4B9BB1",
 "pressedBackgroundOpacity": 1,
 "backgroundOpacity": 0,
 "width": 112,
 "paddingRight": 0,
 "paddingLeft": 0,
 "borderRadius": 0,
 "borderSize": 0,
 "right": "-0.12%",
 "iconHeight": 32,
 "minWidth": 1,
 "propagateClick": true,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "shadowColor": "#000000",
 "bottom": "-30.51%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minHeight": 1,
 "mode": "push",
 "pressedBackgroundColorRatios": [
  0
 ],
 "height": 40,
 "fontSize": 12,
 "fontColor": "#FFFFFF",
 "class": "Button",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "label": "BACK TO TOUR",
 "horizontalAlign": "center",
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "shadow": false,
 "paddingBottom": 0,
 "iconWidth": 32,
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "iconBeforeLabel": true,
 "fontWeight": "bold",
 "fontStyle": "normal",
 "textDecoration": "none",
 "cursor": "hand",
 "layout": "horizontal",
 "shadowBlurRadius": 15,
 "data": {
  "name": "Button photoalbum"
 },
 "shadowSpread": 1
},
{
 "children": [
  "this.Container_062A682F_1140_E20B_41B0_3071FCBF3DC9",
  "this.Container_062A082F_1140_E20A_4193_DF1A4391DC79"
 ],
 "minWidth": 1,
 "left": "10%",
 "backgroundOpacity": 1,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "id": "Container_062A782F_1140_E20B_41AF_B3E5DE341773",
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "paddingRight": 0,
 "right": "10%",
 "shadowOpacity": 0.3,
 "borderSize": 0,
 "propagateClick": false,
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "top": "5%",
 "bottom": "5%",
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minHeight": 1,
 "shadowVerticalLength": 0,
 "shadowHorizontalLength": 0,
 "verticalAlign": "top",
 "layout": "horizontal",
 "scrollBarMargin": 2,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "horizontalAlign": "left",
 "shadow": true,
 "paddingBottom": 0,
 "data": {
  "name": "Global"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "shadowBlurRadius": 25,
 "shadowSpread": 1
},
{
 "children": [
  "this.IconButton_062A8830_1140_E215_419D_3439F16CCB3E"
 ],
 "id": "Container_062A9830_1140_E215_41A7_5F2BBE5C20E4",
 "left": "10%",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 20,
 "scrollBarVisible": "rollOver",
 "right": "10%",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "verticalAlign": "top",
 "top": "5%",
 "bottom": "80%",
 "contentOpaque": false,
 "minHeight": 1,
 "layout": "vertical",
 "minWidth": 1,
 "scrollBarMargin": 2,
 "class": "Container",
 "gap": 10,
 "paddingTop": 20,
 "horizontalAlign": "right",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "Container X global"
 },
 "overflow": "visible",
 "scrollBarWidth": 10
},
{
 "children": [
  "this.Container_23F797B7_0C0A_6293_41A7_EC89DBCDB93F",
  "this.Container_23F027B7_0C0A_6293_418E_075FCFAA8A19"
 ],
 "id": "Container_23F7B7B7_0C0A_6293_4197_F931EEC6FA48",
 "left": "10%",
 "backgroundOpacity": 1,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "shadowOpacity": 0.3,
 "right": "10%",
 "borderSize": 0,
 "minWidth": 1,
 "propagateClick": false,
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "top": "5%",
 "shadowHorizontalLength": 0,
 "bottom": "5%",
 "contentOpaque": false,
 "minHeight": 1,
 "shadowVerticalLength": 0,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "layout": "horizontal",
 "scrollBarMargin": 2,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "horizontalAlign": "left",
 "shadow": true,
 "paddingBottom": 0,
 "data": {
  "name": "Global"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "shadowBlurRadius": 25,
 "shadowSpread": 1
},
{
 "children": [
  "this.IconButton_23F087B8_0C0A_629D_4194_6F34C6CBE1DA"
 ],
 "id": "Container_23F097B8_0C0A_629D_4176_D87C90BA32B6",
 "left": "10%",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 20,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "borderSize": 0,
 "right": "10%",
 "minWidth": 1,
 "propagateClick": false,
 "verticalAlign": "top",
 "top": "5%",
 "bottom": "80%",
 "contentOpaque": false,
 "minHeight": 1,
 "layout": "vertical",
 "scrollBarMargin": 2,
 "class": "Container",
 "gap": 10,
 "paddingTop": 20,
 "horizontalAlign": "right",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "Container X global"
 },
 "overflow": "visible",
 "scrollBarWidth": 10
},
{
 "children": [
  "this.Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
  "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0"
 ],
 "minWidth": 1,
 "left": "15%",
 "backgroundOpacity": 1,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "id": "Container_39A197B1_0C06_62AF_419A_D15E4DDD2528",
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "paddingRight": 0,
 "right": "15%",
 "shadowOpacity": 0.3,
 "borderSize": 0,
 "propagateClick": false,
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "top": "7%",
 "bottom": "7%",
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minHeight": 1,
 "shadowVerticalLength": 0,
 "shadowHorizontalLength": 0,
 "verticalAlign": "top",
 "layout": "vertical",
 "scrollBarMargin": 2,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "horizontalAlign": "center",
 "shadow": true,
 "paddingBottom": 0,
 "data": {
  "name": "Global"
 },
 "overflow": "visible",
 "scrollBarWidth": 10,
 "shadowBlurRadius": 25,
 "shadowSpread": 1
},
{
 "children": [
  "this.Container_221C0648_0C06_E5FD_4193_12BCE1D6DD6B",
  "this.Container_221C9648_0C06_E5FD_41A1_A79DE53B3031"
 ],
 "minWidth": 1,
 "left": "10%",
 "backgroundOpacity": 1,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "id": "Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "paddingRight": 0,
 "right": "10%",
 "shadowOpacity": 0.3,
 "borderSize": 0,
 "propagateClick": false,
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "top": "5%",
 "bottom": "5%",
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minHeight": 1,
 "shadowVerticalLength": 0,
 "shadowHorizontalLength": 0,
 "verticalAlign": "top",
 "layout": "horizontal",
 "scrollBarMargin": 2,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "horizontalAlign": "left",
 "shadow": true,
 "paddingBottom": 0,
 "data": {
  "name": "Global"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "shadowBlurRadius": 25,
 "shadowSpread": 1
},
{
 "children": [
  "this.IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF"
 ],
 "id": "Container_221B3648_0C06_E5FD_4199_FCE031AE003B",
 "left": "10%",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 20,
 "scrollBarVisible": "rollOver",
 "right": "10%",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "verticalAlign": "top",
 "top": "5%",
 "bottom": "80%",
 "contentOpaque": false,
 "minHeight": 1,
 "layout": "vertical",
 "minWidth": 1,
 "scrollBarMargin": 2,
 "class": "Container",
 "gap": 10,
 "paddingTop": 20,
 "horizontalAlign": "right",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "Container X global"
 },
 "overflow": "visible",
 "scrollBarWidth": 10
},
{
 "children": [
  "this.Container_2F8A7686_0D4F_6B71_41A9_1A894413085C",
  "this.TabPanel_8F9AA4BA_B2B9_047D_41D9_A73DDB4D9E3E"
 ],
 "minWidth": 1,
 "left": "15%",
 "backgroundOpacity": 1,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "id": "Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3",
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "paddingRight": 0,
 "right": "15%",
 "shadowOpacity": 0.3,
 "borderSize": 0,
 "propagateClick": false,
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "top": "7%",
 "bottom": "7%",
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minHeight": 1,
 "shadowVerticalLength": 0,
 "shadowHorizontalLength": 0,
 "verticalAlign": "top",
 "layout": "vertical",
 "scrollBarMargin": 2,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "horizontalAlign": "center",
 "shadow": true,
 "paddingBottom": 0,
 "data": {
  "name": "Global"
 },
 "overflow": "visible",
 "scrollBarWidth": 10,
 "shadowBlurRadius": 25,
 "shadowSpread": 1
},
{
 "children": [
  "this.Container_28214A13_0D5D_5B97_4193_B631E1496339",
  "this.Container_2B0BF61C_0D5B_2B90_4179_632488B1209E"
 ],
 "id": "Container_28215A13_0D5D_5B97_4198_A7CA735E9E0A",
 "left": "15%",
 "backgroundOpacity": 1,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "shadowOpacity": 0.3,
 "right": "15%",
 "borderSize": 0,
 "minWidth": 1,
 "propagateClick": false,
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "top": "7%",
 "shadowHorizontalLength": 0,
 "bottom": "7%",
 "contentOpaque": false,
 "minHeight": 1,
 "shadowVerticalLength": 0,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "layout": "vertical",
 "scrollBarMargin": 2,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "horizontalAlign": "center",
 "shadow": true,
 "paddingBottom": 0,
 "data": {
  "name": "Global"
 },
 "overflow": "visible",
 "scrollBarWidth": 10,
 "shadowBlurRadius": 25,
 "shadowSpread": 1
},
{
 "children": [
  "this.Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC"
 ],
 "show": "this.mainPlayList.set('selectedIndex', 19)",
 "id": "Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536",
 "left": "15%",
 "backgroundOpacity": 1,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "shadowOpacity": 0.3,
 "right": "15%",
 "borderSize": 0,
 "minWidth": 1,
 "propagateClick": false,
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "top": "7%",
 "shadowHorizontalLength": 0,
 "bottom": "7%",
 "contentOpaque": false,
 "minHeight": 1,
 "shadowVerticalLength": 0,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "layout": "vertical",
 "scrollBarMargin": 2,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "horizontalAlign": "center",
 "shadow": true,
 "paddingBottom": 0,
 "data": {
  "name": "Global"
 },
 "overflow": "visible",
 "scrollBarWidth": 10,
 "shadowBlurRadius": 25,
 "shadowSpread": 1
},
{
 "children": [
  "this.Container_06C5ABA5_1140_A63F_41A9_850CF958D0DB",
  "this.Container_06C58BA5_1140_A63F_419D_EC83F94F8C54"
 ],
 "minWidth": 1,
 "left": "10%",
 "backgroundOpacity": 1,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "id": "Container_06C5DBA5_1140_A63F_41AD_1D83A33F1255",
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "paddingRight": 0,
 "right": "10%",
 "shadowOpacity": 0.3,
 "borderSize": 0,
 "propagateClick": false,
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "top": "5%",
 "bottom": "5%",
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minHeight": 1,
 "shadowVerticalLength": 0,
 "shadowHorizontalLength": 0,
 "verticalAlign": "top",
 "layout": "horizontal",
 "scrollBarMargin": 2,
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "horizontalAlign": "left",
 "shadow": true,
 "paddingBottom": 0,
 "data": {
  "name": "Global"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "shadowBlurRadius": 25,
 "shadowSpread": 1
},
{
 "children": [
  "this.IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81"
 ],
 "id": "Container_06C43BA5_1140_A63F_41A1_96DC8F4CAD2F",
 "left": "10%",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 20,
 "scrollBarVisible": "rollOver",
 "right": "10%",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "verticalAlign": "top",
 "top": "5%",
 "bottom": "80%",
 "contentOpaque": false,
 "minHeight": 1,
 "layout": "vertical",
 "minWidth": 1,
 "scrollBarMargin": 2,
 "class": "Container",
 "gap": 10,
 "paddingTop": 20,
 "horizontalAlign": "right",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "Container X global"
 },
 "overflow": "visible",
 "scrollBarWidth": 10
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_F95B52F2_D14D_98FA_41D1_27276182B069",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C25406DA_D0C5_9B2B_41E3_7A83540D87A9_1_HS_0_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 780
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_F962C2F4_D14D_98FE_41E2_F820A823751E",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C250FB63_D0C6_891A_41DC_A53205D0D898_1_HS_0_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 780
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_F96372F4_D14D_98FE_41D9_6FDC43CD9741",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C250FB63_D0C6_891A_41DC_A53205D0D898_1_HS_1_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 780
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_F96212F4_D14D_98FE_41A9_4E7CF6A0A2FB",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C2561511_D0C5_B939_41A8_8D31D24AE963_1_HS_0_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_F962A2F4_D14D_98FE_41D0_1FDEA726A382",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C2561511_D0C5_B939_41A8_8D31D24AE963_1_HS_1_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_F96122F4_D14D_98FE_41CB_EBF37D6D0549",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C2513312_D0C5_F93A_41D8_1A527338BDA8_1_HS_0_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 780
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_F96032F3_D14D_98FA_41E8_C342627FA327",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C251A155_D0C5_993E_41E3_8D21B41BF428_1_HS_0_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 780
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_F96462F3_D14D_98FA_41E8_4DF41D12A223",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C2AA6D3B_D0C5_8969_41DD_00EB73C32CE8_1_HS_0_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 780
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_F96502F3_D14D_98FA_41DA_6D87A62B5035",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80_1_HS_0_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 780
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_F965B2F3_D14D_98FA_41E2_B45C7D212F7F",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80_1_HS_1_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 780
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_F965C2F3_D14D_98FA_41CB_A5AC8CC8538E",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80_1_HS_2_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_F96602F3_D14D_98FA_41E5_942AC7969157",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80_1_HS_3_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_F966A2F3_D14D_98FA_41C4_3CEB5C796B8E",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80_1_HS_4_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_F966C2F3_D14D_98FA_41E0_B8CC20897D7B",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C25142A4_D0C6_BB1F_41E4_1C338D10BE80_1_HS_5_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 780
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_F96142F4_D14D_98FE_41CC_AD857DC6ED4F",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C2569E98_D0C5_8B37_41E1_7EBA2025196A_1_HS_0_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 780
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_F961E2F4_D14D_98FE_41E5_5D797446E650",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C2569E98_D0C5_8B37_41E1_7EBA2025196A_1_HS_1_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_F95FB2F1_D14D_98F6_41B3_E7054D301FA9",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1_1_HS_0_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 780
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_F95FD2F1_D14D_98F6_41E0_5AD53DBE3360",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1_1_HS_1_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 780
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_F95802F1_D14D_98F6_41E2_9CDA5F4C4F65",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1_1_HS_2_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_F958B2F1_D14D_98F6_41D5_93E483ED9A9E",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C2545FCC_D0C5_892E_41E9_19032DFDB4D1_1_HS_3_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 780
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_F958D2F1_D14D_98F6_41E4_1266B213D2FF",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7_1_HS_0_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 780
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_F95912F1_D14D_98F6_41CE_FA5EF5C9E86E",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7_1_HS_1_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 780
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_F95942F1_D14D_98F6_41D5_B13B82E3146C",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7_1_HS_2_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 780
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_F959F2F1_D14D_98F6_41D6_C7271C1E7BF2",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7_1_HS_3_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 780
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_F95A12F2_D14D_98FA_4191_76D8AB8179FD",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7_1_HS_4_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 780
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_F95A52F2_D14D_98FA_41E3_B4FDE19DC820",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C251A03C_D0C6_9768_41E2_ECAF8FA206E7_1_HS_5_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 780
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_F96462F2_D14D_98FA_41DC_EBBFD09E5A7D",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C252F4BB_D0C5_9F6A_41BF_86C9D4F794AA_1_HS_0_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 780
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_F95B92F2_D14D_98FA_41DE_EBF13657DC8A",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C25409CB_D0C6_892A_41D9_F52BE90F5405_1_HS_0_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 780
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_F96432F2_D14D_98FA_41E4_825551160D49",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C25409CB_D0C6_892A_41D9_F52BE90F5405_1_HS_1_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_F96702F3_D14D_98FA_41CA_17EBAC0BC3C4",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C25BF6DB_D0C5_9B2A_41E9_8388B3E0C16F_1_HS_0_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_F967A2F3_D14D_98FA_41E5_D47FCF130A6E",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C25BF6DB_D0C5_9B2A_41E9_8388B3E0C16F_1_HS_1_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_F96422F3_D14D_98FA_41DD_08A0458E6512",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C250C769_D0C5_7916_41C7_1AEDD193A02E_1_HS_0_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_F96492F2_D14D_98FA_41DC_B3C3DAF3DEF6",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C2AF9BBB_D0C5_896A_41CA_81C79B1747D1_1_HS_0_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 780
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_F95B52F2_D14D_98FA_41C8_1892ACEEB90C",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C2AF9BBB_D0C5_896A_41CA_81C79B1747D1_1_HS_1_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 780
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_F95B82F3_D14D_98FA_41D0_87E4CA635E55",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C2AF9BBB_D0C5_896A_41CA_81C79B1747D1_1_HS_2_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_F96392F4_D14D_98FE_41E3_8CC1ACA4BC63",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C2551E04_D0C5_8B1F_41A3_5721D45C65C4_1_HS_0_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 780
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_F96052F4_D14D_98FE_41D8_49DE36C4EDA3",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C2515A41_D0C5_8B16_41E1_1612CBC55DC8_1_HS_0_0.png",
   "width": 1200,
   "class": "ImageResourceLevel",
   "height": 780
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_F96092F4_D14D_98FE_41DF_3B7C1D99BC62",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C2515A41_D0C5_8B16_41E1_1612CBC55DC8_1_HS_1_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_F95A82F2_D14D_98FA_41E5_31D843538F4C",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C25238B4_D0C5_B77F_41E2_DD4EF4EA7B35_1_HS_0_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_F95B22F2_D14D_98FA_41E5_5AA733D61E29",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_C25238B4_D0C5_B77F_41E2_DD4EF4EA7B35_1_HS_1_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ]
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "id": "IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 58,
 "borderRadius": 0,
 "borderSize": 0,
 "minWidth": 1,
 "propagateClick": true,
 "verticalAlign": "middle",
 "minHeight": 1,
 "mode": "push",
 "height": 58,
 "iconURL": "skin/IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC.png",
 "click": "this.shareTwitter(window.location.href)",
 "class": "IconButton",
 "paddingTop": 0,
 "horizontalAlign": "center",
 "shadow": false,
 "paddingBottom": 0,
 "visible": false,
 "data": {
  "name": "IconButton TWITTER"
 },
 "cursor": "hand",
 "maxWidth": 58,
 "rollOverIconURL": "skin/IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC_rollover.png"
},
{
 "transparencyActive": true,
 "maxHeight": 58,
 "id": "IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 58,
 "borderRadius": 0,
 "borderSize": 0,
 "minWidth": 1,
 "propagateClick": true,
 "verticalAlign": "middle",
 "minHeight": 1,
 "mode": "push",
 "height": 58,
 "iconURL": "skin/IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521.png",
 "click": "this.shareFacebook(window.location.href)",
 "class": "IconButton",
 "paddingTop": 0,
 "horizontalAlign": "center",
 "shadow": false,
 "paddingBottom": 0,
 "visible": false,
 "data": {
  "name": "IconButton FB"
 },
 "cursor": "hand",
 "maxWidth": 58,
 "rollOverIconURL": "skin/IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521_rollover.png"
},
{
 "pressedBackgroundColor": [
  "#000000"
 ],
 "fontFamily": "Montserrat",
 "rollOverBackgroundColorRatios": [
  0.01
 ],
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, true, 0, null, null, false)",
 "id": "Button_1B998D00_16C4_0505_41AD_67CAA4AAEFE0",
 "pressedBackgroundOpacity": 1,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 120,
 "borderRadius": 0,
 "borderSize": 0,
 "iconHeight": 0,
 "minWidth": 1,
 "propagateClick": true,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0
 ],
 "minHeight": 1,
 "mode": "push",
 "pressedBackgroundColorRatios": [
  0
 ],
 "height": 40,
 "fontSize": 12,
 "fontColor": "#FFFFFF",
 "class": "Button",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "label": "ABOUT PROJECT",
 "horizontalAlign": "center",
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColor": [
  "#000000"
 ],
 "gap": 5,
 "shadow": false,
 "paddingBottom": 0,
 "iconWidth": 0,
 "rollOverShadow": false,
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "iconBeforeLabel": true,
 "fontWeight": "bold",
 "fontStyle": "normal",
 "textDecoration": "none",
 "cursor": "hand",
 "layout": "horizontal",
 "shadowBlurRadius": 15,
 "data": {
  "name": "Button house info"
 },
 "shadowSpread": 1
},
{
 "pressedBackgroundColor": [
  "#000000"
 ],
 "fontFamily": "Montserrat",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, true, 0, null, null, false)",
 "id": "Button_1B999D00_16C4_0505_41AB_D0C2E7857448",
 "pressedBackgroundOpacity": 1,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 130,
 "borderRadius": 0,
 "borderSize": 0,
 "iconHeight": 32,
 "minWidth": 1,
 "propagateClick": true,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minHeight": 1,
 "mode": "push",
 "pressedBackgroundColorRatios": [
  0
 ],
 "height": 40,
 "fontSize": 12,
 "fontColor": "#FFFFFF",
 "class": "Button",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "label": "PANORAMA LIST",
 "horizontalAlign": "center",
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "shadow": false,
 "paddingBottom": 0,
 "iconWidth": 32,
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "iconBeforeLabel": true,
 "fontWeight": "bold",
 "fontStyle": "normal",
 "textDecoration": "none",
 "cursor": "hand",
 "layout": "horizontal",
 "shadowBlurRadius": 15,
 "data": {
  "name": "Button panorama list"
 },
 "shadowSpread": 1
},
{
 "pressedBackgroundColor": [
  "#000000"
 ],
 "fontFamily": "Montserrat",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "click": "this.openLink('https://drive.google.com/drive/folders/1mP-kicpK8NupZckwOcd9tW3UoqsgzBmq?usp=sharing', '_blank')",
 "id": "Button_1B9A6D00_16C4_0505_4197_F2108627CC98",
 "pressedBackgroundOpacity": 1,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 90,
 "borderRadius": 0,
 "borderSize": 0,
 "iconHeight": 32,
 "minWidth": 1,
 "propagateClick": true,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minHeight": 1,
 "mode": "push",
 "pressedBackgroundColorRatios": [
  0
 ],
 "height": 40,
 "fontSize": 12,
 "fontColor": "#FFFFFF",
 "class": "Button",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "label": "DOCUMENT",
 "horizontalAlign": "center",
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "shadow": false,
 "paddingBottom": 0,
 "iconWidth": 32,
 "visible": false,
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "iconBeforeLabel": true,
 "fontWeight": "bold",
 "fontStyle": "normal",
 "textDecoration": "none",
 "cursor": "hand",
 "layout": "horizontal",
 "shadowBlurRadius": 15,
 "data": {
  "name": "Button location"
 },
 "shadowSpread": 1
},
{
 "pressedBackgroundColor": [
  "#000000"
 ],
 "fontFamily": "Montserrat",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, true, 0, null, null, false)",
 "id": "Button_1B9A4D00_16C4_0505_4193_E0EA69B0CBB0",
 "pressedBackgroundOpacity": 1,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 103,
 "borderRadius": 0,
 "borderSize": 0,
 "iconHeight": 32,
 "minWidth": 1,
 "propagateClick": true,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minHeight": 1,
 "mode": "push",
 "pressedBackgroundColorRatios": [
  0
 ],
 "height": 40,
 "fontSize": 12,
 "fontColor": "#FFFFFF",
 "class": "Button",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "label": "FLOORPLAN",
 "horizontalAlign": "center",
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "shadow": false,
 "paddingBottom": 0,
 "iconWidth": 32,
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "iconBeforeLabel": true,
 "fontWeight": "bold",
 "fontStyle": "normal",
 "textDecoration": "none",
 "cursor": "hand",
 "layout": "horizontal",
 "shadowBlurRadius": 15,
 "data": {
  "name": "Button floorplan"
 },
 "shadowSpread": 1
},
{
 "pressedBackgroundColor": [
  "#000000"
 ],
 "fontFamily": "Montserrat",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "click": "this.mainPlayList.set('selectedIndex', 19)",
 "id": "Button_1B9A5D00_16C4_0505_41B0_D18F25F377C4",
 "pressedBackgroundOpacity": 1,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 112,
 "borderRadius": 0,
 "borderSize": 0,
 "iconHeight": 32,
 "minWidth": 1,
 "propagateClick": true,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minHeight": 1,
 "mode": "push",
 "pressedBackgroundColorRatios": [
  0
 ],
 "height": 40,
 "fontSize": 12,
 "fontColor": "#FFFFFF",
 "class": "Button",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "label": "RENDERS",
 "horizontalAlign": "center",
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "shadow": false,
 "paddingBottom": 0,
 "iconWidth": 32,
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "iconBeforeLabel": true,
 "fontWeight": "bold",
 "fontStyle": "normal",
 "textDecoration": "none",
 "cursor": "hand",
 "layout": "horizontal",
 "shadowBlurRadius": 15,
 "data": {
  "name": "Button photoalbum"
 },
 "shadowSpread": 1
},
{
 "pressedBackgroundColor": [
  "#000000"
 ],
 "fontFamily": "Montserrat",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "click": "this.mainPlayList.set('selectedIndex', 0)",
 "id": "Button_1B9A3D00_16C4_0505_41B2_6830155B7D52",
 "pressedBackgroundOpacity": 1,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 107,
 "borderRadius": 0,
 "borderSize": 0,
 "iconHeight": 32,
 "minWidth": 1,
 "propagateClick": true,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minHeight": 1,
 "mode": "push",
 "pressedBackgroundColorRatios": [
  0
 ],
 "height": 40,
 "fontSize": 12,
 "fontColor": "#FFFFFF",
 "class": "Button",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "label": "BACK TO TOUR",
 "horizontalAlign": "center",
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "shadow": false,
 "paddingBottom": 0,
 "iconWidth": 32,
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "iconBeforeLabel": true,
 "fontWeight": "bold",
 "fontStyle": "normal",
 "textDecoration": "none",
 "cursor": "hand",
 "layout": "horizontal",
 "shadowBlurRadius": 15,
 "data": {
  "name": "Button realtor"
 },
 "shadowSpread": 1
},
{
 "pressedBackgroundColor": [
  "#000000"
 ],
 "fontFamily": "Montserrat",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "click": "this.openLink('https://www.thepaperhousecollective.com/blank-2', '_blank')",
 "id": "Button_FBE62D4B_D1C7_892A_41DC_2AB26FA2A66D",
 "pressedBackgroundOpacity": 1,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 107,
 "borderRadius": 0,
 "borderSize": 0,
 "iconHeight": 32,
 "minWidth": 1,
 "propagateClick": true,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "shadowColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minHeight": 1,
 "mode": "push",
 "pressedBackgroundColorRatios": [
  0
 ],
 "height": 40,
 "fontSize": 12,
 "fontColor": "#FFFFFF",
 "class": "Button",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "label": "CONTACT",
 "horizontalAlign": "center",
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "gap": 5,
 "shadow": false,
 "paddingBottom": 0,
 "iconWidth": 32,
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "iconBeforeLabel": true,
 "fontWeight": "bold",
 "fontStyle": "normal",
 "textDecoration": "none",
 "cursor": "hand",
 "layout": "horizontal",
 "shadowBlurRadius": 15,
 "data": {
  "name": "Button realtor"
 },
 "shadowSpread": 1
},
{
 "children": [
  "this.Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A"
 ],
 "id": "Container_062A682F_1140_E20B_41B0_3071FCBF3DC9",
 "backgroundOpacity": 1,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "width": "85%",
 "borderSize": 0,
 "minWidth": 1,
 "propagateClick": false,
 "backgroundColorRatios": [
  0
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minHeight": 1,
 "verticalAlign": "middle",
 "backgroundColor": [
  "#000000"
 ],
 "layout": "absolute",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "horizontalAlign": "center",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "-left"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "height": "100%"
},
{
 "children": [
  "this.Container_062A3830_1140_E215_4195_1698933FE51C",
  "this.Container_062A2830_1140_E215_41AA_EB25B7BD381C",
  "this.Container_062AE830_1140_E215_4180_196ED689F4BD"
 ],
 "id": "Container_062A082F_1140_E20A_4193_DF1A4391DC79",
 "backgroundOpacity": 1,
 "paddingLeft": 50,
 "scrollBarColor": "#0069A3",
 "paddingRight": 50,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.51,
 "borderRadius": 0,
 "width": "50%",
 "borderSize": 0,
 "minWidth": 460,
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minHeight": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "layout": "vertical",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingTop": 20,
 "gap": 0,
 "horizontalAlign": "left",
 "shadow": false,
 "paddingBottom": 20,
 "data": {
  "name": "-right"
 },
 "overflow": "visible",
 "scrollBarWidth": 10,
 "height": "100%"
},
{
 "transparencyActive": false,
 "maxHeight": 60,
 "id": "IconButton_062A8830_1140_E215_419D_3439F16CCB3E",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": "25%",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_pressed.jpg",
 "borderSize": 0,
 "minWidth": 50,
 "propagateClick": false,
 "verticalAlign": "middle",
 "minHeight": 50,
 "height": "75%",
 "iconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E.jpg",
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false)",
 "mode": "push",
 "class": "IconButton",
 "paddingTop": 0,
 "horizontalAlign": "center",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "X"
 },
 "cursor": "hand",
 "maxWidth": 60,
 "rollOverIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_rollover.jpg"
},
{
 "children": [
  "this.ViewerAreaLabeled_23F787B7_0C0A_6293_419A_B4B58B92DAFC",
  "this.Container_23F7F7B7_0C0A_6293_4195_D6240EBAFDC0"
 ],
 "id": "Container_23F797B7_0C0A_6293_41A7_EC89DBCDB93F",
 "backgroundOpacity": 1,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "width": "85%",
 "borderSize": 0,
 "minWidth": 1,
 "propagateClick": false,
 "backgroundColorRatios": [
  0
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minHeight": 1,
 "verticalAlign": "middle",
 "backgroundColor": [
  "#000000"
 ],
 "layout": "absolute",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "horizontalAlign": "center",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "-left"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "height": "100%"
},
{
 "children": [
  "this.Container_23F017B8_0C0A_629D_41A5_DE420F5F9331",
  "this.Container_23F007B8_0C0A_629D_41A3_034CF0D91203",
  "this.Container_23F047B8_0C0A_629D_415D_F05EF8619564"
 ],
 "id": "Container_23F027B7_0C0A_6293_418E_075FCFAA8A19",
 "backgroundOpacity": 1,
 "paddingLeft": 50,
 "scrollBarColor": "#0069A3",
 "paddingRight": 50,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.51,
 "borderRadius": 0,
 "width": "50%",
 "borderSize": 0,
 "minWidth": 460,
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minHeight": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "layout": "vertical",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingTop": 20,
 "gap": 0,
 "horizontalAlign": "left",
 "shadow": false,
 "paddingBottom": 20,
 "data": {
  "name": "-right"
 },
 "overflow": "visible",
 "scrollBarWidth": 10,
 "height": "100%"
},
{
 "transparencyActive": false,
 "maxHeight": 60,
 "id": "IconButton_23F087B8_0C0A_629D_4194_6F34C6CBE1DA",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": "25%",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_23F087B8_0C0A_629D_4194_6F34C6CBE1DA_pressed.jpg",
 "borderSize": 0,
 "minWidth": 50,
 "propagateClick": false,
 "verticalAlign": "middle",
 "minHeight": 50,
 "height": "75%",
 "iconURL": "skin/IconButton_23F087B8_0C0A_629D_4194_6F34C6CBE1DA.jpg",
 "click": "this.setComponentVisibility(this.Container_23F0F7B8_0C0A_629D_418A_F171085EFBF8, false, 0, null, null, false)",
 "mode": "push",
 "class": "IconButton",
 "paddingTop": 0,
 "horizontalAlign": "center",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "X"
 },
 "cursor": "hand",
 "maxWidth": 60,
 "rollOverIconURL": "skin/IconButton_23F087B8_0C0A_629D_4194_6F34C6CBE1DA_rollover.jpg"
},
{
 "children": [
  "this.HTMLText_3918BF37_0C06_E393_41A1_17CF0ADBAB12",
  "this.IconButton_38922473_0C06_2593_4199_C585853A1AB3"
 ],
 "id": "Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
 "backgroundOpacity": 0.3,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "borderSize": 0,
 "width": "100%",
 "minWidth": 1,
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 140,
 "minHeight": 1,
 "verticalAlign": "top",
 "layout": "absolute",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "header"
 },
 "overflow": "scroll",
 "horizontalAlign": "left",
 "scrollBarWidth": 10
},
{
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0",
 "itemLabelFontStyle": "normal",
 "paddingLeft": 70,
 "scrollBarColor": "#333333",
 "minWidth": 1,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "itemLabelHorizontalAlign": "center",
 "borderRadius": 5,
 "itemMode": "normal",
 "itemThumbnailOpacity": 1,
 "rollOverItemThumbnailShadowColor": "#04A3E1",
 "width": "100%",
 "itemPaddingRight": 3,
 "itemMaxWidth": 1000,
 "rollOverItemThumbnailShadowHorizontalLength": 8,
 "itemLabelFontFamily": "Montserrat",
 "itemMaxHeight": 1000,
 "rollOverItemThumbnailShadowVerticalLength": 0,
 "selectedItemThumbnailShadowBlurRadius": 16,
 "backgroundColorRatios": [
  0
 ],
 "minHeight": 1,
 "verticalAlign": "middle",
 "backgroundColor": [
  "#000000"
 ],
 "itemPaddingLeft": 3,
 "selectedItemLabelFontColor": "#04A3E1",
 "class": "ThumbnailGrid",
 "itemBorderRadius": 0,
 "selectedItemThumbnailShadowHorizontalLength": 0,
 "playList": "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "itemHorizontalAlign": "center",
 "itemLabelPosition": "bottom",
 "height": "100%",
 "rollOverItemThumbnailShadowBlurRadius": 0,
 "itemBackgroundOpacity": 0,
 "horizontalAlign": "center",
 "shadow": false,
 "itemOpacity": 1,
 "itemThumbnailBorderRadius": 0,
 "itemBackgroundColor": [],
 "selectedItemThumbnailShadowVerticalLength": 0,
 "itemPaddingTop": 3,
 "itemBackgroundColorRatios": [],
 "itemWidth": 220,
 "backgroundOpacity": 0.05,
 "selectedItemThumbnailShadow": true,
 "paddingRight": 70,
 "itemMinHeight": 50,
 "itemLabelTextDecoration": "none",
 "borderSize": 0,
 "selectedItemLabelFontWeight": "bold",
 "itemLabelFontWeight": "normal",
 "propagateClick": false,
 "rollOverItemLabelFontColor": "#04A3E1",
 "rollOverItemThumbnailShadow": true,
 "scrollBarMargin": 2,
 "itemLabelFontSize": 14,
 "itemVerticalAlign": "top",
 "itemMinWidth": 50,
 "itemThumbnailScaleMode": "fit_outside",
 "itemLabelFontColor": "#666666",
 "itemThumbnailWidth": 220,
 "itemHeight": 156,
 "backgroundColorDirection": "vertical",
 "itemThumbnailHeight": 125,
 "paddingTop": 10,
 "gap": 26,
 "itemBackgroundColorDirection": "vertical",
 "itemThumbnailShadow": false,
 "paddingBottom": 70,
 "itemPaddingBottom": 3,
 "itemLabelGap": 7,
 "data": {
  "name": "ThumbnailList"
 },
 "scrollBarWidth": 10
},
{
 "children": [
  "this.Image_88E9DEF9_B279_05FF_41E5_83952AF6D19E"
 ],
 "id": "Container_221C0648_0C06_E5FD_4193_12BCE1D6DD6B",
 "backgroundOpacity": 1,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "width": "85%",
 "borderSize": 0,
 "minWidth": 1,
 "propagateClick": false,
 "backgroundColorRatios": [
  0
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minHeight": 1,
 "verticalAlign": "middle",
 "backgroundColor": [
  "#000000"
 ],
 "layout": "absolute",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "horizontalAlign": "center",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "-left"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "height": "100%"
},
{
 "children": [
  "this.Container_221C8648_0C06_E5FD_41A0_8247B2B7DEB0",
  "this.Container_221B7648_0C06_E5FD_418B_12E57BBFD8EC",
  "this.Container_221B4648_0C06_E5FD_4194_30EDC4E7D1B6"
 ],
 "id": "Container_221C9648_0C06_E5FD_41A1_A79DE53B3031",
 "backgroundOpacity": 1,
 "paddingLeft": 50,
 "scrollBarColor": "#0069A3",
 "paddingRight": 50,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.51,
 "borderRadius": 0,
 "width": "15%",
 "borderSize": 0,
 "minWidth": 400,
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minHeight": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "layout": "vertical",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingTop": 20,
 "gap": 0,
 "horizontalAlign": "left",
 "shadow": false,
 "paddingBottom": 20,
 "data": {
  "name": "-right"
 },
 "overflow": "visible",
 "scrollBarWidth": 10,
 "height": "100%"
},
{
 "transparencyActive": false,
 "maxHeight": 60,
 "id": "IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": "25%",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_pressed.jpg",
 "borderSize": 0,
 "minWidth": 50,
 "propagateClick": false,
 "verticalAlign": "middle",
 "minHeight": 50,
 "height": "75%",
 "iconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF.jpg",
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false)",
 "mode": "push",
 "class": "IconButton",
 "paddingTop": 0,
 "horizontalAlign": "center",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "X"
 },
 "cursor": "hand",
 "maxWidth": 60,
 "rollOverIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_rollover.jpg"
},
{
 "children": [
  "this.HTMLText_2F8A4686_0D4F_6B71_4183_10C1696E2923",
  "this.IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E"
 ],
 "id": "Container_2F8A7686_0D4F_6B71_41A9_1A894413085C",
 "backgroundOpacity": 0.3,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "borderSize": 0,
 "width": "100%",
 "minWidth": 1,
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 140,
 "minHeight": 1,
 "verticalAlign": "top",
 "layout": "absolute",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "header"
 },
 "overflow": "scroll",
 "horizontalAlign": "left",
 "scrollBarWidth": 10
},
{
 "tabsFontWeight": "normal",
 "tabsBackgroundColorRatios": [
  0,
  0.55,
  0.99,
  1
 ],
 "id": "TabPanel_8F9AA4BA_B2B9_047D_41D9_A73DDB4D9E3E",
 "tabsRollOverFontWeight": "bold",
 "tabsFontFamily": "Bahnschrift",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "selectedTabBackgroundColorRatios": [
  0,
  0.05,
  0.29,
  0.37,
  0.64,
  1,
  1
 ],
 "borderRadius": 5,
 "tabsBackgroundColor": [
  "#333333",
  "#333333",
  "#333333",
  "#333333"
 ],
 "pagePaddingBottom": 0,
 "tabsTextDecoration": "none",
 "borderSize": 0,
 "minWidth": 1,
 "tabsFontStyle": "normal",
 "tabsFontSize": 12,
 "height": "80.639%",
 "propagateClick": true,
 "selectedTabFontColor": "#000000",
 "tabsPosition": "top",
 "pagePaddingRight": 0,
 "width": "97.019%",
 "tabsRollOverFontColor": "#000000",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minHeight": 1,
 "selectedTabBackgroundColor": [
  "#000000",
  "#000000",
  "#000000",
  "#000000",
  "#000000",
  "#000000",
  "#FFFFFF"
 ],
 "pagePaddingTop": 0,
 "tabsBackgroundOpacity": 1,
 "tabsAlign": "normal",
 "tabsRollOverBackgroundColorRatios": [
  1
 ],
 "class": "TabPanel",
 "tabsRollOverBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingTop": 0,
 "tabsSize": 32,
 "shadow": false,
 "paddingBottom": 0,
 "selectedTabBackgroundOpacity": 0,
 "data": {
  "name": "TabPanel942"
 },
 "overflow": "visible",
 "scrollBarWidth": 10,
 "pagePaddingLeft": 0,
 "selectedTabFontWeight": "bold",
 "pages": [
  {
   "children": [
    "this.MapViewer"
   ],
   "minWidth": 20,
   "backgroundOpacity": 1,
   "paddingLeft": 0,
   "scrollBarColor": "#000000",
   "paddingRight": 0,
   "scrollBarVisible": "rollOver",
   "scrollBarOpacity": 0.5,
   "borderRadius": 0,
   "width": "100%",
   "borderSize": 0,
   "propagateClick": false,
   "backgroundColorRatios": [
    0
   ],
   "scrollBarMargin": 2,
   "contentOpaque": false,
   "minHeight": 20,
   "verticalAlign": "top",
   "backgroundColor": [
    "#FFFFFF"
   ],
   "label": "Plans",
   "class": "TabPanelPage",
   "backgroundColorDirection": "vertical",
   "paddingTop": 0,
   "layout": "absolute",
   "gap": 10,
   "horizontalAlign": "left",
   "shadow": false,
   "paddingBottom": 0,
   "data": {
    "name": "groundfloor"
   },
   "overflow": "scroll",
   "scrollBarWidth": 10,
   "height": "100%"
  }
 ],
 "tabsFontColor": "#FFFFFF",
 "tabsRollOverBackgroundOpacity": 0.78
},
{
 "children": [
  "this.HTMLText_28217A13_0D5D_5B97_419A_F894ECABEB04",
  "this.IconButton_28216A13_0D5D_5B97_41A9_2CAB10DB6CA3"
 ],
 "id": "Container_28214A13_0D5D_5B97_4193_B631E1496339",
 "backgroundOpacity": 0.3,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "borderSize": 0,
 "width": "100%",
 "minWidth": 1,
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 140,
 "minHeight": 1,
 "verticalAlign": "top",
 "layout": "absolute",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "header"
 },
 "overflow": "scroll",
 "horizontalAlign": "left",
 "scrollBarWidth": 10
},
{
 "children": [
  "this.ViewerAreaLabeled_281D2361_0D5F_E9B0_41A1_A1F237F85FD7",
  "this.IconButton_2BE71718_0D55_6990_41A5_73D31D902E1D",
  "this.IconButton_28BF3E40_0D4B_DBF0_41A3_D5D2941E6E14"
 ],
 "id": "Container_2B0BF61C_0D5B_2B90_4179_632488B1209E",
 "backgroundOpacity": 0.3,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "width": "100%",
 "borderSize": 0,
 "minWidth": 1,
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minHeight": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "layout": "absolute",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "horizontalAlign": "left",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "Container photo"
 },
 "overflow": "visible",
 "scrollBarWidth": 10,
 "height": "100%"
},
{
 "children": [
  "this.ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
  "this.IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
  "this.IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1",
  "this.IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510"
 ],
 "id": "Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC",
 "backgroundOpacity": 0.3,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "width": "100%",
 "borderSize": 0,
 "minWidth": 1,
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minHeight": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "layout": "absolute",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "horizontalAlign": "left",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "Container photo"
 },
 "overflow": "visible",
 "scrollBarWidth": 10,
 "height": "100%"
},
{
 "children": [
  "this.Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397"
 ],
 "id": "Container_06C5ABA5_1140_A63F_41A9_850CF958D0DB",
 "backgroundOpacity": 1,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "width": "55%",
 "borderSize": 0,
 "minWidth": 1,
 "propagateClick": false,
 "backgroundColorRatios": [
  0
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minHeight": 1,
 "verticalAlign": "middle",
 "backgroundColor": [
  "#000000"
 ],
 "layout": "absolute",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "horizontalAlign": "center",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "-left"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "height": "100%"
},
{
 "children": [
  "this.Container_06C59BA5_1140_A63F_41B1_4B41E3B7D98D",
  "this.Container_06C46BA5_1140_A63F_4151_B5A20B4EA86A",
  "this.Container_06C42BA5_1140_A63F_4195_037A0687532F"
 ],
 "id": "Container_06C58BA5_1140_A63F_419D_EC83F94F8C54",
 "backgroundOpacity": 1,
 "paddingLeft": 60,
 "scrollBarColor": "#0069A3",
 "paddingRight": 60,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.51,
 "borderRadius": 0,
 "width": "45%",
 "borderSize": 0,
 "minWidth": 460,
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minHeight": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "layout": "vertical",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingTop": 20,
 "gap": 0,
 "horizontalAlign": "left",
 "shadow": false,
 "paddingBottom": 20,
 "data": {
  "name": "-right"
 },
 "overflow": "visible",
 "scrollBarWidth": 10,
 "height": "100%"
},
{
 "transparencyActive": false,
 "maxHeight": 60,
 "id": "IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": "25%",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81_pressed.jpg",
 "borderSize": 0,
 "minWidth": 50,
 "propagateClick": false,
 "verticalAlign": "middle",
 "minHeight": 50,
 "height": "75%",
 "iconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81.jpg",
 "click": "this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false)",
 "mode": "push",
 "class": "IconButton",
 "paddingTop": 0,
 "horizontalAlign": "center",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "X"
 },
 "cursor": "hand",
 "maxWidth": 60,
 "rollOverIconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81_rollover.jpg"
},
{
 "maxHeight": 1000,
 "id": "Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A",
 "left": "0%",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": "100%",
 "borderRadius": 0,
 "url": "skin/Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A.png",
 "borderSize": 0,
 "minWidth": 1,
 "propagateClick": false,
 "verticalAlign": "middle",
 "top": "0%",
 "minHeight": 1,
 "height": "100%",
 "class": "Image",
 "paddingTop": 0,
 "horizontalAlign": "center",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "Image"
 },
 "maxWidth": 2000,
 "scaleMode": "fit_outside"
},
{
 "id": "Container_062A3830_1140_E215_4195_1698933FE51C",
 "backgroundOpacity": 0.3,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "borderSize": 0,
 "width": "100%",
 "minWidth": 1,
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 60,
 "minHeight": 0,
 "verticalAlign": "top",
 "layout": "horizontal",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingTop": 20,
 "gap": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "Container space"
 },
 "overflow": "scroll",
 "horizontalAlign": "right",
 "scrollBarWidth": 10
},
{
 "children": [
  "this.HTMLText_062AD830_1140_E215_41B0_321699661E7F"
 ],
 "id": "Container_062A2830_1140_E215_41AA_EB25B7BD381C",
 "backgroundOpacity": 0.3,
 "paddingLeft": 0,
 "scrollBarColor": "#E73B2C",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.79,
 "borderRadius": 0,
 "width": "100%",
 "borderSize": 0,
 "minWidth": 100,
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minHeight": 520,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "layout": "vertical",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "horizontalAlign": "left",
 "shadow": false,
 "paddingBottom": 30,
 "data": {
  "name": "Container text"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "height": "100%"
},
{
 "id": "Container_062AE830_1140_E215_4180_196ED689F4BD",
 "backgroundOpacity": 0.3,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "width": 370,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minHeight": 1,
 "verticalAlign": "top",
 "layout": "horizontal",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "height": 40,
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "Container space"
 },
 "overflow": "scroll",
 "horizontalAlign": "left",
 "scrollBarWidth": 10
},
{
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "id": "ViewerAreaLabeled_23F787B7_0C0A_6293_419A_B4B58B92DAFC",
 "left": 0,
 "toolTipPaddingTop": 4,
 "paddingLeft": 0,
 "minWidth": 1,
 "right": 0,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "borderRadius": 0,
 "toolTipDisplayTime": 600,
 "progressBorderRadius": 0,
 "toolTipPaddingLeft": 6,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "toolTipBorderRadius": 3,
 "playbackBarHeadHeight": 15,
 "progressBackgroundColorDirection": "vertical",
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadShadowHorizontalLength": 0,
 "progressBorderColor": "#FFFFFF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "toolTipShadowSpread": 0,
 "minHeight": 1,
 "toolTipBorderColor": "#767676",
 "playbackBarHeadOpacity": 1,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "class": "ViewerArea",
 "toolTipOpacity": 1,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeight": 10,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": 12,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "shadow": false,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "transitionMode": "blending",
 "toolTipShadowHorizontalLength": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 6,
 "toolTipShadowVerticalLength": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "paddingRight": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "borderSize": 0,
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontStyle": "normal",
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "top": 0,
 "bottom": 0,
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "displayTooltipInTouchScreens": true,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "paddingTop": 0,
 "progressHeight": 6,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "toolTipFontColor": "#606060",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "paddingBottom": 0,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "transitionDuration": 500,
 "progressBorderSize": 0,
 "data": {
  "name": "Viewer info 1"
 }
},
{
 "children": [
  "this.IconButton_23F7E7B7_0C0A_6293_419F_D3D84EB3AFBD",
  "this.Container_23F7D7B7_0C0A_6293_4195_312C9CAEABE4",
  "this.IconButton_23F037B7_0C0A_6293_41A2_C1707EE666E4"
 ],
 "id": "Container_23F7F7B7_0C0A_6293_4195_D6240EBAFDC0",
 "left": "0%",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "width": "100%",
 "borderSize": 0,
 "minWidth": 1,
 "propagateClick": false,
 "verticalAlign": "middle",
 "top": "0%",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minHeight": 1,
 "height": "100%",
 "layout": "horizontal",
 "class": "Container",
 "gap": 10,
 "paddingTop": 0,
 "horizontalAlign": "left",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "Container arrows"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "id": "Container_23F017B8_0C0A_629D_41A5_DE420F5F9331",
 "backgroundOpacity": 0.3,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "borderSize": 0,
 "width": "100%",
 "minWidth": 1,
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 60,
 "minHeight": 0,
 "verticalAlign": "top",
 "layout": "horizontal",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingTop": 20,
 "gap": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "Container space"
 },
 "overflow": "scroll",
 "horizontalAlign": "right",
 "scrollBarWidth": 10
},
{
 "children": [
  "this.HTMLText_23F067B8_0C0A_629D_41A9_1A1C797BB055",
  "this.Button_23F057B8_0C0A_629D_41A2_CD6BDCDB0145"
 ],
 "id": "Container_23F007B8_0C0A_629D_41A3_034CF0D91203",
 "backgroundOpacity": 0.3,
 "paddingLeft": 0,
 "scrollBarColor": "#E73B2C",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.79,
 "borderRadius": 0,
 "width": "100%",
 "borderSize": 0,
 "minWidth": 100,
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minHeight": 520,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "layout": "vertical",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "horizontalAlign": "left",
 "shadow": false,
 "paddingBottom": 30,
 "data": {
  "name": "Container text"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "height": "100%"
},
{
 "id": "Container_23F047B8_0C0A_629D_415D_F05EF8619564",
 "backgroundOpacity": 0.3,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "width": 370,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minHeight": 1,
 "verticalAlign": "top",
 "layout": "horizontal",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "height": 40,
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "Container space"
 },
 "overflow": "scroll",
 "horizontalAlign": "left",
 "scrollBarWidth": 10
},
{
 "id": "HTMLText_3918BF37_0C06_E393_41A1_17CF0ADBAB12",
 "left": "0%",
 "backgroundOpacity": 0,
 "paddingLeft": 80,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "width": "77.115%",
 "borderSize": 0,
 "minWidth": 1,
 "propagateClick": false,
 "top": "0%",
 "scrollBarMargin": 2,
 "minHeight": 100,
 "height": "100%",
 "class": "HTMLText",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:4.85vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:4.85vh;font-family:'Bebas Neue Bold';\">Panorama list:</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText54192"
 },
 "scrollBarWidth": 10
},
{
 "transparencyActive": false,
 "maxHeight": 60,
 "id": "IconButton_38922473_0C06_2593_4199_C585853A1AB3",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": 20,
 "width": "100%",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_pressed.jpg",
 "borderSize": 0,
 "minWidth": 50,
 "propagateClick": false,
 "verticalAlign": "top",
 "top": 20,
 "minHeight": 50,
 "height": "36.14%",
 "iconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3.jpg",
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "mode": "push",
 "class": "IconButton",
 "paddingTop": 0,
 "horizontalAlign": "right",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton X"
 },
 "cursor": "hand",
 "maxWidth": 60,
 "rollOverIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_rollover.jpg"
},
{
 "maxHeight": 611,
 "id": "Image_88E9DEF9_B279_05FF_41E5_83952AF6D19E",
 "left": "0%",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": "100%",
 "borderRadius": 0,
 "url": "skin/Image_88E9DEF9_B279_05FF_41E5_83952AF6D19E.png",
 "borderSize": 0,
 "minWidth": 1,
 "propagateClick": false,
 "verticalAlign": "middle",
 "bottom": "11.4%",
 "minHeight": 1,
 "height": "74.877%",
 "class": "Image",
 "paddingTop": 0,
 "horizontalAlign": "center",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "Image89507"
 },
 "maxWidth": 943,
 "scaleMode": "fit_inside"
},
{
 "id": "Container_221C8648_0C06_E5FD_41A0_8247B2B7DEB0",
 "backgroundOpacity": 0.3,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "borderSize": 0,
 "width": "100%",
 "minWidth": 1,
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 60,
 "minHeight": 0,
 "verticalAlign": "top",
 "layout": "horizontal",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingTop": 20,
 "gap": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "Container space"
 },
 "overflow": "scroll",
 "horizontalAlign": "right",
 "scrollBarWidth": 10
},
{
 "children": [
  "this.HTMLText_221B6648_0C06_E5FD_41A0_77851DC2C548",
  "this.Button_221B5648_0C06_E5FD_4198_40C786948FF0"
 ],
 "id": "Container_221B7648_0C06_E5FD_418B_12E57BBFD8EC",
 "backgroundOpacity": 0.3,
 "paddingLeft": 0,
 "scrollBarColor": "#E73B2C",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.79,
 "borderRadius": 0,
 "width": "100%",
 "borderSize": 0,
 "minWidth": 100,
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minHeight": 520,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "layout": "vertical",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "horizontalAlign": "left",
 "shadow": false,
 "paddingBottom": 30,
 "data": {
  "name": "Container text"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "height": "100%"
},
{
 "id": "Container_221B4648_0C06_E5FD_4194_30EDC4E7D1B6",
 "backgroundOpacity": 0.3,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "width": 370,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minHeight": 1,
 "verticalAlign": "top",
 "layout": "horizontal",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "height": 40,
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "Container space"
 },
 "overflow": "scroll",
 "horizontalAlign": "left",
 "scrollBarWidth": 10
},
{
 "id": "HTMLText_2F8A4686_0D4F_6B71_4183_10C1696E2923",
 "left": "0%",
 "backgroundOpacity": 0,
 "paddingLeft": 80,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "width": "77.115%",
 "borderSize": 0,
 "minWidth": 1,
 "propagateClick": false,
 "top": "0%",
 "scrollBarMargin": 2,
 "minHeight": 100,
 "height": "100%",
 "class": "HTMLText",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:4.85vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#333333;font-size:4.85vh;font-family:'Bebas Neue Bold';\">FLOORPLAN:</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText54192"
 },
 "scrollBarWidth": 10
},
{
 "transparencyActive": false,
 "maxHeight": 60,
 "id": "IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": 20,
 "width": "100%",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_pressed.jpg",
 "borderSize": 0,
 "minWidth": 50,
 "propagateClick": false,
 "verticalAlign": "top",
 "top": 20,
 "minHeight": 50,
 "height": "36.14%",
 "iconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E.jpg",
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "mode": "push",
 "class": "IconButton",
 "paddingTop": 0,
 "horizontalAlign": "right",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton X"
 },
 "cursor": "hand",
 "maxWidth": 60,
 "rollOverIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_rollover.jpg"
},
{
 "id": "HTMLText_28217A13_0D5D_5B97_419A_F894ECABEB04",
 "left": "0%",
 "backgroundOpacity": 0,
 "paddingLeft": 80,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "width": "77.115%",
 "borderSize": 0,
 "minWidth": 1,
 "propagateClick": false,
 "top": "0%",
 "scrollBarMargin": 2,
 "minHeight": 100,
 "height": "100%",
 "class": "HTMLText",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:4.85vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:4.85vh;font-family:'Bebas Neue Bold';\">PHOTOALBUM:</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText54192"
 },
 "scrollBarWidth": 10
},
{
 "transparencyActive": false,
 "maxHeight": 60,
 "id": "IconButton_28216A13_0D5D_5B97_41A9_2CAB10DB6CA3",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": 20,
 "width": "100%",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_28216A13_0D5D_5B97_41A9_2CAB10DB6CA3_pressed.jpg",
 "borderSize": 0,
 "minWidth": 50,
 "propagateClick": false,
 "verticalAlign": "top",
 "top": 20,
 "minHeight": 50,
 "height": "36.14%",
 "iconURL": "skin/IconButton_28216A13_0D5D_5B97_41A9_2CAB10DB6CA3.jpg",
 "click": "this.setComponentVisibility(this.Container_2820BA13_0D5D_5B97_4192_AABC38F6F169, false, 0, null, null, false)",
 "mode": "push",
 "class": "IconButton",
 "paddingTop": 0,
 "horizontalAlign": "right",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton X"
 },
 "cursor": "hand",
 "maxWidth": 60,
 "rollOverIconURL": "skin/IconButton_28216A13_0D5D_5B97_41A9_2CAB10DB6CA3_rollover.jpg"
},
{
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "id": "ViewerAreaLabeled_281D2361_0D5F_E9B0_41A1_A1F237F85FD7",
 "left": "0%",
 "toolTipPaddingTop": 4,
 "paddingLeft": 0,
 "minWidth": 1,
 "toolTipPaddingLeft": 6,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "borderRadius": 0,
 "toolTipDisplayTime": 600,
 "progressBorderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarLeft": 0,
 "width": "100%",
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "toolTipBorderRadius": 3,
 "playbackBarHeadHeight": 15,
 "progressBackgroundColorDirection": "vertical",
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadShadowHorizontalLength": 0,
 "progressBorderColor": "#FFFFFF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "toolTipBorderColor": "#767676",
 "minHeight": 1,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "class": "ViewerArea",
 "height": "100%",
 "toolTipOpacity": 1,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeight": 10,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": 12,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "shadow": false,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "transitionMode": "blending",
 "toolTipShadowHorizontalLength": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 6,
 "toolTipShadowVerticalLength": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "paddingRight": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "borderSize": 0,
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontStyle": "normal",
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "top": "0%",
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "paddingTop": 0,
 "progressHeight": 6,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "toolTipFontColor": "#606060",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "paddingBottom": 0,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "transitionDuration": 500,
 "progressBorderSize": 0,
 "data": {
  "name": "Viewer photoalbum + text 1"
 }
},
{
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "id": "ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
 "left": "0%",
 "toolTipPaddingTop": 4,
 "paddingLeft": 0,
 "minWidth": 1,
 "toolTipPaddingLeft": 6,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "borderRadius": 0,
 "toolTipDisplayTime": 600,
 "progressBorderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarLeft": 0,
 "width": "100%",
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "toolTipBorderRadius": 3,
 "playbackBarHeadHeight": 15,
 "progressBackgroundColorDirection": "vertical",
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadShadowHorizontalLength": 0,
 "progressBorderColor": "#FFFFFF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "toolTipBorderColor": "#767676",
 "minHeight": 1,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "class": "ViewerArea",
 "height": "100%",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeight": 10,
 "toolTipOpacity": 1,
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": 12,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "shadow": false,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "transitionMode": "blending",
 "toolTipShadowHorizontalLength": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 6,
 "toolTipShadowVerticalLength": 0,
 "show": "this.mainPlayList.set('selectedIndex', 19)",
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "paddingRight": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "borderSize": 0,
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontStyle": "normal",
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "top": "0%",
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadShadowColor": "#000000",
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "paddingTop": 0,
 "progressHeight": 6,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "toolTipFontColor": "#606060",
 "playbackBarOpacity": 1,
 "paddingBottom": 0,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "transitionDuration": 500,
 "progressBorderSize": 0,
 "data": {
  "name": "Viewer photoalbum 1"
 }
},
{
 "transparencyActive": false,
 "maxHeight": 60,
 "id": "IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "right": 20,
 "width": "10%",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_pressed.jpg",
 "borderSize": 0,
 "minWidth": 50,
 "propagateClick": false,
 "verticalAlign": "top",
 "top": 20,
 "minHeight": 50,
 "height": "10%",
 "iconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1.jpg",
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "mode": "push",
 "class": "IconButton",
 "paddingTop": 0,
 "horizontalAlign": "right",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton X"
 },
 "cursor": "hand",
 "maxWidth": 60,
 "rollOverIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_rollover.jpg"
},
{
 "maxHeight": 1000,
 "id": "Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397",
 "left": "0%",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": "100%",
 "borderRadius": 0,
 "url": "skin/Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397.jpg",
 "borderSize": 0,
 "minWidth": 1,
 "propagateClick": false,
 "verticalAlign": "bottom",
 "top": "0%",
 "minHeight": 1,
 "height": "100%",
 "class": "Image",
 "paddingTop": 0,
 "horizontalAlign": "center",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "Image"
 },
 "maxWidth": 2000,
 "scaleMode": "fit_outside"
},
{
 "id": "Container_06C59BA5_1140_A63F_41B1_4B41E3B7D98D",
 "backgroundOpacity": 0.3,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "borderSize": 0,
 "width": "100%",
 "minWidth": 1,
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "height": 60,
 "minHeight": 0,
 "verticalAlign": "top",
 "layout": "horizontal",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingTop": 20,
 "gap": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "Container space"
 },
 "overflow": "scroll",
 "horizontalAlign": "right",
 "scrollBarWidth": 10
},
{
 "children": [
  "this.HTMLText_0B42C466_11C0_623D_4193_9FAB57A5AC33",
  "this.Container_0D9BF47A_11C0_E215_41A4_A63C8527FF9C"
 ],
 "id": "Container_06C46BA5_1140_A63F_4151_B5A20B4EA86A",
 "backgroundOpacity": 0.3,
 "paddingLeft": 0,
 "scrollBarColor": "#E73B2C",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.79,
 "borderRadius": 0,
 "width": "100%",
 "borderSize": 0,
 "minWidth": 100,
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minHeight": 520,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "layout": "vertical",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "horizontalAlign": "left",
 "shadow": false,
 "paddingBottom": 30,
 "data": {
  "name": "Container text"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "height": "100%"
},
{
 "id": "Container_06C42BA5_1140_A63F_4195_037A0687532F",
 "backgroundOpacity": 0.3,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "width": 370,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarOpacity": 0.5,
 "minWidth": 1,
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minHeight": 1,
 "verticalAlign": "top",
 "layout": "horizontal",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "height": 40,
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "Container space"
 },
 "overflow": "scroll",
 "horizontalAlign": "left",
 "scrollBarWidth": 10
},
{
 "id": "HTMLText_062AD830_1140_E215_41B0_321699661E7F",
 "backgroundOpacity": 0,
 "paddingLeft": 10,
 "scrollBarColor": "#333333",
 "paddingRight": 10,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "width": "99.742%",
 "borderSize": 0,
 "minWidth": 1,
 "propagateClick": false,
 "scrollBarMargin": 2,
 "minHeight": 1,
 "height": "100%",
 "class": "HTMLText",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 20,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:7.83vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#333333;font-size:6.73vh;font-family:'Bebas Neue Bold';\">brookwater residence </SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:3.42vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.66vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#990000;font-size:1.98vh;font-family:'Bebas Neue Bold';\">project type : </SPAN><SPAN STYLE=\"color:#333333;font-size:1.98vh;font-family:'Bebas Neue Bold';\">virtual interior design</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#990000;font-size:1.98vh;font-family:'Bebas Neue Bold';\">location</SPAN><SPAN STYLE=\"color:#333333;font-size:1.98vh;font-family:'Bebas Neue Bold';\"> : australia</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#990000;font-size:1.98vh;font-family:'Bebas Neue Bold';\">interior decorating/design : </SPAN><SPAN STYLE=\"color:#333333;font-size:1.98vh;font-family:'Bebas Neue Bold';\">the paperhouse collective </SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#990000;font-size:1.98vh;font-family:'Bebas Neue Bold';\">builder : </SPAN><SPAN STYLE=\"color:#333333;font-size:1.98vh;font-family:'Bebas Neue Bold';\">inspire homes</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.77vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.66vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.21vh;\">The project involves creating both the interior and design for a modern luxury home located in Champions Cres , Australia. Our goal was  to ensure that the design not only meets the client\u2019s aesthetic and functional requirements but also guarantees long-term satisfaction with their living space. Our approach focuses on exploring a variety of colors, materials, and innovative furniture design techniques tailored to the client's preferences. This process will be supported by clear and effective communication through creative walkthroughs and presentation methods.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.77vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.66vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:0.77vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.66vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:0.77vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.66vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#333333;font-size:2.65vh;font-family:'Bebas Neue Bold';\"><B>our solutions:</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.77vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.66vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.21vh;\">- We help you build a unique project that speaks your personality &amp; status</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.21vh;\">- Informed decisions on materials, colors, and layouts before the house is built</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.21vh;\">- Our experience with remote and international clients enables us to deliver high-quality results efficiently through effective communication using modern technology.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.21vh;\">- Deliverables that seamlessly help clients and builders prepare for execute of the design.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.21vh;\">- Clear vision of the final design with high quality deliverables </SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.21vh;\">- Visualize your all your spaces before its even built. </SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.21vh;\">- Help you narrow down product, finishes and furniture selection through thoughtful design direction</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText"
 },
 "scrollBarWidth": 10
},
{
 "id": "Container_23F7D7B7_0C0A_6293_4195_312C9CAEABE4",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "width": "80%",
 "borderSize": 0,
 "minWidth": 1,
 "propagateClick": false,
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minHeight": 1,
 "height": "30%",
 "layout": "absolute",
 "class": "Container",
 "gap": 10,
 "paddingTop": 0,
 "horizontalAlign": "left",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "Container separator"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10
},
{
 "id": "HTMLText_23F067B8_0C0A_629D_41A9_1A1C797BB055",
 "backgroundOpacity": 0,
 "paddingLeft": 10,
 "scrollBarColor": "#04A3E1",
 "paddingRight": 10,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "width": "100%",
 "borderSize": 0,
 "minWidth": 1,
 "propagateClick": false,
 "scrollBarMargin": 2,
 "minHeight": 1,
 "height": "100%",
 "class": "HTMLText",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 20,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:7.83vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.73vh;font-family:'Bebas Neue Bold';\">Lorem ipsum</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.73vh;font-family:'Bebas Neue Bold';\">dolor sit amet</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:3.42vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.66vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:3.42vh;font-family:'Bebas Neue Bold';\">consectetur adipiscing elit. Morbi bibendum pharetra lorem, accumsan san nulla.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.77vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.66vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:0.77vh;\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac, imperdiet non dolor.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.77vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.66vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:0.77vh;\">Integer gravida dui quis euismod placerat. Maecenas quis accumsan ipsum. Aliquam gravida velit at dolor mollis, quis luctus mauris vulputate. Proin condimentum id nunc sed sollicitudin.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:2.65vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.66vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.65vh;font-family:'Bebas Neue Bold';\"><B>Donec feugiat:</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:0.77vh;\"> \u2022 Nisl nec mi sollicitudin facilisis </SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:0.77vh;\"> \u2022 Nam sed faucibus est.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:0.77vh;\"> \u2022 Ut eget lorem sed leo.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:0.77vh;\"> \u2022 Sollicitudin tempor sit amet non urna. </SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:0.77vh;\"> \u2022 Aliquam feugiat mauris sit amet.</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText"
 },
 "scrollBarWidth": 10
},
{
 "fontFamily": "Bebas Neue Bold",
 "height": "9%",
 "id": "Button_23F057B8_0C0A_629D_41A2_CD6BDCDB0145",
 "pressedBackgroundOpacity": 1,
 "backgroundOpacity": 0.7,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": "46%",
 "borderRadius": 0,
 "iconHeight": 32,
 "borderSize": 0,
 "minWidth": 1,
 "propagateClick": false,
 "borderColor": "#000000",
 "backgroundColorRatios": [
  0
 ],
 "shadowColor": "#000000",
 "verticalAlign": "middle",
 "minHeight": 1,
 "pressedBackgroundColorRatios": [
  0
 ],
 "backgroundColor": [
  "#04A3E1"
 ],
 "fontSize": "3vh",
 "fontColor": "#FFFFFF",
 "mode": "push",
 "class": "Button",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "label": "lorem ipsum",
 "horizontalAlign": "center",
 "rollOverBackgroundOpacity": 1,
 "fontStyle": "normal",
 "shadow": false,
 "paddingBottom": 0,
 "iconWidth": 32,
 "gap": 5,
 "iconBeforeLabel": true,
 "fontWeight": "normal",
 "pressedBackgroundColor": [
  "#000000"
 ],
 "textDecoration": "none",
 "cursor": "hand",
 "layout": "horizontal",
 "shadowBlurRadius": 6,
 "data": {
  "name": "Button"
 },
 "shadowSpread": 1
},
{
 "id": "HTMLText_221B6648_0C06_E5FD_41A0_77851DC2C548",
 "backgroundOpacity": 0,
 "paddingLeft": 10,
 "scrollBarColor": "#000000",
 "paddingRight": 10,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "width": "100%",
 "borderSize": 0,
 "minWidth": 1,
 "propagateClick": false,
 "scrollBarMargin": 2,
 "minHeight": 1,
 "height": "100%",
 "class": "HTMLText",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 20,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:7.83vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.73vh;font-family:'Bebas Neue Bold';\">location</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.54vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.66vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#333333;font-size:3.42vh;font-family:'Bebas Neue Bold';\">9 hastula way, 7441 sunset beach, cape town,</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#333333;font-size:3.42vh;font-family:'Bebas Neue Bold';\">south africa</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:4.85vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.66vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:0.77vh;\">Nestled on the stunning Sunset Beach, our property has been completely renovated from top to bottom, with every element carefully curated and personally selected to reflect both comfort and sophistication.</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText"
 },
 "scrollBarWidth": 10
},
{
 "pressedBackgroundColor": [
  "#000000"
 ],
 "fontFamily": "Bebas Neue Bold",
 "id": "Button_221B5648_0C06_E5FD_4198_40C786948FF0",
 "pressedBackgroundOpacity": 1,
 "backgroundOpacity": 0.7,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": 207,
 "borderRadius": 0,
 "borderSize": 0,
 "iconHeight": 32,
 "minWidth": 1,
 "propagateClick": false,
 "borderColor": "#000000",
 "backgroundColorRatios": [
  0
 ],
 "shadowColor": "#000000",
 "verticalAlign": "middle",
 "backgroundColor": [
  "#04A3E1"
 ],
 "minHeight": 1,
 "mode": "push",
 "pressedBackgroundColorRatios": [
  0
 ],
 "fontSize": 34,
 "fontColor": "#FFFFFF",
 "class": "Button",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "label": "lorem ipsum",
 "horizontalAlign": "center",
 "rollOverBackgroundOpacity": 1,
 "height": 59,
 "gap": 5,
 "shadow": false,
 "paddingBottom": 0,
 "iconWidth": 32,
 "visible": false,
 "iconBeforeLabel": true,
 "fontWeight": "normal",
 "fontStyle": "normal",
 "textDecoration": "none",
 "cursor": "hand",
 "layout": "horizontal",
 "shadowBlurRadius": 6,
 "data": {
  "name": "Button"
 },
 "shadowSpread": 1
},
{
 "id": "HTMLText_0B42C466_11C0_623D_4193_9FAB57A5AC33",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarColor": "#04A3E1",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "width": "100%",
 "borderSize": 0,
 "minWidth": 1,
 "propagateClick": false,
 "scrollBarMargin": 2,
 "minHeight": 1,
 "height": "45%",
 "class": "HTMLText",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:7.83vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:5.73vh;font-family:'Bebas Neue Bold';\">real estate agent</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText18899"
 },
 "scrollBarWidth": 10
},
{
 "children": [
  "this.Image_0B48D65D_11C0_6E0F_41A2_4D6F373BABA0",
  "this.HTMLText_0B4B0DC1_11C0_6277_41A4_201A5BB3F7AE"
 ],
 "id": "Container_0D9BF47A_11C0_E215_41A4_A63C8527FF9C",
 "backgroundOpacity": 0.3,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "width": "100%",
 "borderSize": 0,
 "minWidth": 1,
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minHeight": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "layout": "horizontal",
 "class": "Container",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "gap": 10,
 "horizontalAlign": "left",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "- content"
 },
 "overflow": "scroll",
 "scrollBarWidth": 10,
 "height": "80%"
},
{
 "maxHeight": 200,
 "id": "Image_0B48D65D_11C0_6E0F_41A2_4D6F373BABA0",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingRight": 0,
 "width": "25%",
 "borderRadius": 0,
 "url": "skin/Image_0B48D65D_11C0_6E0F_41A2_4D6F373BABA0.jpg",
 "borderSize": 0,
 "minWidth": 1,
 "propagateClick": false,
 "verticalAlign": "top",
 "minHeight": 1,
 "height": "100%",
 "class": "Image",
 "paddingTop": 0,
 "horizontalAlign": "left",
 "shadow": false,
 "paddingBottom": 0,
 "data": {
  "name": "agent photo"
 },
 "maxWidth": 200,
 "scaleMode": "fit_inside"
},
{
 "id": "HTMLText_0B4B0DC1_11C0_6277_41A4_201A5BB3F7AE",
 "backgroundOpacity": 0,
 "paddingLeft": 10,
 "scrollBarColor": "#04A3E1",
 "paddingRight": 10,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "borderRadius": 0,
 "width": "75%",
 "borderSize": 0,
 "minWidth": 1,
 "propagateClick": false,
 "scrollBarMargin": 2,
 "minHeight": 1,
 "height": "100%",
 "class": "HTMLText",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:3.42vh;font-family:'Bebas Neue Bold';\">john doe</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.65vh;font-family:'Bebas Neue Bold';\">licensed real estate salesperson</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.54vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.66vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.54vh;font-family:'Bebas Neue Bold';\">Tlf.: +11 111 111 111</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.54vh;font-family:'Bebas Neue Bold';\">jhondoe@realestate.com</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.54vh;font-family:'Bebas Neue Bold';\">www.loremipsum.com</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:0.77vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.66vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:0.77vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.66vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:0.77vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.66vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:0.77vh;\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac, imperdiet non dolor.</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText19460"
 },
 "scrollBarWidth": 10
}],
 "height": "100%",
 "data": {
  "name": "Player468"
 },
 "desktopMipmappingEnabled": false
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
