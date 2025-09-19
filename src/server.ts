import fastify from "fastify";
import fastifyCors from "@fastify/cors";

const server = fastify({ logger: true });
server.register(fastifyCors, {
    origin: "*",
})

const teams = [
  { id: 1, name: "McLaren", base: "Woking, United Kingdom", principal: "Andrea Stella" },
  { id: 2, name: "Mercedes", base: "Brackley, United Kingdom", principal: "Toto Wolff" },
  { id: 3, name: "Red Bull Racing", base: "Milton Keynes, United Kingdom", principal: "Laurent Mekies" },
  { id: 4, name: "Ferrari", base: "Maranello, Italy", principal: "Fred Vasseur" },
  { id: 5, name: "Aston Martin", base: "Silverstone, United Kingdom", principal: "Andy Cowell" },
  { id: 6, name: "Williams", base: "Grove, United Kingdom", principal: "James Vowles" },
  { id: 7, name: "Racing Bulls", base: "Faenza, Italy", principal: "Alan Permane" },
  { id: 8, name: "Kick Sauber", base: "Hinwil, Switzerland", principal: "Jonathan Wheatley" },
  { id: 9, name: "Haas", base: "Kannapolis, United States", principal: "Ayao Komatsu" },
  { id: 10, name: "Alpine", base: "Enstone, United Kingdom", principal: "Flavio Briatore" },
];


const drivers = [
  { id: 1, name: "Max Verstappen", team: "Red Bull Racing", number: 1, nationality: "Netherlands", birthdate: "1997-09-30", birthPlace: "Hasselt, Belgium", careerWins: 65 },  
  { id: 2, name: "Lewis Hamilton", team: "Ferrari", number: 44, nationality: "United Kingdom", birthdate: "1985-01-07", birthPlace: "Stevenage, England", careerWins: 105 },  
  { id: 3, name: "Lando Norris", team: "McLaren", number: 4, nationality: "United Kingdom", birthdate: "1999-11-13", birthPlace: "Bristol, England", careerWins: 9 },  
  { id: 4, name: "Oscar Piastri", team: "McLaren", number: 81, nationality: "Australia", birthdate: "2001-04-06", birthPlace: "Melbourne, Australia", careerWins: 9 },  
  { id: 5, name: "Charles Leclerc", team: "Ferrari", number: 16, nationality: "Monaco", birthdate: "1997-10-16", birthPlace: "Monte Carlo, Monaco", careerWins: 8 },  
  { id: 6, name: "George Russell", team: "Mercedes", number: 63, nationality: "United Kingdom", birthdate: "1998-02-15", birthPlace: "Kingston upon Thames, England", careerWins: 3 },  
  { id: 7, name: "Kimi Antonelli", team: "Mercedes", number: 12, nationality: "Italy", birthdate: "2006-08-25", birthPlace: "Modena, Italy", careerWins: 0 },  
  { id: 8, name: "Fernando Alonso", team: "Aston Martin", number: 14, nationality: "Spain", birthdate: "1981-07-29", birthPlace: "Oviedo, Spain", careerWins: 32 },  
  { id: 9, name: "Lance Stroll", team: "Aston Martin", number: 18, nationality: "Canada", birthdate: "1998-10-29", birthPlace: "Montreal, Canada", careerWins: 0 },  
  { id: 10, name: "Pierre Gasly", team: "Alpine", number: 10, nationality: "France", birthdate: "1996-02-07", birthPlace: "Rouen, Normandy, France", careerWins: 1 },  
  { id: 11, name: "Jack Doohan", team: "Alpine", number: 7, nationality: "Australia", birthdate: "2003-01-20", birthPlace: "Gold Coast, Queensland, Australia", careerWins: 0 },  
  { id: 12, name: "Oliver Bearman", team: "Haas", number: 87, nationality: "United Kingdom", birthdate: "2005-05-08", birthPlace: "Redhill, England", careerWins: 0 },  
  { id: 13, name: "Esteban Ocon", team: "Haas", number: 31, nationality: "France", birthdate: "1996-09-17", birthPlace: "Évreux, Normandy, France", careerWins: 1 },  
  { id: 14, name: "Yuki Tsunoda", team: "Racing Bulls", number: 22, nationality: "Japan", birthdate: "2000-05-11", birthPlace: "Sagamihara, Kanagawa, Japan", careerWins: 0 },  
  { id: 15, name: "Liam Lawson", team: "Racing Bulls", number: 30, nationality: "New Zealand", birthdate: "2002-02-11", birthPlace: "Auckland, New Zealand", careerWins: 0 },  
  { id: 16, name: "Gabriel Bortoleto", team: "Kick Sauber", number: 5, nationality: "Brazil", birthdate: "2004-10-14", birthPlace: "Osasco, São Paulo, Brazil", careerWins: 0 },  
  { id: 17, name: "Nico Hülkenberg", team: "Kick Sauber", number: 27, nationality: "Germany", birthdate: "1987-08-19", birthPlace: "Emmerich am Rhein, Germany", careerWins: 0 },  
  { id: 18, name: "Alexander Albon", team: "Williams", number: 23, nationality: "Thailand", birthdate: "1996-03-23", birthPlace: "London, England", careerWins: 0 },  
  { id: 19, name: "Carlos Sainz", team: "Williams", number: 55, nationality: "Spain", birthdate: "1994-09-01", birthPlace: "Madrid, Spain", careerWins: 4 },  
  { id: 20, name: "Franco Colapinto", team: "Alpine", number: 43, nationality: "Argentina", birthdate: "2003-05-27", birthPlace: "Buenos Aires, Argentina", careerWins: 0 }
];


server.get("/teams", async(request, response) => {
    response.type("application/json").code(200);
    return { teams };
});

server.get("/drivers", async(request, response) => {
    response.type("application/json").code(200);
    return { drivers };
});

interface DriverParams {
    id: string
};

server.get<{Params: DriverParams}>("/drivers/:id", async (request, response) => {
    const id = parseInt(request.params.id);
    const driver = drivers.find( d => d.id === id);

    if (!driver) {
        response.type("application/json").code(404);
    } else {
        response.type("application/json").code(200);
        return { driver };
    }
});

const port: number = parseInt(process.env.PORT ?? '' );
server.listen({port: port}, () => {
    console.log("Server init");
});