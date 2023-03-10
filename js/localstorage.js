

import { loadBookends } from "./functions/loadFrame.js";

function pushToLocal() {
    var textBox = document.getElementById("local-storage-test-text")
    var data = textBox.value;
    if (data != "") {
        localStorage.setItem("testData", data);
        console.log("Successfully stored " + localStorage.getItem("testData") + "!");
        textBox.value = "";
    }
}

function getFromLocal() {
    var data = localStorage.getItem("testData");
    if (data != "") {
        var textBox = document.getElementById("output");
        textBox.innerHTML = data;
        console.log("Successfully retrieved " + data + "!");
    }
}

document.getElementById("local-storage-test-submit").addEventListener("click", pushToLocal)
document.getElementById("local-storage-test-recall").addEventListener("click", getFromLocal)

loadBookends();