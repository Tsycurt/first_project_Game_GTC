const apiKey = "3d1fc38204541bdd53f5ba361df76c70";
let configuration: Configuration;


export function getPlayerName(){
  try {
    let playerName = window.location.search.substring(1).split("=")[1];
    playerName = decodeURIComponent(playerName.replace(/\+/g, '%20')); // This will replace any '+' characters with '%20' to preserve spaces
    return playerName;
  } catch {
    return "unknown";
  }
}

export async function getPeople(page: Number): Promise<TrendingResponse> {
    const TrendingResponse = await fetch(
      `https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&language=en-US&page=${page}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    );
    return TrendingResponse.json();
  }

 export  function getPicture(profile_path: string, base_url: string): string {
    return `${base_url}h632${profile_path}`;
  }
   
  
  
 export async function getConfiguration(): Promise<Configuration> {
  if (configuration) {
    return configuration;
  }
  const configurationResponse = await fetch(
    `https://api.themoviedb.org/3/configuration?api_key=${apiKey}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }
  );
  configuration = await configurationResponse.json();
  return configuration;
}
