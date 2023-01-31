const getDefaultCates = () => {
    let url = "./php/getDefaultFiltre.php";
    $.ajax({
        async: true,
        contentType: "application/x-www-form-urlencoded",
        type: "POST",
        url: url,
        dataType: "json",
        success: data => {
            addFilterCheckBox(data);
            choixCates();
        },
        error: () => {
            alert("Problem occured in ajax of Sondage.js 1");
        }
    });

    const addFilterCheckBox = data => {
        let i = 0;
        for (let value of data) {
            // console.log(value["alim_grp_nom_fr"]);

            $('#filtre')
                .append("<div><input type='checkbox' name='category' " + "id=" + i + ">" + "<label for=" + i + ">" + value["alim_grp_nom_fr"] + "</label></div>")
                ;
            ++i
        }
    }
};


const checkboxOnlyOne = clickedInput => {
    document.querySelectorAll("input[type=checkbox]").forEach(input => {
        input.checked = false;
    });
    clickedInput.checked = true;
}

const getDefaultAliments = () => {
    let url = "./php/getDefaultAliment.php";
    $.ajax({
        async: true,
        contentType: "application/x-www-form-urlencoded",
        type: "POST",
        url: url,
        dataType: "json",
        success: data => {
            addChoixAliment(data);
        },
        error: () => {
            alert("Problem occured in ajax of Sondage.js 2");
        }
    });

    const addChoixAliment = data => {
        for (let value of data) {
            $('#choix')
                .append("<button>" + value["alim_nom_fr"] + "</button>");
        }
    }
};

const choixCates = () => {
    // console.log(document.querySelectorAll("input[name='category']").length);
    let labels = Array.from(document.querySelectorAll("#filtre label"));
    Array.from(document.querySelectorAll("input[type=checkbox]")).forEach(input => {
        // $("input[type=checkbox]").click(function(){

        input.addEventListener("change", function () {
            checkboxOnlyOne(this);
            let url = "./php/filtres.php";
            let allCategory = labels[this.getAttribute("id")].textContent;
            console.log(allCategory);
            let data1 = {
                category: allCategory,
            };
            $.ajax({
                async: true,
                contentType: "application/x-www-form-urlencoded",
                type: "POST",
                url: url,
                dataType: "json",
                data: data1,
                success: data => {
                    // $(".ligne").html(data);
                    // if(data!=null)
                    addFilterchoisi(data);
                    // else
                    //     console.log(data);


                },
                error: () => {
                    alert("Problem occured in ajax of Sondage.js 3");
                }
            });

            const addFilterchoisi = data => {
                $("#choix button").remove();
                for (let value of data) {
                    {
                        $('#choix').append("<button>" + value["alim_nom_fr"] + "</button>");
                    }
                }
            }
        });
    });
}

const startSondage = () => {
    getDefaultCates();
    getDefaultAliments();
    // choixCates();
}

window.addEventListener("DOMContentLoaded", startSondage);