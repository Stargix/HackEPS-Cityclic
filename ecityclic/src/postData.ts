const postData = async ( isLoggedIn: boolean ) => {
    try {

        const requestData = {
            Tipo: "EjemploTipo",
            Titulo: "EjemploTitulo",
            Registered: isLoggedIn,
            Representated: false
        };
        console.log("Datos a enviar en el POST:", requestData);
        const response = await fetch("http://localhost:5000", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        });

        if (!response.ok) {
            throw new Error('HTTP error! Status: ${response.status}');
        }

        const result = await response.json();
        console.log("Response:", result);
    } catch (error) {
        console.error("Error:",error);
    }
}