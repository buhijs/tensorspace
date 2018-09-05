import { SceneInitializer } from '../scene/SceneInitializer';
import { TfjsLoader } from '../loader/TfjsLoader';
import {FrozenModelLoader} from "../loader/FrozenModelLoader";
import {KerasLoader} from "../loader/KerasLoader";
import {TfLoader} from "../loader/TfLoader";

function AbstractComposite( container ) {

	this.loader = undefined;
	this.hasLoader = false;
	// set to be true when resource is loaded to visualization model
	this.isFit = false;
	this.isInitialized = false;

	// store model loaded from url
	this.resource = undefined;
	// store the predict result from resource
	this.predictResult = undefined;

	SceneInitializer.call(this, container);

}

AbstractComposite.prototype = Object.assign(Object.create( SceneInitializer.prototype ), {

	load: function(config) {

		if (config.type === "tfjs") {
			this.loadTfjsModel(config);
		} else if ( config.type === "keras" ) {
			this.loadKerasModel(config);
		} else if (config.type === "tensorflow") {
			this.loadTfModel(config);
		} else {
			console.error("Do not support to load model type " + config.type)
		}
	},

	// loadFrozen: function(modelUrl, weightUrl, config) {
	//
	// 	let loader = new FrozenModelLoader(this);
	// 	loader.preload(modelUrl, weightUrl, config);
	//
	// },

	loadTfjsModel: function(config) {

		let loader = new TfjsLoader(this, config);
		loader.preLoad();

	},

	loadKerasModel: function(config) {
		let loader = new KerasLoader(this, config);
		loader.preLoad();
	},

	loadTfModel: function(config) {
		let loader = new TfLoader(this, config);

		console.log(loader);

		loader.preLoad();
	},

	setLoader: function(loader) {
		this.loader = loader;
	}

});

export { AbstractComposite };