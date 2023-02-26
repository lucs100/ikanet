
function haveFormatter(value, rowData, index) {
    var checked = value ? 'checked' : ''
    checkboxID = rowData.Id + "h"
    // if (!haveBoxArray.includes(checkboxID)){
    //     haveBoxArray[haveBoxArray.length] = checkboxID;
    // }
    //console.log(checkboxID)
    return '<input type="checkbox"' + checked + ' class="haveBox" id="' + checkboxID + '">';
} //should this get/set data later?

function wantFormatter(value, rowData, index) {
    var checked = value ? 'checked' : ''
    checkboxID = rowData.Id + "w"
    // if (!wantBoxArray.includes(checkboxID)){
    //     wantBoxArray[wantBoxArray.length] = checkboxID;
    // }
    //console.log(checkboxID)
    return '<input type="checkbox"' + checked + ' class="wantBox" id="' + checkboxID + '">';
}