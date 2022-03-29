//Recupera el valor ingresado en el cuadro de texto.
//JQuery que se ejecutará al cargarse el Doc

$(document).ready(function () {

    $("form").submit(function (event) {
        //Evita que comportamiento por defecto del formulario
        event.preventDefault()

        //Recupera el número de superhéroe deseado
        valueInput = $("#numberInput").val()

        //Uso del método Ajax de JQuery para hacer uso del valor del input para concatenarla a la consulta Ajax que se emitirá a la API

        $.ajax({
            type: "GET",
            //Recupera valores API SuperHero. NOTA: Se agregó /api.php/ con el fin de acceder a la API, de lo contrario se recibe mensaje de error.
            url: "https://www.superheroapi.com/api.php/10226484809042148/" + valueInput,
            dataType: "json",
            success: function (data) {
                //Confirma recepción de datos OK
                console.log(data)

                //Captura de datos requeridos para presentar resultados
                let sHname = data.name
                let sHconnections = data.connections["group-affiliation"]
                let sHpublisher = data.biography.publisher
                let sHoccupation = data.work.occupation
                let sHfirstApp = data.biography["first-appearance"]
                let sHheight0 = data.appearance.height[0]
                let sHheight1 = data.appearance.height[1]
                let sHweight0 = data.appearance.weight[0]
                let sHweight1 = data.appearance.weight[1]
                let sHaliases = data.biography.aliases
                let sHimage = data.image.url

                //Estructura para la presentación de contenidos en pantalla. Se hace uso de Horizontal Cards e interpola con datos obtenidos de la API
                $("#superHeroData").html(`
                <div class="card">
                    <div class="card-header">
                        SuperHero Encontrado
                    </div>
                    <div class="card mb-3">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src=${sHimage} class="img-fluid rounded-start" alt="SuperHero">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title" style="font-size:x-large; text-align: justify;">Nombre: ${sHname}</h5>
                                    <p class="card-text">
                                        <i>Conexiones</i>: ${sHconnections}.
                                    </p>
                                    <p class="card-text">
                                        <i>Publicado por</i>: ${sHpublisher}
                                    </p>
                                    <p class="card-text">
                                        <i>Ocupación</i>: ${sHoccupation}.
                                    </p>
                                    <p class="card-text">
                                        <i>Primera Aparición</i>: ${sHfirstApp}.
                                    </p>
                                    <p class="card-text">
                                        <i>Altura</i>: ${sHheight0} - ${sHheight1}.
                                    </p>
                                    <p class="card-text">
                                    <i>Altura</i>: ${sHweight0} - ${sHweight1}.
                                    </p>
                                    <p class="card-text">
                                        <i>Alianzas</i>: ${sHaliases}.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                
                `)

                //Captura de datos requeridos para presentar resultados gráficos
                let sHintelligence = data.powerstats.intelligence
                let sHstrength = data.powerstats.strength
                let sHspeed = data.powerstats.speed
                let sHdurability = data.powerstats.durability
                let sHpower = data.powerstats.power
                let sHcombat = data.powerstats.combat

                //Construcción de la gráfica a presentar modificando algunas propiedades de formato y orden de elementos
                var chart = new CanvasJS.Chart("chartContainer", {
                    theme: "light2", // "light1", "light2", "dark1", "dark2"
                    exportEnabled: true,
                    animationEnabled: true,
                    animationDuration: 4000,
                    title: {
                        fontWeight: "bolder",
                        fontSize: 48,
                        text: `Estadísticas de Poder para ${sHname}`
                    },
                    legend: {
                        verticalAlign: "bottom",
                        itemWrap: "true",
                        horizontalAlign: "center",
                    },

                    data: [{
                        type: "pie",
                        startAngle: 25,
                        toolTipContent: "<b>{label}</b>: {y}%",
                        showInLegend: "true",
                        legendText: "{label}",
                        indexLabelFontSize: 16,
                        indexLabelPlacement: "outside",
                        indexLabel: "{label}-{y}%",                            

                        //Etiquetas y datos para renderisar el gráfico con PowerStats de SuperHeroes
                        dataPoints: [
                            {y: sHintelligence, label: "Inteligencia" },
                            {y: sHstrength, label: "Fuerza" },
                            {y: sHspeed, label: "Velocidad" },
                            {y: sHdurability, label: "Resistencia" },
                            {y: sHpower, label: "Poder" },
                            {y: sHcombat, label: "Combate" }
                        ]
                    }]
                })
                //Renderizción del gráfico a presentar
                chart.render();
            },
            error: function (error) {
                console.log(error)
            }
        })
    })
})
