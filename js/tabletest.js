
//must be outside of jquery function, as the jquery waits for the page to load, so these will not be initialized
let haveBoxArray = [];
let wantBoxArray = [];

console.log("not loaded");

function haveFormatter(value, rowData, index) {
    var checked = value ? 'checked' : ''
    checkboxID = rowData.Id + "h"
    if (!haveBoxArray.includes(checkboxID)){
        haveBoxArray[haveBoxArray.length] = checkboxID;
    }
    //console.log(checkboxID)
    return '<input type="checkbox"' + checked + ' class="haveBox" id="' + checkboxID + '">';
} //should this get/set data later?

function wantFormatter(value, rowData, index) {
    var checked = value ? 'checked' : ''
    checkboxID = rowData.Id + "w"
    if (!wantBoxArray.includes(checkboxID)){
        wantBoxArray[wantBoxArray.length] = checkboxID;
    }
    //console.log(checkboxID)
    return '<input type="checkbox"' + checked + ' class="wantBox" id="' + checkboxID + '">';
}


$(function() {
    //all scripts must be inside this

    var $table = $('#test-table')

    window.haveEvents = {
        'change :checkbox': function (e, value, row, index) {
            row.have = $(e.target).prop('checked')
            $table.bootstrapTable('updateRow', {
                index: index,
                row: row
            })
        }
    }

    window.wantEvents = {
        'change :checkbox': function (e, value, row, index) {
            row.want = $(e.target).prop('checked')
            $table.bootstrapTable('updateRow', {
                index: index,
                row: row
            })
            }
    }

    /*

    //not sure why I can't load data from js - currently loading it within the html file natively with
    //bootstrap-table, which seems to be fine. keeping this just in case. can't remember if fetch works.

    let testTableData = {};

    async function fetchTestTableData() {
        let response = await fetch('./assets/test/TestTitles.json');
        let testTableData = await response.text();
        //console.log(testTableData);
    }
    
    fetchTestTableData();

    $(function() {
        $('#test-table').bootstrapTable({
            data: testTableData
            //data won't load from this file, disabled for now
        })
    })

    */
    
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

        $(document).on("click", ".haveBox, .wantBox", function(event) {
            const $haveCheckboxEvent = $(this);
            if($haveCheckboxEvent.is(":checked")) {
                console.log(this.id + " is checked!");
            }
            else if(!$haveCheckboxEvent.is(":checked")) {
                console.log(this.id + " is unchecked!");
            }
        })

    });

});