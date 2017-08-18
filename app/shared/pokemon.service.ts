import { Injectable} from '@angular/core';
import {Http, Response, Request, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Pokemon} from './pokemon';


@Injectable()
export class PokemonService{
    //private pokemonUrl: string = 'http://localhost:8080/pokemon/';
    //Change when testing with localtunnel
    //private pokemonUrl: string = 'https://tdjcdoasso.localtunnel.me/pokemon/';
    //AWS Server
    private pokemonUrl: string = 'http://ec2-18-220-176-214.us-east-2.compute.amazonaws.com:8080/';
    constructor(private _http:Http ){

    }

    getPokemon(): Observable<Pokemon[]>{
        var newUrl = this.pokemonUrl + "pokemon";
        return this._http
                    .get(newUrl)
                    .map((res:Response)=> <Pokemon[]> res.json())
                    .do(data => console.log(data))
                    .catch(this.handleError);
    }

    deletePokemon(pokemon: Pokemon): Observable<Response>{
        var newUrl = this.pokemonUrl + "pokemon/";
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        console.log(pokemon._id);
        let url = newUrl + pokemon._id;

        return this._http
            .delete(url, options)
            .catch(this.handleError);
    }

    addPokemon(pokemon: any):Observable<Pokemon>{
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        //var addPokemon = pokemon
        var newUrl = this.pokemonUrl + "pokemon";
        if (pokemon.stats == null){
            pokemon.stats = {
                hp: 0,
                attack: 0,
                defense: 0,
                "sp.atk": 0,
                "sp.def": 0,
                speed: 0,
                total: 0
            }
        }
        console.log(pokemon.stats);

        let body = JSON.stringify(pokemon);
        let url = newUrl;
        console.log(body);
        return this._http
                    .post(url, body, options)
                    .map((response: Response)=>{
                        return response.json();
                    })
                    .do(data => console.log(data))
                    .catch(this.handleError);
    }

    addBulkPokemon(pokemon: any[]):Observable<Pokemon[]>{
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        let body = JSON.stringify(pokemon);

        var newUrl = this.pokemonUrl + "bulkpokemon";

        let url = newUrl;

        return this._http
                    .post(url, body, options)
                    .map((response: Response)=>{
                        return response.json();
                    })
                    .do(data => console.log(data))
                    .catch(this.handleError);
    }

    private handleError(error: Response){
        let msg = 'Error status code '+ error.status + ' status ' + error.statusText + ' at ' + error.url ;
        return Observable.throw(msg);
    }

}