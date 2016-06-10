/**
 * @author Christian Brel <christian@pulsetotem.fr, ch.brel@gmail.com>
 */

/// <reference path="../../t6s-core/core-backend/libsdef/node-uuid.d.ts" />
/// <reference path="../../t6s-core/core-backend/scripts/Logger.ts" />

/// <reference path="../../t6s-core/core-backend/scripts/server/SourceItf.ts" />

/// <reference path="../../t6s-core/core-backend/scripts/RestClient.ts" />

/// <reference path="../../t6s-core/core-backend/t6s-core/core/scripts/infotype/VideoPlaylist.ts" />
/// <reference path="../../t6s-core/core-backend/t6s-core/core/scripts/infotype/VideoURL.ts" />
/// <reference path="../../t6s-core/core-backend/t6s-core/core/scripts/infotype/VideoType.ts" />
/// <reference path="../../t6s-core/core-backend/t6s-core/core/scripts/infotype/Picture.ts" />
/// <reference path="../../t6s-core/core-backend/t6s-core/core/scripts/infotype/PictureURL.ts" />

/// <reference path="../DailymotionNamespaceManager.ts" />
/// <reference path="../Utils.ts" />

var moment : any = require('moment');

/**
 * Represents the PlaylistInfo Dailymotion's Source.
 *
 * @class PlaylistInfo
 * @extends SourceItf
 */
class PlaylistInfo extends SourceItf {

	/**
	 * Constructor.
	 *
	 * @param {Object} params - Source's params.
	 * @param {DailymotionNamespaceManager} dailymotionNamespaceManager - NamespaceManager attached to Source.
	 */
	constructor(params : any, dailymotionNamespaceManager : DailymotionNamespaceManager) {
		super(params, dailymotionNamespaceManager);

		if (this.checkParams(["DailymotionPlaylistId", "InfoDuration", "Limit"])) {
			this.run();
		}
	}

	public run() {
		var self = this;

		var fail = function(error) {
			if(error) {
				Logger.error(error);
			}
		};

		var successRetrieveInfo = function(resultResponse) {
			var result = resultResponse.data();
			var playlistInfo = new VideoPlaylist(result.id);

			var totalPlaylistDuration = 0;

			playlistInfo.setDescription(result.description);
			playlistInfo.setTitle(result.description);

			var thumb = new Picture(result.id+"_thumb");
			thumb.setDescription(result.description);

			var thumb_original = new PictureURL();
			thumb_original.setURL(result.thumbnail_url);

			var thumb_large = new PictureURL();
			thumb_large.setURL(result.thumbnail_720_url);

			var thumb_medium = new PictureURL();
			thumb_medium.setURL(result.thumbnail_480_url);

			var thumb_small = new PictureURL();
			thumb_small.setURL(result.thumbnail_360_url);

			var thumb_thumb = new PictureURL();
			thumb_thumb.setURL(result.thumbnail_120_url);

			thumb.setOriginal(thumb_original);
			thumb.setLarge(thumb_large);
			thumb.setMedium(thumb_medium);
			thumb.setSmall(thumb_small);
			thumb.setThumb(thumb_thumb);


			playlistInfo.setThumbnail(thumb);

			var successRetrieveVideoInfo = function (resultListResponse) {
				var resultList = resultListResponse.data();
				var videos = resultList.list;

				if (Array.isArray(videos)) {
					for (var i = 0; i < videos.length; i++) {
						var video = videos[i];

						var videoUrl = new VideoURL(video.id);
						videoUrl.setType(VideoType.DAILYMOTION);
						videoUrl.setURL(video.embed_url);
						videoUrl.setTitle(video.title);
						videoUrl.setDescription(video.description);
						videoUrl.setDurationToDisplay(video.duration);

						var thumb = new Picture(video.id+"_thumb");
						thumb.setDescription(video.description);

						var thumb_original = new PictureURL();
						thumb_original.setURL(video.thumbnail_url);

						var thumb_large = new PictureURL();
						thumb_large.setURL(video.thumbnail_720_url);

						var thumb_medium = new PictureURL();
						thumb_medium.setURL(video.thumbnail_480_url);

						var thumb_small = new PictureURL();
						thumb_small.setURL(video.thumbnail_360_url);

						var thumb_thumb = new PictureURL();
						thumb_thumb.setURL(video.thumbnail_120_url);

						thumb.setOriginal(thumb_original);
						thumb.setLarge(thumb_large);
						thumb.setMedium(thumb_medium);
						thumb.setSmall(thumb_small);
						thumb.setThumb(thumb_thumb);

						videoUrl.setThumbnail(thumb);
						playlistInfo.addVideo(videoUrl);

						totalPlaylistDuration += video.duration;
					}

					playlistInfo.setDurationToDisplay(totalPlaylistDuration);

					self.getSourceNamespaceManager().sendNewInfoToClient(playlistInfo);
				} else {
					fail("Retrieved information from dailymotion do not follow the expected format: "+JSON.stringify(resultList));
				}

			};

			var retrieveVideosUrl = Utils.API_ENDPOINT+"/playlist/"+self.getParams().DailymotionPlaylistId+"/videos?fields=allow_embed,bookmarks_total,comments_total,created_time,description,title,duration,embed_url,views_total,id,thumbnail_url,thumbnail_720_url,thumbnail_480_url,thumbnail_360_url,thumbnail_120_url,&ssl_assets=1&limit="+self.getParams().Limit;
			Logger.debug("Request done to the following address: "+retrieveVideosUrl);
			RestClient.get(retrieveVideosUrl, successRetrieveVideoInfo, fail);
		};

		var retrievePlaylistInfo = Utils.API_ENDPOINT+"/playlist/"+self.getParams().DailymotionPlaylistId+"?fields=id,description,videos_total,thumbnail_url,thumbnail_720_url,thumbnail_480_url,thumbnail_360_url,thumbnail_120_url&ssl_assets=1";
		Logger.debug("Request done to the following address: "+retrievePlaylistInfo);
		RestClient.get(retrievePlaylistInfo, successRetrieveInfo, fail);
	}
}