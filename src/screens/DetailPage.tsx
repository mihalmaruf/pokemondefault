import { useParams } from "react-router-dom";
import { useGetPokemonDetail } from "../hooks/useGetPokemonDetail";
import { createUseStyles } from "react-jss";

const PokemonDetail = () => {
    const classes = useStyles();
    const params = useParams();
    const postId = params.id;
    
    const { pokemon } = useGetPokemonDetail(postId);

    return (
        <div className={classes.container} onClick={() => window.history.back()}>
            <div className={classes.card}>
                <img 
                    src={pokemon.image} 
                    alt={pokemon.name} 
                    className={classes.image}
                />
                <div className={classes.info}>
                    <h2 className={classes.name}>{pokemon.name}</h2>
                    <p className={classes.number}>#{pokemon.number}</p>
                    <div className={classes.stats}>
                        <p><strong>Weight:</strong> {pokemon.weight?.minimum} - {pokemon.weight?.maximum}</p>
                        <p><strong>Height:</strong> {pokemon.height?.minimum} - {pokemon.height?.maximum}</p>
                    </div>
                    <p className={classes.classification}>{pokemon.classification}</p>
                    <p className={classes.types}>{pokemon.types}</p>
                </div>
                <div className={classes.button}>CLOSE</div>
            </div>
        </div>
    );
}

const useStyles = createUseStyles({
    container: {
        width: "100%",
        height: "100%",
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(91, 112, 131, 0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      },
      
    card: {
        width: "600px",
        height: "650px",
        backgroundColor: "rgb(20 25 36)",
        borderRadius: "5px",
        padding: "2vh",
    },
    image: {
        width: '100%',
        height: '250px',
        objectFit: "cover",
        borderRadius: '8px',
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
    },
    name: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#ff69b4',
    },
    number: {
        fontSize: '18px',
        color: '#fff',
    },
    stats: {
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        color: '#fff',
    },
    classification: {
        fontSize: '14px',
        color: '#fff',
    },
    types: {
        fontSize: '14px',
        color: '#fff',
    },
    button: {
        padding: "2vh",
        backgroundColor: "#fff",
        color: "#000",
        textAlign: "center",
        fontWeight: "bold",
        borderRadius: "5px",
    }
});

export default PokemonDetail;
