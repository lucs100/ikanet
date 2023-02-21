
//must be outside of jquery function, as the jquery waits for the page to load, so these will not be initialized
let haveBoxArray = [];
let wantBoxArray = [];

console.log("not loaded");

function HaveFormatter(value, rowData, index) {
    checkboxID = rowData.Id + "h"
    if (!haveBoxArray.includes(checkboxID)){
        haveBoxArray[haveBoxArray.length] = checkboxID;
    }
    //console.log(checkboxID)
    return '<input type="checkbox" class="haveBox" id="' + checkboxID + '">';
} //should this get/set data later?

function WantFormatter(value, rowData, index) {
    checkboxID = rowData.Id + "w"
    if (!wantBoxArray.includes(checkboxID)){
        wantBoxArray[wantBoxArray.length] = checkboxID;
    }
    //console.log(checkboxID)
    return '<input type="checkbox" class="wantBox" id="' + checkboxID + '">';
}

$(function() {
    //all scripts must be inside this

    let testTableData = {};

    async function fetchTestTableData() {
        let response = await fetch('./assets/test/TestTitles.json');
        let testTableData = await response.text();
        //console.log(testTableData);
    }

    fetchTestTableData();

    //$(function() {
        //$('#test-table').bootstrapTable({
            //data: testTableData
            //data won't load from this file, disabled for now
        //})
    //})
    
    $(function(){
        $("#nav-script").load("navbar.html")
    });
    
    $(function(){
        $("#footer-script").load("footer.html")
    });
    
    var $table = $('#test-table').bootstrapTable();

    $table.on('load-success.bs.table', function () {
        console.log("loaded!");
        //console.log("haveBoxArray = " + haveBoxArray);
        //console.log("wantBoxArray = " + wantBoxArray);
    });
    
});