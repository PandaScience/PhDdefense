(function (doc, win) {
	"use strict"

	const initial_css = {
		position: 'absolute',
		float: 'left',
		borderRadius: '50%',
		width: '10px',
		height: '10px',
		backgroundColor: 'rgba(255, 0, 0, 0.6)',
		zIndex: 100,
		display: 'none'
	}
	let toggleBind = false
	const body = doc.getElementsByTagName('body')[0]
	let tail = doc.createElement('div')

	function initModule () {
		Object.assign(tail.style, initial_css)
		body.appendChild(tail)
		setKeyboards()
		if (window.Reveal.registerKeyboardShortcut) {
			Reveal.registerKeyboardShortcut('CAPSLOCK', 'Toggle Mouse Pointer');
		}
	}

	let mouseTimer = null, cursorVisible = true;
	function disappearCursor() {
		mouseTimer = null;
		// document.body.style.cursor = "none";
		tail.style.display = 'none'
		cursorVisible = false;
	}

	function mouse_pointing(e) {
		tail.style.display = 'block'
		tail.style.left = e.pageX - 15 + 'px'
		tail.style.top = e.pageY - 15 + 'px'

		// hide mouse after timeout
		if (mouseTimer) {
			window.clearTimeout(mouseTimer);
		}
		if (!cursorVisible) {
			// document.body.style.cursor = "default";
			tail.style.display = 'block'
			cursorVisible = true;
		}
		mouseTimer = window.setTimeout(disappearCursor, 200);
	}

	function toogleMousePointer () {
		if (!toggleBind) {
			document.removeEventListener('mousemove', mouse_pointing)
			tail.style.display = 'none'
			body.style.cursor = 'auto'
		} else {
			tail.style.display = 'block'
			tail.style.width = '30px'
			tail.style.height = '30px'
			body.style.cursor = 'none'
			document.addEventListener('mousemove', mouse_pointing)
		}
	}

	function setKeyboards(params) {
		document.addEventListener('keydown', function (event) {
			if (event.keyCode === 20) {
				event.preventDefault()
				toggleBind = !toggleBind
				toogleMousePointer()
			}
		}, false )
	}


	initModule()
})(document, window)
