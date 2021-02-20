// at this stage DOMContentLoaded already fired. so simply execute code
// below...
// document.addEventListener("DOMContentLoaded", addFragmentToTableRows, false)

function addFragmentToTableRows(e) {
	hdlists = document.getElementsByClassName("hdlist qa-fragment")
	// console.log(hdlists)
	for (let hdlist of hdlists) {
		tbody = hdlist.firstChild.firstChild
		for (let row of tbody.childNodes) {
			row.classList.add("fragment")
		}
	}
}
addFragmentToTableRows();
