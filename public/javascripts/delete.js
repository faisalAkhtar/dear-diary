function del(section) {
    if(confirm("Are you sure you want to delete \"" + section.childNodes[1].innerText + "\" ?")) {
        let xhr = new XMLHttpRequest();
        xhr.open("DELETE", "/journals/" + section.id, true);
        xhr.onload = function() {
            console.log(section.id)
            if(this.status==200) {
            section.remove()
            console.log(this.responseText)
            }
            else alert(this.status + "\n" + this.statusText)
        };
        xhr.onerror = function() {
            alert(this.responseText)
        };
        xhr.send();
    }
}
