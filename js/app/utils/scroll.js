/**
 * Copyright 2017 Select Interactive, LLC. All rights reserved.
 * @author: The Select Interactive dev team (www.select-interactive.com)
 */
'use strict';

import * as Utils from '../utils/utils';

const SCROLL_TIME = 500;
const EASING = 'easeOutSine';

export default class Scroll {
	/**
	 * @param {number} yTarget
	 * @param {any} fn
	 */
	static scrollTo( yTarget, fn ) {
		const yCurrent = Utils.getWindowScrollPosition();
		const speed = SCROLL_TIME;
		const PI_D2 = Math.PI / 2;

		let timeCurrent = 0;
		let time = Math.max( 0.1, Math.min( Math.abs( yCurrent - yTarget ) / speed, 0.8 ) );

		const easeOutSine = pos => Math.sin( pos * ( Math.PI / 2 ) );

		const tick = _ => {
			timeCurrent += 1 / 60;

			let p = timeCurrent / time;
			let t = easeOutSine( p );

			if ( p < 1 ) {
				requestAnimationFrame( tick );
				window.scrollTo( 0, yCurrent + ( ( yTarget - yCurrent ) * t ) );
			}
			else {
				window.scrollTo( 0, yTarget );

				if ( fn ) {
					requestAnimationFrame( fn );
				}
			}
		};

		tick();
	}
}