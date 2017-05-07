// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".

import "phoenix_html"
import {Socket,Presence} from "phoenix"
import $ from "jquery"

$(function() {
  let user = document.getElementById('user').innerText;
  let socket = new Socket("/socket", {params: {user: user}})
  socket.connect()

  let presence = {}
  let formatedTimestamp = (Ts) => {
    let date = new Date(Ts)
    return date.toLocaleString()
  }

  let listBy = (user, {metas: metas}) => {
    return {
      user: user,
      onlineAt: formatedTimestamp(metas[0].online_at)
    }
  }

  let userlist = document.getElementById('userlist');
  let render = (presences) => {
    userlist.innerHTML = Presence.list(presences, listBy)
    .map(presence => `
      <li>
        <strong>${presence.user}</strong>
        <br>
          online at: ${presence.onlineAt}
        </li>
        `)
        .join("")
      }



      let room = socket.channel("room:lobby")
      room.on("presence_state", state => {
        presence = Presence.syncState(presence,state)
        render(presence)
      })
      room.on("presence_diff", diff => {
        presence = Presence.syncDiff(presence, diff)
        render(presence)
      })

      room.join()

    //Soundcloud Api Widget
    (function(){
      var widgetIframe = document.getElementById('sc-widget'),
          widget       = SC.Widget(widgetIframe);

      widget.bind(SC.Widget.Events.READY, function() {
        widget.bind(SC.Widget.Events.PLAY, function() {
          // get information about currently playing sound
          widget.getCurrentSound(function(currentSound) {
            console.log('sound ' + currentSound.get('') + 'began to play');
          });
        });
        // get current level of volume
        widget.getVolume(function(volume) {
          console.log('current volume value is ' + volume);
        });
        // set new volume level
        widget.setVolume(50);
        // get the value of the current position
      });

    }());


      //YouTube API
//       $('form').on("submit", function(e){
//         e.preventDefault();
//         // the request
//         var request = gapi.client.youtube.search.list({
//             part: "snippet",
//             type: "video",
//             q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
//             maxResults: 3,
//             order: "viewCount",
//             publishedAfter: "2015-01-01T00:00:00Z"
//         });
//         //execute the request
//         request.execute(function(response){
//           console.log(response);
//
//         })
//       });
//
});
//
// //YouTube api
// function init() {
//   gapi.client.setApiKey(API KEY GOES HERE);
//   gapi.client.load("youtube", "v3", function(){
//   });
// }

//YouTube API
//This code loads the IFrame Player API code asynchronously.
//  var tag = document.createElement('script');
//  tag.src = "https://www.youtube.com/iframe_api";
//       var firstScriptTag = document.getElementsByTagName('script')[0];
//       firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// //This function creates an <iframe> (and YouTube player) after the API code downloads.
// var player;
//       function onYouTubeIframeAPIReady() {
//         player = new YT.Player('player', {
//           height: '390',
//           width: '640',
//           videoId: 'M7lc1UVf-VE',
//           events: {
//             'onReady': onPlayerReady,
//             'onStateChange': onPlayerStateChange
//           }
//         });
//       }
// //The API will call this function when the video player is ready.
// function onPlayerReady(event) {
//         event.target.playVideo();
//       }
// // The API calls this function when the player's state changes.
//       //    The function indicates that when playing a video (state=1),
//       //    the player should play for six seconds and then stop.
//       var done = false;
//             function onPlayerStateChange(event) {
//               if (event.data == YT.PlayerState.PLAYING && !done) {
//                 setTimeout(stopVideo, 6000);
//                 done = true;
//               }
//             }
//             function stopVideo() {
//               player.stopVideo();
//             }
//





// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"
