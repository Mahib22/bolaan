if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
        .register("/service-worker.js")
        .then(function() {
            console.log("Pendaftaran ServiceWorker berhasil");
        })
        .catch(function() {
            console.log("Pendaftaran ServiceWorker gagal");
        });
    });
    } else {
    console.log("Browser ini tidak mendukung ServiceWorker");
    }

