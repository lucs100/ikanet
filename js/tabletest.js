
import { loadBookends } from "./functions/loadFrame.js";
import * as tableData from "./tableTestFormatters.js"

//must be outside of jquery function, as the jquery waits for the page to load, so these will not be initialized

console.log("not loaded");

// need to populate these once the dom is loaded, since i cant in tabletestformatters

let haveBoxArray = [];
let wantBoxArray = [];

$(function() {
    //all scripts must be inside this

    var $table = $('#test-table')

    /*
    // Removed as this breaks importing the code as a type="module" - strict mode has window undefined. ChatGPT could not fix.
    // Since sorting is removed (see https://github.com/wenzhixin/bootstrap-table/issues/6654), not a big deal. 

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

    */

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

    loadBookends();
    
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