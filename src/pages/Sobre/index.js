const CEPInput = document.getElementById("CEPFromHome");
const btnPesq = document.getElementById("btnPesq");
var lati;
var longe;
window.onload = function () {
    
    CEPInput.addEventListener('blur', function () {
      
        if (CEPInput.value.length === 8) {
            const CEPV = CEPInput.value;
            const url = `https://cep.awesomeapi.com.br/json/${CEPV}`;
            
            
            fetch(url)
            .then(response => response.json())
            .then(data => {
                lati = data.lat;
                longe = data.lng;
               
                
            })
            .catch(error => {
                console.error('Erro:', error);
            });
        }
        if (CEPInput.value.length > 8) {
            alert('TAMANHO DE CEP INVÁLIDO');
        }
    });
    
    
    
}

btnPesq.addEventListener("click",function () {
    
    const map = L.map("map").setView([lati, longe],26);
        console.log(map)
        
        const layer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });
        layer.addTo(map)
        
        const marker = L.marker([lati, longe]);
        marker.addTo(map)
})