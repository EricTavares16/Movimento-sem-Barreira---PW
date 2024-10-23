const CEPInput = document.getElementById("CEPFromHome");
const btnPesq = document.getElementById("btnPesq");
const textAddress = document.querySelector(".name_address");
var lati;
var longe;
var map;

function pesqCEP() {
    if (CEPInput.value != "") {


        if (CEPInput.value.length === 8) {
            lati = 0;
            longe = 0;
            const CEPV = CEPInput.value;
            const url = `https://cep.awesomeapi.com.br/json/${CEPV}`;
            console.log(lati, longe);

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    lati = data.lat;
                    longe = data.lng;




                    if (!map) {
                        // Tá criando o MAPA pela primeira vez e apresentando
                        map = L.map("map").setView([lati, longe], 20);
                        const layer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                            maxZoom: 19,
                            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        });
                        layer.addTo(map);
                        textAddress.innerHTML = `<p class="text_address">${data.address}, ${data.district} - ${data.city} , ${data.state} - ${data.cep}</p>`
                    } else {
                        // Aqui tá atualizando o map que vai ser visualizado
                        map.setView([lati, longe], 20);
                    }

                    // Cria o PIN para indentificar onde está você!
                    const marker = L.marker([lati, longe]);
                    marker.addTo(map);
                    CEPInput.value = "";


                })
                .catch(error => {
                    console.error('Erro:', error);
                });
        } else if (CEPInput.value.length > 8) {
            alert('TAMANHO DE CEP INVÁLIDO');
        }
    } else {
        CEPInput.value = "";
    }

}

window.onload = function (event) {



    CEPInput.addEventListener('blur', pesqCEP);
   
    btnPesq.addEventListener("click", pesqCEP);

}
