/**
 * @author Simon Urli <simon@the6thscreen.fr>
 */

/// <reference path="../../scripts/sources/PlaylistInfo.ts" />

var assert : any = require("assert");
var sinon : any = require("sinon");
declare var describe : any;
declare var it : any;
declare var beforeEach : any;
declare var afterEach : any;

describe('PlaylistInfo', function() {

	var sandbox;
	beforeEach(function () {
		sandbox = sinon.sandbox.create();
	});

	afterEach(function () {
		sandbox.restore();
	});
	
	describe('#constructor', function () {
		it('should launch run if parameters are given', function () {
			var mockPlaylistInfo = sandbox.mock(PlaylistInfo.prototype);
			mockPlaylistInfo.expects('run').once();

			var params = {DailymotionPlaylistId: 'x3ecgj', Limit: '10', InfoDuration: '15'};

			var stubNSManager:any = sinon.createStubInstance(DailymotionNamespaceManager);
			var playlistInfo = new PlaylistInfo(params, stubNSManager);

			mockPlaylistInfo.verify();
		});

		it('should not launch run if the parameter Limit is missing', function () {
			var mockPlaylistInfo = sandbox.mock(PlaylistInfo.prototype);
			mockPlaylistInfo.expects('run').never();

			var params = {DailymotionPlaylistId: 'x3ecgj', InfoDuration: '15'};


			var stubNSManager:any = sinon.createStubInstance(DailymotionNamespaceManager);
			var playlistInfo = new PlaylistInfo(params, stubNSManager);

			mockPlaylistInfo.verify();
		});

		it('should not launch run if the parameter InfoDuration is missing', function () {
			var mockPlaylistInfo = sandbox.mock(PlaylistInfo.prototype);
			mockPlaylistInfo.expects('run').never();

			var params = {DailymotionPlaylistId: 'x3ecgj', Limit: '15'};


			var stubNSManager:any = sinon.createStubInstance(DailymotionNamespaceManager);
			var playlistInfo = new PlaylistInfo(params, stubNSManager);

			mockPlaylistInfo.verify();
		});

		it('should not launch run if the parameter DailymotionPlaylistId is missing', function () {
			var mockPlaylistInfo = sandbox.mock(PlaylistInfo.prototype);
			mockPlaylistInfo.expects('run').never();

			var params = {Limit: '10', InfoDuration: '15'};


			var stubNSManager:any = sinon.createStubInstance(DailymotionNamespaceManager);
			var playlistInfo = new PlaylistInfo(params, stubNSManager);

			mockPlaylistInfo.verify();
		});
	});
});