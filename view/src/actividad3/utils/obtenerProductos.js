export const obtenerProductos = () => {
    return [
        // PASTAS
        {
            id: 1,
            nombre: "Spaghetti Carbonara",
            categoria: "pasta",
            ingredientes: ["Spaghetti", "Panceta", "Huevos", "Queso Parmesano", "Pimienta negra", "Ajo"],
            precio: 14.50,
            descripcion: "Cremosa pasta con panceta crujiente, huevo y queso parmesano. Receta tradicional romana."
        },
        {
            id: 2,
            nombre: "Fettuccine Alfredo",
            categoria: "pasta",
            ingredientes: ["Fettuccine", "Mantequilla", "Queso Parmesano", "Nata", "Ajo", "Perejil"],
            precio: 13.90,
            descripcion: "Pasta plana en salsa cremosa de mantequilla y parmesano. Un clásico italiano irresistible."
        },
        {
            id: 3,
            nombre: "Lasagna Bolognese",
            categoria: "pasta",
            ingredientes: ["Pasta de lasaña", "Carne de res", "Tomate", "Bechamel", "Mozzarella", "Parmesano"],
            precio: 16.20,
            descripcion: "Capas de pasta con ragú bolognese, bechamel y quesos gratinados. Horneada a la perfección."
        },
        
        // PIZZAS
        {
            id: 4,
            nombre: "Pizza Margherita",
            categoria: "pizza",
            ingredientes: ["Masa artesanal", "Salsa de tomate", "Mozzarella fresca", "Albahaca", "Aceite de oliva"],
            precio: 12.80,
            descripcion: "La pizza más tradicional con tomate, mozzarella fresca y albahaca. Simplicidad italiana perfecta."
        },
        {
            id: 5,
            nombre: "Pizza Quattro Stagioni",
            categoria: "pizza",
            ingredientes: ["Masa artesanal", "Tomate", "Mozzarella", "Jamón", "Champiñones", "Alcachofas", "Aceitunas"],
            precio: 15.90,
            descripcion: "Pizza dividida en cuatro secciones representando las estaciones del año. Sabores únicos en cada cuarto."
        },
        {
            id: 6,
            nombre: "Pizza Prosciutto e Funghi",
            categoria: "pizza",
            ingredientes: ["Masa artesanal", "Tomate", "Mozzarella", "Prosciutto di Parma", "Champiñones frescos"],
            precio: 17.50,
            descripcion: "Exquisita combinación de prosciutto di Parma y champiñones frescos sobre base tradicional."
        },
        
        // POSTRES
        {
            id: 7,
            nombre: "Tiramisu",
            categoria: "postre",
            ingredientes: ["Bizcochos de soletilla", "Café espresso", "Mascarpone", "Huevos", "Azúcar", "Cacao"],
            precio: 6.90,
            descripcion: "El postre italiano más famoso. Capas de café, mascarpone y cacao en perfecta armonía."
        },
        {
            id: 8,
            nombre: "Panna Cotta",
            categoria: "postre",
            ingredientes: ["Nata", "Azúcar", "Gelatina", "Vainilla", "Coulis de frutos rojos"],
            precio: 5.50,
            descripcion: "Delicada crema gelificada con vainilla y coulis de frutos rojos. Textura sedosa irresistible."
        },
        {
            id: 9,
            nombre: "Cannoli Siciliani",
            categoria: "postre",
            ingredientes: ["Masa crujiente", "Ricotta", "Azúcar glass", "Pistachos", "Chocolate", "Frutas confitadas"],
            precio: 7.20,
            descripcion: "Tubos crujientes rellenos de ricotta dulce con pistachos y chocolate. Especialidad siciliana auténtica."
        }
    ];
}; 