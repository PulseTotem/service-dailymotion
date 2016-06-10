/**
 * @author Christian Brel <christian@pulsetotem.fr, ch.brel@gmail.com>
 * @author Simon Urli <simon@pulsetotem.fr>
 */

/// <reference path="./sources/PlaylistInfo.ts" />

/**
 * Represents the Dailymotion's SourceNamespaceManager.
 *
 * @class DailymotionNamespaceManager
 * @extends SourceNamespaceManager
 */
class DailymotionNamespaceManager extends SourceNamespaceManager {

    /**
     * Constructor.
     *
     * @constructor
     * @param {any} socket - The socket.
     */
    constructor(socket : any) {
        super(socket);
	    this.addListenerToSocket('PlaylistInfo', function(params : any, self : DailymotionNamespaceManager) { (new PlaylistInfo(params, self)) });
    }
}