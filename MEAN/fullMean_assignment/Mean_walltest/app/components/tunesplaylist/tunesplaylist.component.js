"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var search_service_1 = require('../../service/search.service');
var store_1 = require('@ngrx/store');
var audiograph_service_1 = require('../../service/audiograph.service');
var tunesplaysearch_service_1 = require('../../service/tunesplaysearch.service');
var tunesplaylistComponent = (function () {
    function tunesplaylistComponent(store, _tunesplaysearchService, router, http, _searchService) {
        this.store = store;
        this._tunesplaysearchService = _tunesplaysearchService;
        this.router = router;
        this.http = http;
        this._searchService = _searchService;
        //audiograph.service.js 에서 state 변경하지않는한 Observable 리턴시  changeState() 값 그대로 리턴
        //만약 변경할 사항있을시 .subscribe 에서 (state: IAudiographState) 처리후 리턴 
        //return Object.assign({}, state, action.payload) -> observable state$
        this.state$ = this.store.select('audiograph');
    }
    tunesplaylistComponent.prototype.ngOnInit = function () {
        var _this = this;
        /* 우선은 임시로 offliberty 를 이용해서 한번다운로드받은후 localStorage 에 저장한후 다른페이지이동후 다시 플레이리스트에 올시
           localStorage 값 유무를판단후 서버상에있는 config.playlist_ADD 를 불러와 목록을보여준다
           config.playlist_ADD 같은경우는 새로운로그인을할때마다 초기화를 시켜준다.
           이렇게 해주는이유는 offliberty 같은경우는 동시에 많은 다운로드를 받을시 다운을 막아버린다
           이를 해결하기위해 서버자체에서 받아서 하는방법이있지만 서버용량이작다..
        */
        if (localStorage.getItem('track') == null) {
            if (localStorage.getItem('profile') == null) {
            }
            else {
                var id = 'id=' + JSON.parse(localStorage.getItem('profile')).nickname;
                var result = this._searchService.PlaylistSearch(id);
                result.subscribe(function (x) {
                    for (var i = 0; i < x.tracklist.length; i++) {
                        _this.store.dispatch({ type: audiograph_service_1.AUDIOGRAPH_ACTIONS.ADD_TRACK, payload: x.tracklist[i] });
                        localStorage.setItem('track', x.tracklist[0].trackName);
                    }
                });
            }
        }
        else {
            var result = this._searchService.temp();
            result.subscribe(function (x) {
                for (var i = 0; i < x.tracklist.length; i++) {
                    _this.store.dispatch({ type: audiograph_service_1.AUDIOGRAPH_ACTIONS.ADD_TRACK, payload: x.tracklist[i] });
                }
            });
        }
    };
    tunesplaylistComponent.prototype.toggleMenu = function () {
        this.store.dispatch({ type: audiograph_service_1.AUDIOGRAPH_ACTIONS.TOGGLE_MENU });
    };
    tunesplaylistComponent.prototype.togglePlay = function () {
        this.store.dispatch({ type: audiograph_service_1.AUDIOGRAPH_ACTIONS.TOGGLE_PLAY });
    };
    tunesplaylistComponent.prototype.controlTrack = function (direction) {
        // let type = direction > 0 ? AUDIOGRAPH_ACTIONS.NEXT_TRACK : AUDIOGRAPH_ACTIONS.PREV_TRACK;
        // this.store.dispatch({ type });
        if (direction > 0) {
            $audiograph.playNext();
        }
        else {
            $audiograph.playPrevious();
        }
    };
    tunesplaylistComponent.prototype.currentclick = function (event) {
        var currentLeft = (event.pageX - event.currentTarget.getBoundingClientRect().left);
        var currentOff = event.currentTarget.offsetWidth;
        this.store.dispatch({ type: audiograph_service_1.AUDIOGRAPH_ACTIONS.CURRENT_CLICK, payload: { currentLeft: currentLeft, currentOff: currentOff } });
    };
    tunesplaylistComponent.prototype.volumeControl = function (index) {
        if (index == -0.5)
            this.store.dispatch({ type: audiograph_service_1.AUDIOGRAPH_ACTIONS.VOLUME_CONTROL, payload: { volume: index, bool: 'minus' } });
        else
            this.store.dispatch({ type: audiograph_service_1.AUDIOGRAPH_ACTIONS.VOLUME_CONTROL, payload: { volume: index, bool: 'plus' } });
    };
    tunesplaylistComponent.prototype.ngAfterViewInit = function () {
        // document.querySelector('#canvas').setAttribute('style','')
    };
    tunesplaylistComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'tunesplaylist',
            templateUrl: 'tunesplaylist.component.html',
            styleUrls: ['tunesplaylist.component.scss'],
            providers: [audiograph_service_1.AudiographService, tunesplaysearch_service_1.tunesplaysearchService, search_service_1.searchService]
        }), 
        __metadata('design:paramtypes', [store_1.Store, tunesplaysearch_service_1.tunesplaysearchService, router_1.ActivatedRoute, http_1.Http, search_service_1.searchService])
    ], tunesplaylistComponent);
    return tunesplaylistComponent;
}());
exports.tunesplaylistComponent = tunesplaylistComponent;
//# sourceMappingURL=tunesplaylist.component.js.map