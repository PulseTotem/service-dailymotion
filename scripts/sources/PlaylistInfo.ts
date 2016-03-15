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

		var successRetrieveInfo = function(result1) {

		};

		var retrieveInfoUrl = Utils.API_ENDPOINT+"/playlist/"+this.getParams().DailymotionPlaylistId+"?fields=created_time,description,name,owner.screen_name";
		RestClient.get(retrieveInfoUrl, successRetrieveInfo, fail);
	}
}